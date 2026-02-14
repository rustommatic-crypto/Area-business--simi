
import React, { useState } from 'react';
import { BusinessIntel, SocialTask, InventoryItem } from '../types';

interface SimiBusinessDashboardProps {
  inventory: InventoryItem[];
  onCallSimi: () => void;
}

const SimiBusinessDashboard: React.FC<SimiBusinessDashboardProps> = ({ inventory, onCallSimi }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'intel' | 'office'>('overview');
  
  const intel: BusinessIntel[] = [
    { opportunity: "Sneaker Demand Spike", location: "Yaba Hub", action: "Run Ad Now", confidence: 94 },
    { opportunity: "Bulk Rice Shortage", location: "Mile 12", action: "Restock Warning", confidence: 88 }
  ];

  const socialTasks: SocialTask[] = [
    { id: '1', platform: 'INSTAGRAM', content: 'See better levels! New Adire stock just landed.', status: 'ready', scheduledTime: '14:00' },
    { id: '2', platform: 'WHATSAPP', content: 'Flash sale starting in 1 hour! #NoDulling', status: 'posted', scheduledTime: '10:30' }
  ];

  return (
    <div className="w-full space-y-8 py-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Simi Business</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Neural Enterprise Suite</p>
        </div>
        <button 
          onClick={onCallSimi}
          className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-3xl text-white font-black uppercase text-xs shadow-neural transition-all flex items-center group"
        >
          <i className="fa-solid fa-phone-volume mr-3 group-hover:animate-bounce"></i> Call Simi for Intel
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pillar 1: Neural Intel & Pulse */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-emerald-500/20 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] -mr-16 -mt-16"></div>
            <h3 className="text-white font-black text-[10px] uppercase mb-6 flex items-center tracking-widest">
              <i className="fa-solid fa-chart-line mr-3 text-emerald-500"></i> Simi Intel Pulse
            </h3>
            <div className="space-y-4">
              {intel.map((item, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-black text-xs uppercase">{item.opportunity}</p>
                    <span className="text-emerald-500 text-[10px] font-black">{item.confidence}%</span>
                  </div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase mb-3"><i className="fa-solid fa-location-dot mr-1"></i> {item.location}</p>
                  <button className="text-[8px] font-black text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full uppercase hover:bg-emerald-500 hover:text-white transition-all">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[3rem] shadow-xl">
             <h3 className="text-white font-black text-[10px] uppercase mb-6 flex items-center tracking-widest">
               <i className="fa-solid fa-truck-fast mr-3 text-amber-500"></i> Arealine Bridge
             </h3>
             <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-white/5">
                <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center text-emerald-500">
                      <i className="fa-brands fa-whatsapp"></i>
                   </div>
                   <span className="text-[10px] font-black text-white uppercase">WhatsApp Link Active</span>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             </div>
             <p className="text-[8px] text-slate-500 font-bold uppercase mt-4 tracking-widest leading-relaxed">
               "Your phone is now part of the grid. I am handling the logistics updates while you chill."
             </p>
          </div>
        </div>

        {/* Pillar 2: Social & Media Command */}
        <div className="lg:col-span-8 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Media Network Pillar */}
              <div className="bg-slate-950 border border-slate-800 p-8 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 adire-overlay opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <h3 className="text-white font-black text-[10px] uppercase mb-8 flex items-center tracking-widest">
                  <i className="fa-solid fa-satellite-dish mr-3 text-amber-500"></i> Simi Media Network
                </h3>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-white/5">
                      <div>
                         <p className="text-white font-black text-[10px] uppercase">Simi Tour TV</p>
                         <p className="text-[8px] text-emerald-500 font-black uppercase">Verified: Shop Photo 1</p>
                      </div>
                      <i className="fa-solid fa-circle-check text-emerald-500"></i>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-white/5 border-dashed">
                      <div>
                         <p className="text-slate-500 font-black text-[10px] uppercase">Market Demand Spot</p>
                         <p className="text-[8px] text-slate-600 font-black uppercase">Next Slot: Wed 4PM</p>
                      </div>
                      <button className="text-[8px] font-black text-amber-500 uppercase border border-amber-500/30 px-3 py-1 rounded-full">Book Ad</button>
                   </div>
                </div>
              </div>

              {/* Social Sync Pillar */}
              <div className="bg-slate-950 border border-slate-800 p-8 rounded-[3.5rem] shadow-2xl">
                <h3 className="text-white font-black text-[10px] uppercase mb-8 flex items-center tracking-widest">
                  <i className="fa-solid fa-share-nodes mr-3 text-emerald-500"></i> Social Sync Command
                </h3>
                <div className="space-y-4">
                   {socialTasks.map(task => (
                     <div key={task.id} className="flex items-center space-x-4 p-4 bg-slate-900 rounded-2xl border border-white/5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] ${task.platform === 'INSTAGRAM' ? 'bg-pink-500/10 text-pink-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                           <i className={`fa-brands fa-${task.platform.toLowerCase()}`}></i>
                        </div>
                        <div className="flex-1">
                           <p className="text-[9px] text-white font-black uppercase truncate italic">"{task.content}"</p>
                           <p className="text-[7px] text-slate-500 font-bold uppercase mt-1">{task.status === 'ready' ? `Auto-post at ${task.scheduledTime}` : 'Manifested Successfully'}</p>
                        </div>
                        {task.status === 'posted' && <i className="fa-solid fa-check text-emerald-500 text-[10px]"></i>}
                     </div>
                   ))}
                </div>
              </div>
           </div>

           {/* Office Pro Pillar */}
           <div className="bg-slate-900/60 border border-slate-800 p-10 rounded-[4rem] shadow-2xl relative">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-white font-black text-xs uppercase tracking-widest flex items-center">
                    <i className="fa-solid fa-briefcase mr-4 text-emerald-500"></i> Office Pro Suite
                 </h3>
                 <span className="text-[9px] font-black text-slate-500 uppercase">3 Staff Members Online</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/40 transition-all cursor-pointer">
                    <i className="fa-solid fa-envelope-open-text text-amber-500 mb-4 text-xl"></i>
                    <p className="text-white font-black text-[10px] uppercase">Neural Email</p>
                    <p className="text-[8px] text-slate-500 font-bold mt-1 uppercase">2 Responses drafted</p>
                 </div>
                 <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/40 transition-all cursor-pointer">
                    <i className="fa-solid fa-list-check text-emerald-500 mb-4 text-xl"></i>
                    <p className="text-white font-black text-[10px] uppercase">Admin Tasks</p>
                    <p className="text-[8px] text-slate-500 font-bold mt-1 uppercase">All clear for today</p>
                 </div>
                 <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/40 transition-all cursor-pointer">
                    <i className="fa-solid fa-file-invoice text-blue-500 mb-4 text-xl"></i>
                    <p className="text-white font-black text-[10px] uppercase">Documents</p>
                    <p className="text-[8px] text-slate-500 font-bold mt-1 uppercase">New LPO Received</p>
                 </div>
              </div>
           </div>

           {/* 24/7 Agent Pillar */}
           <div className="bg-slate-950 border border-emerald-500/20 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-emerald-600 px-6 py-2 rounded-bl-3xl text-[9px] font-black text-white uppercase tracking-widest shadow-neural animate-pulse">24/7 LIVE AGENT</div>
              <h3 className="text-white font-black text-[10px] uppercase mb-8 flex items-center tracking-widest">
                 <i className="fa-solid fa-robot mr-3 text-emerald-500"></i> Customer Bargain Monitor
              </h3>
              <div className="bg-slate-900/60 p-6 rounded-[2rem] border border-white/5">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-950 rounded-full flex items-center justify-center">
                       <i className="fa-solid fa-comment-dots text-emerald-500"></i>
                    </div>
                    <div>
                       <p className="text-[11px] text-white italic font-medium leading-relaxed">"Simi is currently negotiating a bulk order of 5 hoodies for a client in Abuja. Discount suggested: 10%."</p>
                       <p className="text-[8px] text-emerald-500 font-black uppercase mt-2 tracking-widest">Active Bargain • Status: Optimal</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SimiBusinessDashboard;
