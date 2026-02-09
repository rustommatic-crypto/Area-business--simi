
import React, { useState, useEffect } from 'react';
import { SupplyNode } from '../types';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

const SupplyChain: React.FC = () => {
  const [nodes, setNodes] = useState<SupplyNode[]>([]);
  const [category, setCategory] = useState('Electronics');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    gemini.matchSuppliers(category).then(data => {
      setNodes(data);
      setLoading(false);
    });
  }, [category]);

  return (
    <div className="w-full space-y-10 py-4 animate-in fade-in slide-in-from-left-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Supply Link</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Direct Manufacturer Connection</p>
        </div>
        <div className="flex items-center space-x-4">
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Industry:</p>
           <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-[11px] font-black text-white px-5 py-3 rounded-2xl outline-none focus:border-emerald-500 transition-all"
           >
             <option>Electronics</option>
             <option>Fabrics & Textiles</option>
             <option>Consumer Goods</option>
             <option>Agriculture</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 h-64 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-[10px] text-emerald-400 font-black uppercase animate-pulse">Scanning Global Supplier Base...</p>
          </div>
        ) : (
          nodes.map((node, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden group hover:border-emerald-500/40 transition-all">
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl"></div>
               <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-xl text-emerald-500 border border-white/5">
                     <i className={`fa-solid ${node.type === 'MANUFACTURER' ? 'fa-industry' : 'fa-truck-field'}`}></i>
                  </div>
                  <div className="text-right">
                     <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Trust Score</p>
                     <p className="text-xl font-black text-emerald-400">{node.reliability}%</p>
                  </div>
               </div>
               <h4 className="text-lg font-black text-white uppercase mb-2 tracking-tight">{node.name}</h4>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">
                  <i className="fa-solid fa-location-dot mr-2 text-emerald-500/50"></i> {node.location}
               </p>
               <div className="space-y-3">
                  <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase">
                     <span>Type:</span>
                     <span className="text-white">{node.type}</span>
                  </div>
                  <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase">
                     <span>Category:</span>
                     <span className="text-white">{node.category}</span>
                  </div>
               </div>
               <button className="w-full mt-8 py-4 bg-slate-950 border border-slate-800 hover:bg-emerald-600 hover:text-white rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all">
                  Request Wholesale List
               </button>
            </div>
          ))
        )}
      </div>

      <div className="bg-slate-950 border border-slate-800 p-10 rounded-[4rem] relative overflow-hidden">
         <div className="absolute inset-0 adire-overlay opacity-5"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
               <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">International Link</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 "I get direct link to manufacturers for China, Turkey, and Vietnam. If you be serious wholesaler, just call me. I go help you talk to them, arrange group shipping, and make sure your goods land for Lagos safe and sound. No more middleman palaver!"
               </p>
               <button className="px-10 py-5 bg-amber-600 hover:bg-amber-500 rounded-3xl text-white font-black uppercase text-xs shadow-neural transition-all">
                 Open Global Channel
               </button>
            </div>
            <div className="w-full md:w-80 aspect-square bg-slate-900 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl relative">
               <img src="https://images.unsplash.com/photo-1494412574743-0194849a60ef?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-50" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full animate-ping opacity-40"></div>
                  <i className="fa-solid fa-earth-africa text-5xl text-white absolute"></i>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SupplyChain;
