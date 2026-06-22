import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { WizardSteps } from './components/WizardSteps';
import { EstimatorSidebar } from './components/EstimatorSidebar';
import { ProposalDoc } from './components/ProposalDoc';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ClientTerms } from './components/ClientTerms';
import { Footer } from './components/Footer';

import { 
  Feature, ProjectPreset,
  CORE_PACKAGES, FEATURES, THIRD_PARTY_SERVICES, SUPPORT_TIERS, BRAND_INFO 
} from './data/pricingData';
import { serializeStateToHash, parseStateFromHash } from './utils/UrlStateHelper';
import { MessageSquare, Shield, Star, Award, Zap } from 'lucide-react';

function App() {
  // Wizard active step
  const [activeStep, setActiveStep] = useState<number>(() => {
    const state = parseStateFromHash();
    return state.activeStep !== undefined ? state.activeStep : 1;
  });

  // Core selections
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(() => {
    const state = parseStateFromHash();
    return state.categoryId !== undefined ? state.categoryId : null;
  });
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(() => {
    const state = parseStateFromHash();
    return state.packageId !== undefined ? state.packageId : null;
  });
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>(() => {
    const state = parseStateFromHash();
    return state.featureIds !== undefined ? state.featureIds : [];
  });
  const [selectedInfrastructureIds, setSelectedInfrastructureIds] = useState<string[]>(() => {
    const state = parseStateFromHash();
    return state.infrastructureIds !== undefined ? state.infrastructureIds : [];
  });
  const [selectedSupportId, setSelectedSupportId] = useState<string>(() => {
    const state = parseStateFromHash();
    return state.supportId !== undefined ? state.supportId : 'maint_none';
  });

  // Budget mode
  const [budgetMode, setBudgetMode] = useState<boolean>(() => {
    const state = parseStateFromHash();
    return state.budgetMode !== undefined ? state.budgetMode : false;
  });
  const [budgetLimit, setBudgetLimit] = useState<number>(() => {
    const state = parseStateFromHash();
    return state.budgetLimit !== undefined ? state.budgetLimit : 25000;
  });

  // Calculators (re-added)
  const [productInsertCount, setProductInsertCount] = useState<number>(() => {
    const state = parseStateFromHash();
    return state.productInsertCount !== undefined ? state.productInsertCount : 0;
  });
  const [aiPhotoProductCount, setAiPhotoProductCount] = useState<number>(() => {
    const state = parseStateFromHash();
    return state.aiPhotoProductCount !== undefined ? state.aiPhotoProductCount : 0;
  });
  const [aiPhotoImagesPerProduct, setAiPhotoImagesPerProduct] = useState<number>(() => {
    const state = parseStateFromHash();
    return state.aiPhotoImagesPerProduct !== undefined ? state.aiPhotoImagesPerProduct : 2;
  });

  // Client Details (Lead)
  const [clientName, setClientName] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [callbackNotes, setCallbackNotes] = useState<string>('');

  // State Sync to Hash URL
  useEffect(() => {
    serializeStateToHash({
      categoryId: selectedCategoryId,
      packageId: selectedPackageId,
      featureIds: selectedFeatureIds,
      infrastructureIds: selectedInfrastructureIds,
      supportId: selectedSupportId,
      budgetMode,
      budgetLimit,
      activeStep,
      productInsertCount,
      aiPhotoProductCount,
      aiPhotoImagesPerProduct
    });
  }, [
    selectedCategoryId,
    selectedPackageId,
    selectedFeatureIds,
    selectedInfrastructureIds,
    selectedSupportId,
    budgetMode,
    budgetLimit,
    activeStep,
    productInsertCount,
    aiPhotoProductCount,
    aiPhotoImagesPerProduct
  ]);

  // Derived Selection entities
  const selectedPackage = CORE_PACKAGES.find(p => p.id === selectedPackageId) || null;
  const selectedFeatures = FEATURES.filter(f => selectedFeatureIds.includes(f.id));
  const selectedInfrastructure = THIRD_PARTY_SERVICES.filter(s => selectedInfrastructureIds.includes(s.id));
  const selectedSupport = SUPPORT_TIERS.find(s => s.id === selectedSupportId) || null;

  // Total Calculations
  const getTotals = () => {
    let oneTime = 0;
    let monthly = 0;
    let yearly = 0;

    if (selectedPackage) {
      oneTime += selectedPackage.price;
    }

    selectedFeatures.forEach(f => {
      oneTime += f.oneTimeCost;
    });

    // Add calculators
    oneTime += productInsertCount * 40;
    if (aiPhotoProductCount > 0) {
      const extraImages = Math.max(0, aiPhotoImagesPerProduct - 2);
      oneTime += aiPhotoProductCount * (100 + extraImages * 40);
    }

    selectedInfrastructure.forEach(infra => {
      if (infra.billing === 'one-time') {
        oneTime += infra.price;
      } else if (infra.billing === 'monthly') {
        monthly += infra.price;
      } else if (infra.billing === 'yearly') {
        yearly += infra.price;
      }
    });

    if (selectedSupport) {
      monthly += selectedSupport.price;
    }

    return { oneTime, monthly, yearly };
  };

  const { oneTime: oneTimeTotal, monthly: monthlyTotal, yearly: yearlyTotal } = getTotals();
  const firstYearTotal = oneTimeTotal + (monthlyTotal * 12) + yearlyTotal;

  // Timeline computation
  const totalTimelineDays = (() => {
    let days = 0;
    if (selectedPackage) {
      days += selectedPackage.deliveryDays;
    }
    selectedFeatures.forEach(f => {
      days += f.deliveryDays;
    });
    return days;
  })();

  // Handlers
  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setSelectedPackageId(null);
    setSelectedFeatureIds([]);
    setActiveStep(2);
  };

  const handleSelectPackage = (pkgId: string | null) => {
    setSelectedPackageId(pkgId);
  };

  const handleToggleInfrastructure = (infraId: string) => {
    setSelectedInfrastructureIds(prev =>
      prev.includes(infraId) ? prev.filter(id => id !== infraId) : [...prev, infraId]
    );
  };

  const handleSelectSupport = (supportId: string) => {
    setSelectedSupportId(supportId);
  };

  const handleApplyPreset = (preset: ProjectPreset) => {
    setSelectedCategoryId(preset.categoryId);
    setSelectedPackageId(preset.packageId);
    setSelectedFeatureIds(preset.featureIds);
    setSelectedInfrastructureIds(preset.infrastructureIds);
    setSelectedSupportId(preset.supportId);
    setActiveStep(6);
  };

  const handleApplyRealityAlternative = (catId: string, pkgId: string, featIds: string[]) => {
    setSelectedCategoryId(catId);
    setSelectedPackageId(pkgId);
    setSelectedFeatureIds(featIds);
  };

  const handleToggleFeature = (feature: Feature) => {
    setSelectedFeatureIds(prev => {
      const isSelected = prev.includes(feature.id);
      if (isSelected) {
        // Deselecting feature. We must also deselect any features that depend on this feature.
        const toDeselect = new Set<string>([feature.id]);
        let changed = true;
        while (changed) {
          changed = false;
          FEATURES.forEach(f => {
            if (f.dependencies && !toDeselect.has(f.id)) {
              const hasDep = f.dependencies.some(depId => toDeselect.has(depId));
              if (hasDep) {
                toDeselect.add(f.id);
                changed = true;
              }
            }
          });
        }
        return prev.filter(id => !toDeselect.has(id));
      } else {
        // Selecting feature. We must also select any dependencies of this feature.
        const toSelect = new Set<string>([feature.id]);
        let changed = true;
        while (changed) {
          changed = false;
          FEATURES.forEach(f => {
            if (toSelect.has(f.id) && f.dependencies) {
              f.dependencies.forEach(depId => {
                if (!toSelect.has(depId)) {
                  toSelect.add(depId);
                  changed = true;
                }
              });
            }
          });
        }
        const newSet = new Set([...prev, ...toSelect]);
        return Array.from(newSet);
      }
    });
  };

  const handleReset = () => {
    setSelectedCategoryId(null);
    setSelectedPackageId(null);
    setSelectedFeatureIds([]);
    setSelectedInfrastructureIds([]);
    setSelectedSupportId('maint_none');
    setBudgetMode(false);
    setBudgetLimit(25000);
    setProductInsertCount(0);
    setAiPhotoProductCount(0);
    setAiPhotoImagesPerProduct(2);
    setActiveStep(1);
    setClientName('');
    setBusinessName('');
    setPhone('');
    setEmail('');
    setCallbackNotes('');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPkg = CORE_PACKAGES.find(p => p.id === selectedPackageId);
    const selectedFeats = FEATURES.filter(f => selectedFeatureIds.includes(f.id));
    
    const message = encodeURIComponent(
      `Hi Hardik,\n\nI just calculated a software estimate on your site and would like to request a callback.\n\n` +
      `*Name:* ${clientName}\n` +
      `*Business:* ${businessName || 'N/A'}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n\n` +
      `*Estimate Details:*\n` +
      `- Type: ${selectedCategoryId}\n` +
      `- Plan: ${selectedPkg?.name || 'N/A'}\n` +
      `- Features: ${selectedFeats.map(f => f.name).join(', ') || 'None'}\n` +
      `- Data Entry: ${productInsertCount ? `${productInsertCount} Products` : 'No'}\n` +
      `- AI Photo: ${aiPhotoProductCount ? `${aiPhotoProductCount} Products (${aiPhotoImagesPerProduct} img/prod)` : 'No'}\n` +
      `- Estimated First Year Total: ₹${firstYearTotal.toLocaleString('en-IN')}\n\n` +
      `*Notes:* ${callbackNotes || 'None'}`
    );
    
    window.open(`https://wa.me/916353485415?text=${message}`, '_blank');
    alert("Inquiry summary generated! Redirecting to WhatsApp to send details directly to Hardik...");
  };

  const handlePrintProposal = () => {
    window.print();
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Sticky Premium Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/10">
              <span className="text-white text-base font-extrabold font-display">HK</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base font-display block leading-none text-left">
                {BRAND_INFO.name}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 block">
                {BRAND_INFO.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav anchors */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-semibold text-slate-600">
            <button onClick={() => { setActiveStep(1); scrollToCalculator(); }} className="hover:text-indigo-600 transition-colors">1. Build</button>
            <button onClick={() => { setActiveStep(2); scrollToCalculator(); }} className="hover:text-indigo-600 transition-colors" disabled={!selectedCategoryId}>2. Package</button>
            <button onClick={() => { setActiveStep(3); scrollToCalculator(); }} className="hover:text-indigo-600 transition-colors" disabled={!selectedCategoryId}>3. Features</button>
            <button onClick={() => { setActiveStep(4); scrollToCalculator(); }} className="hover:text-indigo-600 transition-colors" disabled={!selectedCategoryId}>4. Infrastructure</button>
            <button onClick={() => { setActiveStep(5); scrollToCalculator(); }} className="hover:text-indigo-600 transition-colors" disabled={!selectedCategoryId}>5. Support</button>
            <button onClick={() => { setActiveStep(6); scrollToCalculator(); }} className="hover:text-indigo-600 transition-colors" disabled={!selectedCategoryId}>6. Review</button>
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
      <div className="no-print">
        <Hero onScrollToCalculator={scrollToCalculator} />
      </div>

      {/* Trust Badges Banner */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 no-print">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-2.5 md:border-r border-slate-100 last:border-0">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">100% Transparent Support</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 md:border-r border-slate-100 last:border-0">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">Predefined Modules</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 md:border-r border-slate-100 last:border-0">
            <Zap className="w-5 h-5 text-emerald-500" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">No Hidden Charges</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Award className="w-5 h-5 text-sky-500" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">Gujarat Native Support</span>
          </div>
        </div>
      </section>

      {/* Split Layout Container */}
      <main id="catalog-grid" className="max-w-7xl mx-auto py-8 lg:py-16 px-4 sm:px-6 lg:px-8 flex-grow no-print">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Wizard steps components */}
          <div className="lg:col-span-8 space-y-12 pb-24 lg:pb-0">
            <WizardSteps
              activeStep={activeStep}
              selectedCategoryId={selectedCategoryId}
              selectedPackageId={selectedPackageId}
              selectedFeatureIds={selectedFeatureIds}
              selectedInfrastructureIds={selectedInfrastructureIds}
              selectedSupportId={selectedSupportId}
              
              onSelectCategory={handleSelectCategory}
              onSelectPackage={handleSelectPackage}
              onToggleFeature={handleToggleFeature}
              onToggleInfrastructure={handleToggleInfrastructure}
              onSelectSupport={handleSelectSupport}
              onApplyPreset={handleApplyPreset}
              
              clientName={clientName}
              onClientNameChange={setClientName}
              businessName={businessName}
              onBusinessNameChange={setBusinessName}
              phone={phone}
              onPhoneChange={setPhone}
              email={email}
              onEmailChange={setEmail}
              callbackNotes={callbackNotes}
              onCallbackNotesChange={setCallbackNotes}
              
              onSubmitInquiry={handleSubmitInquiry}
              onPrintProposal={handlePrintProposal}
              
              budgetMode={budgetMode}
              onToggleBudgetMode={setBudgetMode}

              productInsertCount={productInsertCount}
              onProductInsertCountChange={setProductInsertCount}
              aiPhotoProductCount={aiPhotoProductCount}
              onAiPhotoProductCountChange={setAiPhotoProductCount}
              aiPhotoImagesPerProduct={aiPhotoImagesPerProduct}
              onAiPhotoImagesPerProductChange={setAiPhotoImagesPerProduct}
            />
          </div>

          {/* Right Column: Sticky Quote Builder sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <EstimatorSidebar
              activeStep={activeStep}
              onStepChange={setActiveStep}
              onReset={handleReset}
              
              selectedCategoryId={selectedCategoryId}
              selectedPackageId={selectedPackageId}
              selectedFeatures={selectedFeatures}
              selectedInfrastructure={selectedInfrastructure}
              selectedSupport={selectedSupport}
              
              budgetMode={budgetMode}
              budgetLimit={budgetLimit}
              onBudgetLimitChange={setBudgetLimit}
              onApplyRealityAlternative={handleApplyRealityAlternative}
              
              oneTimeTotal={oneTimeTotal}
              monthlyTotal={monthlyTotal}
              yearlyTotal={yearlyTotal}
              totalTimelineDays={totalTimelineDays}
            />
          </aside>

        </div>
      </main>

      {/* Client Terms Transparency Cards */}
      <div className="no-print">
        <ClientTerms />
      </div>

      {/* Why Choose Us Full-Width Section */}
      <div className="no-print">
        <WhyChooseUs />
      </div>

      {/* Footer Section */}
      <div className="no-print">
        <Footer />
      </div>

      {/* Hidden print-only proposal document */}
      <ProposalDoc
        clientName={clientName}
        businessName={businessName}
        phone={phone}
        email={email}
        selectedCategoryId={selectedCategoryId}
        selectedPackage={selectedPackage}
        selectedFeatures={selectedFeatures}
        selectedInfrastructure={selectedInfrastructure}
        selectedSupport={selectedSupport}
        oneTimeTotal={oneTimeTotal}
        monthlyTotal={monthlyTotal}
        yearlyTotal={yearlyTotal}
        totalTimelineDays={totalTimelineDays}
        productInsertCount={productInsertCount}
        aiPhotoProductCount={aiPhotoProductCount}
        aiPhotoImagesPerProduct={aiPhotoImagesPerProduct}
      />
    </div>
  );
}

export default App;
