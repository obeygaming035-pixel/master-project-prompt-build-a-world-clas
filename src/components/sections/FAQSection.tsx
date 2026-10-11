import React, { useState } from 'react';
import { BRAND } from '../../config/brand';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 md:py-28 lg:py-32 w-full bg-ivory">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-sans tracking-luxury uppercase text-olive block mb-2 font-semibold">
            CLEAR &amp; HONEST ANSWERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-medium">
            Frequently Asked Questions
          </h2>
          <div className="w-10 h-[1px] bg-gold-antique mx-auto mt-4" />
        </div>

        {/* Accordion Container */}
        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {BRAND.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={faq.question} className="py-5 sm:py-6 transition-colors">
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left group focus-visible:ring-1 focus-visible:ring-gold-antique py-1 cursor-pointer"
                  >
                    <span className="font-serif text-lg sm:text-xl text-charcoal group-hover:text-forest font-medium pr-4 transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 p-1 rounded-full text-forest transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-180 text-gold-antique' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4 stroke-[2]" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  hidden={!isOpen}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'mt-3 opacity-100 max-h-96' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm sm:text-base text-charcoal/80 font-sans font-light leading-relaxed pl-1 pr-6">
                    {faq.answer}
                  </p>
                  {!faq.verified && (
                    <span className="inline-block mt-2 text-[11px] font-sans text-olive/80 italic pl-1">
                      (Note: Awaiting business owner verification before store launch)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
