import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { WEBSITE_PACKAGES, PricingPackage } from '../data/pricingData';

interface WebsitePackagesProps {
  selectedId: string | null;
  onSelect: (pkg: PricingPackage) => void;
}

export const WebsitePackages: React.FC<WebsitePackagesProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="space-y-8">
      <div className="text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Website Packages
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Choose a website foundation that fits your current business scale and goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEBSITE_PACKAGES.map((pkg) => {
          const isSelected = selectedId === pkg.id;
          const isFeatured = pkg.id === 'web_business'; // "Best for Growing Businesses" is featured

          return (
            <div
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className={`relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-600/10 shadow-lg translate-y-[-4px]'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Highlight badge for Featured Package */}
              {isFeatured && (
                <div className="absolute top-0 right-0 left-0 bg-indigo-600 text-white text-xs font-bold text-center py-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 fill-current" />
                  Most Popular Setup
                </div>
              )}

              <div className={`p-6 ${isFeatured ? 'pt-10' : ''} space-y-6 flex-grow`}>
                <div>
                  {pkg.badge && (
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isFeatured 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-3">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 min-h-[32px] leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="mt-4 flex items-baseline text-slate-900">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
                      {pkg.priceDisplay}
                    </span>
                    <span className="ml-1 text-xs text-slate-500 font-medium">one-time</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-4" />

                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-slate-600 leading-tight">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(pkg);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isSelected ? 'Selected Foundation' : 'Select Foundation'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
