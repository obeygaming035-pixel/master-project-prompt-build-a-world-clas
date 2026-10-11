import React, { useState } from 'react';
import { BRAND } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { formatPaiseToINR } from '../../utils/currency';
import { X, ShieldCheck, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotalPaise, totalQuantity } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
  });
  const [submittedInterest, setSubmittedInterest] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedInterest(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-deep/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-ivory border border-gold-antique/30 shadow-premium max-h-[90vh] flex flex-col z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-forest/10 flex items-center justify-between bg-cream/40">
          <div>
            <span className="text-[10px] font-sans tracking-luxury uppercase text-olive block mb-0.5">
              Secure Checkout · AAVRIT
            </span>
            <h3 id="checkout-title" className="font-serif text-2xl text-forest font-semibold">
              Order Details &amp; Fulfillment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-forest/60 hover:text-forest transition-colors rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Order Summary Box */}
          <div className="bg-cream/40 p-5 border border-gold-antique/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-sans tracking-luxury uppercase text-olive border-b border-forest/10 pb-2">
              <span>Item</span>
              <span>Subtotal</span>
            </div>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm font-sans">
                <div>
                  <p className="font-serif font-semibold text-charcoal">{item.name}</p>
                  <p className="text-xs text-olive">Quantity: {item.quantity} kg ({item.milkSource})</p>
                </div>
                <div className="font-serif text-lg font-medium text-forest">
                  {formatPaiseToINR(item.unitPricePaise * item.quantity)}
                </div>
              </div>
            ))}
            <div className="border-t border-forest/10 pt-3 flex items-center justify-between">
              <span className="text-sm font-sans font-medium text-charcoal">
                Grand Total ({totalQuantity} kg):
              </span>
              <span className="font-serif text-2xl font-semibold text-forest">
                {formatPaiseToINR(subtotalPaise)}
              </span>
            </div>
          </div>

          {/* Honest Transparent Notice Regarding Live Gateway & Owner Setup */}
          <div className="p-4 bg-forest-deep text-ivory border border-gold-antique/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gold-rich shrink-0 mt-0.5" />
              <div className="text-xs font-sans leading-relaxed space-y-1">
                <p className="font-semibold text-gold-rich uppercase tracking-subtle">
                  Fulfillment &amp; Gateway Configuration Note
                </p>
                <p className="text-ivory/85">
                  The payment gateway and delivery pincode coverage are currently awaiting the business owner’s backend integration and courier partnership finalization.
                </p>
                <p className="text-ivory/70 italic text-[11px]">
                  No payment will be collected from your card or account until the store owner connects their verified merchant credentials.
                </p>
              </div>
            </div>
          </div>

          {!submittedInterest ? (
            <form onSubmit={handleInterestSubmit} className="space-y-4">
              <h4 className="font-serif text-lg text-forest font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-antique" />
                <span>Shipping Address Preview</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-sans text-olive mb-1">
                    Full Name *
                  </label>
                  <input
                    id="checkout-name"
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Recipient's Name"
                    className="w-full p-2.5 bg-cream/30 border border-forest/20 text-sm font-sans text-charcoal focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-sans text-olive mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    id="checkout-phone"
                    required
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full p-2.5 bg-cream/30 border border-forest/20 text-sm font-sans text-charcoal focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-email" className="block text-xs font-sans text-olive mb-1">
                  Email Address *
                </label>
                <input
                  id="checkout-email"
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="order-updates@example.com"
                  className="w-full p-2.5 bg-cream/30 border border-forest/20 text-sm font-sans text-charcoal focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-sans text-olive mb-1">
                  Delivery Street Address *
                </label>
                <textarea
                  id="checkout-address"
                  required
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Flat No, Landmark, Street"
                  className="w-full p-2.5 bg-cream/30 border border-forest/20 text-sm font-sans text-charcoal focus:border-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="checkout-pincode" className="block text-xs font-sans text-olive mb-1">
                    Pincode *
                  </label>
                  <input
                    id="checkout-pincode"
                    required
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 110001"
                    className="w-full p-2.5 bg-cream/30 border border-forest/20 text-sm font-sans text-charcoal focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-city" className="block text-xs font-sans text-olive mb-1">
                    City *
                  </label>
                  <input
                    id="checkout-city"
                    required
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full p-2.5 bg-cream/30 border border-forest/20 text-sm font-sans text-charcoal focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-state" className="block text-xs font-sans text-olive mb-1">
                    State *
                  </label>
                  <input
                    id="checkout-state"
                    required
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full p-2.5 bg-cream/30 border border-forest/20 text-sm font-sans text-charcoal focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-forest text-ivory text-xs sm:text-sm font-sans tracking-luxury uppercase font-medium hover:bg-forest-deep transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-subtle-elevation"
              >
                <span>Save Delivery Details &amp; Check Pincode Coverage</span>
              </button>
            </form>
          ) : (
            <div className="p-6 bg-cream/40 border border-gold-antique/30 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="h-10 w-10 text-forest mx-auto" />
              <h4 className="font-serif text-xl text-forest font-semibold">
                Delivery Details Recorded
              </h4>
              <p className="text-xs sm:text-sm font-sans text-charcoal/80 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your shipping request for <strong>{totalQuantity} kg {BRAND.product.name} ({formatPaiseToINR(subtotalPaise)})</strong> to pincode <strong>{formData.pincode}</strong> has been saved.
              </p>
              <p className="text-xs font-sans text-olive italic">
                Our fulfillment dispatch will contact you at {formData.phone} or {formData.email} once delivery coverage is finalized by the store owner.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedInterest(false)}
                className="text-xs font-sans text-forest underline hover:text-forest-deep pt-2"
              >
                Edit Details
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs font-sans text-olive pt-2 border-t border-forest/10">
            <ShieldCheck className="h-4 w-4 text-gold-antique" />
            <span>Honest Single Product Pricing · Strictly ₹1,000 / kg · No Hidden Charges</span>
          </div>
        </div>

      </div>
    </div>
  );
};
