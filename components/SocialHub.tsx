
import React, { useState, useEffect } from 'react';
import { SocialProfile } from '../types';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

const SocialHub: React.FC = () => {
  const [profiles, setProfiles] = useState<SocialProfile[]>([
    { platform: 'TIKTOK', handle: '@Simi_Neural_Hustle', followers: 125000, engagementRate: '8.4%', isConnected: true },
    { platform: 'INSTAGRAM', handle: 'simi_neural_official', followers: 45000, engagementRate: '12.1%', isConnected: true },
    { platform: 'WHATSAPP', handle: '+234-SIMI-VIBES', followers: 8200, engagementRate: 'High', isConnected: true },
    { platform: 'X', handle: '@SimiNeural', followers: 12000, engagementRate: '5.2%', isConnected: false },
  ]);

  const [activeSync, setActiveSync] = useState<{platform: string, caption: string, tags: string[], vibe: string} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [pushComplete, setPushComplete] = useState(false);
  const [pulseValue, setPulseValue] = useState(92);

  // Simulate real-time data jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseValue(v => Math.min(100, Math.max(80, v + (Math.random() * 4 - 2))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSyncToPlatform = async (platform: string) => {
    setIsGenerating(true);
    setPushComplete(false);
    const manifest = await gemini.generateSocialManifest("If you never scale your hustle with AI for this Lagos, you dey carry last! Simi is here to level you up. #NeuralHustle #LagosTech", platform);
    setActiveSync({ platform, ...manifest });
    setIsGenerating(false);
  };

  const handlePushToAlgorithm = () => {
    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      setPushComplete(true);
    }, 3000);
  };

  return (
    <div className="w-full space-y-10 py-4 animate-in fade-in slide-in-from-bottom-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">SOCIAL SYNC</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">Neural Multi-Platform Command</p>
        </div>
        <div className="flex items-center space-x-6">
           <div className="hidden md:flex flex-col items-end">
             <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Global Reach Score</p>
             <p className="text-xl font-black text-emerald-400 leading-none">A+ EXCELLENT</p>
           </div>
           <div className="flex items-center space-x-2 bg-slate-900/60 p-2 px-4 rounded-2xl border border-slate-800">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
             <span className="text-[10px] font-black text-white uppercase tracking-widest">Algorithm Link: Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <div key={profile.platform} className={`bg-slate-900/40 border p-6 rounded-[2.5rem] relative overflow-hidden transition-all hover:scale-[1.02] ${
            profile.isConnected ? 'border-emerald-500/20 shadow-xl' : 'border-slate-800 opacity-60'
          }`}>
             <div className="flex justify-between items-start mb-6">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-2xl ${
                 profile.platform === 'TIKTOK' ? 'bg-[#00f2ea]/20 text-[#00f2ea]' :
                 profile.platform === 'INSTAGRAM' ? 'bg-pink-600/20 text-pink-500' :
                 profile.platform === 'WHATSAPP' ? 'bg-emerald-600/20 text-emerald-500' : 'bg-slate-800 text-slate-400'
               }`}>
                 <i className={`fa-brands fa-${profile.platform.toLowerCase() === 'x' ? 'x-twitter' : profile.platform.toLowerCase()}`}></i>
               </div>
               {profile.isConnected ? (
                 <span className="bg-emerald-600/20 text-emerald-400 text-[8px] font-black px-3 py-1 rounded-full uppercase">Connected</span>
               ) : (
                 <button className="bg-slate-800 text-slate-400 text-[8px] font-black px-3 py-1 rounded-full uppercase hover:bg-emerald-600 hover:text-white transition-all">Link Link</button>
               )}
             </div>
             
             <div className="space-y-1">
               <h4 className="text-white font-black text-sm uppercase truncate">{profile.handle}</h4>
               <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{profile.platform}</p>
             </div>

             <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
               <div>
                 <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Reach</p>
                 <p className="text-sm font-black text-white">{(profile.followers / 1000).toFixed(1)}k</p>
               </div>
               <div>
                 <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Vibe Score</p>
                 <p className="text-sm font-black text-emerald-400">{profile.engagementRate}</p>
               </div>
             </div>

             {profile.isConnected && (
               <button 
                 onClick={() => handleSyncToPlatform(profile.platform)}
                 className="w-full mt-6 py-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-[9px] font-black text-slate-400 hover:text-emerald-400 uppercase tracking-widest transition-all"
               >
                 MANIFEST CONTENT
               </button>
             )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Manifest Preview Section */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-[3.5rem] p-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32"></div>
           
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-white font-black text-xs uppercase flex items-center tracking-widest">
                <i className="fa-solid fa-wand-magic-sparkles mr-4 text-amber-500"></i> Manifest Preview
              </h3>
              {activeSync && (
                <div className="flex items-center space-x-2">
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Target:</span>
                   <span className="text-[10px] font-black text-emerald-400 uppercase">{activeSync.platform}</span>
                </div>
              )}
           </div>
           
           {isGenerating ? (
             <div className="h-96 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#10b981]"></div>
                <div className="text-center">
                  <p className="text-[11px] text-emerald-400 font-black uppercase animate-pulse">Consulting the Algorithmic Sisi...</p>
                  <p className="text-[9px] text-slate-600 font-bold uppercase mt-2">Translating Street Vibe to Viral Pulse</p>
                </div>
             </div>
           ) : activeSync ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-right-8 duration-700">
                {/* Visual Preview */}
                <div className="relative group">
                   <div className="aspect-[9/16] bg-slate-900 rounded-[2.5rem] border-4 border-slate-800 overflow-hidden shadow-2xl relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                         <i className="fa-solid fa-play text-4xl text-white/20"></i>
                      </div>
                      
                      {/* Mock Social Overlays */}
                      <div className="absolute bottom-10 left-6 z-20 space-y-3">
                         <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white/20"></div>
                            <div>
                               <p className="text-[10px] font-black text-white uppercase tracking-tight">Simi Neural</p>
                               <p className="text-[8px] text-white/60 font-medium">Lagos, NG</p>
                            </div>
                         </div>
                         <p className="text-[10px] text-white/90 line-clamp-2 leading-relaxed">"{activeSync.caption}"</p>
                         <div className="flex gap-1">
                            {activeSync.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[9px] font-black text-emerald-400">{tag}</span>
                            ))}
                         </div>
                      </div>
                      
                      <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center space-y-6">
                         <div className="flex flex-col items-center"><i className="fa-solid fa-heart text-white text-lg"></i><span className="text-[8px] text-white font-black mt-1">12.4k</span></div>
                         <div className="flex flex-col items-center"><i className="fa-solid fa-comment text-white text-lg"></i><span className="text-[8px] text-white font-black mt-1">842</span></div>
                         <div className="flex flex-col items-center"><i className="fa-solid fa-share text-white text-lg"></i><span className="text-[8px] text-white font-black mt-1">4.2k</span></div>
                      </div>
                   </div>
                   <div className="mt-4 flex justify-center">
                     <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Neural Mockup Ready</p>
                   </div>
                </div>

                {/* Content Details */}
                <div className="flex flex-col justify-between space-y-8">
                   <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                         <div className="px-5 py-3 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl">
                            <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest mb-1">Algorithmic Vibe</p>
                            <p className="text-sm font-black text-white italic">"{activeSync.vibe}"</p>
                         </div>
                      </div>

                      <div className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] shadow-inner relative group">
                         <p className="text-white text-xs leading-relaxed font-medium">"{activeSync.caption}"</p>
                         <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
                            {activeSync.tags.map(tag => (
                              <span key={tag} className="text-[9px] font-black text-emerald-500 uppercase">{tag}</span>
                            ))}
                         </div>
                         <button 
                          onClick={() => navigator.clipboard.writeText(activeSync.caption)}
                          className="absolute top-4 right-4 text-[9px] font-black text-slate-500 hover:text-white uppercase transition-colors"
                         >
                           <i className="fa-solid fa-copy mr-2"></i>Copy
                         </button>
                      </div>
                   </div>

                   <div className="space-y-4 pt-6">
                      {isPushing ? (
                        <div className="w-full space-y-2">
                           <div className="h-14 bg-slate-900 rounded-2xl border border-slate-800 flex items-center px-6">
                             <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-4"></div>
                             <span className="text-[10px] font-black text-white uppercase tracking-widest">Handshake with {activeSync.platform}...</span>
                           </div>
                           <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 animate-loading-bar"></div>
                           </div>
                        </div>
                      ) : pushComplete ? (
                        <div className="w-full bg-emerald-600/20 border border-emerald-500/50 rounded-2xl p-4 flex items-center justify-center space-x-3 animate-in zoom-in-95">
                           <i className="fa-solid fa-circle-check text-emerald-500"></i>
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">MANIFESTED TO STREETS!</span>
                        </div>
                      ) : (
                        <div className="flex space-x-4">
                          <button 
                            onClick={handlePushToAlgorithm}
                            className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-white font-black uppercase text-[10px] shadow-neural transition-all group"
                          >
                            Push to Algorithm <i className="fa-solid fa-bolt-lightning ml-2 group-hover:scale-125 transition-transform"></i>
                          </button>
                          <button className="px-8 py-5 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors">
                            Schedule
                          </button>
                        </div>
                      )}
                      <p className="text-center text-[8px] text-slate-600 font-black uppercase tracking-widest">AI Content ID: SIMI-SOC-{Math.floor(Math.random()*10000)}</p>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-96 border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-700 transition-colors hover:border-emerald-500/20">
                <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center mb-6">
                  <i className="fa-solid fa-layer-group text-3xl opacity-20"></i>
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-2">Select a Platform</p>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Choose where Simi should manifest her hustle next</p>
             </div>
           )}
        </div>

        {/* Analytics & Insights Section */}
        <div className="space-y-8">
          <div className="bg-slate-950 border border-slate-800 rounded-[3rem] p-8 overflow-hidden">
             <h3 className="text-white font-black text-[10px] uppercase mb-10 flex items-center tracking-widest">
               <i className="fa-solid fa-chart-line mr-4 text-emerald-500"></i> Viral Pulse
             </h3>
             <div className="space-y-10">
                {[
                  { label: 'Lagos Sentiment', val: pulseValue, color: 'bg-emerald-500' },
                  { label: 'Algorithm Trust', val: 82, color: 'bg-amber-500' },
                  { label: 'Neural Reach', val: 75, color: 'bg-blue-500' },
                ].map((item) => (
                  <div key={item.label} className="space-y-3">
                    <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      <span>{item.label}</span>
                      <span className="text-white">{item.val.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-1000 ease-out`} 
                        style={{ width: `${item.val}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-14 p-8 bg-emerald-950/20 border border-emerald-500/20 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <p className="text-[9px] text-emerald-400 font-black uppercase mb-3 tracking-widest">Simi's Social Tip</p>
                <p className="text-[11px] text-slate-300 leading-relaxed italic font-medium">"Omo, for TikTok, make sure you use that trending Lagos-Neural sound I manifest. The algorithm dey hungry for authenticity today!"</p>
             </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-[3rem] p-8">
             <div className="flex items-center justify-between mb-6">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Post History</p>
                <i className="fa-solid fa-ellipsis text-slate-800"></i>
             </div>
             <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-4 p-3 bg-slate-900/40 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden">
                       <div className="w-full h-full bg-emerald-950/40 flex items-center justify-center"><i className="fa-solid fa-film text-[10px] text-emerald-500"></i></div>
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-black text-white uppercase truncate">Neural Hustle vlog #{120+i}</p>
                       <p className="text-[8px] text-slate-600 font-bold uppercase mt-1">2 hours ago • Viral</p>
                    </div>
                    <div className="text-emerald-500 text-[10px] font-black">+{i*2}.4k</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHub;
