import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';

interface HeroProps {
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-650/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Headlines & Accents */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-bold tracking-wide uppercase">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Planning Engine
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-white">
            Plan Your Software. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Calculate Cost.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
            Configure your project step-by-step. Select templates, features, and servers to receive a downloadable client proposal and a timeline breakdown. 100% transparent.
          </p>

          {/* Quick Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-805">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-xs font-semibold">Zero Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-805">
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-xs font-semibold">Predefined Modules</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-805">
              <Layers className="w-4 h-4 text-sky-405 text-sky-400 flex-shrink-0" />
              <span className="text-xs font-semibold">Instant Proposals</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onScrollToCalculator}
              className="group inline-flex items-center justify-center gap-2 bg-indigo-650 hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-indigo-650/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start Estimator Wizard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Side: Mockup Image */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div className="relative group max-w-md sm:max-w-lg w-full bg-slate-900/50 border border-slate-800 p-2 rounded-2xl shadow-2xl transition-all duration-500 hover:border-slate-700/80">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
            <img 
              src="/estimator_mockup.png" 
              alt="Software Cost Estimator Mockup" 
              className="w-full h-auto object-cover rounded-xl shadow-inner relative z-10"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
