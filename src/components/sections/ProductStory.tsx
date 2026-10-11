import React from 'react';
import { BRAND } from '../../config/brand';

export const ProductStory: React.FC = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 w-full bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Large Editorial Photograph */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="overflow-hidden bg-cream shadow-subtle-elevation border border-gold-antique/20">
                <img
                  src={BRAND.product.images.ritualPour}
                  alt="Golden homemade buffalo-milk ghee gently poured from a brass spoon into a warm cooking pot"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[560px] object-cover object-center transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  width="700"
                  height="560"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-forest text-ivory px-5 py-3 border border-gold-antique/40 hidden sm:block">
                <p className="font-serif italic text-base sm:text-lg tracking-wide">
                  100% Buffalo Milk
                </p>
              </div>
            </div>
          </div>

          {/* Narrow Text Column with Editorial Asymmetry */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="max-w-md">
              <span className="text-[11px] sm:text-xs font-sans tracking-luxury uppercase text-olive block mb-3 font-semibold">
                THE KITCHEN ESSENTIAL
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium leading-[1.15] mb-6">
                Made to Bring More to the Table.
              </h2>

              <div className="w-12 h-[1px] bg-gold-antique mb-6" />

              <p className="text-base sm:text-lg text-charcoal/80 font-sans font-light leading-relaxed mb-6">
                {BRAND.product.editorialStory}
              </p>

              <p className="text-sm sm:text-base text-olive font-sans font-light leading-relaxed mb-8">
                Prepared with care from whole buffalo milk, our ghee carries a distinctive richness and velvety texture that complements hot rotis, hearty lentils, and fragrant rice dishes with quiet comfort.
              </p>

              {/* Editorial footnote */}
              <div className="border-l-2 border-gold-antique/50 pl-4 py-1">
                <p className="text-xs font-sans text-charcoal/70 tracking-wide">
                  Single product focus · Pure homemade recipe · ₹1,000 / 1 kg
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
