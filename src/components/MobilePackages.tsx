import React from 'react';
import { Check } from 'lucide-react';
import { MOBILE_PACKAGES, PricingPackage } from '../data/pricingData';

interface MobilePackagesProps {
  selectedId: string | null;
  onSelect: (pkg: PricingPackage) => void;
}

export const MobilePackages: React.FC<MobilePackagesProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="space-y-8">
      <div className="text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Mobile Application Packages
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Launch a mobile presence on Android or iOS. Built natively or using optimized hybrid frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOBILE_PACKAGES.map((pkg) => {
          const isSelected = selectedId === pkg.id;

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
              <div className="p-6 space-y-6 flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
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
                  {isSelected ? 'Selected Mobile App' : 'Select Mobile App'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
