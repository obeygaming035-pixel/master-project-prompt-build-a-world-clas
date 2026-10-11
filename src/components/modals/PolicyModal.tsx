import React, { useEffect, useRef } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { BRAND } from '../../config/brand';

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'owner-checklist';

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [type, onClose]);

  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy (Draft)',
      subtitle: 'Draft document prepared for business owner review prior to website launch.',
      body: (
        <div className="space-y-4 text-sm text-charcoal/80 font-sans leading-relaxed">
          <div className="bg-cream/60 p-4 border-l-2 border-gold-antique text-xs text-forest">
            <strong>Store Owner Note:</strong> This policy template should be reviewed and customized with your registered legal entity details before accepting live transactions.
          </div>
          <h4 className="font-serif text-lg text-forest font-semibold">1. Information We Collect</h4>
          <p>
            When you browse {BRAND.brandName} or make a purchase, we collect necessary customer details including your name, shipping address, contact phone number, and email address for order fulfillment.
          </p>
          <h4 className="font-serif text-lg text-forest font-semibold">2. Use of Information</h4>
          <p>
            Customer details are strictly used to process purchases, organize courier delivery of the 1 kg ghee jar, and communicate tracking updates. We do not sell or trade customer information to third parties.
          </p>
          <h4 className="font-serif text-lg text-forest font-semibold">3. Payment Security</h4>
          <p>
            Payment transactions are processed through verified, RBI-compliant payment gateways. {BRAND.brandName} never stores customer credit card numbers, CVVs, or sensitive banking credentials on our frontend servers.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions (Draft)',
      subtitle: 'Draft customer agreement prepared for business owner review.',
      body: (
        <div className="space-y-4 text-sm text-charcoal/80 font-sans leading-relaxed">
          <div className="bg-cream/60 p-4 border-l-2 border-gold-antique text-xs text-forest">
            <strong>Store Owner Note:</strong> Ensure your registered business name, GST/FSSAI registration numbers, and governing jurisdiction are added here prior to official store launch.
          </div>
          <h4 className="font-serif text-lg text-forest font-semibold">1. Product Information &amp; Pricing</h4>
          <p>
            {BRAND.brandName} offers 100% pure homemade buffalo-milk ghee in a 1 kilogram unit for ₹1,000. All prices are stated transparently in Indian Rupees (INR).
          </p>
          <h4 className="font-serif text-lg text-forest font-semibold">2. Order Acceptance</h4>
          <p>
            Order fulfillment is subject to product batch availability and serviceability of the shipping address. The customer will receive tracking information once the order is dispatched.
          </p>
          <h4 className="font-serif text-lg text-forest font-semibold">3. Food Safety &amp; Usage</h4>
          <p>
            Because this is an artisanal perishable food product, customers must inspect the package upon delivery and follow label storage guidelines away from direct heat and moisture.
          </p>
        </div>
      ),
    },
    shipping: {
      title: 'Shipping & Returns Policy (Draft)',
      subtitle: 'Preliminary guidelines awaiting seller delivery logistics confirmation.',
      body: (
        <div className="space-y-4 text-sm text-charcoal/80 font-sans leading-relaxed">
          <div className="bg-cream/60 p-4 border-l-2 border-gold-antique text-xs text-forest">
            <strong>Pending Owner Verification:</strong> Delivery coverage zones, dispatch schedules, and courier partners will be finalized once shipping integration is activated.
          </div>
          <h4 className="font-serif text-lg text-forest font-semibold">1. Packaging &amp; Handling</h4>
          <p>
            Every 1 kg jar of {BRAND.brandName} buffalo ghee is carefully cushioned in food-grade protective packaging to preserve jar integrity during transit.
          </p>
          <h4 className="font-serif text-lg text-forest font-semibold">2. Delivery Timelines</h4>
          <p>
            Estimated transit times will be calculated at checkout once the seller’s courier accounts and pincode coverage zones are active.
          </p>
          <h4 className="font-serif text-lg text-forest font-semibold">3. Perishable Food Returns</h4>
          <p>
            As ghee is an unsealed food item once opened, returns are strictly accepted for jars damaged in transit or broken seals upon initial delivery inspection.
          </p>
        </div>
      ),
    },
    'owner-checklist': {
      title: 'Store Owner Pre-Launch Checklist',
      subtitle: 'Identified placeholders and verification items needed from the brand owner.',
      body: (
        <div className="space-y-4 text-sm text-charcoal/80 font-sans leading-relaxed">
          <div className="bg-forest-deep text-ivory p-4 border border-gold-antique/30">
            <div className="flex items-center gap-2 text-gold-rich font-medium text-xs tracking-luxury uppercase mb-1">
              <AlertCircle className="h-4 w-4" />
              <span>Owner Pre-Launch Items</span>
            </div>
            <p className="text-xs text-ivory/80">
              The website structure is complete and fully functional. The owner needs to supply only these specific verified items before accepting live orders:
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-charcoal/85">
            <li><strong>Official Contact Details:</strong> Customer support email address, direct phone line, or business WhatsApp number.</li>
            <li><strong>Label Storage Instructions:</strong> Official shelf life and storage instructions from the printed jar label.</li>
            <li><strong>Fulfillment &amp; Pincode Coverage:</strong> List of deliverable Indian pin codes and chosen courier partner (e.g. Shiprocket, BlueDart, Delhivery).</li>
            <li><strong>Payment Gateway Keys:</strong> Production API keys for Razorpay, Cashfree, or Stripe to be connected in backend configuration.</li>
            <li><strong>FSSAI / Regulatory Details:</strong> Food safety license number for footer display if required.</li>
          </ul>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-deep/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-ivory border border-gold-antique/30 shadow-premium max-h-[85vh] flex flex-col z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-forest/10 flex items-start justify-between bg-cream/30">
          <div>
            <h3 id="policy-title" className="font-serif text-2xl text-forest font-semibold">
              {current.title}
            </h3>
            <p className="text-xs font-sans text-olive mt-1">
              {current.subtitle}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-forest/60 hover:text-forest transition-colors rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {current.body}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-forest/10 bg-cream/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-forest text-ivory text-xs font-sans tracking-subtle uppercase hover:bg-forest-deep transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
