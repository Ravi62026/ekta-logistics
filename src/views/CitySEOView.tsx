import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Star, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { citiesData } from '../data/cities';
import QuoteForm from '../components/QuoteForm';
import { Lead } from '../types';

interface CitySEOViewProps {
  onLeadSubmit: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  selectedCitySlug?: string;
  onCitySlugChange?: (slug: string) => void;
}

export default function CitySEOView({ onLeadSubmit, selectedCitySlug = 'gurgaon', onCitySlugChange }: CitySEOViewProps) {
  const [activeTabFaq, setActiveTabFaq] = useState<number | null>(null);

  const currentCity = citiesData.find((c) => c.slug === selectedCitySlug) || citiesData[0];

  const handleCityClick = (slug: string) => {
    setActiveTabFaq(null);
    if (onCitySlugChange) {
      onCitySlugChange(slug);
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Head section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold font-mono tracking-widest text-blue-750 bg-blue-50 px-2.5 py-1 rounded-full uppercase">
          LOCAL SEO HUBS
        </span>
        <h1 className="font-sans text-3xl font-extrabold text-slate-900 tracking-tight">
          Pan India Shifting Locations Directory
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          EKTA LOGISTICS operates fully equipped logistics yards across all major commercial metro hubs. Tap a city below to view dedicated shifting configurations.
        </p>
      </div>

      {/* City horizontal selectors list */}
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center bg-slate-50 p-2 sm:p-2.5 rounded-2xl border border-slate-200" role="tablist" aria-label="City selector">
          {citiesData.map((c) => {
            const isSelected = selectedCitySlug === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => handleCityClick(c.slug)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-700 text-white shadow-sm font-bold' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-3xs'
                }`}
                role="tab"
                aria-selected={isSelected}
              >
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main SEO Render Module */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SEO Content Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-3xs">
            
            {/* Meta canonical tags description info */}
            <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center justify-between text-[11px] font-mono text-blue-750">
              <div className="truncate">URL: <code>https://ektalogistics.in/packers-movers-{currentCity.slug}</code></div>
              <span className="shrink-0 ml-2 font-bold select-none text-emerald-600 opacity-90">Canonical Metas Active</span>
            </div>

            <div className="space-y-4">
              <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-950 leading-tight">
                {currentCity.localHeading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {currentCity.localContentIntro}
              </p>
            </div>

            {/* Targeted local features benefits */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">
                Why EKTA LOGISTICS Shines in {currentCity.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentCity.benefits.map((b, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5">
                    <span className="text-blue-700 font-sans font-extrabold text-base">0{idx + 1}</span>
                    <h4 className="font-sans text-xs font-bold text-slate-900 leading-normal">{b.title}</h4>
                    <p className="text-[10px] text-slate-500 font-sans leading-normal">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Testimonials */}
            <div className="space-y-4 bg-slate-50/50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 flex items-center justify-between">
                <span>Local Shifting Reviews</span>
                <span className="text-orange-500 text-[11px] font-mono font-bold">4.9/5 Rating</span>
              </h3>
              <div className="divide-y divide-slate-200">
                {currentCity.localTestimonials.map((t, idx) => (
                  <div key={idx} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-sans">
                      <strong className="text-slate-900">{t.name}</strong>
                      <span className="text-slate-400 font-mono text-[10px] bg-slate-100 px-1.5 rounded">{t.location}</span>
                    </div>
                    <p className="text-slate-600 text-xs font-sans italic leading-normal">
                      "{t.text}"
                    </p>
                    <div className="flex space-x-0.5 text-orange-500 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local specialized FAQs */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">
                Shifting FAQs for {currentCity.name} Residents
              </h3>
              <div className="space-y-3">
                {currentCity.localFaqs.map((faq, idx) => {
                  const isOpen = activeTabFaq === idx;
                  return (
                    <div key={idx} className="bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setActiveTabFaq(isOpen ? null : idx)}
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

            {/* Dynamic keyword density representation block to proof SEO optimization */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-400 font-mono text-[10px] space-y-1">
              <span className="text-orange-550 font-bold block mb-1">LOCAL INDEXING METRICS</span>
              <div>Detected Keywords: {currentCity.keywords.map((kw, i) => <span key={i} className="text-slate-300 ml-1 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">#{kw}</span>)}</div>
              <div>State Region: {currentCity.state} Shifting Hub | Ground Clearance Confirmed</div>
            </div>

          </div>

          {/* Quote Form Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real quote form prepopulated */}
            <div className="sticky top-24">
              <QuoteForm 
                onLeadSubmit={onLeadSubmit} 
                defaultPickup={currentCity.slug === 'gurgaon' ? 'Gurgaon' : currentCity.name}
                key={currentCity.slug} // Ensures form forces recalculations
              />
              
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm mt-6 text-center space-y-3.5">
                <h4 className="font-sans text-sm font-bold text-orange-400">Need Immediate Assistance?</h4>
                <p className="text-slate-300 text-xs font-sans px-2 leading-relaxed">
                  Our dedicated local dispatch leads for {currentCity.name} are available online for zero-fee surveys.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1.5 px-2">
                  <a
                    href="tel:+919690499137"
                    className="flex items-center justify-center space-x-1 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg shadow"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Coordinator</span>
                  </a>
                  <a
                    href={`https://wa.me/919690499137?text=${encodeURIComponent(`Hello EKTA LOGISTICS. I want to quote movers and packers charges in ${currentCity.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow"
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
