import { useState } from 'react';
import { Hero } from './components/Hero';
import { WebsitePackages } from './components/WebsitePackages';
import { EcommercePackages } from './components/EcommercePackages';
import { MobilePackages } from './components/MobilePackages';
import { IndividualServices } from './components/IndividualServices';
import { ShopifyServices } from './components/ShopifyServices';
import { HostingMaintenance } from './components/HostingMaintenance';
import { QuoteBuilder } from './components/QuoteBuilder';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

import { 
  PricingPackage, ServiceItem, ShopifyServiceItem, 
  HostingTier, MaintenanceTier, BRAND_INFO 
} from './data/pricingData';
import { MessageSquare, Shield, Star, Award, Zap } from 'lucide-react';

function App() {
  // Quote builder state
  const [selectedWebsite, setSelectedWebsite] = useState<PricingPackage | null>(null);
  const [selectedEcommerce, setSelectedEcommerce] = useState<PricingPackage | null>(null);
  const [selectedMobile, setSelectedMobile] = useState<PricingPackage | null>(null);
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedShopify, setSelectedShopify] = useState<ShopifyServiceItem[]>([]);
  const [selectedHosting, setSelectedHosting] = useState<HostingTier | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceTier | null>(null);
  
  // New dynamic entry/photography states
  const [productInsertCount, setProductInsertCount] = useState<number>(0);
  const [aiPhotoProductCount, setAiPhotoProductCount] = useState<number>(0);
  const [aiPhotoImagesPerProduct, setAiPhotoImagesPerProduct] = useState<number>(2);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selection handlers
  const handleSelectWebsite = (pkg: PricingPackage) => {
    setSelectedWebsite(prev => (prev?.id === pkg.id ? null : pkg));
  };

  const handleSelectEcommerce = (pkg: PricingPackage) => {
    setSelectedEcommerce(prev => (prev?.id === pkg.id ? null : pkg));
  };

  const handleSelectMobile = (pkg: PricingPackage) => {
    setSelectedMobile(prev => (prev?.id === pkg.id ? null : pkg));
  };

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleToggleShopifyService = (service: ShopifyServiceItem) => {
    setSelectedShopify(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSelectHosting = (tier: HostingTier | null) => {
    setSelectedHosting(tier);
  };

  const handleSelectMaintenance = (tier: MaintenanceTier | null) => {
    setSelectedMaintenance(tier);
  };

  // Reset calculations
  const handleReset = () => {
    setSelectedWebsite(null);
    setSelectedEcommerce(null);
    setSelectedMobile(null);
    setSelectedServices([]);
    setSelectedShopify([]);
    setSelectedHosting(null);
    setSelectedMaintenance(null);
    setProductInsertCount(0);
    setAiPhotoProductCount(0);
    setAiPhotoImagesPerProduct(2);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sum calculations
  const getTotals = () => {
    let oneTime = 0;
    let yearly = 0;
    let monthly = 0;

    if (selectedWebsite) oneTime += selectedWebsite.price;
    if (selectedEcommerce) oneTime += selectedEcommerce.price;
    if (selectedMobile) oneTime += selectedMobile.price;
    selectedServices.forEach(s => { oneTime += s.price; });
    selectedShopify.forEach(s => { oneTime += s.price; });
    
    // Add product data entry: ₹40 per product
    oneTime += productInsertCount * 40;
    
    // Add AI photography: ₹100 base (includes 2 images), ₹40 per additional image
    if (aiPhotoProductCount > 0) {
      const extraImages = Math.max(0, aiPhotoImagesPerProduct - 2);
      oneTime += aiPhotoProductCount * (100 + extraImages * 40);
    }
    
    if (selectedHosting) yearly += selectedHosting.price;
    if (selectedMaintenance) monthly += selectedMaintenance.price;

    return { oneTime, yearly, monthly };
  };

  const { oneTime: oneTimeTotal, yearly: yearlyTotal, monthly: monthlyTotal } = getTotals();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Sticky Premium Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/10">
              <span className="text-white text-base font-extrabold font-display">HK</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base font-display block leading-none">
                {BRAND_INFO.name}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 block">
                {BRAND_INFO.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav anchors */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-semibold text-slate-600">
            <a href="#websites" className="hover:text-indigo-600 transition-colors">Websites</a>
            <a href="#ecommerce" className="hover:text-indigo-600 transition-colors">E-Commerce</a>
            <a href="#mobile" className="hover:text-indigo-600 transition-colors">Mobile Apps</a>
            <a href="#services" className="hover:text-indigo-600 transition-colors">Services</a>
            <a href="#shopify" className="hover:text-indigo-600 transition-colors">Shopify & Data</a>
            <a href="#hosting" className="hover:text-indigo-600 transition-colors">Hosting</a>
          </nav>

          {/* WhatsApp Action button */}
          <div className="flex items-center gap-3">
            <a
              href={BRAND_INFO.contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-emerald-200/50 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Me</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onScrollToCalculator={scrollToCalculator} />

      {/* Trust Badges Banner */}
      <section className="bg-white border-y border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-2.5 md:border-r border-slate-100 last:border-0">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">100% Secure Support</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 md:border-r border-slate-100 last:border-0">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">5-Star Dev Rating</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 md:border-r border-slate-100 last:border-0">
            <Zap className="w-5 h-5 text-emerald-500" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">AstroJS Page Speed</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Award className="w-5 h-5 text-sky-500" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">Gujarat Native Support</span>
          </div>
        </div>
      </section>

      {/* Split Layout Container */}
      <main id="catalog-grid" className="max-w-7xl mx-auto py-8 lg:py-16 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pricing components */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-20 pb-24 lg:pb-0">
            
            {/* Website Packages */}
            <section id="websites" className="scroll-mt-24">
              <WebsitePackages 
                selectedId={selectedWebsite?.id || null} 
                onSelect={handleSelectWebsite} 
              />
            </section>

            {/* E-Commerce Packages */}
            <section id="ecommerce" className="scroll-mt-24">
              <EcommercePackages 
                selectedId={selectedEcommerce?.id || null} 
                onSelect={handleSelectEcommerce} 
              />
            </section>

            {/* Mobile App Packages */}
            <section id="mobile" className="scroll-mt-24">
              <MobilePackages 
                selectedId={selectedMobile?.id || null} 
                onSelect={handleSelectMobile} 
              />
            </section>

            {/* Individual Services */}
            <section id="services" className="scroll-mt-24">
              <IndividualServices 
                selectedIds={selectedServices.map(s => s.id)} 
                onToggleService={handleToggleService} 
              />
            </section>

            {/* Shopify Store Setup & uploads */}
            <section id="shopify" className="scroll-mt-24">
              <ShopifyServices 
                selectedShopifyIds={selectedShopify.map(s => s.id)}
                onToggleShopifyService={handleToggleShopifyService}
                productInsertCount={productInsertCount}
                onProductInsertCountChange={setProductInsertCount}
                aiPhotoProductCount={aiPhotoProductCount}
                onAiPhotoProductCountChange={setAiPhotoProductCount}
                aiPhotoImagesPerProduct={aiPhotoImagesPerProduct}
                onAiPhotoImagesPerProductChange={setAiPhotoImagesPerProduct}
              />
            </section>

            {/* Hosting & Maintenance */}
            <section id="hosting" className="scroll-mt-24">
              <HostingMaintenance 
                selectedHostingId={selectedHosting?.id || null}
                selectedMaintenanceId={selectedMaintenance?.id || null}
                onSelectHosting={handleSelectHosting}
                onSelectMaintenance={handleSelectMaintenance}
              />
            </section>

          </div>

          {/* Right Column: Sticky Quote Builder sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <QuoteBuilder
              selectedWebsite={selectedWebsite}
              selectedEcommerce={selectedEcommerce}
              selectedMobile={selectedMobile}
              selectedServices={selectedServices}
              selectedShopify={selectedShopify}
              
              productInsertCount={productInsertCount}
              aiPhotoProductCount={aiPhotoProductCount}
              aiPhotoImagesPerProduct={aiPhotoImagesPerProduct}
              
              selectedHosting={selectedHosting}
              selectedMaintenance={selectedMaintenance}
              
              onRemoveWebsite={() => setSelectedWebsite(null)}
              onRemoveEcommerce={() => setSelectedEcommerce(null)}
              onRemoveMobile={() => setSelectedMobile(null)}
              onRemoveService={(id) => setSelectedServices(prev => prev.filter(s => s.id !== id))}
              onRemoveShopify={(id) => setSelectedShopify(prev => prev.filter(s => s.id !== id))}
              
              onRemoveProductInsert={() => setProductInsertCount(0)}
              onRemoveAiPhoto={() => { setAiPhotoProductCount(0); setAiPhotoImagesPerProduct(2); }}
              
              onRemoveHosting={() => setSelectedHosting(null)}
              onRemoveMaintenance={() => setSelectedMaintenance(null)}
              onReset={handleReset}
              onRequestQuote={() => setIsModalOpen(true)}
            />
          </aside>

        </div>
      </main>

      {/* Why Choose Us Full-Width Section */}
      <WhyChooseUs />

      {/* Footer Section */}
      <Footer />

      {/* Lead Generation Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedWebsite={selectedWebsite}
        selectedEcommerce={selectedEcommerce}
        selectedMobile={selectedMobile}
        selectedServices={selectedServices}
        selectedShopify={selectedShopify}
        
        productInsertCount={productInsertCount}
        aiPhotoProductCount={aiPhotoProductCount}
        aiPhotoImagesPerProduct={aiPhotoImagesPerProduct}
        
        selectedHosting={selectedHosting}
        selectedMaintenance={selectedMaintenance}
        oneTimeTotal={oneTimeTotal}
        yearlyTotal={yearlyTotal}
        monthlyTotal={monthlyTotal}
      />
    </div>
  );
}

export default App;
