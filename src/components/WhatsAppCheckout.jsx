import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2 } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useAppStore } from '../store/useAppStore';

const WhatsAppCheckout = () => {
  const { cart, clearCart } = useAppStore();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Real number can be changed via VITE_WHATSAPP_NUMBER in .env
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '525556943312';

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = '¡Hola! Quisiera pedir lo siguiente:\n\n';
    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} — $${item.price.toLocaleString()} c/u\n`;
    });
    message += `\nCreo que serían como $${total.toLocaleString()} en total.\n\n`;
    message += '¿Me confirman si hay existencia y cómo puedo pagar? ¡Gracias!';

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
    clearCart();
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-[0_15px_40px_-20px_rgba(45,30,82,0.15)] border border-brand-beige/80 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-brand-verde-oscuro px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-brand-beige">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-brand-verde-claro" />
          </div>
          <div>
            <h2 className="font-collier font-bold tracking-tight text-base leading-none">Mi Pedido</h2>
          </div>
        </div>
        {cart.length > 0 && (
          <button 
            onClick={clearCart}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-brand-naranja/80 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            title="Vaciar carrito"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      
      {/* Body */}
      <div className="p-4 sm:p-5">
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-8 text-center flex flex-col items-center"
            >
              <ShoppingBag className="w-10 h-10 text-brand-beige mb-3" />
              <p className="text-brand-verde-oscuro/50 font-amsi text-sm">Tu carrito está esperando.</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <ul className="space-y-3 max-h-64 overflow-y-auto pr-1.5 custom-scrollbar">
                {cart.map(item => (
                  <motion.li 
                    layout 
                    key={item.id} 
                    className="flex justify-between items-center text-sm group"
                  >
                    <div className="flex bg-brand-crema rounded-xl p-2 w-full border border-transparent group-hover:border-brand-beige transition-colors">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-white mr-2.5 flex-shrink-0 shadow-sm">
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-brand-verde-oscuro font-bold font-collier text-[11px] leading-tight line-clamp-2">
                          {item.name}
                        </span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-brand-verde-oscuro/60 font-amsi">{item.quantity} pz</span>
                          <span className="font-black text-brand-verde-claro-oscuro font-collier text-[11px]">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
              
              <div className="border-t border-brand-beige/80 pt-4">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-collier font-bold text-brand-verde-oscuro/50 text-xs">Total</span>
                  <span className="text-2xl font-black text-brand-naranja font-collier tracking-tighter">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full btn-whatsapp py-3 shadow-md shadow-brand-verde-oscuro/20 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span className="font-bold font-collier text-sm">Pedir por WhatsApp</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WhatsAppCheckout;
