import React, { useState } from 'react';
import { BRAND } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { formatINR, calculateTotalPaise, formatPaiseToINR } from '../../utils/currency';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleDecrement = () => {
    setSelectedQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setSelectedQuantity((prev) => Math.min(20, prev + 1));
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(selectedQuantity);
    setTimeout(() => setIsAdded(false), 800);
  };

  const totalPaise = calculateTotalPaise(selectedQuantity);

  return (
    <section
      id="product-showcase"
      className="py-20 md:py-28 w-full bg-cream/30 border-y border-gold-antique/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-sans tracking-luxury uppercase text-olive block mb-2 font-semibold">
            SINGLE-BATCH ARTISANAL PRODUCT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-medium">
            The Product, Beautifully Presented
          </h2>
          <div className="w-10 h-[1px] bg-gold-antique mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-ivory p-6 sm:p-10 lg:p-14 border border-gold-antique/20 shadow-subtle-elevation">
          
          {/* Product Image Column */}
          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden bg-cream/60 border border-gold-antique/20">
              <img
                src={BRAND.product.images.showcase}
                alt="Front facing studio presentation of AAVRIT 1kg glass jar of pure homemade buffalo-milk ghee"
                className="w-full h-[380px] sm:h-[480px] lg:h-[540px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width="640"
                height="640"
              />
              <div className="absolute top-4 left-4 bg-forest-deep text-ivory text-[10px] tracking-luxury uppercase px-2.5 py-1 border border-gold-antique/30">
                100% Buffalo Milk
              </div>
            </div>
          </div>

          {/* Product Specifications & Order Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="border-b border-forest/10 pb-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-sans tracking-subtle uppercase text-olive">
                  Artisanal Food Staple
                </span>
                <span className="text-olive/40">•</span>
                <span className="text-xs font-sans tracking-subtle uppercase text-olive">
                  1 kg Net Weight
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-forest font-semibold mb-3">
                {BRAND.product.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-3xl sm:text-4xl font-medium text-forest">
                  {formatINR(BRAND.product.priceINR)}
                </span>
                <span className="text-sm font-sans text-olive">
                  per 1 kg jar
                </span>
              </div>

              <p className="text-sm sm:text-base text-charcoal/80 font-sans font-light leading-relaxed">
                Prepared exclusively with pure buffalo milk. Characterized by its dense, rich aroma, golden color, and velvety culinary mouthfeel. Designed for daily household cooking and special festive dining alike.
              </p>
            </div>

            {/* Product Attributes List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-cream/40 p-3 border border-forest/5">
                <span className="text-[11px] font-sans text-olive uppercase tracking-wide block">
                  Ingredient
                </span>
                <span className="text-sm font-sans font-medium text-charcoal">
                  100% Buffalo Milk
                </span>
              </div>
              <div className="bg-cream/40 p-3 border border-forest/5">
                <span className="text-[11px] font-sans text-olive uppercase tracking-wide block">
                  Quantity
                </span>
                <span className="text-sm font-sans font-medium text-charcoal">
                  1 Kilogram (1 kg)
                </span>
              </div>
            </div>

            {/* Quantity Selector & Purchase Action */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-sans tracking-subtle uppercase text-charcoal font-medium">
                  Quantity:
                </span>
                <div className="flex items-center border border-forest/20 bg-ivory">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={selectedQuantity <= 1}
                    className="p-2 sm:px-3 text-forest hover:bg-cream disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-12 text-center text-sm font-sans font-semibold text-charcoal">
                    {selectedQuantity} kg
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={selectedQuantity >= 20}
                    className="p-2 sm:px-3 text-forest hover:bg-cream disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Live Subtotal Display */}
              <div className="flex items-center justify-between py-2 text-sm font-sans">
                <span className="text-olive">Total for {selectedQuantity} kg:</span>
                <span className="font-serif text-xl font-medium text-forest">
                  {formatPaiseToINR(totalPaise)}
                </span>
              </div>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 px-6 bg-forest text-ivory text-xs sm:text-sm font-sans tracking-luxury uppercase font-medium hover:bg-forest-deep active:scale-[0.99] transition-all flex items-center justify-center gap-3 group shadow-subtle-elevation cursor-pointer"
                aria-label={`Add ${selectedQuantity} kg of ${BRAND.product.name} to bag for ${formatPaiseToINR(totalPaise)}`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 text-gold-rich stroke-[2.5]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 text-gold-rich group-hover:scale-110 transition-transform" />
                    <span>Add to Bag · {formatPaiseToINR(totalPaise)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Strict Honest Price Note */}
            <div className="p-3 bg-cream/30 border-l-2 border-gold-antique text-xs font-sans text-olive">
              <p>
                <strong>Price Note:</strong> The displayed price is strictly ₹1,000 for the standard 1 kg jar. We offer exactly one honest product size without promotional gimmicks.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
