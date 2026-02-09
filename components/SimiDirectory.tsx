
import React, { useState, useEffect } from 'react';
import { BusinessNode } from '../types';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

const SimiDirectory: React.FC = () => {
  const [nodes, setNodes] = useState<BusinessNode[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Mocking directory data based on category
    setTimeout(() => {
      setNodes([
        { id: '1', name: 'Alara Lagos', type: 'VENDOR', category: 'Fashion', area: 'Victoria Island', location: 'Lagos, NG', reliability: 98, tags: ['luxury', 'design'] },
        { id: '2', name: 'Mainland Hub', type: 'OFFICE', category: 'Tech', area: 'Yaba', location: 'Lagos, NG', reliability: 92, tags: ['coworking', 'neural'] },
        { id: '3', name: 'Ariaria Master-Craft', type: 'MANUFACTURER', category: 'Leather', area: 'Aba', location: 'Abia, NG', reliability: 95, tags: ['wholesale', 'shoes'] },
        { id: '4', name: 'Dufil Prima Foods', type: 'MANUFACTURER', category: 'FMCG', area: 'Ogun', location: 'Ogun State, NG', reliability: 99, tags: ['indomie', 'bulk'] },
        { id: '5', name: 'Simi Global Media', type: 'OFFICE', category: 'Media', area: 'Lekki', location: 'Lagos, NG', reliability: 100, tags: ['hq', 'neural-sisi'] },
      ]);
      setLoading(false);
    }, 800);
  }, [category]);

  const filtered = nodes.filter(n => 
    (category === 'All' || n.category === category) &&
    (n.name.toLowerCase().includes(search.toLowerCase()) || n.area.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full space-y-10 py-4 animate-in fade-in slide-in-from-left-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Simi Global Directory</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Neural Capture of Every Business Area</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input 
              type="text" 
              placeholder="Search Area or Business..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-6 py-3 text-[11px] font-black text-white outline-none focus:border-emerald-500"
            />
          </div>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-[11px] font-black text-white px-5 py-3 rounded-2xl outline-none focus:border-emerald-500 transition-all"
           >
             <option>All</option>
             <option>Fashion</option>
             <option>Tech</option>
             <option>Leather</option>
             <option>FMCG</option>
             <option>Media</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 h-64 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-[10px] text-emerald-400 font-black uppercase animate-pulse">Syncing Neural Directory...</p>
          </div>
        ) : (
          filtered.map((node) => (
            <div key={node.id} className="bg-slate-900/60 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-2xl">
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl"></div>
               <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-xl text-emerald-500 border border-white/5">
                     <i className={`fa-solid ${node.type === 'MANUFACTURER' ? 'fa-industry' : node.type === 'OFFICE' ? 'fa-building' : 'fa-shop'}`}></i>
                  </div>
                  <div className="text-right">
                     <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Impact</p>
                     <p className="text-xl font-black text-emerald-400">{node.reliability}%</p>
                  </div>
               </div>
               <h4 className="text-lg font-black text-white uppercase mb-2 tracking-tight">{node.name}</h4>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">
                  <i className="fa-solid fa-location-dot mr-2 text-emerald-500"></i> {node.area}, {node.location}
               </p>
               <div className="flex flex-wrap gap-2 mb-8">
                  {node.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-950 rounded-full text-[8px] font-black text-slate-500 uppercase">#{t}</span>
                  ))}
               </div>
               <button className="w-full py-4 bg-slate-950 border border-slate-800 hover:bg-emerald-600 hover:text-white rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all">
                  Open Business Channel
               </button>
            </div>
          ))
        )}
      </div>

      <div className="bg-slate-950 border border-slate-800 p-10 rounded-[4rem] relative overflow-hidden">
         <div className="absolute inset-0 adire-overlay opacity-5"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
               <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-tight">Global Area Capture</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 "I capture everything. From the neighborhood bread seller to the big international manufacturer. If it's a hustle, it's in my directory. I capture local vibes and foreign links—all in one neural place!"
               </p>
               <div className="flex gap-4">
                  <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-3xl text-white font-black uppercase text-xs shadow-neural transition-all">
                    Register Your Office
                  </button>
                  <button className="px-10 py-5 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl text-slate-400 hover:text-white font-black uppercase text-xs transition-all">
                    Explore Foreign Hubs
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SimiDirectory;
