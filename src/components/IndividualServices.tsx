import React, { useState } from 'react';
import { 
  Check, Minus, Plus,
  LayoutGrid, Mail, FileText, Users, Briefcase, Cpu, Smartphone, 
  ShieldAlert, Server, Webhook, ShoppingBag, LifeBuoy,
  Layout, FileCode, ClipboardSignature, Key, Inbox, Rss, FileType, 
  Lock, User, UserCheck, Package, Receipt, Megaphone, Calendar, 
  HelpCircle, Terminal, Play, Settings, Monitor, HardDrive, 
  Apple, Bell, UploadCloud, Globe, Send, Activity, AppWindow, 
  Wrench, RefreshCw, GitBranch, Network, ShieldCheck, MailOpen, 
  CreditCard, Truck, MapPin, MessageCircle, MessageSquare, Cloud, 
  Link, FileDown, Tag, Columns, AlertTriangle, PhoneCall, Presentation
} from 'lucide-react';
import { INDIVIDUAL_SERVICES, ServiceItem } from '../data/pricingData';

interface IndividualServicesProps {
  selectedIds: string[];
  onToggleService: (service: ServiceItem) => void;
  
  // Interactive page, language, and support hour counts
  additionalLanguagesCount: number;
  onAdditionalLanguagesChange: (count: number) => void;
  
  additionalStaticPagesCount: number;
  onAdditionalStaticPagesChange: (count: number) => void;
  
  additionalDynamicPagesCount: number;
  onAdditionalDynamicPagesChange: (count: number) => void;
  
  emailTemplatesCount: number;
  onEmailTemplatesChange: (count: number) => void;
  
  emergencySupportHours: number;
  onEmergencySupportHoursChange: (count: number) => void;
  
  bugFixingHours: number;
  onBugFixingHoursChange: (count: number) => void;
  
  consultationCallsCount: number;
  onConsultationCallsChange: (count: number) => void;
  
  trainingSessionsHours: number;
  onTrainingSessionsHoursChange: (count: number) => void;
}

// Map tabs to filter categories
const CATEGORY_TABS = [
  { id: 'pages', label: 'Pages & Content', icon: LayoutGrid },
  { id: 'email', label: 'Email & Comm', icon: Mail },
  { id: 'pdf', label: 'PDF Systems', icon: FileText },
  { id: 'users', label: 'User Mgmt', icon: Users },
  { id: 'business', label: 'Business Mod', icon: Briefcase },
  { id: 'automation', label: 'Automation & Desktop', icon: Cpu },
  { id: 'mobile_app', label: 'App Services', icon: Smartphone },
  { id: 'play_store', label: 'App Stores', icon: ShieldAlert },
  { id: 'devops', label: 'Server & DevOps', icon: Server },
  { id: 'integrations', label: 'API Integrations', icon: Webhook },
  { id: 'shopify', label: 'Shopify Add-ons', icon: ShoppingBag },
  { id: 'support', label: 'Support & Hours', icon: LifeBuoy }
] as const;

// Returns premium Lucide icon per service
const getServiceIcon = (id: string) => {
  switch (id) {
    case 'srv_page_static': return Layout;
    case 'srv_page_dynamic': return FileCode;
    case 'srv_cf': return Mail;
    case 'srv_cf_adv': return ClipboardSignature;
    case 'smtp_setup': return Key;
    case 'srv_email_tmpl': return Inbox;
    case 'srv_newsletter': return Rss;
    case 'srv_pdf_gen': return FileText;
    case 'srv_pdf_dyn': return FileType;
    case 'srv_auth': return Lock;
    case 'srv_user_profile': return User;
    case 'srv_roles': return UserCheck;
    case 'srv_crm': return Users;
    case 'srv_inv': return Package;
    case 'srv_invoice_sys': return Receipt;
    case 'srv_lead_mgr': return Megaphone;
    case 'srv_booking': return Calendar;
    case 'srv_ticket': return HelpCircle;
    case 'srv_auto_basic': return Terminal;
    case 'srv_auto_adv': return Play;
    case 'srv_auto_workflow': return Settings;
    case 'srv_desktop_electron': return Monitor;
    case 'srv_desktop_adv': return HardDrive;
    case 'srv_mob_android': return Smartphone;
    case 'srv_mob_ios': return Apple;
    case 'srv_push': return Bell;
    case 'srv_app_release': return UploadCloud;
    case 'srv_play_setup': return Globe;
    case 'srv_play_publish': return Send;
    case 'srv_play_maint': return Activity;
    case 'srv_app_publish': return AppWindow;
    case 'srv_app_maint': return Wrench;
    case 'srv_vps_setup': return Server;
    case 'srv_vps_migration': return RefreshCw;
    case 'srv_cicd': return GitBranch;
    case 'srv_domain_setup': return Globe;
    case 'srv_dns_config': return Network;
    case 'srv_ssl_setup': return ShieldCheck;
    case 'srv_email_server': return MailOpen;
    case 'srv_api_pg': return CreditCard;
    case 'srv_api_logistics': return Truck;
    case 'srv_api_gmaps': return MapPin;
    case 'srv_api_whatsapp': return MessageCircle;
    case 'srv_api_sms': return MessageSquare;
    case 'srv_api_msgraph': return Cloud;
    case 'srv_api_thirdparty': return Link;
    case 'srv_shop_import': return FileDown;
    case 'srv_shop_collection': return LayoutGrid;
    case 'srv_shop_shipping': return Truck;
    case 'srv_shop_discount': return Tag;
    case 'srv_shop_section': return Columns;
    case 'srv_shop_appfeat': return Wrench;
    case 'srv_support_emergency': return AlertTriangle;
    case 'srv_support_bugfix': return ShieldAlert;
    case 'srv_support_consultation': return PhoneCall;
    case 'srv_support_training': return Presentation;
    default: return Plus;
  }
};

// Maps categories to color styling systems
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
    case 'pages':
    case 'shopify':
      return {
        bg: 'bg-blue-50/30 hover:bg-blue-50/50 border-slate-200 hover:border-blue-300',
        badge: 'bg-blue-100 text-blue-800',
        iconBg: 'bg-blue-100 text-blue-600',
        textColor: 'text-slate-800',
        iconColor: 'text-blue-600'
      };
    case 'email':
    case 'integrations':
      return {
        bg: 'bg-emerald-50/30 hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-300',
        badge: 'bg-emerald-100 text-emerald-800',
        iconBg: 'bg-emerald-100 text-emerald-600',
        textColor: 'text-slate-800',
        iconColor: 'text-emerald-600'
      };
    case 'business':
    case 'support':
      return {
        bg: 'bg-amber-50/30 hover:bg-amber-50/50 border-slate-200 hover:border-amber-300',
        badge: 'bg-amber-100 text-amber-800',
        iconBg: 'bg-amber-100 text-amber-600',
        textColor: 'text-slate-800',
        iconColor: 'text-amber-600'
      };
    case 'devops':
    case 'play_store':
      return {
        bg: 'bg-rose-50/30 hover:bg-rose-50/50 border-slate-200 hover:border-rose-300',
        badge: 'bg-rose-100 text-rose-800',
        iconBg: 'bg-rose-100 text-rose-600',
        textColor: 'text-slate-800',
        iconColor: 'text-rose-600'
      };
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

export const IndividualServices: React.FC<IndividualServicesProps> = ({ 
  selectedIds, 
  onToggleService,
  additionalLanguagesCount,
  onAdditionalLanguagesChange,
  additionalStaticPagesCount,
  onAdditionalStaticPagesChange,
  additionalDynamicPagesCount,
  onAdditionalDynamicPagesChange,
  emailTemplatesCount,
  onEmailTemplatesChange,
  emergencySupportHours,
  onEmergencySupportHoursChange,
  bugFixingHours,
  onBugFixingHoursChange,
  consultationCallsCount,
  onConsultationCallsChange,
  trainingSessionsHours,
  onTrainingSessionsHoursChange
}) => {
  const [activeTab, setActiveTab] = useState<typeof CATEGORY_TABS[number]['id']>('pages');

  // Filters services matching the current active tab
  const filteredServices = INDIVIDUAL_SERVICES.filter(service => service.category === activeTab);

  // Helper render for quantity selector
  const renderCounter = (
    label: string,
    sub: string,
    value: number,
    onChange: (val: number) => void,
    minVal: number = 0
  ) => {
    return (
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="mt-3 p-2 rounded-xl border border-indigo-100 bg-white/90 flex items-center justify-between gap-1.5 shadow-sm"
      >
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{label}</span>
          <span className="text-[8px] font-bold text-slate-400">{sub}</span>
        </div>
        <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 shadow-inner overflow-hidden">
          <button
            type="button"
            onClick={() => onChange(Math.max(minVal, value - 1))}
            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-150 font-bold select-none"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <span className="w-5 text-center text-xs font-bold text-slate-800">
            {value}
          </span>
          <button
            type="button"
            onClick={() => onChange(value + 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-150 font-bold select-none"
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Individual Services & Add-ons
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Customize your project base. Select specific integrations, layouts, play store settings, or hourly support packages.
        </p>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {CATEGORY_TABS.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <TabIcon className="w-4 h-4 flex-shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredServices.map((service) => {
          const isSelected = selectedIds.includes(service.id);
          const IconComponent = getServiceIcon(service.id);
          const styles = getCategoryStyles(service.category, isSelected);

          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[12.5rem] h-auto ${styles.bg} ${
                isSelected ? 'ring-2 ring-indigo-600/10 shadow-md translate-y-[-2px]' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-650'
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

              <div className="mt-4 flex-grow flex flex-col justify-end">
                <h3 className="font-bold text-slate-800 text-sm leading-snug text-left">
                  {service.name}
                </h3>
                
                {service.description && (
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal text-left">
                    {service.description}
                  </p>
                )}

                {/* Sub Features Bullet List if available */}
                {service.features && (
                  <div className="flex flex-col gap-0.5 mt-1.5 text-[9px] text-slate-500 text-left pl-1 border-l border-slate-205">
                    {service.features.map((feat, idx) => (
                      <span key={idx}>• {feat}</span>
                    ))}
                  </div>
                )}

                {/* Render corresponding interactive selectors */}
                {isSelected && service.id === 'srv_page_static' && 
                  renderCounter("Static Pages:", "How many pages?", additionalStaticPagesCount, onAdditionalStaticPagesChange)}

                {isSelected && service.id === 'srv_page_dynamic' && 
                  renderCounter("Dynamic Pages:", "How many pages?", additionalDynamicPagesCount, onAdditionalDynamicPagesChange)}

                {isSelected && service.id === 'srv_email_tmpl' && 
                  renderCounter("Email Templates:", "How many templates?", emailTemplatesCount, onEmailTemplatesChange)}

                {isSelected && service.id === 'srv_support_emergency' && 
                  renderCounter("Emergency Hours:", "How many hours?", emergencySupportHours, onEmergencySupportHoursChange)}

                {isSelected && service.id === 'srv_support_bugfix' && 
                  renderCounter("Bugfix Hours:", "How many hours?", bugFixingHours, onBugFixingHoursChange)}

                {isSelected && service.id === 'srv_support_consultation' && 
                  renderCounter("Consultations:", "How many 30-min calls?", consultationCallsCount, onConsultationCallsChange)}

                {isSelected && service.id === 'srv_support_training' && 
                  renderCounter("Training Hours:", "How many hours?", trainingSessionsHours, onTrainingSessionsHoursChange)}

                {isSelected && service.id === 'srv_lang' && 
                  renderCounter("Extra Languages:", "Base includes 2", additionalLanguagesCount, onAdditionalLanguagesChange)}

                <div className="flex justify-between items-baseline mt-3 border-t border-slate-100/60 pt-2">
                  <span className="text-lg font-extrabold text-slate-900 font-display">
                    {service.priceDisplay}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
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
