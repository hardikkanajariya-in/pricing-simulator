import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, Download, PhoneCall, Sparkles, Send, Check,
  Megaphone, Briefcase, LayoutGrid, ShoppingBag, Layers, Users, Settings, Package, Smartphone, Monitor, Wrench, Cpu, Brain,
  Database, Plus, Minus, Trash2, Image, AlertTriangle
} from 'lucide-react';

const Icons = {
  HelpCircle, CheckCircle2, Download, PhoneCall, Sparkles, Send, Check,
  Megaphone, Briefcase, LayoutGrid, ShoppingBag, Layers, Users, Settings, Package, Smartphone, Monitor, Wrench, Cpu, Brain,
  Database, Plus, Minus, Trash2, Image, AlertTriangle
};

import {
  Feature, ProjectPreset,
  CORE_CATEGORIES, CORE_PACKAGES, FEATURES, THIRD_PARTY_SERVICES, SUPPORT_TIERS, PROJECT_TYPE_PRESETS
} from '../data/pricingData';

interface WizardStepsProps {
  activeStep: number;
  selectedCategoryId: string | null;
  selectedPackageId: string | null;
  selectedFeatureIds: string[];
  selectedInfrastructureIds: string[];
  selectedSupportId: string;

  onSelectCategory: (categoryId: string) => void;
  onSelectPackage: (packageId: string | null) => void;
  onToggleFeature: (feature: Feature) => void;
  onToggleInfrastructure: (infraId: string) => void;
  onSelectSupport: (supportId: string) => void;
  onApplyPreset: (preset: ProjectPreset) => void;

  // Lead info
  clientName: string;
  onClientNameChange: (val: string) => void;
  businessName: string;
  onBusinessNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  callbackNotes: string;
  onCallbackNotesChange: (val: string) => void;

  onSubmitInquiry: (e: React.FormEvent) => void;
  onPrintProposal: () => void;

  // Budget helper
  budgetMode: boolean;
  onToggleBudgetMode: (active: boolean) => void;

  // Re-added calculators
  productInsertCount: number;
  onProductInsertCountChange: (count: number) => void;
  aiPhotoProductCount: number;
  onAiPhotoProductCountChange: (count: number) => void;
  aiPhotoImagesPerProduct: number;
  onAiPhotoImagesPerProductChange: (count: number) => void;
}

// Icon helper
const RenderIcon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export const WizardSteps: React.FC<WizardStepsProps> = ({
  activeStep,
  selectedCategoryId,
  selectedPackageId,
  selectedFeatureIds,
  selectedInfrastructureIds,
  selectedSupportId,
  onSelectCategory,
  onSelectPackage,
  onToggleFeature,
  onToggleInfrastructure,
  onSelectSupport,
  onApplyPreset,
  clientName,
  onClientNameChange,
  businessName,
  onBusinessNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  callbackNotes,
  onCallbackNotesChange,
  onSubmitInquiry,
  onPrintProposal,
  budgetMode,
  onToggleBudgetMode,
  productInsertCount,
  onProductInsertCountChange,
  aiPhotoProductCount,
  onAiPhotoProductCountChange,
  aiPhotoImagesPerProduct,
  onAiPhotoImagesPerProductChange
}) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<string>('Security & Users');

  const selectedCategory = CORE_CATEGORIES.find(c => c.id === selectedCategoryId);

  // Render Step 1: Category & Presets
  const renderStep1 = () => (
    <div className="space-y-10">

      {/* Budget mode toggle header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Step 1: Choose Your Project Type
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Select a project template or customize one from scratch.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => onToggleBudgetMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!budgetMode
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            Build Custom
          </button>
          <button
            type="button"
            onClick={() => onToggleBudgetMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${budgetMode
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
              }`}
          >
            Build Within Budget
          </button>
        </div>
      </div>

      {/* Quick Start Presets */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider text-left">
          🚀 Quick Start Presets
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {PROJECT_TYPE_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onApplyPreset(preset)}
              className="p-3.5 bg-white border border-slate-205 rounded-xl cursor-pointer hover:border-indigo-400 hover:shadow-sm hover:scale-[1.01] transition-all duration-200 text-left flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <RenderIcon name={preset.icon} className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {preset.name}
                </span>
              </div>
              <span className="text-[10px] text-indigo-600 font-semibold group-hover:underline">
                Load Preset →
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6" />

      {/* Core Custom Categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider text-left">
          ⚙️ Customize From Scratch
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CORE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-5 rounded-2xl border cursor-pointer flex gap-4 transition-all duration-200 ${isSelected
                    ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-350 hover:shadow-sm'
                  }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                  <RenderIcon name={cat.icon} className="w-6 h-6" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                    {cat.name}
                  </h4>
                  <p className="text-slate-500 text-xs leading-normal">
                    {cat.description}
                  </p>
                  <span className="inline-block text-[10px] font-bold text-slate-600">
                    Starting from ₹{cat.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Render Step 2: Plan Selection
  const renderStep2 = () => {
    const packages = CORE_PACKAGES.filter(p => p.categoryId === selectedCategoryId);
    return (
      <div className="space-y-6">
        <div className="text-left border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Step 2: Select Base Package
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Plan tiers available for <span className="font-bold text-slate-700">{selectedCategory?.name}</span>.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
            Please go back to Step 1 and select a product type.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;

              // Get confidence color
              const getConfColor = (level: string) => {
                if (level === 'high') return 'bg-emerald-100 text-emerald-800 border-emerald-250';
                if (level === 'medium') return 'bg-amber-100 text-amber-800 border-amber-250';
                return 'bg-red-100 text-red-800 border-red-250';
              };

              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`p-6 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all duration-300 ${isSelected
                      ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-lg translate-y-[-4px]'
                      : 'border-slate-200 bg-white hover:border-slate-350 hover:shadow-md'
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg font-display text-left">
                        {pkg.name}
                      </h4>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${getConfColor(pkg.confidence)}`}>
                        {pkg.confidence === 'high' ? 'High Confidence' : pkg.confidence === 'medium' ? 'Medium Confidence' : 'Discovery Required'}
                      </span>
                    </div>

                    <p className="text-slate-500 text-xs text-left leading-normal min-h-[36px]">
                      {pkg.description}
                    </p>

                    <div className="flex items-baseline text-slate-900 border-b border-slate-100 pb-3">
                      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                        {pkg.priceDisplay}
                      </span>
                      <span className="ml-1.5 text-xs text-slate-600 font-semibold uppercase">one-time</span>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 text-left">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Included Scope Deliverables:
                      </span>
                      <ul className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                        {pkg.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start text-xs text-slate-600 leading-tight">
                            <Icons.CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold mt-6 transition-all ${isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                  >
                    {isSelected ? 'Active Plan Selected' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Render Step 3: Add Features
  const renderStep3 = () => {
    // Unique feature categories
    const categories = [...Array.from(new Set(FEATURES.map(f => f.category))), 'Data & Content'];
    const filteredFeatures = FEATURES.filter(f => f.category === activeFeatureTab);

    const formatCurrencyLocal = (value: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(value);
    };

    const isDataEntryActive = productInsertCount > 0;
    const isAiPhotoActive = aiPhotoProductCount > 0;

    const calculateAiPhotoCostLocal = () => {
      if (aiPhotoProductCount <= 0) return 0;
      const extraImages = Math.max(0, aiPhotoImagesPerProduct - 2);
      return aiPhotoProductCount * (100 + extraImages * 40);
    };

    return (
      <div className="space-y-6">
        <div className="text-left border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Step 3: Architect Features
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Add optional modules to your product. Dependencies will resolve automatically.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFeatureTab(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${activeFeatureTab === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feature Cards Grid or Custom Calculators */}
        {activeFeatureTab === 'Data & Content' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Dynamic Product Data Entry Card */}
            <div className={`border rounded-2xl p-5 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm text-left ${isDataEntryActive
                ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10'
                : 'border-slate-200 bg-white hover:border-slate-350'
              }`}>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDataEntryActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                      <Icons.Database className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">Product Data Entry</h3>
                  </div>
                  {isDataEntryActive && (
                    <span className="inline-flex items-center gap-1 text-[9px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Active
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs leading-normal">
                  Manual product listing, catalog inserting, and formatting. Cost is <span className="font-bold text-slate-700">₹40 per product</span>.
                </p>
              </div>

              {!isDataEntryActive ? (
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onProductInsertCountChange(10)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 flex items-center justify-center gap-1.5 transition-all duration-200"
                  >
                    <Icons.Plus className="w-3.5 h-3.5" />
                    Add Data Entry Support
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider">Number of Products</span>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => onProductInsertCountChange(Math.max(1, productInsertCount - 5))}
                        className="w-8 h-8 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-l-lg flex items-center justify-center font-bold transition-colors"
                      >
                        <Icons.Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={productInsertCount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          onProductInsertCountChange(isNaN(val) ? 1 : Math.max(1, val));
                        }}
                        className="w-12 h-8 border-y border-slate-200 text-center text-xs font-bold text-slate-800 focus:outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => onProductInsertCountChange(productInsertCount + 5)}
                        className="w-8 h-8 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-r-lg flex items-center justify-center font-bold transition-colors"
                      >
                        <Icons.Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-left font-sans">
                      <span className="block text-[9px] text-slate-600 font-semibold uppercase tracking-wider">Subtotal</span>
                      <span className="text-base font-extrabold text-indigo-600 font-display">
                        {formatCurrencyLocal(productInsertCount * 40)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onProductInsertCountChange(0)}
                      className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Icons.Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic AI Product Photography Card */}
            <div className={`border rounded-2xl p-5 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm text-left ${isAiPhotoActive
                ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10'
                : 'border-slate-200 bg-white hover:border-slate-350'
              }`}>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isAiPhotoActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-605'
                      }`}>
                      <Icons.Image className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">AI Product Photography</h3>
                  </div>
                  {isAiPhotoActive && (
                    <span className="inline-flex items-center gap-1 text-[9px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Active
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs leading-normal">
                  Studio AI model photography. <span className="font-bold text-slate-700">₹100/product</span> (2 images). Extra images: <span className="font-bold text-slate-700">₹40 each</span>.
                </p>
              </div>

              {!isAiPhotoActive ? (
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      onAiPhotoProductCountChange(5);
                      onAiPhotoImagesPerProductChange(2);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 flex items-center justify-center gap-1.5 transition-all duration-200"
                  >
                    <Icons.Plus className="w-3.5 h-3.5" />
                    Add AI Photography Support
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex gap-4 justify-between items-center">

                    {/* Products count */}
                    <div className="space-y-1">
                      <span className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider">Products</span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => onAiPhotoProductCountChange(Math.max(1, aiPhotoProductCount - 1))}
                          className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-l-lg flex items-center justify-center font-bold transition-colors"
                        >
                          <Icons.Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={aiPhotoProductCount}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            onAiPhotoProductCountChange(isNaN(val) ? 1 : Math.max(1, val));
                          }}
                          className="w-10 h-8 border-y border-slate-200 text-center text-xs font-bold text-slate-800 focus:outline-none bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => onAiPhotoProductCountChange(aiPhotoProductCount + 1)}
                          className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-r-lg flex items-center justify-center font-bold transition-colors"
                        >
                          <Icons.Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Images per product */}
                    <div className="space-y-1">
                      <span className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider">Img/Product</span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => onAiPhotoImagesPerProductChange(Math.max(2, aiPhotoImagesPerProduct - 1))}
                          className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-l-lg flex items-center justify-center font-bold transition-colors"
                        >
                          <Icons.Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="2"
                          value={aiPhotoImagesPerProduct}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            onAiPhotoImagesPerProductChange(isNaN(val) ? 2 : Math.max(2, val));
                          }}
                          className="w-10 h-8 border-y border-slate-200 text-center text-xs font-bold text-slate-800 focus:outline-none bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => onAiPhotoImagesPerProductChange(aiPhotoImagesPerProduct + 1)}
                          className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-r-lg flex items-center justify-center font-bold transition-colors"
                        >
                          <Icons.Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-left font-sans">
                      <span className="block text-[9px] text-slate-600 font-semibold uppercase tracking-wider">Subtotal</span>
                      <span className="text-base font-extrabold text-indigo-600 font-display">
                        {formatCurrencyLocal(calculateAiPhotoCostLocal())}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onAiPhotoProductCountChange(0);
                        onAiPhotoImagesPerProductChange(2);
                      }}
                      className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Icons.Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredFeatures.map((feat) => {
              const isChecked = selectedFeatureIds.includes(feat.id);
              return (
                <div
                  key={feat.id}
                  onClick={() => onToggleFeature(feat)}
                  className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between gap-4 text-left transition-all duration-200 ${isChecked
                      ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                        {feat.name}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs leading-normal">
                      {feat.description}
                    </p>

                    {/* Dependency Alerts */}
                    {feat.dependencies && feat.dependencies.length > 0 && (
                      <div className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                        <Icons.AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Requires: {feat.dependencies.map(dId => FEATURES.find(f => f.id === dId)?.name).join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                    <div className="flex gap-2">
                      <span className="inline-flex items-center text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                        +{feat.deliveryDays} Days
                      </span>
                      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded uppercase ${feat.complexity === 'small' ? 'bg-blue-50 text-blue-700' : feat.complexity === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {feat.complexity}
                      </span>
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm font-display">
                      +₹{feat.oneTimeCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Render Step 4: Infrastructure & Third Party
  const renderStep4 = () => {
    return (
      <div className="space-y-6">
        <div className="text-left border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Step 4: Infrastructure & Third-Party Licences
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Configure servers, custom workspaces, and domains. Recurring costs are billed directly to providers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THIRD_PARTY_SERVICES.map((service) => {
            const isChecked = selectedInfrastructureIds.includes(service.id);
            return (
              <div
                key={service.id}
                onClick={() => onToggleInfrastructure(service.id)}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between gap-4 transition-all duration-200 text-left ${isChecked
                    ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
              >
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 text-xs sm:text-sm block">
                    {service.name}
                  </span>
                  <p className="text-slate-500 text-[11px] leading-normal">
                    {service.description}
                  </p>
                  <span className="inline-block text-[10px] text-slate-600 font-semibold uppercase tracking-wider">
                    {service.billing} cost
                  </span>
                </div>

                <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm whitespace-nowrap">
                    {service.priceDisplay}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Step 5: Support & Maintenance Tiers
  const renderStep5 = () => {
    return (
      <div className="space-y-6">
        <div className="text-left border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Step 5: Maintenance & Support SLA
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Choose a support tier. Protect your product from security leaks, server failures, and backup losses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUPPORT_TIERS.map((tier) => {
            const isSelected = selectedSupportId === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => onSelectSupport(tier.id)}
                className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between gap-4 transition-all duration-200 text-left ${isSelected
                    ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-350'
                  }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {tier.name}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="text-2xl font-extrabold text-slate-900 font-display">
                    {tier.priceDisplay}
                  </div>

                  {tier.features && (
                    <ul className="space-y-2 border-t border-slate-100 pt-3">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Icons.Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Step 6: Proposal Summary & Client Details
  const renderStep6 = () => {
    // Generate benefits
    const activePreset = PROJECT_TYPE_PRESETS.find(p => p.packageId === selectedPackageId);
    const benefits = activePreset?.expectedBenefits || [
      "Improve your client communication efficiency",
      "Robust modern design built to load within milliseconds",
      "Direct WhatsApp inquiries capture",
      "Predefined module structure ensuring 0 hidden fees"
    ];

    return (
      <div className="space-y-10">
        <div className="text-left border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Step 6: Review & Finalize Proposal
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Your project estimation is complete. Export your client-ready proposal or request a briefing call.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-900 to-slate-900 -z-10" />
          <h3 className="font-bold text-base sm:text-lg text-white font-display flex items-center gap-2">
            <Icons.CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Expected Project Benefits & Outcomes
          </h3>
          <p className="text-xs text-slate-400 leading-normal">
            Clients buy business outcomes, not just technology. This implementation will unlock:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                <Icons.Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-200 text-left">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proposal Exports Control */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl text-left space-y-4">
          <h3 className="font-bold text-slate-900 text-base font-display">
            Export Scope & Quote
          </h3>
          <p className="text-slate-500 text-xs">
            Generate and save a clean PDF contract estimation for your internal records:
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onPrintProposal}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-colors"
            >
              <Icons.Download className="w-4 h-4" />
              Download PDF Proposal
            </button>
          </div>
        </div>

        {/* Lead Capture form */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl text-left space-y-4">
          <h3 className="font-bold text-slate-900 text-base font-display flex items-center gap-2">
            <Icons.PhoneCall className="w-4.5 h-4.5 text-indigo-600" />
            Want a Personalized Quote?
          </h3>
          <p className="text-slate-500 text-xs leading-normal">
            Enter your details below to schedule a briefing call. We will review your requirements and provide a finalized proposal within 24 hours.
          </p>

          <form onSubmit={onSubmitInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="client_name" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                id="client_name"
                type="text"
                required
                placeholder="e.g. Hardik Patel"
                value={clientName}
                onChange={(e) => onClientNameChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="client_biz" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Business Name
              </label>
              <input
                id="client_biz"
                type="text"
                placeholder="e.g. Patel Textiles, Surat"
                value={businessName}
                onChange={(e) => onBusinessNameChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="client_phone" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Phone / WhatsApp *
              </label>
              <input
                id="client_phone"
                type="text"
                required
                placeholder="e.g. +91 99999 88888"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="client_email" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                id="client_email"
                type="email"
                placeholder="e.g. contact@business.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="client_notes" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Brief Project Notes (Deadlines, reference sites, etc.)
              </label>
              <textarea
                id="client_notes"
                rows={3}
                placeholder="Any other specific requests?"
                value={callbackNotes}
                onChange={(e) => onCallbackNotesChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 resize-none"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors"
              >
                <Icons.Send className="w-4 h-4" />
                Submit Callback & WhatsApp Inquiry
              </button>
            </div>
          </form>
        </div>

      </div>
    );
  };

  switch (activeStep) {
    case 1: return renderStep1();
    case 2: return renderStep2();
    case 3: return renderStep3();
    case 4: return renderStep4();
    case 5: return renderStep5();
    case 6: return renderStep6();
    default: return renderStep1();
  }
};
