import React from 'react';
import { Server, Cloud, HardDrive, ShieldCheck, Activity, Flame, Check } from 'lucide-react';
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

export const HostingMaintenance: React.FC<HostingMaintenanceProps> = ({
  selectedHostingId,
  selectedMaintenanceId,
  onSelectHosting,
  onSelectMaintenance
}) => {
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

        <div className="space-y-3">
          {HOSTING_OPTIONS.map((host) => {
            const isSelected = selectedHostingId === host.id;
            const Icon = getHostingIcon(host.type);

            return (
              <div
                key={host.id}
                onClick={() => onSelectHosting(isSelected ? null : host)}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{host.name}</h3>
                    <p className="text-slate-400 text-xs font-light">Billed annually</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-900 text-base sm:text-lg font-display">
                    {host.priceDisplay.split('/')[0]}
                    <span className="text-[11px] text-slate-400 font-normal"> / yr</span>
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white text-transparent'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
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

        <div className="space-y-3">
          {MAINTENANCE_OPTIONS.map((maint) => {
            const isSelected = selectedMaintenanceId === maint.id;
            const Icon = getMaintenanceIcon(maint.id);

            return (
              <div
                key={maint.id}
                onClick={() => onSelectMaintenance(isSelected ? null : maint)}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{maint.name}</h3>
                    <p className="text-slate-400 text-xs font-light">Billed monthly</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-900 text-base sm:text-lg font-display">
                    {maint.priceDisplay.split('/')[0]}
                    <span className="text-[11px] text-slate-400 font-normal"> / mo</span>
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white text-transparent'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
