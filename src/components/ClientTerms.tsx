import React from 'react';
import { ClipboardList, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { CLIENT_RESPONSIBILITIES, THIRD_PARTY_COSTS } from '../data/pricingData';

export const ClientTerms: React.FC = () => {
  return (
    <section className="bg-slate-50 border-t border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title / Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/50 uppercase tracking-widest">
            Transparency & Policies
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Clear Terms. Zero Surprises.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We believe in honest, modular pricing. Here is what is included, what you need to provide, and how external fees are handled.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Client Responsibilities */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <ClipboardList className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-display">
                  Client Responsibilities
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                To keep the timeline on schedule, the client must provide the following assets and approvals:
              </p>
              <ul className="space-y-2.5 pt-2">
                {CLIENT_RESPONSIBILITIES.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-600">
              * Delay in assets delivery will shift the project timeline.
            </div>
          </div>

          {/* Card 2: Third Party Costs */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800">
                  <ExternalLink className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-display">
                  Third-Party Costs
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                External tools and licenses are not included in development charges and are billed separately by their respective providers:
              </p>
              <ul className="space-y-2.5 pt-2">
                {THIRD_PARTY_COSTS.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-amber-800 bg-amber-50/20 p-2.5 rounded-lg border border-amber-100/50">
              Note: Domain, SMS gateway credits, logistics, and payment portal charges are directly paid to the providers.
            </div>
          </div>

          {/* Card 3: No Hidden Charges */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-display">
                  No Hidden Charges
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                Your quote represents the complete pricing. The final approved amount includes:
              </p>
              <ul className="space-y-2.5 pt-2">
                {["Development & Design", "Testing & Verification", "Production Deployment", "Basic Admin Training", "Initial Launch Support"].map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-emerald-700 bg-emerald-50/20 p-2.5 rounded-lg border border-emerald-100/50">
              No extra fees will be charged after approval unless new features are added.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
