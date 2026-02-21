
import React from 'react';
import type { CartItem } from '../types/types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + (item.finalPrice || item.basePrice) * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/80 dark:bg-brand-bg/90 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-brand-bg shadow-2xl flex flex-col border-l border-brand-muted transition-colors duration-300">
          <div className="px-8 py-10 border-b border-brand-muted flex items-center justify-between bg-brand-bg">
            <div>
              <h2 className="text-xl font-brand font-bold text-slate-900 dark:text-white uppercase tracking-widest">Carrinho</h2>
              <p className="text-[10px] text-brand-gold uppercase tracking-[0.2em] mt-1">{items.length} Itens Selecionados</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-brand-gold transition-colors">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          <div className="flex-1 py-8 overflow-y-auto px-8 hide-scrollbar bg-brand-bg">
            {items.length === 0 ? (
              <div className="text-center py-24">
                <i className="fa-solid fa-clock-rotate-left text-5xl text-brand-muted mb-6"></i>
                <p className="text-slate-500 uppercase tracking-widest text-[11px] font-bold">Nenhum clone na sua bag.</p>
                <button onClick={onClose} className="mt-8 text-[11px] font-bold text-brand-gold underline uppercase tracking-widest">Explorar Coleção</button>
              </div>
            ) : (
              <ul className="space-y-10">
                {items.map((item) => (
                  <li key={`${item.id}-${item.selectedFactory}`} className="flex animate-in slide-in-from-right-4 duration-300">
                    <div className="h-28 w-24 flex-shrink-0 overflow-hidden border border-brand-muted bg-slate-100 dark:bg-slate-900 rounded-sm">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col justify-center">
                      <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <h3 className="text-slate-900 dark:text-white">{item.brand}</h3>
                          <p className="text-brand-gold">R$ {(item.finalPrice * item.quantity).toLocaleString('pt-BR')}</p>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">{item.name}</p>
                        {item.selectedFactory && (
                          <span className="inline-block mt-2 bg-brand-muted text-[9px] font-bold text-brand-gold px-2 py-0.5 uppercase tracking-widest">
                            Fábrica: {item.selectedFactory}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-[10px]">
                        <p className="text-slate-500 uppercase tracking-widest">QTD {item.quantity}</p>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="font-bold text-brand-gold hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-brand-muted px-8 py-10 bg-brand-bg/50">
            <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest">
              <p>Subtotal</p>
              <p className="text-brand-gold">R$ {total.toLocaleString('pt-BR')}</p>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-500 uppercase tracking-[0.15em] mb-10 text-center">Frete Expresso Grátis Incluso</p>
            <button className="w-full bg-brand-gold text-brand-bg py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all shadow-2xl">
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
