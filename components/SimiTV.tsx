
import React, { useState, useEffect } from 'react';
import { TVShow } from '../types';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

const SimiTV: React.FC = () => {
  const [gossip, setGossip] = useState<string>('');
  const [shows] = useState<TVShow[]>([
    { id: '1', title: 'The Hustle of the Week', type: 'HUSTLE_TOUR', description: 'Simi tours the hottest shops in Lagos.', thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800', views: 12400 },
    { id: '2', title: 'Market Trends', type: 'MARKET_TRENDS', description: 'Whats hot and whats not in the market.', thumbnailUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800', views: 8900 },
    { id: '3', title: 'Market Demand', type: 'MARKET_DEMAND', description: 'Simi negotiates bulk deals for you.', thumbnailUrl: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800', views: 15600 },
    { id: '4', title: 'Market Gossip', type: 'GOSSIP', description: 'The latest gist on prices and deals.', thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', views: 24500 },
  ]);

  const [negotiation, setNegotiation] = useState<{dealPrice: number, pitch: string} | null>(null);
  const [isNegotiating, setIsNegotiating] = useState(false);

  useEffect(() => {
    gemini.getMarketGossip().then(setGossip);
  }, []);

  const handleStartNegotiation = async () => {
    setIsNegotiating(true);
    const deal = await gemini.negotiateGroupBuy("Haier Thermocool Deep Freezer", 5000, 60000);
    setNegotiation(deal);
    setIsNegotiating(false);
  };

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Broadcast Header */}
      <div className="bg-slate-900/60 border border-emerald-500/20 p-8 rounded-[4rem] relative overflow-hidden group shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32"></div>
         <div className="flex items-center space-x-4 mb-6">
            <span className="bg-red-600 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-neural animate-pulse">ON AIR</span>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Market Gossip Flash</span>
         </div>
         <p className="text-2xl md:text-3xl text-white font-black italic leading-tight max-w-5xl group-hover:text-emerald-400 transition-colors">
           "{gossip || 'Wait small, I dey gather better gist for you...'}"
         </p>
         <button onClick={() => gemini.getMarketGossip().then(setGossip)} className="mt-8 text-[11px] font-black text-emerald-400 hover:text-white uppercase tracking-[0.2em] flex items-center transition-all bg-emerald-600/10 px-6 py-3 rounded-2xl border border-emerald-500/20">
           <i className="fa-solid fa-rotate mr-3"></i> Get Fresh Gist
         </button>
      </div>

      {/* Shows Grid */}
      <section>
        <div className="flex items-center justify-between mb-10">
           <h3 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center">
             <i className="fa-solid fa-satellite-dish mr-4 text-emerald-500"></i> Simi TV Network
           </h3>
           <div className="hidden md:flex space-x-2">
              <span className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-widest">1.2M Concurrent Users</span>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {shows.map((show) => (
            <div key={show.id} className="group relative aspect-video rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5 cursor-pointer shadow-2xl hover:border-emerald-500/50 transition-all">
              <img src={show.thumbnailUrl} className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" alt={show.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute top-6 left-6 bg-emerald-600 px-3 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest">{show.type.replace('_', ' ')}</div>
              <div className="absolute bottom-8 left-8 right-8">
                <h4 className="text-white font-black text-base uppercase mb-2 group-hover:text-emerald-400 transition-colors">{show.title}</h4>
                <div className="flex items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                  <i className="fa-solid fa-eye mr-2 text-emerald-500"></i> {show.views.toLocaleString()} Global Views
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl border border-white/20">
                  <i className="fa-solid fa-play ml-1"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "Market Demand" Dynamic Show Component */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-950 border border-slate-800 p-12 rounded-[5rem] relative overflow-hidden">
        <div className="absolute inset-0 adire-overlay opacity-5 pointer-events-none"></div>
        <div className="lg:col-span-5 space-y-8 relative z-10">
           <div className="space-y-2">
              <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Market Demand</h3>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Neural Group-Buy Engine</p>
           </div>
           <p className="text-slate-400 text-lg leading-relaxed italic">
             "Why buy one at full price when we can buy 5,000 at half price? Oya, tell me what you want, and I go negotiate the discount for all of us!"
           </p>
           
           {negotiation ? (
             <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className="bg-emerald-600/10 border border-emerald-500/30 p-8 rounded-[2.5rem] shadow-inner">
                   <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-2">Simi's Negotiation Result</p>
                   <p className="text-white text-base font-medium italic">"{negotiation.pitch}"</p>
                   <div className="mt-8 flex items-baseline space-x-3">
                      <span className="text-4xl font-black text-white">N{negotiation.dealPrice.toLocaleString()}</span>
                      <span className="text-slate-500 text-sm line-through font-bold">N60,000</span>
                   </div>
                </div>
                <button className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 rounded-[2.5rem] text-white font-black uppercase text-sm shadow-neural transition-all">
                  Commit to Group Buy
                </button>
             </div>
           ) : (
             <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="bg-slate-900 px-8 py-5 rounded-[2rem] border border-slate-800">
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Target Product</p>
                    <p className="text-xl font-black text-white">Deep Freezer</p>
                  </div>
                  <div className="bg-slate-900 px-8 py-5 rounded-[2rem] border border-slate-800">
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Target Buyers</p>
                    <p className="text-xl font-black text-amber-500">5,000</p>
                  </div>
                </div>
                <button 
                  onClick={handleStartNegotiation}
                  disabled={isNegotiating}
                  className="w-full py-6 bg-slate-900 border border-emerald-500/50 hover:bg-emerald-600 rounded-[2.5rem] text-emerald-400 hover:text-white font-black uppercase text-xs transition-all shadow-xl"
                >
                  {isNegotiating ? 'Simi is Negotiating...' : 'Call the Manufacturer Now'}
                </button>
             </div>
           )}
        </div>
        <div className="lg:col-span-7 aspect-video rounded-[4rem] overflow-hidden shadow-2xl border-8 border-slate-900 relative">
           <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-700" />
           <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                <i className="fa-solid fa-microphone-lines text-white text-3xl"></i>
              </div>
           </div>
           <div className="absolute top-8 right-8 flex items-center space-x-3 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></span>
              <span className="text-[11px] font-black text-white uppercase tracking-widest">Active Call: Sanyo Wholesaler</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SimiTV;
