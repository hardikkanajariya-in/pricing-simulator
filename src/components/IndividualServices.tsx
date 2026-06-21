import React from 'react';
import { 
  CreditCard, Truck, Layers, MessageCircle, Mail, Inbox, 
  Key, BarChart4, Search, Globe, BookOpen, Sliders, 
  Package, Users, Languages, Bot, Plus, Check 
} from 'lucide-react';
import { INDIVIDUAL_SERVICES, ServiceItem } from '../data/pricingData';

interface IndividualServicesProps {
  selectedIds: string[];
  onToggleService: (service: ServiceItem) => void;
}

// Maps service IDs to corresponding premium Lucide icons
const getServiceIcon = (id: string) => {
  switch (id) {
    case 'srv_pg': return CreditCard;
    case 'srv_log': return Truck;
    case 'srv_pg_log_bundle': return Layers;
    case 'srv_wa': return MessageCircle;
    case 'srv_cf': return Mail;
    case 'srv_email': return Inbox;
    case 'srv_otp': return Key;
    case 'srv_ga': return BarChart4;
    case 'srv_sc': return Search;
    case 'srv_seo': return Globe;
    case 'srv_blog': return BookOpen;
    case 'srv_admin': return Sliders;
    case 'srv_inv': return Package;
    case 'srv_crm': return Users;
    case 'srv_lang': return Languages;
    case 'srv_chatbot': return Bot;
    default: return Plus;
  }
};

// Maps categories to premium theme styles
const getCategoryStyles = (category: string, isSelected: boolean) => {
  if (isSelected) {
    return {
      bg: 'bg-indigo-50/70 border-indigo-600',
      badge: 'bg-indigo-600 text-white',
      iconBg: 'bg-indigo-600 text-white',
      textColor: 'text-indigo-900',
      iconColor: 'text-indigo-600'
    };
  }

  switch (category) {
    case 'integration':
      return {
        bg: 'bg-blue-50/30 hover:bg-blue-50/50 border-slate-200 hover:border-blue-300',
        badge: 'bg-blue-100 text-blue-800',
        iconBg: 'bg-blue-100 text-blue-600',
        textColor: 'text-slate-800',
        iconColor: 'text-blue-600'
      };
    case 'marketing':
      return {
        bg: 'bg-emerald-50/30 hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-300',
        badge: 'bg-emerald-100 text-emerald-800',
        iconBg: 'bg-emerald-100 text-emerald-600',
        textColor: 'text-slate-800',
        iconColor: 'text-emerald-600'
      };
    case 'system':
      return {
        bg: 'bg-amber-50/30 hover:bg-amber-50/50 border-slate-200 hover:border-amber-300',
        badge: 'bg-amber-100 text-amber-800',
        iconBg: 'bg-amber-100 text-amber-600',
        textColor: 'text-slate-800',
        iconColor: 'text-amber-600'
      };
    case 'other':
    default:
      return {
        bg: 'bg-purple-50/30 hover:bg-purple-50/50 border-slate-200 hover:border-purple-300',
        badge: 'bg-purple-100 text-purple-800',
        iconBg: 'bg-purple-100 text-purple-600',
        textColor: 'text-slate-800',
        iconColor: 'text-purple-600'
      };
  }
};

export const IndividualServices: React.FC<IndividualServicesProps> = ({ selectedIds, onToggleService }) => {
  return (
    <div className="space-y-8">
      <div className="text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Individual Services & Addons
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Customize your project base. Select specific integrations, backend systems, and marketing setups to add to your quote.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INDIVIDUAL_SERVICES.map((service) => {
          const isSelected = selectedIds.includes(service.id);
          const IconComponent = getServiceIcon(service.id);
          const styles = getCategoryStyles(service.category, isSelected);

          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 ${styles.bg} ${
                isSelected ? 'ring-2 ring-indigo-600/10 shadow-sm' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'border-slate-300 bg-white text-transparent hover:border-slate-400'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">
                  {service.name}
                </h3>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-lg font-bold text-slate-900 font-display">
                    {service.priceDisplay}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
