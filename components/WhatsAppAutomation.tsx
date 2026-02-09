
import React, { useState } from 'react';
import { WhatsAppStatus } from '../types';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

const WhatsAppAutomation: React.FC = () => {
  const [productInfo, setProductInfo] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState('Pricing: N25,000. Delivery: Same day in Lagos (N3,000), 2-3 days outside. Policy: No returns unless damaged.');
  const [statuses, setStatuses] = useState<WhatsAppStatus[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'manifest' | 'support' | 'contacts'>('manifest');

  // Support Chat simulation
  const [mockQueries, setMockQueries] = useState([
    { id: '1', user: 'How much for the Adire?', reply: '', isGenerating: false },
    { id: '2', user: 'Do you deliver to Abuja?', reply: '', isGenerating: false },
    { id: '3', user: 'Is it original from Abeokuta?', reply: '', isGenerating: false },
  ]);

  const handleGenerateManifest = async () => {
    if (!productInfo.trim()) return;
    setIsGenerating(true);
    try {
      const result = await gemini.generateWhatsAppManifest(productInfo);
      const mapped = result.statuses.map((s, i) => ({ ...s, id: `wa-${Date.now()}-${i}` } as WhatsAppStatus));
      setStatuses(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateReply = async (queryId: string) => {
    const query = mockQueries.find(q => q.id === queryId);
    if (!query) return;

    setMockQueries(prev => prev.map(q => q.id === queryId ? { ...q, isGenerating: true } : q));
    const reply = await gemini.generateAutoReply(knowledgeBase, query.user);
    setMockQueries(prev => prev.map(q => q.id === queryId ? { ...q, reply, isGenerating: false } : q));
  };

  const handlePushToStatuses = () => {
    setIsPushing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsPushing(false);
          return 100;
        }
        return p + 5;
      });
    }, 150);
  };

  return (
    <div className="w-full space-y-8 py-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">WHATSAPP HUSTLE</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Bulk Business Automation</p>
        </div>
        <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
          {['manifest', 'support', 'contacts'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase ${activeTab === tab ? 'bg-[#25D366] text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab === 'manifest' ? 'STATUS' : tab === 'support' ? 'AUTO-REPLY' : tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'manifest' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-left-4">
          {/* Left: Input & Strategy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 border border-[#128C7E]/30 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 blur-[60px] -mr-16 -mt-16"></div>
              <h3 className="text-white font-black text-xs uppercase mb-6 flex items-center tracking-widest">
                <i className="fa-solid fa-bolt-lightning mr-4 text-[#25D366]"></i> Hustle Engine
              </h3>
              <div className="space-y-4">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Product / Service Gist</p>
                <textarea 
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  placeholder="What are we selling today? (e.g., 'Fresh Adire fabrics from Abeokuta, 10 pieces left')"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-white h-40 outline-none focus:border-[#25D366] transition-all resize-none shadow-inner"
                />
                <button 
                  onClick={handleGenerateManifest}
                  disabled={isGenerating || !productInfo.trim()}
                  className="w-full py-5 bg-[#25D366] hover:bg-[#1fb355] rounded-2xl text-slate-950 font-black uppercase text-[10px] shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center"
                >
                  {isGenerating ? (
                    <><i className="fa-solid fa-circle-notch animate-spin mr-3"></i> Manifesting...</>
                  ) : (
                    <>Manifest Neural Statuses <i className="fa-solid fa-wand-magic-sparkles ml-3"></i></>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Preview & Execution */}
          <div className="lg:col-span-7">
            {statuses.length > 0 ? (
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {statuses.map((status, idx) => (
                      <div key={status.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group hover:border-[#25D366]/40 transition-all">
                         <div className="absolute top-0 right-0 p-3"><span className="text-[10px] font-black text-slate-700">#{idx + 1}</span></div>
                         <p className="text-white text-xs leading-relaxed font-medium mb-4 italic">"{status.text}"</p>
                         <div className="flex justify-between items-center"><span className="text-[8px] font-black text-slate-500 uppercase">{status.type}</span><span className="text-xl">{status.emoji}</span></div>
                      </div>
                    ))}
                 </div>
                 <button onClick={handlePushToStatuses} className="w-full py-5 bg-slate-950 border border-[#25D366] hover:bg-[#25D366] hover:text-slate-950 rounded-2xl text-[#25D366] font-black uppercase text-[10px] transition-all group">
                   {isPushing ? `Pushing... ${progress}%` : <>Push Bulk Statuses <i className="fa-solid fa-paper-plane ml-3 group-hover:translate-x-1 transition-transform"></i></>}
                 </button>
              </div>
            ) : (
              <div className="h-[400px] border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-700">
                 <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-2">Automation Idle</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4">
           {/* Left: Knowledge Base */}
           <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-950 border border-[#128C7E]/30 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <h3 className="text-white font-black text-xs uppercase mb-6 flex items-center tracking-widest">
                 <i className="fa-solid fa-brain mr-4 text-[#25D366]"></i> Neural Knowledge
               </h3>
               <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Business Rules & Info</p>
               <textarea 
                 value={knowledgeBase}
                 onChange={(e) => setKnowledgeBase(e.target.value)}
                 className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-white h-60 outline-none focus:border-[#25D366] transition-all resize-none shadow-inner leading-relaxed"
                 placeholder="Enter pricing, delivery, and common business rules here..."
               />
               <p className="mt-4 text-[8px] text-slate-600 font-black uppercase tracking-widest">Simi uses this info to reply to customers.</p>
             </div>
           </div>

           {/* Right: Simulation */}
           <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 overflow-hidden relative shadow-2xl">
                 <h3 className="text-white font-black text-xs uppercase mb-10 flex items-center tracking-widest">
                   <i className="fa-solid fa-comments mr-4 text-[#25D366]"></i> Support Simulation
                 </h3>
                 
                 <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                    {mockQueries.map((item) => (
                      <div key={item.id} className="space-y-4">
                         {/* Customer Message */}
                         <div className="flex justify-start">
                            <div className="bg-slate-800 rounded-2xl rounded-tl-none p-5 max-w-[80%] shadow-lg border border-slate-700/50">
                               <p className="text-[11px] text-slate-300 font-medium">"{item.user}"</p>
                               <span className="text-[8px] text-slate-500 font-black uppercase block mt-2">Customer Inquiry</span>
                            </div>
                         </div>

                         {/* Simi Reply */}
                         <div className="flex justify-end">
                            <div className={`relative bg-[#075E54]/40 border-l-4 border-[#25D366] rounded-2xl rounded-tr-none p-5 max-w-[85%] shadow-xl transition-all ${item.isGenerating ? 'animate-pulse opacity-50' : ''}`}>
                               {item.isGenerating ? (
                                 <div className="flex items-center space-x-3 text-[#25D366]">
                                    <i className="fa-solid fa-circle-notch animate-spin text-[10px]"></i>
                                    <span className="text-[9px] font-black uppercase tracking-widest">Neural Typing...</span>
                                 </div>
                               ) : item.reply ? (
                                 <>
                                   <p className="text-[12px] text-emerald-50 italic font-medium leading-relaxed">"{item.reply}"</p>
                                   <span className="text-[8px] text-[#25D366] font-black uppercase block mt-3">Simi Neural Auto-Reply</span>
                                 </>
                               ) : (
                                 <button 
                                  onClick={() => handleGenerateReply(item.id)}
                                  className="text-[10px] font-black text-[#25D366] hover:text-white uppercase tracking-widest transition-all"
                                 >
                                   <i className="fa-solid fa-robot mr-2"></i> Generate Smart Reply
                                 </button>
                               )}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-10 animate-in fade-in zoom-in-95 duration-500">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-white font-black text-xs uppercase tracking-widest">Neural Audience Segment</h3>
              <div className="bg-slate-900 px-4 py-2 rounded-xl text-[10px] font-black text-[#25D366] uppercase">842 Active Contacts</div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Loyal Hustlers', count: 124, vibe: 'High Conversion', color: 'border-emerald-500' },
                { label: 'Window Shoppers', count: 542, vibe: 'Needs Nudge', color: 'border-amber-500' },
                { label: 'New Cold Leads', count: 176, vibe: 'Needs Warmth', color: 'border-blue-500' },
              ].map((segment) => (
                <div key={segment.label} className={`bg-slate-900/40 border-l-4 ${segment.color} p-8 rounded-2xl relative overflow-hidden group`}>
                   <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors"></div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{segment.label}</p>
                   <h4 className="text-3xl font-black text-white mb-4">{segment.count}</h4>
                   <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-tighter">{segment.vibe}</span>
                      <button className="text-[9px] font-black text-white hover:underline underline-offset-4">ANALYZE</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppAutomation;
