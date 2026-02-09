
import React, { useState } from 'react';
import { VendorPromotion, AdminStats, WardrobeItem } from '../types';
import { SIMI_WARDROBE } from '../constants';

interface AdminPanelProps {
  promotions: VendorPromotion[];
  onUpdateStatus: (id: string, status: 'active' | 'rejected') => void;
  currentWardrobeId: string;
  onSetWardrobe: (item: WardrobeItem) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  promotions, 
  onUpdateStatus, 
  currentWardrobeId, 
  onSetWardrobe 
}) => {
  const [stats] = useState<AdminStats>({
    totalRevenue: 12540,
    activeVendors: promotions.filter(p => p.status === 'active').length,
    pendingReviews: promotions.filter(p => p.status === 'pending').length,
    globalReach: 14
  });

  const [officeAdText, setOfficeAdText] = useState('');
  const [isGeneratingAd, setIsGeneratingAd] = useState(false);

  const handleGenerateOfficeAd = () => {
    setIsGeneratingAd(true);
    setTimeout(() => {
      setIsGeneratingAd(false);
      alert("Neural Ad Manifested for Internal Channels!");
    }, 2000);
  };

  return (
    <div className="w-full space-y-10 py-4 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Office Command</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Internal Neural Operations</p>
        </div>
        <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-emerald-500/20 flex items-center space-x-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">SYSTEM: OPTIMAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Simi Wardrobe - Restored shades of Simi */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-950 border border-slate-800 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden group">
            <h3 className="text-white font-black text-xs uppercase mb-8 flex items-center tracking-widest">
              <i className="fa-solid fa-shirt mr-4 text-emerald-500"></i> Simi's Wardrobe
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-10 leading-relaxed italic">
              "Change my shades and dressing for different shows or office tasks. Different vibes for different hustles!"
            </p>
            <div className="grid grid-cols-1 gap-4">
              {SIMI_WARDROBE.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => onSetWardrobe(item)}
                  className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${currentWardrobeId === item.id ? 'bg-emerald-600 border-emerald-400 shadow-neural text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-black/20 ${currentWardrobeId === item.id ? 'text-white' : 'text-emerald-500'}`}>
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <span className="text-xs font-black uppercase tracking-tight">{item.name}</span>
                  </div>
                  {currentWardrobeId === item.id && <i className="fa-solid fa-circle-check"></i>}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-10 rounded-[4rem] shadow-2xl">
            <h3 className="text-white font-black text-xs uppercase mb-8 flex items-center tracking-widest">
              <i className="fa-solid fa-bullhorn mr-4 text-amber-500"></i> Office Ad Manifest
            </h3>
            <div className="space-y-6">
              <textarea 
                value={officeAdText}
                onChange={(e) => setOfficeAdText(e.target.value)}
                placeholder="Describe the office announcement or internal promotion..."
                className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-xs text-white h-32 outline-none focus:border-amber-500 transition-all resize-none shadow-inner"
              />
              <button 
                onClick={handleGenerateOfficeAd}
                disabled={isGeneratingAd || !officeAdText}
                className="w-full py-5 bg-amber-600 hover:bg-amber-500 rounded-3xl text-slate-950 font-black uppercase text-[10px] transition-all shadow-neural"
              >
                {isGeneratingAd ? 'Manifesting...' : 'Generate Office Ad'}
              </button>
            </div>
          </div>
        </div>

        {/* Global Operations - Restored Table */}
        <div className="lg:col-span-7 space-y-8">
          {/* Analytics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Neural Revenue', value: `$${stats.totalRevenue}`, icon: 'fa-sack-dollar', color: 'text-amber-400' },
              { label: 'Active Hustlers', value: stats.activeVendors, icon: 'fa-users-gear', color: 'text-emerald-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 p-6 rounded-[2.5rem] shadow-xl">
                <div className={`w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center mb-4 ${stat.color} border border-white/5`}>
                  <i className={`fa-solid ${stat.icon}`}></i>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{stat.label}</p>
                <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-white font-black text-xs uppercase tracking-widest">Global Vendor Queue</h3>
              <span className="text-[9px] text-slate-500 font-black uppercase">Pending: {stats.pendingReviews}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-950 text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                    <th className="px-8 py-5">Business</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {promotions.map((p) => (
                    <tr key={p.id} className="hover:bg-emerald-500/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/5">
                            {p.shopImageUrl ? <img src={p.shopImageUrl} className="w-full h-full object-cover" /> : <i className="fa-solid fa-shop text-slate-600 text-sm"></i>}
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-white uppercase tracking-tight">{p.businessName}</p>
                            <p className="text-[8px] text-slate-500 font-bold uppercase">{p.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase ${
                          p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end space-x-2">
                          {p.status === 'pending' && (
                            <button onClick={() => onUpdateStatus(p.id, 'active')} className="w-8 h-8 bg-emerald-600 rounded-lg text-white hover:bg-emerald-500 transition-all flex items-center justify-center shadow-lg"><i className="fa-solid fa-check text-[10px]"></i></button>
                          )}
                          <button className="w-8 h-8 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center"><i className="fa-solid fa-eye text-[10px]"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
