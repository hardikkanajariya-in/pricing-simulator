import React from 'react';
import { 
  Calculator, ArrowLeft, ArrowRight, Trash2, AlertTriangle, ShieldCheck, HelpCircle, AlertCircle
} from 'lucide-react';
import { 
  Feature, ThirdPartyService, MaintenanceTier, CORE_PACKAGES
} from '../data/pricingData';

interface EstimatorSidebarProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  onReset: () => void;
  
  // Selected state
  selectedCategoryId: string | null;
  selectedPackageId: string | null;
  selectedFeatures: Feature[];
  selectedInfrastructure: ThirdPartyService[];
  selectedSupport: MaintenanceTier | null;
  
  // Budget mode
  budgetMode: boolean;
  budgetLimit: number;
  onBudgetLimitChange: (val: number) => void;
  onApplyRealityAlternative: (categoryId: string, packageId: string, featureIds: string[]) => void;
  
  // Totals calculated from App
  oneTimeTotal: number;
  monthlyTotal: number;
  yearlyTotal: number;
  totalTimelineDays: number;
}

export const EstimatorSidebar: React.FC<EstimatorSidebarProps> = ({
  activeStep,
  onStepChange,
  onReset,
  selectedCategoryId,
  selectedPackageId,
  selectedFeatures,
  budgetMode,
  budgetLimit,
  onBudgetLimitChange,
  onApplyRealityAlternative,
  oneTimeTotal,
  monthlyTotal,
  yearlyTotal,
  totalTimelineDays
}) => {

  // 1. Determine Project Scope
  const getProjectScope = () => {
    if (oneTimeTotal === 0) return "Not Started";
    if (oneTimeTotal < 15000) return "Small Project";
    if (oneTimeTotal < 40000) return "Medium Project";
    if (oneTimeTotal < 80000) return "Large Project";
    return "Enterprise Project";
  };

  // 2. Determine Confidence Level
  const getConfidenceLevel = () => {
    if (!selectedPackageId) return { label: 'Scope Unselected', color: 'bg-slate-100 text-slate-600 border-slate-200', icon: HelpCircle };
    
    // Find active package
    const activePkg = CORE_PACKAGES.find(p => p.id === selectedPackageId);
    if (!activePkg) return { label: 'Scope Unselected', color: 'bg-slate-105 text-slate-600 border-slate-200', icon: HelpCircle };

    let confidence: 'high' | 'medium' | 'discovery' = activePkg.confidence;

    // Elevate to lower confidence if heavy features exist
    const hasEnterpriseFeats = selectedFeatures.some(f => f.complexity === 'large' || f.id === 'feat_chatbot');
    if (hasEnterpriseFeats && confidence === 'high') {
      confidence = 'medium';
    }
    if (selectedFeatures.some(f => f.id === 'feat_dyn_pdf') && confidence !== 'discovery') {
      confidence = 'medium';
    }
    if (selectedCategoryId === 'ai' || selectedCategoryId === 'custom' && activePkg.id === 'cust_enterprise') {
      confidence = 'discovery';
    }

    if (confidence === 'high') {
      return {
        label: 'High Confidence (Fixed Scope)',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: ShieldCheck
      };
    } else if (confidence === 'medium') {
      return {
        label: 'Medium Confidence (Varies ±10%)',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: AlertTriangle
      };
    } else {
      return {
        label: 'Discovery Required (Custom Features)',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
        icon: AlertCircle
      };
    }
  };

  const confidenceLevel = getConfidenceLevel();
  const ConfidenceIcon = confidenceLevel.icon;

  // 3. Timeline Breakdown Engine
  const calculateTimelineBreakdown = () => {
    const T = totalTimelineDays;
    if (T <= 0) return { planning: 0, design: 0, development: 0, testing: 0, deployment: 0 };
    
    const planning = Math.max(1, Math.round(T * 0.1));
    const design = Math.max(1, Math.round(T * 0.15));
    const testing = Math.max(1, Math.round(T * 0.12));
    const deployment = Math.max(1, Math.round(T * 0.08));
    
    // Dev gets the remainder
    const development = Math.max(2, T - (planning + design + testing + deployment));

    return { planning, design, development, testing, deployment };
  };

  const timelineBreakdown = calculateTimelineBreakdown();

  // 4. Cost Categories Breakdown
  const firstYearTotal = oneTimeTotal + (monthlyTotal * 12) + yearlyTotal;

  // 5. Budget Gap Analysis & Reality Check Alternative Recommendation
  const hasBudgetGap = budgetMode && oneTimeTotal > budgetLimit;
  const budgetGap = oneTimeTotal - budgetLimit;

  // Determine alternative suggestion
  const getRealityAlternative = () => {
    if (selectedCategoryId === 'ecommerce') {
      return {
        name: "Business Website + WhatsApp Orders",
        cost: 17000,
        description: "Fits under budget. Includes WhatsApp alerts, Google Sheets CMS, and contact form.",
        categoryId: "web",
        packageId: "web_business",
        featureIds: ["feat_cf", "feat_whatsapp"]
      };
    } else if (selectedCategoryId === 'mobile') {
      return {
        name: "Business Web Catalog",
        cost: 15000,
        description: "Save ~₹35k. Provide a web-based responsive portal before building store app.",
        categoryId: "web",
        packageId: "web_business",
        featureIds: ["feat_cf"]
      };
    } else {
      return {
        name: "Starter Website & Contact Form",
        cost: 8000,
        description: "Save development charges. Fits standard service representation.",
        categoryId: "web",
        packageId: "web_starter",
        featureIds: ["feat_cf"]
      };
    }
  };

  const alternative = getRealityAlternative();

  const formattedCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white border border-slate-205 rounded-2xl shadow-premium p-6 space-y-6 text-left">
      
      {/* Wizard Progress Header */}
      <div className="space-y-3">
        <div className="flex justify-between items-center pb-3 border-b border-slate-105">
          <h3 className="font-bold text-slate-900 text-lg font-display flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            Estimator Sidebar
          </h3>
          {selectedCategoryId && (
            <button 
              onClick={onReset}
              className="text-xs text-slate-400 hover:text-red-500 font-semibold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Wizard Steps indicator */}
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-bold">Step {activeStep} of 6</span>
          <span className="font-medium text-slate-600">
            {activeStep === 1 && "Category Select"}
            {activeStep === 2 && "Plan Choice"}
            {activeStep === 3 && "Feature Scope"}
            {activeStep === 4 && "Infrastructure"}
            {activeStep === 5 && "Support Level"}
            {activeStep === 6 && "Summary & Proposal"}
          </span>
        </div>

        {/* Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${(activeStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Scope Classification & Confidence Level */}
      {selectedCategoryId && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Project Scope:</span>
            <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wide">
              {getProjectScope()}
            </span>
          </div>

          <div className={`flex items-start gap-1.5 p-2 rounded-lg border text-[11px] font-semibold leading-snug ${confidenceLevel.color}`}>
            <ConfidenceIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{confidenceLevel.label}</span>
          </div>
        </div>
      )}

      {/* Budget Reality Check input */}
      {budgetMode && (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Client Budget Limit:</span>
            <input 
              type="number"
              min="5000"
              step="5000"
              value={budgetLimit}
              onChange={(e) => onBudgetLimitChange(parseInt(e.target.value) || 0)}
              className="w-24 px-2 py-1 text-xs border border-slate-200 rounded font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Budget Reality Gap analysis */}
          {hasBudgetGap && (
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-start gap-1.5 text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200 font-medium">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Budget Gap: +{formattedCurrency(budgetGap)}</span>
                  <p className="text-[10px] text-red-600 mt-0.5">Selection exceeds client budget.</p>
                </div>
              </div>

              {/* Reality check alternative suggestion */}
              <div className="p-2.5 bg-indigo-50/50 border border-indigo-200/50 rounded-lg text-left space-y-2">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                  Recommended Reality-Check Alternative:
                </span>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">{alternative.name}</span>
                  <p className="text-[10px] text-slate-500 leading-normal">{alternative.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onApplyRealityAlternative(alternative.categoryId, alternative.packageId, alternative.featureIds)}
                  className="w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded transition-all"
                >
                  Switch to Recommended Fit ({formattedCurrency(alternative.cost)})
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cost Categories */}
      {selectedCategoryId && (
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400 font-semibold uppercase">Development Cost:</span>
            <span className="text-base font-extrabold text-slate-900 font-display">
              {formattedCurrency(oneTimeTotal)}
            </span>
          </div>

          {monthlyTotal > 0 && (
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400 font-semibold uppercase">Monthly Cost:</span>
              <span className="text-sm font-bold text-slate-800">
                {formattedCurrency(monthlyTotal)} <span className="text-[9px] text-slate-400 font-normal">/mo</span>
              </span>
            </div>
          )}

          {yearlyTotal > 0 && (
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400 font-semibold uppercase">Yearly Cost:</span>
              <span className="text-sm font-bold text-slate-800">
                {formattedCurrency(yearlyTotal)} <span className="text-[9px] text-slate-400 font-normal">/yr</span>
              </span>
            </div>
          )}

          <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">First-Year Total:</span>
              <span className="text-[9px] text-slate-400 font-semibold leading-none">Dev + Hosting + Support</span>
            </div>
            <span className="text-lg font-extrabold text-indigo-600 font-display">
              {formattedCurrency(firstYearTotal)}
            </span>
          </div>
        </div>
      )}

      {/* Timeline Breakdown */}
      {selectedCategoryId && totalTimelineDays > 0 && (
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Delivery Time:</span>
            <span className="text-xs font-extrabold text-slate-900">{totalTimelineDays} Working Days</span>
          </div>

          {/* Classified breakdown visual bar */}
          <div className="grid grid-cols-5 h-2.5 rounded-full overflow-hidden border border-slate-100">
            <div className="bg-blue-400 h-full" title={`Planning: ${timelineBreakdown.planning} days`} style={{ flexGrow: timelineBreakdown.planning }} />
            <div className="bg-purple-400 h-full" title={`Design: ${timelineBreakdown.design} days`} style={{ flexGrow: timelineBreakdown.design }} />
            <div className="bg-indigo-500 h-full" title={`Development: ${timelineBreakdown.development} days`} style={{ flexGrow: timelineBreakdown.development }} />
            <div className="bg-amber-400 h-full" title={`Testing: ${timelineBreakdown.testing} days`} style={{ flexGrow: timelineBreakdown.testing }} />
            <div className="bg-emerald-400 h-full" title={`Deployment: ${timelineBreakdown.deployment} days`} style={{ flexGrow: timelineBreakdown.deployment }} />
          </div>

          {/* Legend detailing the specific days */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] text-slate-500 pt-1 font-semibold leading-snug">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Planning: {timelineBreakdown.planning}d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Design: {timelineBreakdown.design}d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Development: {timelineBreakdown.development}d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Testing: {timelineBreakdown.testing}d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Deployment: {timelineBreakdown.deployment}d</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 border-t border-slate-100 pt-4">
        {activeStep > 1 && (
          <button
            type="button"
            onClick={() => onStepChange(activeStep - 1)}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-200 transition-all text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        {activeStep < 6 ? (
          <button
            type="button"
            disabled={!selectedCategoryId}
            onClick={() => onStepChange(activeStep + 1)}
            className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl shadow transition-all text-xs ${
              selectedCategoryId
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
            }`}
          >
            Next Step
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : null}
      </div>

    </div>
  );
};
