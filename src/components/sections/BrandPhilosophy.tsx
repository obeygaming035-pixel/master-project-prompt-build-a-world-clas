import React from 'react';
import { BRAND } from '../../config/brand';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="py-24 md:py-32 lg:py-36 w-full bg-forest text-ivory relative overflow-hidden"
    >
      {/* Subtle background heritage border line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gold-antique/30" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gold-antique/30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Antique Gold Detail */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-gold-antique" />
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase text-gold-antique font-semibold">
            OUR PHILOSOPHY
          </span>
          <span className="w-8 h-[1px] bg-gold-antique" />
        </div>

        {/* Grand Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-medium leading-[1.18] mb-8 max-w-3xl mx-auto">
          Good Food Needs No Grand Promises.
        </h2>

        {/* Body Copy */}
        <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-ivory/85 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          “We believe a good kitchen staple should speak for itself: familiar ingredients, honest presentation, and a place in the meals that bring people together.”
        </p>

        {/* Minimal Signature Accent */}
        <div className="pt-6 border-t border-gold-antique/20 max-w-xs mx-auto">
          <p className="text-xs font-sans tracking-luxury uppercase text-ivory/60 font-light">
            {BRAND.brandName} Artisanal Household Staples
          </p>
        </div>
      </div>
    </section>
  );
};
