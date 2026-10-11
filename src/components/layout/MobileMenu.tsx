import React, { useEffect, useRef } from 'react';
import { BRAND } from '../../config/brand';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { totalQuantity, openCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 lg:hidden flex flex-col"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-deep/60 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-sm bg-ivory h-full shadow-premium flex flex-col justify-between p-6 sm:p-8 z-10 transition-transform duration-300 ease-out animate-in slide-in-from-left"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-forest/10">
            <span className="font-serif text-2xl tracking-[0.2em] text-forest font-semibold">
              {BRAND.brandName}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 -mr-2 text-charcoal hover:text-forest transition-colors rounded-full"
            >
              <X className="h-6 w-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-8 flex flex-col space-y-6" aria-label="Mobile Navigation Links">
            {BRAND.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="font-serif text-2xl text-charcoal hover:text-forest transition-colors flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-forest/40 group-hover:text-forest group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </nav>
        </div>

        {/* Footer actions in menu */}
        <div className="pt-6 border-t border-forest/10 space-y-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              openCart();
            }}
            className="w-full py-3.5 px-4 bg-forest text-ivory text-xs font-sans tracking-luxury uppercase font-medium flex items-center justify-center gap-2 hover:bg-forest-deep transition-colors"
          >
            <span>View Shopping Bag</span>
            <span className="bg-gold-antique text-forest text-[11px] font-bold px-1.5 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          </button>
          <p className="text-[11px] font-sans text-olive text-center tracking-wide">
            {BRAND.product.subtitle} · ₹1,000 / kg
          </p>
        </div>
      </div>
    </div>
  );
};
