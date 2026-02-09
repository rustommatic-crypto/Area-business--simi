
import React from 'react';

export type VisualState = 'standard' | 'analytics' | 'strategy' | 'celebrate' | 'warning' | 'areafm' | 'broadcast';

interface SimiAvatarProps {
  imageUrl: string | null;
  isGenerating: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  visualState?: VisualState;
}

const SimiAvatar: React.FC<SimiAvatarProps> = ({ 
  imageUrl, 
  isGenerating, 
  isListening, 
  isSpeaking, 
  visualState = 'standard' 
}) => {
  const getOverlayContent = () => {
    switch (visualState) {
      case 'areafm':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 bg-emerald-500 rounded-full animate-bounce" style={{ height: `${Math.random() * 20 + 10}px`, animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
            <p className="text-[8px] font-black text-white uppercase tracking-[0.3em] animate-pulse">AreaFM 98.1</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full bg-emerald-500/10 backdrop-blur-[1px] animate-pulse flex items-end justify-around px-8 pb-12">
              <div className="w-4 bg-emerald-400/60 h-1/2 rounded-t-sm"></div>
              <div className="w-4 bg-emerald-400/80 h-3/4 rounded-t-sm"></div>
              <div className="w-4 bg-amber-400/80 h-2/3 rounded-t-sm"></div>
              <div className="w-4 bg-emerald-400 h-full rounded-t-sm"></div>
            </div>
          </div>
        );
      case 'celebrate':
        return (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-amber-500/10">
            <i className="fa-solid fa-crown text-amber-400 text-4xl animate-bounce drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"></i>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-6 group">
      {/* External Frame Glow */}
      <div className={`absolute -inset-4 rounded-full blur-3xl transition-all duration-1000 ${
        visualState === 'areafm' ? 'bg-amber-500/20' :
        isSpeaking ? 'bg-emerald-500/30 scale-110' : 
        isListening ? 'bg-amber-500/30 scale-105' : 'bg-emerald-500/10'
      }`}></div>

      {/* The TV Screen Frame */}
      <div className={`relative w-full h-full rounded-full border-[12px] transition-colors duration-500 ${
        visualState === 'areafm' ? 'border-amber-600/50' :
        isSpeaking ? 'border-emerald-500' : 
        isListening ? 'border-amber-500 animate-pulse' : 'border-slate-900'
      } overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 bg-slate-950`}>
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        {/* Status Indicators */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isSpeaking || isListening ? 'bg-red-600 animate-pulse' : 'bg-slate-700'}`}></div>
          <span className="text-[7px] font-black text-white uppercase tracking-widest opacity-60">Neural Feed</span>
        </div>

        {isGenerating ? (
          <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[8px] text-emerald-400 font-black uppercase tracking-widest">Syncing Hub...</p>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Simi Avatar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <i className="fa-solid fa-satellite-dish text-5xl text-emerald-600/20"></i>
          </div>
        )}

        {/* Reaction Overlays */}
        {getOverlayContent()}

        {/* CRT Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] z-20"></div>
      </div>

      {/* Small Floating Satellite Display */}
      <div className="absolute -right-2 top-1/4 z-40 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-2xl">
        <p className="text-[6px] font-black text-emerald-500 uppercase tracking-widest leading-none">Ch. 01</p>
        <p className="text-[8px] font-black text-white uppercase mt-1">Live Feed</p>
      </div>
    </div>
  );
};

export default SimiAvatar;
