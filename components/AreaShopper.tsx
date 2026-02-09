
import React, { useState } from 'react';
import { CartItem, Invoice } from '../types';

interface AreaShopperProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  invoice: Invoice | null;
}

const AreaShopper: React.FC<AreaShopperProps> = ({ cart, setCart, invoice }) => {
  const [address] = useState('VGC Estate, Lekki');
  const items = [
    { name: 'Omo Detergent 2kg', price: 2100, marketAvg: 2800, source: 'Wholesaler Alpha' },
    { name: 'Fresh Tomatoes', price: 12500, marketAvg: 16000, source: 'Mile 12 Direct' },
    { name: 'Indomie Chicken', price: 7400, marketAvg: 8500, source: 'MegaMart' },
    { name: 'Premium Rice 50kg', price: 42000, marketAvg: 48000, source: 'Bulk Importer' },
  ];

  const addToCart = (item: any) => {
    setCart(prev => [...prev, { id: `item-${Date.now()}`, name: item.name, price: item.price, quantity: 1 }]);
  };

  return (
    <div className="w-full space-y-10 py-4 animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Area Shopper</h2>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Neighborhood Arbitrage Engine</p>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 px-8 py-4 rounded-[2rem] flex items-center space-x-4 shadow-xl">
           <i className="fa-solid fa-location-dot text-emerald-500 text-lg"></i>
           <div>
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Your Estate</p>
              <p className="text-xs font-black text-white uppercase">{address}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
           {/* Invoice Display */}
           {invoice && (
             <div className="bg-amber-600/10 border-4 border-amber-500/50 rounded-[4rem] p-10 animate-in zoom-in-95 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] px-8 py-2 rounded-bl-[2rem] uppercase tracking-widest">Active Order</div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-8">Neural Invoice: {invoice.id}</h3>
                <div className="space-y-4 mb-10">
                   {invoice.items.map((item, i) => (
                     <div key={i} className="flex justify-between border-b border-white/5 pb-2 text-sm text-slate-300">
                        <span>{item.name} x{item.quantity}</span>
                        <span className="font-bold text-white">N{(item.price * item.quantity).toLocaleString()}</span>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] text-amber-400 font-black uppercase tracking-widest">Delivery Assigned</p>
                      <p className="text-lg font-black text-white uppercase italic">{invoice.deliveryRider}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Total Due</p>
                      <p className="text-4xl font-black text-white tracking-tighter">N{invoice.total.toLocaleString()}</p>
                   </div>
                </div>
                <button className="w-full mt-10 py-6 bg-amber-500 hover:bg-amber-400 rounded-[2.5rem] text-slate-950 font-black uppercase text-sm shadow-neural transition-all">
                  Complete Payment
                </button>
             </div>
           )}

           <div className="bg-slate-900/60 border border-slate-800 rounded-[4rem] p-10 shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-white font-black text-xs uppercase tracking-widest">Simi's Price Check</h3>
                 {cart.length > 0 && <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">{cart.length} Items in Cart</span>}
              </div>
              
              <div className="space-y-4">
                 {items.map((item, idx) => (
                   <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-8 bg-slate-950 rounded-[2.5rem] border border-white/5 group hover:border-emerald-500/30 transition-all gap-6">
                      <div className="flex items-center space-x-6 w-full md:w-auto">
                         <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-emerald-500 text-2xl shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <i className="fa-solid fa-cart-shopping"></i>
                         </div>
                         <div>
                            <p className="text-lg font-black text-white uppercase tracking-tight">{item.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Source: {item.source}</p>
                         </div>
                      </div>
                      <div className="flex items-center space-x-10 w-full md:w-auto justify-end">
                         <div className="text-right">
                            <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest mb-1">Simi's Price</p>
                            <p className="text-2xl font-black text-white tracking-tighter">N{item.price.toLocaleString()}</p>
                         </div>
                         <button onClick={() => addToCart(item)} className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all">
                            <i className="fa-solid fa-plus"></i>
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-emerald-950/20 border border-emerald-500/20 p-10 rounded-[4rem] shadow-xl relative overflow-hidden group">
              <p className="text-[10px] text-emerald-400 font-black uppercase mb-6 tracking-[0.2em]">Live Cart Status</p>
              {cart.length > 0 ? (
                <div className="space-y-4">
                   {cart.map((item, i) => (
                     <div key={i} className="flex justify-between text-xs text-slate-300">
                        <span>{item.name}</span>
                        <span className="text-white font-black">N{item.price.toLocaleString()}</span>
                     </div>
                   ))}
                   <div className="pt-4 border-t border-white/5 flex justify-between text-lg font-black text-white uppercase italic">
                      <span>Total</span>
                      <span>N{cart.reduce((a, b) => a + b.price, 0).toLocaleString()}</span>
                   </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">"Empty cart? Oya, tell me what you need, I go find am sharp-sharp!"</p>
              )}
           </div>

           <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[4rem] shadow-2xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center">
                 <i className="fa-solid fa-bicycle mr-3 text-amber-500"></i> Arealine Pulse
              </p>
              <div className="flex items-end space-x-4 mb-6">
                 <span className="text-6xl font-black text-white tracking-tighter">12m</span>
                 <div className="mb-2">
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest block leading-none">Fastest</span>
                    <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Delivery Near You</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AreaShopper;
