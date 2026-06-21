import React from 'react';
import { CheckCircle2, DollarSign, Zap, Code, HeartHandshake, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/pricingData';

interface HeroProps {
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator }) => {
  const highlights = [
    { title: "Affordable Pricing", desc: "No agency overhead. Fair and honest rates.", icon: DollarSign, color: "text-emerald-400" },
    { title: "Fast Delivery", desc: "AstroJS and modern stacks for rapid launches.", icon: Zap, color: "text-amber-400" },
    { title: "Quality Code", desc: "Clean TypeScript code ensuring scalable software.", icon: Code, color: "text-indigo-400" },
    { title: "Ongoing Support", desc: "Local assistance based in Gujarat when you need it.", icon: HeartHandshake, color: "text-sky-400" }
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side: Copywriting */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            Hardik Kanajariya
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-white">
            Affordable Websites, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              E-Commerce & Software
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
            High quality development using modern technology. Transparent pricing built specifically for businesses in Gujarat.
          </p>

          {/* Inline checklist */}
          <div className="grid grid-cols-2 gap-3 max-w-md pt-2">
            {['Affordable', 'Fast Delivery', 'Quality Code', 'Ongoing Support'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={onScrollToCalculator}
              className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`${BRAND_INFO.contacts.whatsapp}?text=Hi%20Hardik,%20I%20am%20interested%20in%20building%20a%20project%20with%20you!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 text-emerald-400 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.486 5.355 1.488 5.394 0 9.774-4.38 9.778-9.775a9.704 9.704 0 0 0-2.858-6.918A9.705 9.705 0 0 0 12.008 1.9c-5.393 0-9.778 4.38-9.782 9.776-.001 2.105.566 4.161 1.637 5.92l-.994 3.631 3.778-.991zM17.5 14.1c-.3-.15-1.785-.88-2.065-.98-.28-.1-.485-.15-.685.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.685-1.65-.94-2.25-.247-.597-.508-.59-.685-.6-.172-.007-.37-.01-.568-.01-.2 0-.525.075-.8 1.05-.275.975-1.05 2.175-1.05 2.225 0 .05.1.325.5 1.1.4.775.975 1.45 1.625 2.05 1.35 1.25 2.775 1.775 3.75 2.1 1.15.375 1.775.3 2.45.2.75-.1 2.065-.85 2.355-1.65.3-.8.3-1.475.2-1.625-.1-.15-.3-.225-.6-.375z" />
              </svg>
              WhatsApp Me
            </a>
          </div>
        </div>

        {/* Right Side: Grid of Feature Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pl-4">
          {highlights.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center ${card.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg font-display">{card.title}</h3>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
