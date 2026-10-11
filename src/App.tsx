import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';
import { TrustStrip } from './components/sections/TrustStrip';
import { ProductStory } from './components/sections/ProductStory';
import { ProductShowcase } from './components/sections/ProductShowcase';
import { EverydayRituals } from './components/sections/EverydayRituals';
import { BrandPhilosophy } from './components/sections/BrandPhilosophy';
import { FAQSection } from './components/sections/FAQSection';
import { FinalPurchaseSection } from './components/sections/FinalPurchaseSection';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { Toast } from './components/ui/Toast';

export function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-ivory text-charcoal">
        {/* Section A: Announcement Bar */}
        <AnnouncementBar />

        {/* Section B: Navigation */}
        <Header />

        <main className="flex-1">
          {/* Section C: Hero Experience */}
          <HeroSection />

          {/* Section D: Trust & Product Attributes */}
          <TrustStrip />

          {/* Section E: Product Story */}
          <ProductStory />

          {/* Section F: The Product, Beautifully Presented */}
          <ProductShowcase />

          {/* Section G: Everyday Rituals */}
          <EverydayRituals />

          {/* Section H: Our Philosophy */}
          <BrandPhilosophy />

          {/* Section I: FAQ Accordion */}
          <FAQSection />

          {/* Section J: Final Purchase Section */}
          <FinalPurchaseSection />
        </main>

        {/* Section K: Footer */}
        <Footer />

        {/* Cart Drawer & Toast Notifications */}
        <CartDrawer />
        <Toast />
      </div>
    </CartProvider>
  );
}

export default App;
