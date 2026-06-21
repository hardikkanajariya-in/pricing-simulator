import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/pricingData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background graphic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-900 to-slate-900 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 uppercase tracking-widest">
            Why Work With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Direct Value. Exceptional Engineering.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Skip the agency management overhead and get high-quality web solutions built directly by an experienced developer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl flex flex-col gap-4 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white text-base sm:text-lg font-display">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
