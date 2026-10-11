import React, { useState } from 'react';
import { BRAND } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';
import { Check, ShoppingBag } from 'lucide-react';

export const FinalPurchaseSection: React.FC = () => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    addToCart(1);
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    <section className="py-20 md:py-28 bg-forest-deep text-ivory relative overflow-hidden border-t border-gold-antique/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 bg-forest/40 p-8 sm:p-12 border border-gold-antique/30">
          
          {/* Left / Editorial */}
          <div className="max-w-lg text-center md:text-left">
            <span className="text-[11px] sm:text-xs font-sans tracking-luxury uppercase text-gold-antique font-semibold block mb-3">
              100% PURE BUFFALO MILK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-medium leading-tight mb-4">
              Bring Home Something Good.
            </h2>
            <p className="text-sm sm:text-base text-ivory/80 font-sans font-light leading-relaxed mb-6">
              Pure buffalo-milk ghee for the everyday moments that matter.
            </p>

            <div className="inline-flex items-center gap-3 py-1.5 px-3 bg-forest-deep/80 border border-gold-antique/20 text-xs font-sans text-ivory/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-rich" />
              <span>Artisanal Batch · 1 Kilogram Net Weight</span>
            </div>
          </div>

          {/* Right / Pricing & Direct Purchase */}
          <div className="w-full md:w-auto shrink-0 flex flex-col items-center md:items-end text-center md:text-right">
            <div className="mb-6">
              <span className="font-serif text-4xl sm:text-5xl font-medium text-ivory block">
                {formatINR(BRAND.product.priceINR)}
              </span>
              <span className="text-xs sm:text-sm font-sans text-ivory/70 tracking-subtle">
                per 1 kg jar
              </span>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className="w-full sm:w-auto min-w-[220px] py-4 px-8 bg-ivory text-forest text-xs sm:text-sm font-sans tracking-luxury uppercase font-semibold hover:bg-cream active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-premium cursor-pointer"
              aria-label={`Add 1 kg ${BRAND.product.name} to bag for ${formatINR(BRAND.product.priceINR)}`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 text-forest stroke-[2.5]" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 text-forest" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
            <p className="text-[11px] font-sans text-ivory/60 mt-2">
              No artificial preservatives · Honest single price
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
