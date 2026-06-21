import React from 'react';
import { Check, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { SHOPIFY_SERVICES, PRODUCT_UPLOAD_TIERS, ShopifyServiceItem, ProductUploadTier } from '../data/pricingData';

interface ShopifyServicesProps {
  selectedShopifyIds: string[];
  selectedUploadTierId: string | null;
  onToggleShopifyService: (service: ShopifyServiceItem) => void;
  onSelectUploadTier: (tier: ProductUploadTier | null) => void;
}

export const ShopifyServices: React.FC<ShopifyServicesProps> = ({
  selectedShopifyIds,
  selectedUploadTierId,
  onToggleShopifyService,
  onSelectUploadTier
}) => {
  return (
    <div className="space-y-8">
      <div className="text-left">
        <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-xs tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full mb-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          E-Commerce Specialized
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Shopify Store Services
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Looking for a Shopify specialist? Select from setup configurations, custom styling, or tiered product uploading services.
        </p>
      </div>

      {/* Desktop Table View / Mobile Card View */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Includes / Details</th>
                <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SHOPIFY_SERVICES.map((service) => {
                const isSelected = selectedShopifyIds.includes(service.id);
                return (
                  <tr key={service.id} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-indigo-50/10' : ''}`}>
                    <td className="p-5 font-semibold text-slate-900 font-display text-base">
                      {service.name}
                    </td>
                    <td className="p-5 text-slate-600 text-sm">
                      {service.features ? (
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feat, i) => (
                            <span key={i} className="inline-flex items-center text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium">
                              <Check className="w-3 h-3 text-emerald-500 mr-1 flex-shrink-0" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 font-light italic">Customized to project requirements</span>
                      )}
                    </td>
                    <td className="p-5 font-bold text-slate-900 font-display text-lg">
                      {service.priceDisplay}
                    </td>
                    <td className="p-5 text-right">
                      <button
                        type="button"
                        onClick={() => onToggleShopifyService(service)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            Add Service
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards (Visible only on mobile) */}
        <div className="md:hidden divide-y divide-slate-100">
          {SHOPIFY_SERVICES.map((service) => {
            const isSelected = selectedShopifyIds.includes(service.id);
            return (
              <div key={service.id} className={`p-5 space-y-4 ${isSelected ? 'bg-indigo-50/15' : ''}`}>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-slate-900 font-display text-base leading-tight">
                    {service.name}
                  </h3>
                  <span className="font-extrabold text-slate-900 text-right whitespace-nowrap">
                    {service.priceDisplay}
                  </span>
                </div>

                {service.features && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.features.map((feat, i) => (
                      <span key={i} className="inline-flex items-center text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {feat}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => onToggleShopifyService(service)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Added to Estimate
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      Add to Estimate
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Upload Tier Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 font-display text-lg">Product Upload Pricing</h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Need inventory uploading support? Select the estimated catalog size to include manual upload support.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRODUCT_UPLOAD_TIERS.map((tier) => {
            const isSelected = selectedUploadTierId === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => onSelectUploadTier(isSelected ? null : tier)}
                className={`p-4 rounded-xl border cursor-pointer text-center flex flex-col justify-between transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-600 bg-white ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Catalog</div>
                <div className="font-bold text-slate-800 text-sm mt-1">{tier.range}</div>
                <div className="font-extrabold text-indigo-600 text-base mt-2 font-display">
                  {tier.priceDisplay}
                </div>
                <div className="mt-3">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full border transition-all ${
                    isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white text-transparent'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
