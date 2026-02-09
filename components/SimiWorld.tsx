
import React, { useState, useRef } from 'react';
import { VendorPromotion, FeaturedEpisode } from '../types';
import { GeminiService } from '../services/geminiService';

interface SimiWorldProps {
  avatarUrl: string | null;
  promotions: VendorPromotion[];
  featuredEpisodes: FeaturedEpisode[];
  onAddPromotion: (promo: VendorPromotion) => void;
  onOpenKeySelector: () => void;
}

const gemini = new GeminiService();

const SimiWorld: React.FC<SimiWorldProps> = ({ avatarUrl, promotions, featuredEpisodes, onAddPromotion, onOpenKeySelector }) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'dashboard'>('directory');
  const [selectedSpecial, setSelectedSpecial] = useState<FeaturedEpisode | null>(null);
  const [form, setForm] = useState({
    businessName: '',
    location: '',
    category: 'Retail',
  });
  const [shopImage, setShopImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adCopy, setAdCopy] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setShopImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePromoteHustle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.location) return;

    setIsSubmitting(true);
    try {
      // Fix: Removed 'impressions', 'leads', and 'revenue' as they do not exist in the VendorPromotion type.
      const newPromo: VendorPromotion = {
        id: `promo-${Date.now()}`,
        businessName: form.businessName,
        location: form.location,
        category: form.category,
        shopImageUrl: shopImage,
        vendorVideoUrl: null,
        promoVideoUrl: null,
        timestamp: new Date(),
        status: 'pending',
        onboardingStatus: 'completed',
        views: 0
      };

      onAddPromotion(newPromo);
      setForm({ businessName: '', location: '', category: 'Retail' });
      setShopImage(null);
      setActiveTab('dashboard');
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAdCopy = async (bizName: string) => {
    setAdCopy("Simi is writing your street-smart copy...");
    setTimeout(() => {
      setAdCopy(`"Omo, see better levels! 🔥 Simi just land for ${bizName} and the energy be different! If you never visit, you dey dull yourself. Check them out sharp-sharp! #NeuralHustle #SimiApproved"`);
    }, 1500);
  };

  return (
    <div className="w-full space-y-8 py-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">SIMI'S WORLD</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Global Directory & Vendor Portal</p>
        </div>
        <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('directory')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'directory' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            GLOBAL DIRECTORY
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            MY HUSTLE PORTAL
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        <div className="space-y-12">
          {/* Section: TV Specials */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3 animate-pulse"></span>
                SIMI TV: Featured Specials
              </h3>
              <div className="flex space-x-2">
                 <button className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-colors"><i className="fa-solid fa-chevron-left text-[10px]"></i></button>
                 <button className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-colors"><i className="fa-solid fa-chevron-right text-[10px]"></i></button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEpisodes.map((special) => (
                <div key={special.id} className="group relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 cursor-pointer shadow-2xl hover:border-emerald-500/50 transition-all">
                  <img src={special.thumbnailUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" alt={special.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 bg-emerald-600 px-3 py-1 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">{special.theme}</div>
                  <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-lg text-[8px] font-black text-white uppercase tracking-widest border border-white/10">{special.duration}</div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white font-black text-base uppercase leading-tight mb-2 group-hover:text-emerald-400 transition-colors">{special.title}</h4>
                    <div className="flex items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      <i className="fa-solid fa-eye mr-2 text-emerald-500"></i> {special.views.toLocaleString()} Neural Views
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-emerald-600/90 rounded-full flex items-center justify-center text-white text-2xl shadow-neural">
                      <i className="fa-solid fa-play ml-1"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Main Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar: Hustle Booster */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/80 border border-emerald-900/40 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>
                <h3 className="text-white font-black text-[10px] uppercase mb-8 flex items-center tracking-widest">
                  <span className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center mr-4 border border-emerald-500/30">
                    <i className="fa-solid fa-rocket text-emerald-400"></i>
                  </span>
                  Add Your Hustle
                </h3>
                <form onSubmit={handlePromoteHustle} className="space-y-4">
                  <input type="text" value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} placeholder="Business Name" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-[11px] text-slate-100 outline-none focus:border-emerald-500" />
                  <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Location" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-[11px] text-slate-100 outline-none focus:border-emerald-500" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className={`w-full py-4 rounded-2xl border flex items-center justify-center transition-all ${shopImage ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 bg-slate-950 text-slate-500'}`}>
                    <i className={`fa-solid ${shopImage ? 'fa-check-circle' : 'fa-camera-retro'} mr-2`}></i>
                    <span className="text-[10px] font-black uppercase tracking-widest">Shop Photo</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                  <button type="submit" disabled={isSubmitting || !avatarUrl} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-white font-black uppercase text-[10px] shadow-neural transition-all">
                    {isSubmitting ? 'Processing...' : 'Manifest Global Vlog'}
                  </button>
                </form>
              </div>

              <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-6">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Trending Tags</p>
                 <div className="flex flex-wrap gap-2">
                    {['#LagosTech', '#YabaHustle', '#AIGrow', '#SimiApproved'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-black/40 rounded-full border border-white/5 text-[9px] font-bold text-slate-400">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>
            </div>

            {/* Main Content: Promotion Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-white font-black text-xs uppercase tracking-widest">Global Marketplace</h3>
                 <div className="flex items-center space-x-4">
                    <select className="bg-slate-900 border border-slate-800 text-[9px] font-black text-slate-400 px-3 py-1.5 rounded-xl outline-none">
                      <option>All Categories</option>
                      <option>Retail</option>
                      <option>Tech</option>
                    </select>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {promotions.filter(p => p.status === 'active' || p.status === 'pending').map((promo) => (
                  <div key={promo.id} className="bg-slate-900/60 border border-slate-800/60 rounded-[2.5rem] overflow-hidden group hover:border-emerald-500/40 transition-all shadow-xl">
                    <div className="aspect-video bg-slate-950 relative overflow-hidden">
                      {promo.promoVideoUrl ? (
                        <video src={promo.promoVideoUrl} className="w-full h-full object-cover" controls />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-emerald-950/5">
                          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">Neural Render in Progress</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center space-x-2">
                        <i className="fa-solid fa-chart-line text-emerald-500 text-[10px]"></i>
                        <span className="text-[9px] text-white font-black uppercase tracking-widest">{promo.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-white font-black text-base uppercase mb-1 tracking-tight group-hover:text-emerald-400 transition-colors">{promo.businessName}</h4>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                            <i className="fa-solid fa-location-dot mr-2 text-emerald-500"></i> {promo.location}
                          </p>
                        </div>
                        <span className="bg-slate-800/80 text-slate-400 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{promo.category}</span>
                      </div>
                      <button className="w-full py-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-[9px] font-black text-slate-400 hover:text-emerald-400 uppercase tracking-widest transition-all">
                        View Hustle Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          {/* Vendor Dashboard Mode - Previously Refined */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 blur-2xl"></div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Neural Reach</p>
               <div className="flex items-end space-x-3 mb-2">
                 <span className="text-5xl font-black text-white tracking-tighter">4.8k</span>
                 <span className="text-emerald-500 text-xs font-bold mb-2"><i className="fa-solid fa-arrow-trend-up mr-1"></i>+12%</span>
               </div>
               <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">Total Hustle Impressions</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 blur-2xl"></div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Lead Velocity</p>
               <div className="flex items-end space-x-3 mb-2">
                 <span className="text-5xl font-black text-amber-500 tracking-tighter">284</span>
                 <span className="text-amber-500 text-xs font-bold mb-2"><i className="fa-solid fa-bolt-lightning mr-1"></i>Peak</span>
               </div>
               <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">Active WhatsApp Clicks</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Sister Sync Status</p>
               <div className="flex items-center space-x-4">
                 <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                    <i className="fa-solid fa-link text-emerald-400 text-xl"></i>
                 </div>
                 <div>
                   <span className="text-2xl font-black text-white uppercase tracking-tight leading-none block">Linked</span>
                   <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mt-1">AreaGPT Enterprise</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
               <div className="relative z-10">
                 <h3 className="text-white font-black text-sm uppercase mb-8 flex items-center tracking-widest">
                   <i className="fa-solid fa-wand-magic-sparkles mr-4 text-amber-500 text-lg"></i> Simi's Ad-Copy Engine
                 </h3>
                 <div className="space-y-6">
                   <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-widest">Generate street-smart captions based on your neural manifest.</p>
                   {adCopy ? (
                     <div className="bg-slate-900/50 border border-emerald-500/30 p-8 rounded-3xl relative group/copy shadow-inner">
                       <p className="text-emerald-100 text-sm italic font-medium leading-relaxed">"{adCopy}"</p>
                       <button 
                        onClick={() => {
                          navigator.clipboard.writeText(adCopy);
                        }}
                        className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 p-2.5 rounded-xl text-white opacity-0 group-hover/copy:opacity-100 transition-all shadow-neural"
                       >
                         <i className="fa-solid fa-copy text-xs"></i>
                       </button>
                     </div>
                   ) : (
                     <button 
                      onClick={() => generateAdCopy(promotions[0]?.businessName || "Your Hustle")}
                      className="w-full py-5 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl text-[10px] font-black text-slate-400 hover:text-emerald-400 uppercase tracking-widest transition-all shadow-xl"
                     >
                       Manifest New Campaign Copy
                     </button>
                   )}
                 </div>
               </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-10 overflow-hidden relative">
               <h3 className="text-white font-black text-sm uppercase mb-8 flex items-center tracking-widest">
                 <i className="fa-solid fa-earth-africa mr-4 text-emerald-500 text-lg"></i> Impression Heatmap
               </h3>
               <div className="aspect-[16/10] bg-slate-900 rounded-[2rem] relative overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center group">
                  <div className="absolute inset-0 opacity-10 adire-overlay"></div>
                  <div className="relative text-center scale-110 group-hover:scale-125 transition-transform duration-[3000ms]">
                     <div className="w-24 h-24 bg-emerald-500/10 rounded-full animate-ping absolute -top-8 -left-8"></div>
                     <div className="w-10 h-10 bg-emerald-500 rounded-full shadow-[0_0_30px_rgba(16,185,129,1)] relative z-10 border-4 border-white/20"></div>
                     <p className="text-[10px] font-black text-white uppercase mt-6 tracking-[0.3em]">Neural Hub</p>
                     <p className="text-[8px] text-emerald-500 font-bold uppercase mt-1 tracking-widest">Lagos, NG</p>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                    <div className="bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-xl">
                       <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Global Reach</p>
                       <p className="text-[11px] text-white font-black">14 Nations</p>
                    </div>
                    <div className="bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-xl">
                       <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Impact Level</p>
                       <p className="text-[11px] text-emerald-400 font-black">TOP 5%</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimiWorld;
