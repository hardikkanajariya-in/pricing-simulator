import React, { useState } from 'react';
import { X, Send, Copy, Mail, CheckCircle } from 'lucide-react';
import { 
  PricingPackage, ServiceItem, ShopifyServiceItem, 
  HostingTier, MaintenanceTier, BRAND_INFO 
} from '../data/pricingData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  selectedWebsite: PricingPackage | null;
  selectedEcommerce: PricingPackage | null;
  selectedMobile: PricingPackage | null;
  selectedServices: ServiceItem[];
  selectedShopify: ShopifyServiceItem[];
  
  productInsertCount: number;
  aiPhotoProductCount: number;
  aiPhotoImagesPerProduct: number;
  
  selectedHosting: HostingTier | null;
  selectedMaintenance: MaintenanceTier | null;
  
  oneTimeTotal: number;
  yearlyTotal: number;
  monthlyTotal: number;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  selectedWebsite,
  selectedEcommerce,
  selectedMobile,
  selectedServices,
  selectedShopify,
  
  productInsertCount,
  aiPhotoProductCount,
  aiPhotoImagesPerProduct,
  
  selectedHosting,
  selectedMaintenance,
  oneTimeTotal,
  yearlyTotal,
  monthlyTotal
}) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formattedCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Helper to compile text summary
  const generateSummaryText = () => {
    let text = `*PROJECT QUOTE ESTIMATE FOR HARDIK KANAJARIYA*\n`;
    text += `=====================================\n`;
    text += `*Client Details:*\n`;
    text += `• Name: ${name || 'N/A'}\n`;
    if (businessName) text += `• Business: ${businessName}\n`;
    text += `• Phone: ${phone || 'N/A'}\n`;
    if (notes) text += `• Details: ${notes}\n\n`;
    
    text += `*Selected Configurations:*\n`;
    if (selectedWebsite) text += `• Website Package: ${selectedWebsite.name} (${selectedWebsite.priceDisplay})\n`;
    if (selectedEcommerce) text += `• E-Commerce Package: ${selectedEcommerce.name} (${selectedEcommerce.priceDisplay})\n`;
    if (selectedMobile) text += `• Mobile Package: ${selectedMobile.name} (${selectedMobile.priceDisplay})\n`;
    
    if (selectedServices.length > 0) {
      text += `• Add-ons:\n`;
      selectedServices.forEach(s => {
        text += `  - ${s.name} (${s.priceDisplay})\n`;
      });
    }

    if (selectedShopify.length > 0) {
      text += `• Shopify Services:\n`;
      selectedShopify.forEach(s => {
        text += `  - ${s.name} (${s.priceDisplay})\n`;
      });
    }

    if (productInsertCount > 0) {
      text += `• Product Data Entry: ${productInsertCount} products @ ₹40/product (${formattedCurrency(productInsertCount * 40)})\n`;
    }

    if (aiPhotoProductCount > 0) {
      const extraImages = Math.max(0, aiPhotoImagesPerProduct - 2);
      const cost = aiPhotoProductCount * (100 + extraImages * 40);
      text += `• AI Product Photography: ${aiPhotoProductCount} products, ${aiPhotoImagesPerProduct} imgs/prod (${formattedCurrency(cost)})\n`;
    }

    if (selectedHosting) {
      text += `• Hosting Plan: ${selectedHosting.name} (${selectedHosting.priceDisplay})\n`;
    }

    if (selectedMaintenance) {
      text += `• Support Plan: ${selectedMaintenance.name} (${selectedMaintenance.priceDisplay})\n`;
    }

    text += `\n*Pricing Summary:*\n`;
    text += `• One-Time Setup: ${formattedCurrency(oneTimeTotal)}\n`;
    if (yearlyTotal > 0) text += `• Yearly Hosting: ${formattedCurrency(yearlyTotal)}/year\n`;
    if (monthlyTotal > 0) text += `• Monthly Support: ${formattedCurrency(monthlyTotal)}/month\n`;
    text += `=====================================\n`;
    text += `Generated via hardikkanajariya.in`;
    return text;
  };

  const handleCopy = () => {
    const text = generateSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }
    const text = encodeURIComponent(generateSummaryText());
    const waUrl = `${BRAND_INFO.contacts.whatsapp}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Project Estimate Request - Hardik Kanajariya");
    const body = encodeURIComponent(generateSummaryText());
    window.open(`mailto:${BRAND_INFO.contacts.email}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh]">
        {/* Left column - Lead Capture Form */}
        <form onSubmit={handleWhatsApp} className="p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg font-display">Let's Get Started</h3>
              <button 
                type="button" 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Enter your contact details to submit this configuration and begin discussing your software project.
            </p>

            <div className="space-y-3">
              <div>
                <label htmlFor="modal_name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  id="modal_name"
                  type="text"
                  required
                  placeholder="e.g. Hardik Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="modal_biz" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Name
                </label>
                <input
                  id="modal_biz"
                  type="text"
                  placeholder="e.g. Patel Textiles, Surat"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="modal_phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="modal_phone"
                  type="text"
                  required
                  placeholder="e.g. +91 99999 88888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="modal_notes" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brief Project Requirements
                </label>
                <textarea
                  id="modal_notes"
                  rows={3}
                  placeholder="Any specific features, reference sites, or deadlines?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/10 transition-all text-sm"
            >
              <Send className="w-4 h-4" />
              Send Quote via WhatsApp
            </button>
          </div>
        </form>

        {/* Right column - Pricing Breakdown & Actions */}
        <div className="bg-slate-50 p-6 md:w-1/2 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-wider font-display">Estimate Breakdown</h4>
              <button 
                type="button" 
                onClick={onClose} 
                className="hidden lg:flex text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-100 max-h-[220px] overflow-y-auto pr-1">
              {selectedWebsite && (
                <div className="flex justify-between py-2 text-slate-600">
                  <span>{selectedWebsite.name}</span>
                  <span className="font-bold text-slate-800">{selectedWebsite.priceDisplay}</span>
                </div>
              )}
              {selectedEcommerce && (
                <div className="flex justify-between py-2 text-slate-600">
                  <span>{selectedEcommerce.name}</span>
                  <span className="font-bold text-slate-800">{selectedEcommerce.priceDisplay}</span>
                </div>
              )}
              {selectedMobile && (
                <div className="flex justify-between py-2 text-slate-600">
                  <span>{selectedMobile.name}</span>
                  <span className="font-bold text-slate-800">{selectedMobile.priceDisplay}</span>
                </div>
              )}
              {selectedServices.map(s => (
                <div key={s.id} className="flex justify-between py-2 text-slate-600">
                  <span>{s.name}</span>
                  <span className="font-bold text-slate-800">{s.priceDisplay}</span>
                </div>
              ))}
              {selectedShopify.map(s => (
                <div key={s.id} className="flex justify-between py-2 text-slate-600">
                  <span>{s.name}</span>
                  <span className="font-bold text-slate-800">{s.priceDisplay}</span>
                </div>
              ))}
              {productInsertCount > 0 && (
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Product Data Entry ({productInsertCount} items)</span>
                  <span className="font-bold text-slate-800">{formattedCurrency(productInsertCount * 40)}</span>
                </div>
              )}
              {aiPhotoProductCount > 0 && (
                <div className="flex justify-between py-2 text-slate-600">
                  <span>AI Product Photos ({aiPhotoProductCount} items, {aiPhotoImagesPerProduct} imgs/ea)</span>
                  <span className="font-bold text-slate-800">
                    {formattedCurrency(
                      aiPhotoProductCount * (100 + Math.max(0, aiPhotoImagesPerProduct - 2) * 40)
                    )}
                  </span>
                </div>
              )}
              {selectedHosting && (
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Hosting: {selectedHosting.name}</span>
                  <span className="font-bold text-slate-800">{selectedHosting.priceDisplay}</span>
                </div>
              )}
              {selectedMaintenance && (
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Support: {selectedMaintenance.name}</span>
                  <span className="font-bold text-slate-800">{selectedMaintenance.priceDisplay}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 mt-4 space-y-4">
            <div className="space-y-1.5 text-right">
              <div className="text-xs text-slate-400 font-medium">One-Time Setup Total:</div>
              <div className="text-2xl font-extrabold text-slate-900 font-display">
                {formattedCurrency(oneTimeTotal)}
              </div>
              {yearlyTotal > 0 && (
                <div className="text-xs text-slate-500 font-medium">
                  Yearly hosting: <span className="font-bold">{formattedCurrency(yearlyTotal)}</span>
                </div>
              )}
              {monthlyTotal > 0 && (
                <div className="text-xs text-slate-500 font-medium">
                  Monthly support: <span className="font-bold">{formattedCurrency(monthlyTotal)}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Copied Summary
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Summary
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleEmail}
                className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all"
              >
                <Mail className="w-4 h-4" />
                Email Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
