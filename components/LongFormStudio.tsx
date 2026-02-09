
import React, { useState, useRef, useEffect } from 'react';
import { LongFormState, EpisodeTheme, VideoSegment } from '../types';

interface LongFormStudioProps {
  state: LongFormState;
  onStoryboard: (text: string, theme: EpisodeTheme) => void;
  onProduce: () => void;
  avatarUrl: string | null;
}

const THEMES: { id: EpisodeTheme; label: string; icon: string; vibe: string }[] = [
  { id: 'MARKET', label: 'Market Watch', icon: 'fa-shop', vibe: 'High-energy commerce updates' },
  { id: 'TECH', label: 'Tech Gist', icon: 'fa-microchip', vibe: 'Neural trends and innovations' },
  { id: 'MOTIVATION', label: 'Hustle Fuel', icon: 'fa-fire-heart', vibe: 'Powerful success strategies' },
  { id: 'STREET', label: 'Street News', icon: 'fa-broadcast-tower', vibe: 'What is trending in Lagos' },
];

const LongFormStudio: React.FC<LongFormStudioProps> = ({ state, onStoryboard, onProduce, avatarUrl }) => {
  const [longText, setLongText] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<EpisodeTheme>('MARKET');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStoryboard = () => {
    if (longText.trim()) onStoryboard(longText, selectedTheme);
  };

  const startPlayback = () => {
    const readyIdx = state.segments.findIndex(s => s.status === 'completed');
    if (readyIdx !== -1) {
      setPlaybackIndex(readyIdx);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [playbackIndex, isPlaying]);

  const handleVideoEnded = () => {
    const nextIdx = playbackIndex + 1;
    if (nextIdx < state.segments.length && state.segments[nextIdx].status === 'completed') {
      setPlaybackIndex(nextIdx);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full space-y-8 py-4 animate-in fade-in slide-in-from-bottom-4">
      {/* Production Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">EPISODE STUDIO</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Neural Cinematic Pipeline</p>
        </div>
        {state.segments.length > 0 && !state.isProcessing && (
           <button onClick={() => window.location.reload()} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest"><i className="fa-solid fa-rotate mr-2"></i>New Production</button>
        )}
      </div>

      {isPlaying ? (
        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl">
          <div className="aspect-video rounded-3xl overflow-hidden bg-black mb-6 border border-white/5 relative group shadow-inner">
            <video ref={videoRef} src={state.segments[playbackIndex].videoUrl || ''} onEnded={handleVideoEnded} className="w-full h-full object-contain" autoPlay />
            <div className="absolute bottom-6 left-6 flex items-center space-x-4">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] text-white font-black border border-white/10 uppercase tracking-widest">SCENE {playbackIndex + 1} / {state.segments.length}</div>
              <div className="bg-emerald-600/80 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] text-white font-black uppercase tracking-widest">THEME: {state.theme}</div>
            </div>
            <button onClick={() => setIsPlaying(false)} className="absolute top-6 right-6 bg-red-600/80 hover:bg-red-500 p-4 rounded-full text-white transition-all scale-0 group-hover:scale-100"><i className="fa-solid fa-xmark"></i></button>
          </div>
          
          {/* Playback Progress */}
          <div className="flex gap-2 h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
             {state.segments.map((_, i) => (
               <div key={i} className={`flex-1 transition-all duration-500 ${i <= playbackIndex ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
             ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Phase 1: Planning */}
          {state.segments.length === 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl animate-in fade-in">
              <h3 className="text-white font-black text-xs uppercase mb-6 flex items-center">
                <i className="fa-solid fa-clapperboard mr-3 text-emerald-500"></i> Phase 1: Storyboard & Script
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {THEMES.map((t) => (
                  <button 
                    key={t.id} 
                    onClick={() => setSelectedTheme(t.id)}
                    className={`p-4 rounded-2xl border transition-all text-left ${selectedTheme === t.id ? 'bg-emerald-600 border-emerald-400 shadow-neural' : 'bg-slate-950 border-slate-800 opacity-60 hover:opacity-100'}`}
                  >
                    <i className={`fa-solid ${t.icon} mb-2 text-xl ${selectedTheme === t.id ? 'text-white' : 'text-emerald-500'}`}></i>
                    <p className={`text-[10px] font-black uppercase tracking-tighter ${selectedTheme === t.id ? 'text-white' : 'text-slate-300'}`}>{t.label}</p>
                    <p className={`text-[8px] font-bold mt-1 leading-none ${selectedTheme === t.id ? 'text-emerald-100' : 'text-slate-600'}`}>{t.vibe}</p>
                  </button>
                ))}
              </div>

              <textarea 
                value={longText} 
                onChange={(e) => setLongText(e.target.value)} 
                placeholder="What is the story today? Paste your script or bullet points here..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 text-sm text-slate-200 h-48 resize-none outline-none focus:border-emerald-500 shadow-inner mb-6" 
              />
              
              <button 
                onClick={handleStoryboard} 
                disabled={state.isStoryboarding || !avatarUrl || !longText.trim()} 
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 rounded-3xl text-white font-black uppercase text-xs shadow-neural transition-all"
              >
                {state.isStoryboarding ? 'Simi is Storyboarding...' : 'Generate Neural Storyboard'}
              </button>
            </div>
          )}

          {/* Phase 2: Production Board */}
          {state.segments.length > 0 && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-white font-black text-xs uppercase tracking-widest">{state.title}</h3>
                    <p className="text-emerald-500 text-[10px] font-bold uppercase mt-1 tracking-widest">Episode Manifest: {state.segments.length} Scenes</p>
                  </div>
                  {!state.isProcessing && !state.segments.some(s => s.status === 'completed') && (
                    <button 
                      onClick={onProduce} 
                      className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-white font-black uppercase text-[10px] shadow-neural transition-all"
                    >
                      Start Neural Production
                    </button>
                  )}
                  {state.segments.some(s => s.status === 'completed') && !state.isProcessing && (
                    <button 
                      onClick={startPlayback} 
                      className="px-10 py-4 bg-amber-600 hover:bg-amber-500 rounded-2xl text-white font-black uppercase text-[10px] shadow-neural transition-all"
                    >
                      <i className="fa-solid fa-play mr-2"></i> Preview Final Cut
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.segments.map((seg, idx) => (
                    <div key={seg.id} className={`p-6 rounded-3xl border transition-all relative overflow-hidden group ${
                      seg.status === 'completed' ? 'bg-emerald-950/20 border-emerald-500/50' : 
                      seg.status === 'generating' ? 'bg-amber-950/20 border-amber-500/50 animate-pulse' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scene {idx + 1}</span>
                        {seg.status === 'completed' ? (
                          <i className="fa-solid fa-circle-check text-emerald-500"></i>
                        ) : seg.status === 'generating' ? (
                          <i className="fa-solid fa-film text-amber-500 animate-spin-slow"></i>
                        ) : seg.status === 'queued' ? (
                          <i className="fa-solid fa-clock text-slate-700"></i>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic">"{seg.script}"</p>
                      
                      {/* Visual status bar for segments */}
                      {seg.status === 'generating' && (
                        <div className="absolute bottom-0 left-0 h-1 bg-amber-500 animate-loading-bar w-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Filmstrip View */}
              <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 overflow-x-auto no-scrollbar flex items-center space-x-4">
                 <div className="flex-shrink-0 text-[10px] font-black text-slate-600 uppercase tracking-widest mr-4">Timeline</div>
                 {state.segments.map((seg, i) => (
                   <div key={seg.id} className={`flex-shrink-0 w-12 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                     seg.status === 'completed' ? 'bg-emerald-500 border-emerald-400' :
                     seg.status === 'generating' ? 'bg-amber-500 border-amber-400 animate-neural-pulse' : 'bg-slate-800 border-slate-700'
                   }`}>
                      <span className="text-[9px] font-black text-white">{i + 1}</span>
                      <i className={`fa-solid ${seg.status === 'completed' ? 'fa-video' : 'fa-clapperboard'} text-[10px] mt-1 text-white/40`}></i>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LongFormStudio;
