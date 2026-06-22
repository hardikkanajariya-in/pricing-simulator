import React, { useState } from 'react';
import { Trash2, Calculator, ArrowRight, X, ChevronUp, ChevronDown } from 'lucide-react';
import { 
  PricingPackage, ServiceItem, ShopifyServiceItem, 
  HostingTier, MaintenanceTier 
} from '../data/pricingData';

interface QuoteBuilderProps {
  selectedWebsite: PricingPackage | null;
  selectedEcommerce: PricingPackage | null;
  selectedMobile: PricingPackage | null;
  selectedServices: ServiceItem[];
  selectedShopify: ShopifyServiceItem[];
  
  starterAdditionalPages: number;
  businessAdditionalPages: number;
  additionalLanguagesCount: number;
  
  // New service counters
  additionalStaticPagesCount: number;
  additionalDynamicPagesCount: number;
  emailTemplatesCount: number;
  emergencySupportHours: number;
  bugFixingHours: number;
  consultationCallsCount: number;
  trainingSessionsHours: number;
  
  // Shopify count-based items
  productInsertCount: number;
  aiPhotoProductCount: number;
  aiPhotoImagesPerProduct: number;
  
  selectedHosting: HostingTier | null;
  selectedMaintenance: MaintenanceTier | null;
  
  onRemoveWebsite: () => void;
  onRemoveEcommerce: () => void;
  onRemoveMobile: () => void;
  onRemoveService: (id: string) => void;
  onRemoveShopify: (id: string) => void;
  
  onRemoveStarterPages: () => void;
  onRemoveBusinessPages: () => void;
  onRemoveAdditionalLanguages: () => void;
  onRemoveAdditionalStaticPages: () => void;
  onRemoveAdditionalDynamicPages: () => void;
  onRemoveEmailTemplates: () => void;
  onRemoveEmergencySupport: () => void;
  onRemoveBugFixing: () => void;
  onRemoveConsultationCalls: () => void;
  onRemoveTrainingSessions: () => void;
  onRemoveProductInsert: () => void;
  onRemoveAiPhoto: () => void;
  
  onRemoveHosting: () => void;
  onRemoveMaintenance: () => void;
  onReset: () => void;
  onRequestQuote: () => void;
}

export const QuoteBuilder: React.FC<QuoteBuilderProps> = ({
  selectedWebsite,
  selectedEcommerce,
  selectedMobile,
  selectedServices,
  selectedShopify,
  
  starterAdditionalPages,
  businessAdditionalPages,
  additionalLanguagesCount,
  
  additionalStaticPagesCount,
  additionalDynamicPagesCount,
  emailTemplatesCount,
  emergencySupportHours,
  bugFixingHours,
  consultationCallsCount,
  trainingSessionsHours,
  
  productInsertCount,
  aiPhotoProductCount,
  aiPhotoImagesPerProduct,
  
  selectedHosting,
  selectedMaintenance,
  
  onRemoveWebsite,
  onRemoveEcommerce,
  onRemoveMobile,
  onRemoveService,
  onRemoveShopify,
  
  onRemoveStarterPages,
  onRemoveBusinessPages,
  onRemoveAdditionalLanguages,
  onRemoveAdditionalStaticPages,
  onRemoveAdditionalDynamicPages,
  onRemoveEmailTemplates,
  onRemoveEmergencySupport,
  onRemoveBugFixing,
  onRemoveConsultationCalls,
  onRemoveTrainingSessions,
  onRemoveProductInsert,
  onRemoveAiPhoto,
  
  onRemoveHosting,
  onRemoveMaintenance,
  onReset,
  onRequestQuote
}) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Calculates totals divided by billing categories
  const calculateTotals = () => {
    let oneTime = 0;
    let yearly = 0;
    let monthly = 0;
    let isCustomQuote = false;

    // Website package
    if (selectedWebsite) {
      oneTime += selectedWebsite.price;
      if (selectedWebsite.id === 'web_starter') {
        oneTime += starterAdditionalPages * 500;
      } else if (selectedWebsite.id === 'web_business') {
        oneTime += businessAdditionalPages * 500;
      }
    }

    // E-commerce package
    if (selectedEcommerce) {
      oneTime += selectedEcommerce.price;
      if (selectedEcommerce.id === 'eco_premium') {
        isCustomQuote = true; // "Starting at 75,000+"
      }
    }

    // Mobile package
    if (selectedMobile) {
      oneTime += selectedMobile.price;
    }
    
    // Add-on services
    selectedServices.forEach(s => {
      oneTime += s.price;
      if (s.id === 'srv_lang') {
        oneTime += additionalLanguagesCount * 2000;
      } else if (s.id === 'srv_page_static') {
        oneTime += additionalStaticPagesCount * 500;
      } else if (s.id === 'srv_page_dynamic') {
        oneTime += additionalDynamicPagesCount * 2000;
      } else if (s.id === 'srv_email_tmpl') {
        oneTime += emailTemplatesCount * 500;
      } else if (s.id === 'srv_support_emergency') {
        oneTime += emergencySupportHours * 1000;
      } else if (s.id === 'srv_support_bugfix') {
        oneTime += bugFixingHours * 500;
      } else if (s.id === 'srv_support_consultation') {
        oneTime += consultationCallsCount * 500;
      } else if (s.id === 'srv_support_training') {
        oneTime += trainingSessionsHours * 1000;
      }
    });

    // Shopify services
    selectedShopify.forEach(s => {
      oneTime += s.price;
    });

    // Dynamic data entry services (₹40 per product)
    oneTime += productInsertCount * 40;

    // Dynamic AI photography services (₹100 base for 2 images, ₹40 for each extra image)
    if (aiPhotoProductCount > 0) {
      const extraImages = Math.max(0, aiPhotoImagesPerProduct - 2);
      oneTime += aiPhotoProductCount * (100 + extraImages * 40);
    }

    // Hosting yearly
    if (selectedHosting) {
      yearly += selectedHosting.price;
    }

    // Maintenance monthly
    if (selectedMaintenance) {
      monthly += selectedMaintenance.price;
    }

    return { oneTime, yearly, monthly, isCustomQuote };
  };

  const { oneTime, yearly, monthly, isCustomQuote } = calculateTotals();
  
  const hasItems = !!(
    selectedWebsite || selectedEcommerce || selectedMobile || 
    selectedServices.length > 0 || selectedShopify.length > 0 || 
    productInsertCount > 0 || aiPhotoProductCount > 0 ||
    selectedHosting || selectedMaintenance
  );

  const formattedCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Shared inner list showing all currently selected items
  const SelectedItemsList = () => {
    return (
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        
        {/* Website Package */}
        {selectedWebsite && (
          <div className="space-y-1.5 bg-slate-50 border border-slate-200 p-2.5 rounded-lg">
            <div className="flex justify-between items-start text-xs group">
              <div className="space-y-0.5 text-left">
                <span className="font-bold text-slate-900">{selectedWebsite.name}</span>
                <span className="block text-[10px] text-slate-400">Website Foundation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">{formattedCurrency(selectedWebsite.price)}</span>
                <button onClick={onRemoveWebsite} className="text-slate-400 hover:text-red-500 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            {/* Additional Pages detail */}
            {selectedWebsite.id === 'web_starter' && starterAdditionalPages > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {starterAdditionalPages} Additional Pages</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(starterAdditionalPages * 500)}</span>
                  <button onClick={onRemoveStarterPages} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
            
            {selectedWebsite.id === 'web_business' && businessAdditionalPages > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {businessAdditionalPages} Additional Pages</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(businessAdditionalPages * 500)}</span>
                  <button onClick={onRemoveBusinessPages} className="text-slate-455 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* E-commerce Package */}
        {selectedEcommerce && (
          <div className="flex justify-between items-start text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg group">
            <div className="space-y-0.5 text-left">
              <span className="font-bold text-slate-900">{selectedEcommerce.name}</span>
              <span className="block text-[10px] text-slate-400">E-Commerce Foundation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{selectedEcommerce.priceDisplay}</span>
              <button onClick={onRemoveEcommerce} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile App Package */}
        {selectedMobile && (
          <div className="flex justify-between items-start text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg group">
            <div className="space-y-0.5 text-left">
              <span className="font-bold text-slate-900">{selectedMobile.name}</span>
              <span className="block text-[10px] text-slate-400">Mobile App Foundation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{formattedCurrency(selectedMobile.price)}</span>
              <button onClick={onRemoveMobile} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Add-on Services */}
        {selectedServices.map(service => (
          <div key={service.id} className="space-y-1.5 bg-slate-50 border border-slate-200 p-2.5 rounded-lg">
            <div className="flex justify-between items-start text-xs group">
              <div className="space-y-0.5 pr-2 text-left">
                <span className="font-bold text-slate-900 leading-tight">{service.name}</span>
                <span className="block text-[10px] text-slate-400">Add-on service</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">{formattedCurrency(service.price)}</span>
                <button onClick={() => onRemoveService(service.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            {/* Multi-language extra languages detail */}
            {service.id === 'srv_lang' && additionalLanguagesCount > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {additionalLanguagesCount} Additional Languages</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(additionalLanguagesCount * 2000)}</span>
                  <button onClick={onRemoveAdditionalLanguages} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Static pages detail */}
            {service.id === 'srv_page_static' && additionalStaticPagesCount > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {additionalStaticPagesCount} Static Pages</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(additionalStaticPagesCount * 500)}</span>
                  <button onClick={onRemoveAdditionalStaticPages} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic pages detail */}
            {service.id === 'srv_page_dynamic' && additionalDynamicPagesCount > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {additionalDynamicPagesCount} Dynamic Pages</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(additionalDynamicPagesCount * 2000)}</span>
                  <button onClick={onRemoveAdditionalDynamicPages} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Email templates detail */}
            {service.id === 'srv_email_tmpl' && emailTemplatesCount > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {emailTemplatesCount} Templates</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(emailTemplatesCount * 500)}</span>
                  <button onClick={onRemoveEmailTemplates} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Emergency support detail */}
            {service.id === 'srv_support_emergency' && emergencySupportHours > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {emergencySupportHours} Hours Support</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(emergencySupportHours * 1000)}</span>
                  <button onClick={onRemoveEmergencySupport} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Bug fixing detail */}
            {service.id === 'srv_support_bugfix' && bugFixingHours > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {bugFixingHours} Hours Fixing</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(bugFixingHours * 500)}</span>
                  <button onClick={onRemoveBugFixing} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Consultation calls detail */}
            {service.id === 'srv_support_consultation' && consultationCallsCount > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {consultationCallsCount} Sessions</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(consultationCallsCount * 500)}</span>
                  <button onClick={onRemoveConsultationCalls} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Training sessions detail */}
            {service.id === 'srv_support_training' && trainingSessionsHours > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 pl-3 border-l-2 border-indigo-200">
                <span>+ {trainingSessionsHours} Hours Training</span>
                <div className="flex items-center gap-1.5">
                  <span>{formattedCurrency(trainingSessionsHours * 1000)}</span>
                  <button onClick={onRemoveTrainingSessions} className="text-slate-450 hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        ))}

        {/* Shopify Services */}
        {selectedShopify.map(service => (
          <div key={service.id} className="flex justify-between items-start text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg group">
            <div className="space-y-0.5 pr-2 text-left">
              <span className="font-bold text-slate-900 leading-tight">{service.name}</span>
              <span className="block text-[10px] text-slate-400">Shopify service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{formattedCurrency(service.price)}</span>
              <button onClick={() => onRemoveShopify(service.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Dynamic Product Data Entry */}
        {productInsertCount > 0 && (
          <div className="flex justify-between items-start text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg group">
            <div className="space-y-0.5 text-left">
              <span className="font-bold text-slate-900">Product Data Entry ({productInsertCount} items)</span>
              <span className="block text-[10px] text-slate-400">₹40 per product (No min)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{formattedCurrency(productInsertCount * 40)}</span>
              <button onClick={onRemoveProductInsert} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic AI Product Photography */}
        {aiPhotoProductCount > 0 && (
          <div className="flex justify-between items-start text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg group">
            <div className="space-y-0.5 text-left">
              <span className="font-bold text-slate-900">AI Product Photos ({aiPhotoProductCount} items)</span>
              <span className="block text-[10px] text-slate-400">{aiPhotoImagesPerProduct} images/product</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                {formattedCurrency(
                  aiPhotoProductCount * (100 + Math.max(0, aiPhotoImagesPerProduct - 2) * 40)
                )}
              </span>
              <button onClick={onRemoveAiPhoto} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Hosting option */}
        {selectedHosting && (
          <div className="flex justify-between items-start text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg group">
            <div className="space-y-0.5 text-left">
              <span className="font-bold text-slate-900">{selectedHosting.name}</span>
              <span className="block text-[10px] text-slate-400">Hosting plan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{formattedCurrency(selectedHosting.price)}<span className="text-[10px] text-slate-400 font-normal">/yr</span></span>
              <button onClick={onRemoveHosting} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Maintenance option */}
        {selectedMaintenance && (
          <div className="flex justify-between items-start text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg group">
            <div className="space-y-0.5 text-left">
              <span className="font-bold text-slate-900">{selectedMaintenance.name}</span>
              <span className="block text-[10px] text-slate-400">Maintenance plan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-805">{formattedCurrency(selectedMaintenance.price)}<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
              <button onClick={onRemoveMaintenance} className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sticky Panel */}
      <div className="hidden lg:block sticky top-6 bg-white border border-slate-200 rounded-2xl shadow-premium p-6 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg font-display flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-650" />
            Quote Builder
          </h3>
          {hasItems && (
            <button 
              onClick={onReset}
              className="text-xs text-slate-400 hover:text-red-500 font-semibold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {!hasItems ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <Calculator className="w-6 h-6" />
            </div>
            <p className="text-slate-400 text-sm font-light">Your quote is empty.</p>
            <p className="text-slate-500 text-xs leading-normal px-4 text-center">
              Select packages, custom integrations, hosting, and data options above to build your live price estimate.
            </p>
          </div>
        ) : (
          <>
            {/* Scrollable list of items */}
            <SelectedItemsList />

            <div className="border-t border-slate-100 pt-4 space-y-3.5">
              {/* One time total */}
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate-500 font-semibold">One-Time Setup:</span>
                <span className="text-xl font-extrabold text-slate-900 font-display">
                  {formattedCurrency(oneTime)}{isCustomQuote ? '+' : ''}
                </span>
              </div>

              {/* Yearly Hosting total */}
              {yearly > 0 && (
                <div className="flex justify-between items-baseline border-t border-slate-50 pt-2">
                  <span className="text-xs text-slate-550">Yearly Hosting:</span>
                  <span className="text-sm font-bold text-slate-700 font-display">
                    {formattedCurrency(yearly)} <span className="text-[10px] text-slate-405 font-normal">/ year</span>
                  </span>
                </div>
              )}

              {/* Monthly Maintenance total */}
              {monthly > 0 && (
                <div className="flex justify-between items-baseline border-t border-slate-50 pt-2">
                  <span className="text-xs text-slate-550">Monthly Support:</span>
                  <span className="text-sm font-bold text-slate-700 font-display">
                    {formattedCurrency(monthly)} <span className="text-[10px] text-slate-405 font-normal">/ month</span>
                  </span>
                </div>
              )}

              <div className="border-t border-slate-100 pt-4" />

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={onRequestQuote}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-650 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/10 transition-all duration-200"
                >
                  Request Detailed Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[10px] text-slate-400 text-center leading-normal">
                  Estimates are provisional based on requirements. Final quote will be shared after discussion.
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Sticky Drawer Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl transition-all duration-300">
        {/* Minimized bar containing summary */}
        <div 
          onClick={() => hasItems && setIsMobileExpanded(!isMobileExpanded)}
          className="flex justify-between items-center py-4 px-5 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Calculator className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Project Estimate</div>
              <div className="font-extrabold text-slate-900 text-base font-display">
                {formattedCurrency(oneTime)}{isCustomQuote ? '+' : ''}
                {monthly > 0 && <span className="text-xs text-slate-500 font-normal"> + {formattedCurrency(monthly)}/mo</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasItems ? (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestQuote();
                  }}
                  className="bg-indigo-600 hover:bg-indigo-650 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-md"
                >
                  Get Quote
                </button>
                <div className="text-slate-450">
                  {isMobileExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </div>
              </>
            ) : (
              <span className="text-xs text-slate-400 italic">Empty Quote</span>
            )}
          </div>
        </div>

        {/* Expanded drawer breakdown list */}
        {isMobileExpanded && hasItems && (
          <div className="border-t border-slate-100 bg-white px-5 pb-6 pt-3 space-y-5 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Breakdown of Selected Items</span>
              <button 
                onClick={onReset} 
                className="text-[11px] text-red-500 font-semibold flex items-center gap-0.5"
              >
                <Trash2 className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Render items list */}
            <SelectedItemsList />

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-505 font-medium">One-Time Setup Total:</span>
                <span className="text-lg font-extrabold text-slate-900 font-display">
                  {formattedCurrency(oneTime)}{isCustomQuote ? '+' : ''}
                </span>
              </div>
              
              {yearly > 0 && (
                <div className="flex justify-between items-baseline border-t border-slate-55 pt-1.5">
                  <span className="text-xs text-slate-505">Yearly Hosting:</span>
                  <span className="text-xs font-bold text-slate-700">
                    {formattedCurrency(yearly)} / year
                  </span>
                </div>
              )}

              {monthly > 0 && (
                <div className="flex justify-between items-baseline border-t border-slate-55 pt-1.5">
                  <span className="text-xs text-slate-505">Monthly Support & Maintenance:</span>
                  <span className="text-xs font-bold text-slate-700">
                    {formattedCurrency(monthly)} / month
                  </span>
                </div>
              )}

              <button
                onClick={onRequestQuote}
                className="w-full flex items-center justify-center gap-2 bg-indigo-650 hover:bg-indigo-650/90 text-white font-bold py-3 px-4 rounded-xl shadow-lg text-sm mt-3"
              >
                Request Detailed Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
