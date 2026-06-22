import React from 'react';
import { 
  CorePackage, Feature, ThirdPartyService, MaintenanceTier, BRAND_INFO, CLIENT_RESPONSIBILITIES, THIRD_PARTY_COSTS
} from '../data/pricingData';

interface ProposalDocProps {
  clientName: string;
  businessName: string;
  phone: string;
  email: string;
  selectedCategoryId: string | null;
  selectedPackage: CorePackage | null;
  selectedFeatures: Feature[];
  selectedInfrastructure: ThirdPartyService[];
  selectedSupport: MaintenanceTier | null;
  
  oneTimeTotal: number;
  monthlyTotal: number;
  yearlyTotal: number;
  totalTimelineDays: number;

  productInsertCount: number;
  aiPhotoProductCount: number;
  aiPhotoImagesPerProduct: number;
}

export const ProposalDoc: React.FC<ProposalDocProps> = ({
  clientName,
  businessName,
  phone,
  email,
  selectedPackage,
  selectedFeatures,
  selectedInfrastructure,
  selectedSupport,
  oneTimeTotal,
  monthlyTotal,
  yearlyTotal,
  totalTimelineDays,
  productInsertCount,
  aiPhotoProductCount,
  aiPhotoImagesPerProduct
}) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const firstYearTotal = oneTimeTotal + (monthlyTotal * 12) + yearlyTotal;

  const dataEntryCost = productInsertCount * 40;
  const aiPhotoCost = aiPhotoProductCount > 0 
    ? aiPhotoProductCount * (100 + Math.max(0, aiPhotoImagesPerProduct - 2) * 40) 
    : 0;
  const coreDevCharges = oneTimeTotal - dataEntryCost - aiPhotoCost;

  // Timeline breakdown math
  const getTimelineBreakdown = () => {
    const T = totalTimelineDays;
    if (T <= 0) return { planning: 0, design: 0, development: 0, testing: 0, deployment: 0 };
    const planning = Math.max(1, Math.round(T * 0.1));
    const design = Math.max(1, Math.round(T * 0.15));
    const testing = Math.max(1, Math.round(T * 0.12));
    const deployment = Math.max(1, Math.round(T * 0.08));
    const development = Math.max(2, T - (planning + design + testing + deployment));
    return { planning, design, development, testing, deployment };
  };

  const timeline = getTimelineBreakdown();

  return (
    <div className="print-only bg-white text-slate-900 p-8 max-w-4xl mx-auto space-y-8 font-sans border border-slate-200 rounded-xl my-8">
      
      {/* Printable Header */}
      <div className="flex justify-between items-start border-b-2 border-indigo-600 pb-6">
        <div className="text-left space-y-1">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-lg font-extrabold font-display">
            HK
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950 font-display">
            {BRAND_INFO.name}
          </h1>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
            {BRAND_INFO.tagline}
          </span>
          <span className="text-xs text-slate-500 block">
            Email: {BRAND_INFO.contacts.email} | WhatsApp: {BRAND_INFO.contacts.phone}
          </span>
        </div>

        <div className="text-right space-y-1.5 pt-2">
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-indigo-200 tracking-wide">
            Software Proposal & Estimate
          </span>
          <span className="block text-xs text-slate-500">Date: {currentDate}</span>
          <span className="block text-xs font-bold text-slate-800">Proposal ID: #HK-{Math.floor(1000 + Math.random() * 9000)}</span>
        </div>
      </div>

      {/* Client Context Details */}
      <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
        <div className="text-left space-y-1">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">Prepared For:</span>
          <span className="text-sm font-extrabold text-slate-900 block">{clientName || "Valued Client"}</span>
          {businessName && <span className="text-slate-600 block">Business: {businessName}</span>}
          {phone && <span className="text-slate-600 block">Phone: {phone}</span>}
          {email && <span className="text-slate-600 block">Email: {email}</span>}
        </div>
        <div className="text-left space-y-1">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">Prepared By:</span>
          <span className="text-sm font-extrabold text-slate-900 block">Hardik Kanajariya</span>
          <span className="text-slate-600 block">Role: Full-Stack Developer</span>
          <span className="text-slate-600 block">Website: hardikkanajariya.in</span>
          <span className="text-slate-600 block">Gujarat, India</span>
        </div>
      </div>

      {/* Scope / Core Deliverables */}
      {selectedPackage && (
        <div className="space-y-3 text-left print-avoid-break">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            1. Core Package Scope & Deliverables
          </h3>
          <div className="space-y-1">
            <span className="font-extrabold text-slate-900 text-sm">{selectedPackage.name}</span>
            <p className="text-xs text-slate-500">{selectedPackage.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 pt-2">
            {selectedPackage.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start text-xs text-slate-700">
                <span className="text-indigo-600 mr-2 font-bold flex-shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Addon features */}
      {selectedFeatures.length > 0 && (
        <div className="space-y-3 text-left print-avoid-break">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            2. Selected Software Modules & Integrations
          </h3>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-2 px-1 font-bold text-slate-700">Feature Module</th>
                <th className="py-2 px-1 font-bold text-slate-700">Complexity</th>
                <th className="py-2 px-1 font-bold text-slate-700">Timeline Impact</th>
                <th className="py-2 px-1 font-bold text-slate-700 text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedFeatures.map((feat) => (
                <tr key={feat.id}>
                  <td className="py-2 px-1 font-semibold text-slate-900">
                    {feat.name}
                    <span className="block text-[10px] text-slate-400 font-light mt-0.5">{feat.description}</span>
                  </td>
                  <td className="py-2 px-1 capitalize text-slate-655">{feat.complexity}</td>
                  <td className="py-2 px-1 text-slate-655">+{feat.deliveryDays} Days</td>
                  <td className="py-2 px-1 text-right font-bold text-slate-805">
                    {formattedCurrency(feat.oneTimeCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Timeline Breakdown */}
      {totalTimelineDays > 0 && (
        <div className="space-y-3 text-left print-avoid-break">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
            3. Project Implementation Timeline
          </h3>
          <p className="text-xs text-slate-600">
            Total Estimated Timeline: <span className="font-extrabold">{totalTimelineDays} Working Days</span>. Classified breakdown stages:
          </p>
          <div className="grid grid-cols-5 text-center text-xs divide-x divide-slate-100 bg-slate-50 p-3 rounded-lg border border-slate-200/50">
            <div>
              <span className="block font-bold text-slate-700">Planning</span>
              <span className="text-slate-500 font-semibold">{timeline.planning} Days</span>
            </div>
            <div>
              <span className="block font-bold text-slate-700">Design</span>
              <span className="text-slate-500 font-semibold">{timeline.design} Days</span>
            </div>
            <div>
              <span className="block font-bold text-slate-700">Development</span>
              <span className="text-slate-505 font-bold text-indigo-650">{timeline.development} Days</span>
            </div>
            <div>
              <span className="block font-bold text-slate-700">Testing</span>
              <span className="text-slate-500 font-semibold">{timeline.testing} Days</span>
            </div>
            <div>
              <span className="block font-bold text-slate-700">Deployment</span>
              <span className="text-slate-500 font-semibold">{timeline.deployment} Days</span>
            </div>
          </div>
        </div>
      )}

      {/* Cost Categories Summary */}
      <div className="space-y-3 text-left print-avoid-break">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
          4. Cost Categories Summary Breakdown
        </h3>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="py-2 px-1 font-bold text-slate-700">Cost Category</th>
              <th className="py-2 px-1 font-bold text-slate-700">Billing Freq</th>
              <th className="py-2 px-1 font-bold text-slate-700 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2.5 px-1 font-semibold text-slate-900">One-Time Development Charges (Core + Features)</td>
              <td className="py-2.5 px-1 uppercase text-slate-500">Upon Deliveries</td>
              <td className="py-2.5 px-1 text-right font-extrabold text-slate-900">{formattedCurrency(coreDevCharges)}</td>
            </tr>
            {productInsertCount > 0 && (
              <tr>
                <td className="py-2.5 px-1 font-semibold text-slate-900">E-Commerce Product Data Entry ({productInsertCount} products)</td>
                <td className="py-2.5 px-1 uppercase text-slate-500">Content Services</td>
                <td className="py-2.5 px-1 text-right font-bold text-slate-800">{formattedCurrency(dataEntryCost)}</td>
              </tr>
            )}
            {aiPhotoProductCount > 0 && (
              <tr>
                <td className="py-2.5 px-1 font-semibold text-slate-900">AI Product Photography ({aiPhotoProductCount} products, {aiPhotoImagesPerProduct} img/prod)</td>
                <td className="py-2.5 px-1 uppercase text-slate-500">Content Services</td>
                <td className="py-2.5 px-1 text-right font-bold text-slate-800">{formattedCurrency(aiPhotoCost)}</td>
              </tr>
            )}
            {selectedSupport && (
              <tr>
                <td className="py-2.5 px-1 font-semibold text-slate-900">Maintenance Plan: {selectedSupport.name}</td>
                <td className="py-2.5 px-1 uppercase text-slate-500">Monthly Support</td>
                <td className="py-2.5 px-1 text-right font-bold text-slate-800">{formattedCurrency(selectedSupport.price)}/mo</td>
              </tr>
            )}
            {selectedInfrastructure.map((infra) => (
              <tr key={infra.id}>
                <td className="py-2.5 px-1 font-semibold text-slate-900">Third-Party: {infra.name}</td>
                <td className="py-2.5 px-1 uppercase text-slate-500">{infra.billing}</td>
                <td className="py-2.5 px-1 text-right font-bold text-slate-800">{infra.priceDisplay}</td>
              </tr>
            ))}
            <tr className="bg-indigo-50/20 font-bold border-t border-slate-200">
              <td className="py-3 px-1 text-indigo-700 text-sm">Estimated First-Year Cost Total</td>
              <td className="py-3 px-1 text-slate-500 text-[10px]">Dev + Hosting + Support</td>
              <td className="py-3 px-1 text-right text-indigo-700 text-sm">{formattedCurrency(firstYearTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Included vs Not Included Transparency Card */}
      <div className="grid grid-cols-2 gap-6 text-xs pt-4 border-t border-slate-100 print-avoid-break">
        
        {/* Included */}
        <div className="bg-emerald-50/10 border border-emerald-100/50 p-4 rounded-xl text-left space-y-2">
          <span className="font-bold text-emerald-800 uppercase tracking-wide block">
            Included in Development Cost:
          </span>
          <ul className="space-y-1">
            {["✓ Coding & Development", "✓ Quality Assurance Testing", "✓ Production Server Deployment", "✓ Basic Admin Panel Training", "✓ 30-Day Post Launch Support"].map((item, idx) => (
              <li key={idx} className="text-slate-655">{item}</li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div className="bg-amber-50/10 border border-amber-100/50 p-4 rounded-xl text-left space-y-2">
          <span className="font-bold text-amber-800 uppercase tracking-wide block">
            Not Included (Client Billed Directly):
          </span>
          <ul className="space-y-1">
            {THIRD_PARTY_COSTS.map((item, idx) => (
              <li key={idx} className="text-slate-655">✘ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assumptions */}
      <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-left text-xs space-y-2 print-avoid-break">
        <span className="font-bold text-slate-700 uppercase tracking-wide block">
          Client Deliverables & Assumptions:
        </span>
        <p className="text-slate-500 text-[11px] leading-normal">
          Hardik Kanajariya will build the predefined modular blocks. To maintain the project schedule, client must provide all relevant business brand assets:
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {CLIENT_RESPONSIBILITIES.map((item, idx) => (
            <span key={idx} className="font-semibold text-slate-700">• {item}</span>
          ))}
        </div>
      </div>

      {/* Terms & Footer */}
      <div className="pt-6 border-t border-slate-150 text-[10px] text-slate-450 leading-relaxed text-left space-y-2 print-avoid-break">
        <p>
          * Estimates are provisional based on pre-configured modules. Scope changes, addition of unlisted endpoints, or dynamic CMS logic changes after coding starts will impact quotes.
        </p>
        <p className="text-center font-semibold pt-4 text-slate-600">
          Thank you for considering {BRAND_INFO.name}. Generated via estimator.hardikkanajariya.in
        </p>
      </div>

    </div>
  );
};
