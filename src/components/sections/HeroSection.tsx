import React, { useState } from 'react';
import { BRAND } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';
import { Plus, Check, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(1);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <section className="relative w-full pt-4 pb-16 md:pt-8 md:pb-24 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Editorial Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            {/* Small Editorial Label */}
            <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
              <span className="w-6 h-[1px] bg-gold-antique" />
              <span className="text-[11px] sm:text-xs font-sans tracking-luxury uppercase text-olive font-semibold">
                THE ART OF GOOD GHEE
              </span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] text-charcoal font-medium tracking-tight mb-5 sm:mb-7">
              Golden Goodness.{' '}
              <span className="italic font-normal block sm:inline">Rooted in Tradition.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-charcoal/80 font-sans font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              {BRAND.product.description}
            </p>

            {/* Pricing & Purchase Panel */}
            <div className="bg-cream/50 border border-gold-antique/25 p-5 sm:p-6 mb-8 max-w-lg transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4 pb-4 border-b border-forest/10">
                <div>
                  <span className="text-[11px] font-sans tracking-subtle uppercase text-olive block mb-0.5">
                    Artisanal Batch
                  </span>
                  <span className="font-serif text-xl text-forest font-semibold">
                    {BRAND.product.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-medium text-forest">
                    {formatINR(BRAND.product.priceINR)}
                  </span>
                  <span className="text-xs sm:text-sm font-sans text-olive">
                    per {BRAND.product.unit}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdding}
                  className="flex-1 py-3.5 px-6 bg-forest text-ivory text-xs sm:text-sm font-sans tracking-luxury uppercase font-medium hover:bg-forest-deep active:scale-[0.99] transition-all flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
                  aria-label={`Add 1 kg of ${BRAND.product.name} to bag for ${formatINR(BRAND.product.priceINR)}`}
                >
                  {isAdding ? (
                    <>
                      <Check className="h-4 w-4 text-gold-rich stroke-[2.5]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 text-gold-rich group-hover:rotate-90 transition-transform duration-200" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <a
                  href="#product-showcase"
                  className="py-3.5 px-5 border border-forest/20 text-forest text-xs sm:text-sm font-sans tracking-subtle uppercase font-medium hover:bg-forest/5 hover:border-forest/40 transition-colors text-center"
                >
                  Discover Our Ghee
                </a>
              </div>
            </div>

            {/* Subtle Editorial Product Note */}
            <div className="flex items-center gap-4 text-xs font-sans text-olive/90">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-antique" />
              <span>100% Homemade Buffalo Milk · ₹1,000 / kg · Honest Packaging</span>
            </div>
          </div>

          {/* Product Photography Column */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative group">
              {/* Outer decorative subtle framing */}
              <div className="relative overflow-hidden bg-cream shadow-premium border border-gold-antique/20">
                <img
                  src={BRAND.product.images.hero}
                  alt="A beautifully crafted glass jar of golden homemade buffalo-milk ghee with a traditional brass spoon resting beside it in warm morning sunlight"
                  className="w-full h-[300px] sm:h-[440px] lg:h-[580px] object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  fetchPriority="high"
                  loading="eager"
                  width="800"
                  height="900"
                />
                
                {/* Subtle photography corner badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-forest-deep/85 backdrop-blur-sm text-ivory px-3 py-1.5 border border-gold-antique/30">
                  <p className="text-[10px] sm:text-xs font-sans tracking-luxury uppercase text-ivory/90">
                    Artisanal Reserve · 1 kg
                  </p>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="hidden sm:block absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold-antique/40 pointer-events-none" />
              <div className="hidden sm:block absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-gold-antique/40 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Subtle scroll down indicator */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="#trust-strip"
            className="group flex flex-col items-center gap-1.5 text-olive/60 hover:text-forest transition-colors"
            aria-label="Scroll down to trust strip"
          >
            <span className="text-[10px] font-sans tracking-luxury uppercase">Scroll</span>
            <ArrowDown className="h-3.5 w-3.5 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
