import React from 'react';
import { Mail, MessageCircle, Globe, Github, Linkedin, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/pricingData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-28 lg:pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* About Column */}
        <div className="space-y-4 md:col-span-1 text-left">
          <div className="flex items-center gap-2 text-white font-bold text-lg font-display">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-extrabold font-display">
              HK
            </span>
            {BRAND_INFO.name}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {BRAND_INFO.tagline}. High-quality engineering, transparent pricing, and robust client relations based in Gujarat.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>Gujarat, India (Remote Support)</span>
          </div>
        </div>

        {/* Services Column */}
        <div className="space-y-4 text-left">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
            Services Catalog
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#websites" className="hover:text-white transition-colors">Website Packages</a></li>
            <li><a href="#ecommerce" className="hover:text-white transition-colors">E-Commerce Development</a></li>
            <li><a href="#mobile" className="hover:text-white transition-colors">Mobile Applications</a></li>
            <li><a href="#shopify" className="hover:text-white transition-colors">Shopify Specialization</a></li>
          </ul>
        </div>

        {/* Contact details Column */}
        <div className="space-y-4 text-left">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li>
              <a 
                href={BRAND_INFO.contacts.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp support</span>
              </a>
            </li>
            <li>
              <a 
                href={`mailto:${BRAND_INFO.contacts.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>{BRAND_INFO.contacts.email}</span>
              </a>
            </li>
            <li>
              <a 
                href={BRAND_INFO.contacts.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 text-sky-400" />
                <span>Official Website</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Socials / Brand Anchors */}
        <div className="space-y-4 text-left">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
            Connect
          </h3>
          <div className="flex gap-3">
            <a 
              href={BRAND_INFO.contacts.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href={BRAND_INFO.contacts.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Consultations are free. Drop a message on WhatsApp to discuss project scopes and features.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
        <p>© {currentYear} {BRAND_INFO.name}. Designed & Developed by Hardik Kanajariya.</p>
        <div className="flex gap-4">
          <span className="hover:text-slate-500">Gujarati Support Available</span>
          <span>•</span>
          <span className="hover:text-slate-500">Secure Payments</span>
        </div>
      </div>
    </footer>
  );
};
