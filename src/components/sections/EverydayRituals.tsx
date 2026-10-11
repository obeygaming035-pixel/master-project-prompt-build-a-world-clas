import React from 'react';
import { BRAND } from '../../config/brand';

export const EverydayRituals: React.FC = () => {
  return (
    <section
      id="everyday-rituals"
      className="py-20 md:py-28 lg:py-32 w-full bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-sans tracking-luxury uppercase text-olive block mb-3 font-semibold">
            EVERYDAY CULINARY RITUALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium leading-[1.15] mb-4">
            A Little Golden Goodness, Every Day.
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-sans font-light leading-relaxed">
            Bring a rich, familiar touch to rotis, dals, khichdi, and the dishes your family loves.
          </p>
        </div>

        {/* Refined Editorial Grid: 1 large photograph + 2 supporting photographs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Large Editorial Feature: Fresh Roti with Melting Ghee */}
          <div className="lg:col-span-7 group">
            <div className="relative overflow-hidden bg-cream border border-gold-antique/20 shadow-subtle-elevation">
              <img
                src={BRAND.product.images.ritualRoti}
                alt="A steaming hot Indian phulka roti with a generous dollop of golden buffalo-milk ghee melting across the surface"
                className="w-full h-[380px] sm:h-[460px] lg:h-[520px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width="720"
                height="520"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-forest-deep/90 via-forest-deep/60 to-transparent text-ivory">
                <span className="text-[10px] sm:text-xs font-sans tracking-luxury uppercase text-gold-rich block mb-1">
                  The Daily Phulka
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium">
                  A Spoonful Over Freshly Puffed Roti
                </h3>
                <p className="text-xs sm:text-sm font-sans text-ivory/85 font-light mt-1 max-w-lg">
                  Melts instantly into the warm crumb, imparting a distinctive domestic richness that defines everyday Indian home dining.
                </p>
              </div>
            </div>
          </div>

          {/* Two Supporting Side Features */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            
            {/* Supporting 1: Dal & Khichdi */}
            <div className="group">
              <div className="relative overflow-hidden bg-cream border border-gold-antique/20 shadow-subtle-elevation">
                <img
                  src={BRAND.product.images.ritualDal}
                  alt="A comforting bowl of warm Indian dal and khichdi with a swirl of rich golden buffalo ghee"
                  className="w-full h-[220px] sm:h-[240px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width="480"
                  height="240"
                />
              </div>
              <div className="pt-3">
                <span className="text-[11px] font-sans tracking-luxury uppercase text-olive font-semibold block mb-0.5">
                  Comfort Food
                </span>
                <h4 className="font-serif text-lg text-charcoal font-semibold">
                  Swirled Over Warm Dal &amp; Khichdi
                </h4>
                <p className="text-xs font-sans text-charcoal/70 font-light mt-1">
                  Releases an earthy aroma that elevates everyday lentils into a soothing, deeply satisfying bowl.
                </p>
              </div>
            </div>

            {/* Supporting 2: Slow Gentle Drizzle */}
            <div className="group">
              <div className="relative overflow-hidden bg-cream border border-gold-antique/20 shadow-subtle-elevation">
                <img
                  src={BRAND.product.images.ritualPour}
                  alt="Golden buffalo ghee being gently drizzled from a brass spoon into a warm cooking pot"
                  className="w-full h-[220px] sm:h-[240px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width="480"
                  height="240"
                />
              </div>
              <div className="pt-3">
                <span className="text-[11px] font-sans tracking-luxury uppercase text-olive font-semibold block mb-0.5">
                  Traditional Cooking
                </span>
                <h4 className="font-serif text-lg text-charcoal font-semibold">
                  A Gentle Spoon in Slow Preparations
                </h4>
                <p className="text-xs font-sans text-charcoal/70 font-light mt-1">
                  High heat tolerance and rich mouthfeel suited for simmering tadkas and festive family recipes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
