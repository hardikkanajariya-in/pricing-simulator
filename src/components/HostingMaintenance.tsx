import React from 'react';
import { Server, Cloud, HardDrive, ShieldCheck, Activity, Flame, Trash2, Plus } from 'lucide-react';
import { 
  HOSTING_OPTIONS, MAINTENANCE_OPTIONS, 
  HostingTier, MaintenanceTier 
} from '../data/pricingData';

interface HostingMaintenanceProps {
  selectedHostingId: string | null;
  selectedMaintenanceId: string | null;
  onSelectHosting: (tier: HostingTier | null) => void;
  onSelectMaintenance: (tier: MaintenanceTier | null) => void;
}

// Maps hosting plans to premium icons
const getHostingIcon = (type: string) => {
  switch (type) {
    case 'static': return Server;
    case 'dynamic': return Cloud;
    case 'vps': return HardDrive;
    default: return Server;
  }
};

// Maps maintenance plans to icons
const getMaintenanceIcon = (id: string) => {
  switch (id) {
    case 'maint_basic': return ShieldCheck;
    case 'maint_standard': return Activity;
    case 'maint_premium': return Flame;
    default: return ShieldCheck;
  }
};

// Custom detailed features for premium touch
const HOSTING_FEATURES: Record<string, string[]> = {
  host_static: ["Astro / HTML static sites", "Free SSL certificate", "Global Edge CDN", "99.9% Uptime Guarantee"],
  host_dynamic: ["Next.js / Node / PHP databases", "Automatic SSL renewal", "Daily Database Backups", "Scalable Server Memory"],
  host_vps: ["Dedicated Server (VPS)", "Full Root Access", "Custom server setups", "Daily snapshots & recovery"]
};

const MAINTENANCE_FEATURES: Record<string, string[]> = {
  maint_basic: ["Monthly DB backups", "Core security patching", "1hr/mo developer tasks", "Standard email support"],
  maint_standard: ["Weekly backups", "Core & plugin updates", "3hr/mo developer tasks", "Priority slack/whatsapp"],
  maint_premium: ["Daily database backups", "SEO & Speed audits", "10hr/mo priority tasks", "24/7 critical monitoring"]
};

export const HostingMaintenance: React.FC<HostingMaintenanceProps> = ({
  selectedHostingId,
  selectedMaintenanceId,
  onSelectHosting,
  onSelectMaintenance
}) => {
  
  const formattedCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Hosting Section */}
      <div className="space-y-6">
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-600" />
            Hosting Solutions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Choose a yearly hosting tier. High-availability servers optimized for page speed.
          </p>
        </div>

        <div className="space-y-4">
          {HOSTING_OPTIONS.map((host) => {
            const isSelected = selectedHostingId === host.id;
            const Icon = getHostingIcon(host.type);
            const features = HOSTING_FEATURES[host.id] || [];

            return (
              <div
                key={host.id}
                onClick={() => onSelectHosting(isSelected ? null : host)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">{host.name}</h3>
                      <span className="inline-block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Yearly Plan</span>
                    </div>
                  </div>
                  
                  {/* Price Tag (does not wrap) */}
                  <div className="text-right flex-shrink-0">
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg font-display whitespace-nowrap">
                      {formattedCurrency(host.price)}
                      <span className="text-[10px] text-slate-400 font-normal">/yr</span>
                    </span>
                  </div>
                </div>

                {/* Sub Features */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 border-t border-slate-100/70 pt-3">
                  {features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Select/Remove Action Button */}
                <div className="border-t border-slate-100/70 pt-3 flex justify-end">
                  {isSelected ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectHosting(null);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectHosting(host);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Select Plan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="space-y-6">
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            Support & Maintenance
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Choose a monthly support tier. Covers bugs, small text edits, backups, and security updates.
          </p>
        </div>

        <div className="space-y-4">
          {MAINTENANCE_OPTIONS.map((maint) => {
            const isSelected = selectedMaintenanceId === maint.id;
            const Icon = getMaintenanceIcon(maint.id);
            const features = MAINTENANCE_FEATURES[maint.id] || [];

            return (
              <div
                key={maint.id}
                onClick={() => onSelectMaintenance(isSelected ? null : maint)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">{maint.name}</h3>
                      <span className="inline-block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly Plan</span>
                    </div>
                  </div>
                  
                  {/* Price Tag (does not wrap) */}
                  <div className="text-right flex-shrink-0">
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg font-display whitespace-nowrap">
                      {formattedCurrency(maint.price)}
                      <span className="text-[10px] text-slate-400 font-normal">/mo</span>
                    </span>
                  </div>
                </div>

                {/* Sub Features */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 border-t border-slate-100/70 pt-3">
                  {features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Select/Remove Action Button */}
                <div className="border-t border-slate-100/70 pt-3 flex justify-end">
                  {isSelected ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMaintenance(null);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMaintenance(maint);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Select Plan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
