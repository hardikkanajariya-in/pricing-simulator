import React from 'react';
import { Check, Plus, Minus, Trash2, ShoppingBag, Database, Image } from 'lucide-react';
import { SHOPIFY_SERVICES, ShopifyServiceItem } from '../data/pricingData';

interface ShopifyServicesProps {
  selectedShopifyIds: string[];
  onToggleShopifyService: (service: ShopifyServiceItem) => void;
  
  productInsertCount: number;
  onProductInsertCountChange: (count: number) => void;
  
  aiPhotoProductCount: number;
  onAiPhotoProductCountChange: (count: number) => void;
  
  aiPhotoImagesPerProduct: number;
  onAiPhotoImagesPerProductChange: (count: number) => void;
}

export const ShopifyServices: React.FC<ShopifyServicesProps> = ({
  selectedShopifyIds,
  onToggleShopifyService,
  productInsertCount,
  onProductInsertCountChange,
  aiPhotoProductCount,
  onAiPhotoProductCountChange,
  aiPhotoImagesPerProduct,
  onAiPhotoImagesPerProductChange
}) => {
  
  // Calculate AI photography cost
  const calculateAiPhotoCost = () => {
    if (aiPhotoProductCount <= 0) return 0;
    const extraImages = Math.max(0, aiPhotoImagesPerProduct - 2);
    return aiPhotoProductCount * (100 + extraImages * 40);
  };

  const formattedCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const isDataEntryActive = productInsertCount > 0;
  const isAiPhotoActive = aiPhotoProductCount > 0;

  return (
    <div className="space-y-8">
      <div className="text-left">
        <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-xs tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full mb-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          E-Commerce Specialized
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Shopify & Data Services
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Looking for a Shopify specialist? Select from setup configurations, customization, or dynamic product cataloging.
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

      {/* Catalog & Content Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Dynamic Product Data Entry Card */}
        <div className={`border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm ${
          isDataEntryActive 
            ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10' 
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isDataEntryActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 font-display text-base">E-Commerce Product Data Entry</h3>
              </div>
              {isDataEntryActive && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Check className="w-3 h-3 stroke-[3]" />
                  Active
                </span>
              )}
            </div>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Manual product listing, catalog inserting, and formatting. Cost is <span className="font-bold text-slate-850">₹40 per product</span> with no minimum threshold.
            </p>
          </div>

          {!isDataEntryActive ? (
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onProductInsertCountChange(10)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Data Entry Support
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Number of Products</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => onProductInsertCountChange(Math.max(1, productInsertCount - 5))}
                    className="w-10 h-10 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-l-xl flex items-center justify-center font-bold transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={productInsertCount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      onProductInsertCountChange(isNaN(val) ? 1 : Math.max(1, val));
                    }}
                    className="w-20 h-10 border-y border-slate-200 text-center text-sm font-bold text-slate-800 focus:outline-none bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => onProductInsertCountChange(productInsertCount + 5)}
                    className="w-10 h-10 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-r-xl flex items-center justify-center font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end justify-between h-full space-y-2">
                <div className="text-left sm:text-right space-y-0.5">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Subtotal</span>
                  <span className="text-xl font-extrabold text-indigo-600 font-display">
                    {formattedCurrency(productInsertCount * 40)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onProductInsertCountChange(0)}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove Service
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic AI Product Photography Card */}
        <div className={`border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm ${
          isAiPhotoActive 
            ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10' 
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isAiPhotoActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Image className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 font-display text-base">AI Product Photography & Editing</h3>
              </div>
              {isAiPhotoActive && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Check className="w-3 h-3 stroke-[3]" />
                  Active
                </span>
              )}
            </div>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Studio-grade AI model photography. <span className="font-bold text-slate-850">₹100 per product</span> (includes 2 images). Additional images cost <span className="font-bold text-slate-850">₹40 each</span>.
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
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add AI Photography Support
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                
                {/* Products count */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Products Count</span>
                  <div className="flex items-center bg-white rounded-xl">
                    <button
                      type="button"
                      onClick={() => onAiPhotoProductCountChange(Math.max(1, aiPhotoProductCount - 1))}
                      className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-l-lg flex items-center justify-center font-bold select-none transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={aiPhotoProductCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onAiPhotoProductCountChange(isNaN(val) ? 1 : Math.max(1, val));
                      }}
                      className="w-12 h-8 border-y border-slate-200 text-center text-xs font-bold text-slate-805 focus:outline-none bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => onAiPhotoProductCountChange(aiPhotoProductCount + 1)}
                      className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-r-lg flex items-center justify-center font-bold select-none transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Images per product */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Images Per Product</span>
                  <div className="flex items-center bg-white rounded-xl">
                    <button
                      type="button"
                      onClick={() => onAiPhotoImagesPerProductChange(Math.max(2, aiPhotoImagesPerProduct - 1))}
                      className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-l-lg flex items-center justify-center font-bold select-none transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      min="2"
                      value={aiPhotoImagesPerProduct}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onAiPhotoImagesPerProductChange(isNaN(val) ? 2 : Math.max(2, val));
                      }}
                      className="w-12 h-8 border-y border-slate-200 text-center text-xs font-bold text-slate-805 focus:outline-none bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => onAiPhotoImagesPerProductChange(aiPhotoImagesPerProduct + 1)}
                      className="w-8 h-8 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-r-lg flex items-center justify-center font-bold select-none transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-0.5 self-end">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Subtotal</span>
                  <span className="text-xl font-extrabold text-indigo-600 font-display">
                    {formattedCurrency(calculateAiPhotoCost())}
                  </span>
                </div>
              </div>

              {/* Remove Service Trigger */}
              <div className="flex justify-end pt-2 border-t border-slate-100/50">
                <button
                  type="button"
                  onClick={() => {
                    onAiPhotoProductCountChange(0);
                    onAiPhotoImagesPerProductChange(2);
                  }}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove Service
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
