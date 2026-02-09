
import React, { useState } from 'react';
import { InventoryItem, WhatsAppStatus } from '../types';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

interface HustleHubProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const HustleHub: React.FC<HustleHubProps> = ({ inventory, setInventory }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'marketing' | 'whatsapp' | 'support' | 'promotions'>('inventory');
  const [productInfo, setProductInfo] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState('Pricing: Negotiable. Delivery: 24hrs in Lagos. Payment: Before Delivery.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [manifestedCampaign, setManifestedCampaign] = useState<{caption: string, tags: string[]} | null>(null);
  const [waStatuses, setWaStatuses] = useState<WhatsAppStatus[]>([]);

  const handleManifestHustle = async () => {
    if (!productInfo.trim()) return;
    setIsGenerating(true);
    try {
      const result = await gemini.generateSocialManifest(productInfo, "INSTAGRAM");
      setManifestedCampaign(result);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWAAutomation = async () => {
    if (!productInfo.trim()) return;
    setIsGenerating(true);
    try {
      const result = await gemini.generateWhatsAppManifest(productInfo);
      setWaStatuses(result.statuses.map((s, i) => ({ ...s, id: `wa-${i}` })));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-12 py-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Vendor Hub</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Neural Business Partner</p>
        </div>
        <div className="flex bg-slate-900/60 p-1.5 rounded-[1.5rem] border border-slate-800 backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
          {['inventory', 'marketing', 'whatsapp', 'support', 'promotions'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-3 rounded-2xl text-[9px] font-black tracking-widest transition-all uppercase whitespace-nowrap ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab === 'whatsapp' ? 'WA Auto' : tab === 'support' ? 'Auto-Reply' : tab === 'promotions' ? 'Vlog Tours' : tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-left-4">
           <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-950 border border-slate-800 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                 <h3 className="text-white font-black text-xs uppercase mb-8 flex items-center tracking-widest">
                    <i className="fa-solid fa-cloud-arrow-up mr-4 text-emerald-500"></i> Smart Upload
                 </h3>
                 <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mb-10 leading-relaxed italic">
                    "Snap your shop or list. I catalog everything automatic."
                 </p>
                 <div className="aspect-video bg-slate-900 border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center group-hover:border-emerald-500/50 transition-all cursor-pointer relative shadow-inner">
                    <i className="fa-solid fa-camera text-4xl text-slate-700 group-hover:text-emerald-500 transition-colors mb-6"></i>
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">Snap Shop Photos</span>
                 </div>
              </div>
           </div>
           <div className="lg:col-span-7 space-y-8">
              <div className="bg-slate-900/60 border border-slate-800 rounded-[4rem] p-12 shadow-2xl">
                 <h3 className="text-white font-black text-xs uppercase mb-10 flex items-center tracking-widest">
                    <i className="fa-solid fa-box-open mr-4 text-emerald-500"></i> Active Wares
                 </h3>
                 <div className="space-y-4">
                    {inventory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-8 bg-slate-950 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/30 transition-all">
                         <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-emerald-500 text-2xl shadow-inner">
                               <i className="fa-solid fa-tag"></i>
                            </div>
                            <div>
                               <p className="text-lg font-black text-white uppercase tracking-tight">{item.name}</p>
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Stock: {item.stock}</p>
                            </div>
                         </div>
                         <p className="text-2xl font-black text-white tracking-tighter">N{item.price.toLocaleString()}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'whatsapp' && (
        <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8">
          <div className="bg-slate-950 border border-[#25D366]/30 rounded-[5rem] p-12 shadow-2xl relative overflow-hidden">
            <h3 className="text-white font-black text-sm uppercase mb-10 flex items-center tracking-[0.3em]">
               <i className="fa-brands fa-whatsapp mr-4 text-[#25D366]"></i> WhatsApp Status Manifest
            </h3>
            <div className="space-y-8">
               <textarea 
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  placeholder="Tell me what you wan sell... (e.g. 'Fresh Ankara stocks from Abeokuta')"
                  className="w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 text-base text-white h-32 outline-none focus:border-[#25D366] transition-all resize-none shadow-inner italic"
               />
               <button 
                  onClick={handleWAAutomation}
                  disabled={isGenerating}
                  className="w-full py-6 bg-[#25D366] hover:bg-[#1fb355] rounded-[2.5rem] text-slate-950 font-black uppercase text-xs shadow-neural transition-all"
               >
                 {isGenerating ? 'Manifesting Statuses...' : 'Generate Viral Status Updates'}
               </button>

               {waStatuses.length > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 animate-in zoom-in-95">
                   {waStatuses.map(s => (
                     <div key={s.id} className="bg-slate-900 p-6 rounded-3xl border border-white/5 group hover:border-[#25D366]/40 transition-all">
                        <p className="text-emerald-50 text-sm font-medium italic mb-4">"{s.text}"</p>
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-black text-slate-500 uppercase">{s.type}</span>
                          <span className="text-xl">{s.emoji}</span>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8">
           <div className="bg-slate-950 border border-emerald-500/30 rounded-[5rem] p-12 shadow-2xl relative overflow-hidden">
              <h3 className="text-white font-black text-sm uppercase mb-10 flex items-center tracking-[0.3em]">
                 <i className="fa-solid fa-robot mr-4 text-emerald-500"></i> Auto-Reply Configuration
              </h3>
              <div className="space-y-8">
                 <div className="space-y-3">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-4">Business Knowledge Base</p>
                    <textarea 
                      value={knowledgeBase}
                      onChange={(e) => setKnowledgeBase(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 text-base text-white h-48 outline-none focus:border-emerald-500 transition-all resize-none shadow-inner italic"
                    />
                 </div>
                 <div className="flex items-center justify-between p-8 bg-slate-900 rounded-[2.5rem] border border-white/5">
                    <div>
                       <p className="text-white font-black text-xs uppercase tracking-widest">Toggle Smart Response</p>
                       <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Simi will auto-reply on WhatsApp & Site</p>
                    </div>
                    <div className="w-16 h-8 bg-emerald-600 rounded-full relative p-1 cursor-pointer">
                       <div className="w-6 h-6 bg-white rounded-full absolute right-1"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'marketing' && (
        <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8">
           <div className="bg-slate-950 border border-slate-800 rounded-[5rem] p-12 shadow-2xl relative overflow-hidden">
              <h3 className="text-white font-black text-sm uppercase mb-10 flex items-center tracking-[0.3em]">
                 <i className="fa-solid fa-wand-magic-sparkles mr-4 text-amber-500"></i> Viral Ad Manifest
              </h3>
              <div className="space-y-8">
                    <textarea 
                      value={productInfo}
                      onChange={(e) => setProductInfo(e.target.value)}
                      placeholder="e.g. 'Flash sale on all Adire Fabrics, 20% off today only!'"
                      className="w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 text-base text-white h-48 outline-none focus:border-emerald-500 transition-all resize-none shadow-inner leading-relaxed italic"
                    />
                 {manifestedCampaign ? (
                    <div className="bg-emerald-600/10 border border-emerald-500/20 p-10 rounded-[3rem] space-y-8 animate-in zoom-in-95 duration-500">
                       <p className="text-white text-lg font-medium italic leading-relaxed">"{manifestedCampaign.caption}"</p>
                       <div className="flex flex-wrap gap-3">
                          {manifestedCampaign.tags.map(tag => (
                            <span key={tag} className="px-5 py-2 bg-slate-950 border border-white/5 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-widest">{tag}</span>
                          ))}
                       </div>
                    </div>
                 ) : (
                    <button 
                      onClick={handleManifestHustle}
                      disabled={isGenerating}
                      className="w-full py-7 bg-emerald-600 hover:bg-emerald-500 rounded-[2.5rem] text-white font-black uppercase text-sm shadow-neural transition-all group"
                    >
                      {isGenerating ? 'Simi is Thinking Strategy...' : <>Manifest Neural Marketing <i className="fa-solid fa-bolt-lightning ml-3 group-hover:scale-125 transition-transform"></i></>}
                    </button>
                 )}
              </div>
           </div>
        </div>
      )}

      {activeTab === 'promotions' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Lekki Tech Hub Tour", location: "Lekki Phase 1", views: "4.2M", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600" },
                { title: "Aba Leather Connect", location: "Ariaria Market", views: "1.8M", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=600" },
                { title: "Yaba Hustle Vlog", location: "Yaba, Lagos", views: "850k", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=600" },
              ].map((tour, idx) => (
                <div key={idx} className="group bg-slate-950 border border-slate-800 rounded-[3rem] overflow-hidden hover:border-emerald-500/50 transition-all shadow-2xl relative">
                   <div className="aspect-[9/16] relative">
                      <img src={tour.img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                      <div className="absolute top-6 left-6 bg-red-600 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest">LIVE VLOG</div>
                      <div className="absolute bottom-10 left-8 right-8">
                         <h4 className="text-xl font-black text-white uppercase mb-2 leading-tight">{tour.title}</h4>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">
                            <i className="fa-solid fa-location-dot mr-2 text-emerald-500"></i> {tour.location}
                         </p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default HustleHub;
