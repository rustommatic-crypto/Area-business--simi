
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Type, FunctionDeclaration } from '@google/genai';
import { SIMI_SYSTEM_INSTRUCTION } from '../constants';

interface LiveInterfaceProps {
  onStatusChange: (isListening: boolean, isSpeaking: boolean) => void;
  onTranscript: (text: string, role: 'user' | 'model') => void;
  onCommand: (command: string, args: any) => void;
}

const tools: FunctionDeclaration[] = [
  {
    name: 'set_visual_state',
    description: "Changes Simi's visual aura or background.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        state: { type: Type.STRING, enum: ['standard', 'analytics', 'strategy', 'celebrate', 'warning'] },
      },
      required: ['state'],
    },
  },
  {
    name: 'navigate',
    description: 'Switch between different app pages/modes.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        mode: { type: Type.STRING, enum: ['CHAT', 'TV', 'HUSTLE', 'SHOPPER', 'SUPPLY'] },
      },
      required: ['mode'],
    },
  },
  {
    name: 'add_to_cart',
    description: 'Add an item to the shopping cart for a buyer.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        price: { type: Type.NUMBER },
        quantity: { type: Type.NUMBER },
      },
      required: ['name', 'price'],
    },
  },
  {
    name: 'update_inventory',
    description: 'Add or update a product for a vendor.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        price: { type: Type.NUMBER },
        stock: { type: Type.NUMBER },
      },
      required: ['name', 'price'],
    },
  },
  {
    name: 'generate_invoice',
    description: 'Create a final invoice for payment and trigger delivery.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        total: { type: Type.NUMBER },
      },
      required: ['total'],
    },
  },
];

const LiveInterface: React.FC<LiveInterfaceProps> = ({ onStatusChange, onTranscript, onCommand }) => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) onTranscript(message.serverContent.outputTranscription.text, 'model');
            if (message.serverContent?.inputTranscription) onTranscript(message.serverContent.inputTranscription.text, 'user');

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                // Determine common mapping
                let cmd = fc.name;
                if (fc.name === 'set_visual_state') cmd = 'visual_state';
                onCommand(cmd, fc.args);
                
                sessionPromise.then(s => {
                  s.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { result: "ok" } }
                  });
                });
              }
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContextRef.current) {
              onStatusChange(false, true);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              const buffer = await decodeAudioData(decode(audioData), audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(audioContextRef.current.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) onStatusChange(true, false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              onStatusChange(true, false);
            }
          },
          onclose: () => setIsActive(false),
          onerror: (e) => setError("Link failed"),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SIMI_SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: tools }],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
      setIsActive(true);
      onStatusChange(true, false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      setIsActive(false);
      onStatusChange(false, false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && <p className="text-red-500 text-[10px] font-bold uppercase">{error}</p>}
      {!isActive ? (
        <button onClick={startSession} className="group relative flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-95">
          <i className="fa-solid fa-microphone text-3xl text-white"></i>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping"></div>
        </button>
      ) : (
        <button onClick={stopSession} className="group relative flex items-center justify-center w-20 h-20 bg-red-600 rounded-full hover:bg-red-500 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95">
          <i className="fa-solid fa-phone-slash text-3xl text-white"></i>
        </button>
      )}
    </div>
  );
};

export default LiveInterface;
