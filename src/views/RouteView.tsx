import React, { useState } from 'react';
import { Truck, MapPin, BadgePercent, ShieldCheck, DollarSign, HelpCircle, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { routesData } from '../data/routes';
import QuoteForm from '../components/QuoteForm';
import { Lead } from '../types';

interface RouteViewProps {
  onLeadSubmit: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  selectedRouteSlug?: string;
  onRouteSlugChange?: (slug: string) => void;
}

export default function RouteView({ onLeadSubmit, selectedRouteSlug = 'delhi-to-mumbai', onRouteSlugChange }: RouteViewProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const currentRoute = routesData.find((r) => r.slug === selectedRouteSlug) || routesData[0];

  const handleRouteClick = (slug: string) => {
    setFaqOpen(null);
    if (onRouteSlugChange) {
      onRouteSlugChange(slug);
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Head section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold font-mono tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase">
          NATIONAL CONNECTIONS
        </span>
        <h1 className="font-sans text-3xl font-extrabold text-slate-900 tracking-tight">
          Major Intercity Shifting Routes
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          EKTA LOGISTICS supports regular sealed carrier runs connecting metropolitan business and residential corridors across India daily.
        </p>
      </div>

      {/* Selectors list */}
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-1.5 sm:gap-2.5 justify-center bg-slate-50 p-2 sm:p-2.5 rounded-2xl border border-slate-200" role="tablist" aria-label="Route selector">
          {routesData.map((r) => {
            const isSelected = selectedRouteSlug === r.slug;
            return (
              <button
                key={r.slug}
                onClick={() => handleRouteClick(r.slug)}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all focus:outline-none cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-700 text-white shadow-sm font-bold' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-3xs'
                }`}
                role="tab"
                aria-selected={isSelected}
              >
                <span>{r.origin} ➔ {r.destination}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Route Info Layout */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Col */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-3xs">
            
            {/* Meta canonical tags URL info */}
            <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center justify-between text-[11px] font-mono text-blue-700">
              <div className="truncate">Active Route URL: <code>https://ektalogistics.in/routes/{currentRoute.slug}</code></div>
              <span className="shrink-0 ml-2 font-bold text-emerald-600 opacity-90 select-none">Schema Configured</span>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block">HIghway Mileage</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 font-sans block">{currentRoute.distance}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-blue-500 uppercase font-bold block">Transit Estimate</span>
                <span className="text-sm sm:text-base font-extrabold text-blue-700 font-sans block">{currentRoute.transitTime}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block">Estimated Price</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 font-sans block font-mono text-xs">{currentRoute.basePriceRange}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">
                Route Standards & Highlights
              </h3>
              <div className="space-y-3">
                {currentRoute.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <span className="text-emerald-500 font-sans font-bold text-xs shrink-0 mt-0.5">✔</span>
                    <p className="text-xs text-slate-600 font-sans leading-normal">
                      {h}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Factors */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">
                Price Calculation Variables
              </h3>
              <div className="divide-y divide-slate-100 bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-3 divide-y-0 text-xs">
                {currentRoute.pricingFactors.map((f, idx) => (
                  <div key={idx} className="space-y-1">
                    <strong className="text-slate-900 font-sans block">• {f.factor}</strong>
                    <p className="text-[11px] text-slate-500 font-sans pl-3">
                      {f.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Route FAQs */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">
                Long-Distance Shifting FAQs
              </h3>
              <div className="space-y-3">
                {currentRoute.faqs.map((faq, idx) => {
                  const isOpen = faqOpen === idx;
                  return (
                    <div key={idx} className="bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setFaqOpen(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-slate-900 hover:bg-slate-100 focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        <span>{isOpen ? '▲' : '▼'}</span>
                      </button>
                      {isOpen && (
                        <p className="p-4 pt-0 border-t border-slate-200 text-xs text-slate-500 leading-normal">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quote Form Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24">
              <QuoteForm 
                onLeadSubmit={onLeadSubmit} 
                defaultPickup={currentRoute.origin.split('&')[0].trim()}
                defaultDestination={currentRoute.destination.split('(')[0].trim()}
                key={currentRoute.slug} // Forces dynamic state recycling based on selected route
              />

              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm mt-6 text-center space-y-3.5">
                <h4 className="font-sans text-sm font-bold text-orange-400">Interstate Shifting Support</h4>
                <p className="text-slate-300 text-xs font-sans px-2 leading-relaxed">
                  Call our Gurgaon highway coordinating desk to clear custom entry permits or arrange spot-shifting.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1.5 px-2">
                  <a
                    href="tel:+919690499137"
                    className="flex justify-center items-center space-x-1 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg shadow"
                  >
                    <Phone className="h-4 w-4 animate-pulse" />
                    <span>Call Coordinator</span>
                  </a>
                  <a
                    href={`https://wa.me/919690499137?text=${encodeURIComponent(`Hello EKTA LOGISTICS. I want to quote movers and packers charges in ${currentRoute.slug}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center space-x-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
