
import React, { useState, useEffect } from 'react';
import { AppMode, InventoryItem, CartItem, Invoice, VendorPromotion, WardrobeItem } from './types';
import SimiAvatar, { VisualState } from './components/SimiAvatar';
import LiveInterface from './components/LiveInterface';
import SimiTV from './components/SimiTV';
import SimiBusinessDashboard from './components/SimiBusinessDashboard';
import AreaShopper from './components/AreaShopper';
import SimiDirectory from './components/SimiDirectory';
import AdminPanel from './components/AdminPanel';
import { SIMI_WARDROBE } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.CHAT);
  const [visualState, setVisualState] = useState<VisualState>('broadcast');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [currentWardrobe, setCurrentWardrobe] = useState<WardrobeItem>(SIMI_WARDROBE[0]);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Premium Adire Fabric', price: 12500, stock: 15 },
    { id: '2', name: 'Neural Sisi Hoodie', price: 18000, stock: 8 },
  ]);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [promotions, setPromotions] = useState<VendorPromotion[]>([]);

  const handleCommand = (cmd: string, args: any) => {
    if (cmd === 'visual_state') setVisualState(args.state);
    if (cmd === 'navigate') {
      const targetMode = args.mode?.toUpperCase();
      if (targetMode === 'HUSTLE' || targetMode === 'BUSINESS') setMode(AppMode.BUSINESS);
      else if (Object.values(AppMode).includes(targetMode)) setMode(targetMode as AppMode);
    }
    
    if (cmd === 'add_to_cart') {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        name: args.name,
        price: args.price,
        quantity: args.quantity || 1
      };
      setCart(prev => [...prev, newItem]);
      setMode(AppMode.SHOPPER);
    }

    if (cmd === 'generate_invoice') {
      const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      setActiveInvoice({
        id: `INV-${Date.now()}`,
        items: [...cart],
        total: args.total || total,
        status: 'pending',
        deliveryRider: 'Arealine Rider #242'
      });
      setMode(AppMode.SHOPPER);
      setVisualState('celebrate');
    }

    if (cmd === 'update_inventory') {
      const newItem: InventoryItem = {
        id: `inv-${Date.now()}`,
        name: args.name,
        price: args.price,
        stock: args.stock || 10
      };
      setInventory(prev => [...prev, newItem]);
      setMode(AppMode.BUSINESS);
      setVisualState('strategy');
    }
  };

  const handleSetWardrobe = (item: WardrobeItem) => {
    setCurrentWardrobe(item);
    setAvatarImage(item.id === 'tv_host' ? 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800');
  };

  return (
    <div className="min-h-screen adire-overlay flex flex-col font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setMode(AppMode.CHAT)}>
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-neural rotate-3 group-hover:rotate-0 transition-transform">
            <span className="text-white font-black text-2xl italic">S</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black gold-gradient-text tracking-tighter leading-none uppercase">Simi International</h1>
            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em] mt-1">Neural Business Suite</p>
          </div>
        </div>
        
        <nav className="flex bg-slate-900/50 rounded-2xl p-1 border border-slate-800 backdrop-blur-sm overflow-x-auto no-scrollbar max-w-[75%]">
          {[AppMode.CHAT, AppMode.TV, AppMode.BUSINESS, AppMode.SHOPPER, AppMode.DIRECTORY, AppMode.ADMIN].map((m) => (
            <button 
              key={m} 
              onClick={() => setMode(m)} 
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all whitespace-nowrap uppercase ${mode === m ? 'bg-emerald-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {m === 'BUSINESS' ? 'Get on Simi' : m === 'SHOPPER' ? 'Area Shopper' : m === 'DIRECTORY' ? 'Global Directory' : m === 'ADMIN' ? 'Office' : m}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-12">
          <SimiAvatar 
            imageUrl={avatarImage || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'} 
            isGenerating={false} 
            isListening={isListening} 
            isSpeaking={isSpeaking} 
            visualState={visualState} 
          />
        </div>

        <div className="w-full flex-1">
          {mode === AppMode.CHAT && (
            <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8">
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                "Oya, Get on <br/><span className="gold-gradient-text">Simi Business!</span>"
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                Don't just upload products—join the grid. I handle your WhatsApp, Social Media, and Office Admin while you sleep. Ready to scale?
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => setMode(AppMode.BUSINESS)} 
                  className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-3xl text-white font-black uppercase text-xs shadow-neural transition-all"
                >
                  Enter Business Hub
                </button>
              </div>
            </div>
          )}
          {mode === AppMode.TV && <SimiTV />}
          {mode === AppMode.BUSINESS && (
            <SimiBusinessDashboard 
              inventory={inventory} 
              onCallSimi={() => {
                // Logic to trigger the mic/live interface with business context
                const micBtn = document.querySelector('button .fa-microphone')?.parentElement;
                if (micBtn) (micBtn as HTMLButtonElement).click();
              }}
            />
          )}
          {mode === AppMode.SHOPPER && <AreaShopper cart={cart} setCart={setCart} invoice={activeInvoice} />}
          {mode === AppMode.DIRECTORY && <SimiDirectory />}
          {mode === AppMode.ADMIN && (
            <AdminPanel 
              promotions={promotions} 
              onUpdateStatus={(id, s) => setPromotions(prev => prev.map(p => p.id === id ? {...p, status: s} : p))} 
              currentWardrobeId={currentWardrobe.id}
              onSetWardrobe={handleSetWardrobe}
            />
          )}
        </div>
      </main>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center">
        <LiveInterface 
          onStatusChange={(l, s) => { setIsListening(l); setIsSpeaking(s); }} 
          onTranscript={() => {}} 
          onCommand={handleCommand} 
        />
        <div className={`mt-4 px-6 py-2 rounded-full backdrop-blur-md border border-white/5 transition-all duration-500 ${isListening || isSpeaking ? 'opacity-100 bg-emerald-600/20' : 'opacity-40'}`}>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 whitespace-nowrap">
            {isListening ? 'Simi is Listening...' : isSpeaking ? 'Simi is Advising...' : 'Call Simi'}
          </p>
        </div>
      </div>

      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0 ${isListening ? 'opacity-30' : 'opacity-0'}`}>
         <div className="absolute inset-0 bg-emerald-500/10 adire-overlay animate-neural-pulse"></div>
      </div>
      
      <footer className="w-full py-6 px-8 flex justify-between items-center border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
         <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Sister Sync: Active</span>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Logistics: Arealine Bridge</span>
            </div>
         </div>
         <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">© 2025 Neural Sisi Media Group</p>
      </footer>
    </div>
  );
};

export default App;
