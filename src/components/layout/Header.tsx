import React, { useState, useEffect } from 'react';
import { BRAND } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const { totalQuantity, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-subtle-elevation border-b border-forest/10 py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 -ml-2 text-forest hover:text-charcoal transition-colors focus-visible:ring-1 focus-visible:ring-gold-antique"
            >
              <Menu className="h-5 w-5 stroke-[1.75]" />
            </button>
          </div>

          {/* Brand Wordmark */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <a
              href="#"
              className="inline-block group focus-visible:ring-1 focus-visible:ring-gold-antique"
              aria-label={`${BRAND.brandName} Home`}
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-forest font-semibold uppercase transition-colors group-hover:text-forest-deep">
                {BRAND.brandName}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-9"
            aria-label="Primary Navigation"
          >
            {BRAND.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-xs tracking-luxury uppercase text-charcoal/80 hover:text-forest transition-colors font-medium relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-antique hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Cart Bag Icon with dynamic indicator */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag with ${totalQuantity} items`}
              className="relative p-2 -mr-2 text-forest hover:text-forest-deep transition-transform active:scale-95 focus-visible:ring-1 focus-visible:ring-gold-antique"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.6]" />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-0 min-w-[17px] h-[17px] flex items-center justify-center bg-gold-antique text-forest text-[10px] font-bold font-sans rounded-full px-1 shadow-sm transition-transform scale-100 animate-in zoom-in-50">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
