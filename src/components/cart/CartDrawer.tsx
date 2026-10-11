import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPaiseToINR } from '../../utils/currency';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CheckoutModal } from '../modals/CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotalPaise,
    totalQuantity,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeCart();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        className="fixed inset-0 z-50 flex justify-end"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-forest-deep/60 backdrop-blur-sm transition-opacity duration-300 ease-out"
          onClick={closeCart}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          ref={drawerRef}
          className="relative w-full max-w-md bg-ivory h-full shadow-drawer flex flex-col z-10 transition-transform duration-300 ease-out animate-in slide-in-from-right"
        >
          {/* Header */}
          <div className="p-6 border-b border-forest/10 flex items-center justify-between bg-cream/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-forest" />
              <h2 className="font-serif text-2xl text-forest font-semibold">
                Shopping Bag
              </h2>
              <span className="text-xs font-sans text-olive ml-1">
                ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeCart}
              aria-label="Close shopping bag"
              className="p-2 text-forest/60 hover:text-forest transition-colors rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-forest/40 mb-4">
                  <ShoppingBag className="h-8 w-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal font-medium mb-2">
                  Your bag is empty
                </h3>
                <p className="text-xs sm:text-sm font-sans text-olive max-w-xs mb-6">
                  Experience the rich, golden character of our pure homemade buffalo-milk ghee.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="py-3 px-6 bg-forest text-ivory text-xs font-sans tracking-luxury uppercase font-medium hover:bg-forest-deep transition-colors"
                >
                  Discover Our Ghee
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-cream/40 border border-gold-antique/20"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-cream shrink-0 overflow-hidden border border-gold-antique/20">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-lg text-charcoal font-semibold leading-tight">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from bag`}
                            className="text-olive hover:text-red-700 p-1 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-[11px] font-sans text-olive mt-0.5">
                          {item.milkSource} · {item.unit}
                        </p>
                        <p className="text-xs font-sans text-charcoal/70 mt-1">
                          {formatPaiseToINR(item.unitPricePaise)} each
                        </p>
                      </div>

                      {/* Quantity & Row Total */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-forest/10">
                        <div className="flex items-center border border-forest/20 bg-ivory">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-1 sm:px-2 text-forest hover:bg-cream transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-sans font-semibold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-1 sm:px-2 text-forest hover:bg-cream transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="font-serif text-lg font-medium text-forest">
                          {formatPaiseToINR(item.unitPricePaise * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Honest Pricing Note */}
                <div className="p-3 bg-ivory border border-gold-antique/20 text-[11px] font-sans text-olive leading-relaxed">
                  Single product artisanal standard: 1 kg net jar priced at ₹1,000. Integer calculation ensures total accuracy.
                </div>
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-forest/10 bg-cream/30 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans text-olive">
                  <span>Standard Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-baseline justify-between pt-1 border-t border-forest/10">
                  <span className="font-serif text-lg text-charcoal font-semibold">
                    Subtotal:
                  </span>
                  <span className="font-serif text-2xl font-medium text-forest">
                    {formatPaiseToINR(subtotalPaise)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="w-full py-4 px-6 bg-forest text-ivory text-xs sm:text-sm font-sans tracking-luxury uppercase font-medium hover:bg-forest-deep transition-all flex items-center justify-center gap-2 group shadow-subtle-elevation cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] font-sans text-olive text-center">
                Review delivery details &amp; coverage with no hidden charges.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Honest Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
};
