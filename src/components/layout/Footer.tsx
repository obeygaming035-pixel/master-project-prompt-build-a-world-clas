import React, { useState } from 'react';
import { BRAND } from '../../config/brand';
import { PolicyModal, PolicyType } from '../modals/PolicyModal';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  return (
    <>
      <footer className="w-full bg-forest-deep text-ivory border-t border-gold-antique/20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-forest/40">
            
            {/* Brand Column */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <a href="#" className="inline-block mb-4">
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-ivory font-semibold uppercase">
                    {BRAND.brandName}
                  </span>
                </a>
                <p className="text-xs sm:text-sm font-sans text-ivory/70 leading-relaxed font-light max-w-sm">
                  100% pure homemade buffalo-milk ghee, crafted with care for everyday Indian meals and moments worth savouring.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-forest/40">
                <p className="text-xs font-sans text-gold-rich font-medium">
                  Artisanal Standard: ₹1,000 / kg
                </p>
                <p className="text-[11px] font-sans text-ivory/50 mt-0.5">
                  Single product focus · Pure Buffalo Milk
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <span className="text-[11px] font-sans tracking-luxury uppercase text-gold-antique font-semibold block mb-4">
                Explore
              </span>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-ivory/80">
                {BRAND.navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="hover:text-gold-rich transition-colors inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care & Policies */}
            <div className="md:col-span-4">
              <span className="text-[11px] font-sans tracking-luxury uppercase text-gold-antique font-semibold block mb-4">
                Store Policies (Draft)
              </span>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-ivory/80">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('privacy')}
                    className="hover:text-gold-rich transition-colors text-left"
                  >
                    Privacy Policy (Draft for Review)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('terms')}
                    className="hover:text-gold-rich transition-colors text-left"
                  >
                    Terms &amp; Conditions (Draft for Review)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('shipping')}
                    className="hover:text-gold-rich transition-colors text-left"
                  >
                    Shipping &amp; Returns Policy (Draft)
                  </button>
                </li>
              </ul>

              {/* Owner Pre-Launch Status */}
              <div className="mt-6 p-3 bg-forest/30 border border-gold-antique/20">
                <button
                  type="button"
                  onClick={() => setActivePolicy('owner-checklist')}
                  className="flex items-center gap-1.5 text-xs font-sans text-gold-rich hover:underline text-left cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>Store Owner: View Pre-Launch Checklist</span>
                </button>
                <p className="text-[10px] font-sans text-ivory/60 mt-1">
                  Contact details &amp; fulfillment policies to be verified prior to store launch.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-ivory/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-antique" />
              <span>
                © {new Date().getFullYear()} {BRAND.brandName}. All rights reserved.
              </span>
            </div>
            <div>
              <span>Artisanal Buffalo-Milk Ghee · ₹1,000 per 1 kg</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Accessible Policy & Checklist Modal */}
      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
};
