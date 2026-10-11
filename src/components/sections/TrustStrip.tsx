import { Milk, Home, Scale, Sparkles } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const attributes = [
    {
      icon: Milk,
      title: 'Buffalo-Milk Ghee',
      desc: 'Sourced from pure buffalo milk',
    },
    {
      icon: Home,
      title: 'Homemade Craft',
      desc: 'Small domestic batches',
    },
    {
      icon: Scale,
      title: '1 kg Standard',
      desc: 'Honest weight at ₹1,000 / kg',
    },
    {
      icon: Sparkles,
      title: 'Pure Ghee',
      desc: 'Zero artificial additives',
    },
  ];

  return (
    <section
      id="trust-strip"
      className="w-full bg-cream/40 border-y border-gold-antique/20 py-8 md:py-10"
      aria-label="Product Attributes"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {attributes.map((attr, index) => {
            const Icon = attr.icon;
            return (
              <div
                key={attr.title}
                className={`flex flex-col items-center text-center ${
                  index !== attributes.length - 1
                    ? 'md:border-r md:border-forest/10 md:pr-6'
                    : ''
                }`}
              >
                <div className="h-10 w-10 flex items-center justify-center text-forest mb-2.5">
                  <Icon className="h-5 w-5 stroke-[1.5] text-forest" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-charcoal font-semibold mb-1">
                  {attr.title}
                </h3>
                <p className="text-xs font-sans text-olive font-light">
                  {attr.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
