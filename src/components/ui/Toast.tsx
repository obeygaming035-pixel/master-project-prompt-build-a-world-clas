import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Check, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useCart();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-forest-deep text-ivory px-4 py-3 rounded-none border border-gold-antique/40 shadow-premium transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-antique/20 text-gold-rich">
        <Check className="h-3 w-3 stroke-[2.5]" />
      </div>
      <p className="text-xs md:text-sm font-sans tracking-wide text-ivory/95">{toastMessage}</p>
      <button
        type="button"
        onClick={clearToast}
        aria-label="Dismiss notification"
        className="ml-2 text-ivory/60 hover:text-ivory transition-colors p-1"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
