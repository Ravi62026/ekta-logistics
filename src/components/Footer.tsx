import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle, ArrowUpRight, HelpCircle, Briefcase } from 'lucide-react';
import { citiesData } from '../data/cities';
import { routesData } from '../data/routes';
import EktaLogo from './EktaLogo';

interface FooterProps {
  onNavigate: (view: string, slug?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-slate-950 text-slate-350 border-t border-slate-900 pt-12 sm:pt-20 pb-10 overflow-hidden font-sans" role="contentinfo">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.03),transparent_35%)] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
          
          {/* Col 1: Brand & Head Office Details */}
          <div className="lg:col-span-5 space-y-5">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 cursor-pointer focus:outline-none group w-fit"
            >
              <EktaLogo className="h-10 w-10 shadow-md transform group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-poppins text-lg font-black tracking-tight text-white block uppercase">
                  EKTA <span className="text-blue-500">LOGISTICS</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-orange-500 font-mono -mt-1 block font-bold">
                  Packers & Movers
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
              EKTA LOGISTICS PACKERS & MOVERS, founded and directed by Irshad Khan, is India's premium relocation partner. Committing directly to zero hidden costs, secure multi-layer encapsulation, and IBA-approved nationwide container transit.
            </p>

            <div className="space-y-3 pt-3">
              <div className="flex items-start space-x-3 text-xs">
                <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-normal">
                  Shop No. 14, Cartepuri Road, Maruti Truck Parking, Near Maruti Udyog Limited, Gurugram, Haryana - 122017
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pl-7 text-[11px]">
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold font-mono">Support Helpline</span>
                  <a href="tel:+919690499137" className="text-white hover:text-blue-400 font-bold font-mono transition-colors">+91 96904 99137</a>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold font-mono">Secondary Desk</span>
                  <a href="tel:+917464979144" className="text-white hover:text-blue-400 font-bold font-mono transition-colors">+91 74649 79144</a>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs pl-7">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-slate-400 font-mono">ektalogistics0@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white border-b border-white/5 pb-2.5 flex items-center justify-between" id="footer-services">
              <span>Shifting categories</span>
              <Briefcase className="h-3 w-3 text-slate-500" />
            </h4>
            <nav aria-labelledby="footer-services">
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { label: 'Household Shifting' },
                { label: 'Office Relocation' },
                { label: 'Intercity Safe Transit' },
                { label: 'Enclosed Vehicle Shipping' },
                { label: 'Custom Layered Packing' },
                { label: 'Secure Storage Vaults' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-slate-400 hover:text-orange-500 transition-colors flex items-center space-x-1.5 focus:outline-none text-left"
                  >
                    <span className="text-[8px] text-blue-500">●</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            </nav>
          </div>

          {/* Col 3: Company link directory */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white border-b border-white/5 pb-2.5 flex items-center justify-between" id="footer-company">
              <span>Company</span>
              <HelpCircle className="h-3 w-3 text-slate-500" />
            </h4>
            <nav aria-labelledby="footer-company">
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { label: 'About Company', view: 'about' },
                { label: 'Process Checklist', view: 'home' },
                { label: 'Working Gallery', view: 'gallery' },
                { label: 'Request Callback', view: 'contact' },
                { label: 'Simulated Lead Desk', view: 'dashboard' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.view)}
                    className="text-slate-400 hover:text-orange-500 transition-colors flex items-center space-x-1 hover:translate-x-0.5 transition-transform focus:outline-none text-left"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-30" />
                  </button>
                </li>
              ))}
            </ul>
            </nav>
          </div>

          {/* Col 4: City SEO Hub Internal link directory */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-white border-b border-white/5 pb-2.5">
              Metro Shifting Hubs
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Direct operating regional centers equipped with secure vehicle yards:
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {citiesData.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => onNavigate('city-seo', city.slug)}
                  className="px-2.5 py-1.5 text-[10px] font-bold bg-white/5 border border-white/10 rounded-lg hover:bg-blue-600/10 hover:text-orange-400 hover:border-blue-500/30 transition-all font-sans text-left truncate cursor-pointer"
                >
                  <span>{city.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Intercity Transit Routes Link Ribbon */}
        <div className="border-t border-white/5 mt-16 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-3">
              <h5 className="text-xs font-extrabold uppercase tracking-widest text-white font-sans">
                Intercity Dedicated Lines:
              </h5>
              <p className="text-[10px] text-slate-500 mt-0.5">Departures departing from Gurgaon yard daily</p>
            </div>
            <div className="lg:col-span-9 flex flex-wrap gap-2 text-xs">
              {routesData.map((route) => (
                <button
                  key={route.slug}
                  onClick={() => onNavigate('route-seo', route.slug)}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-900 transition-all cursor-pointer text-[11px] font-semibold"
                >
                  <span>{route.origin}</span> <span className="text-blue-500">➔</span> <span className="text-orange-500">{route.destination}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials, certifications, IBA license, copyright */}
        <div className="border-t border-white/5 mt-14 pt-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[11px] text-slate-500 font-sans">
              © 2026 EKTA LOGISTICS PACKERS & MOVERS. All Rights Reserved. Head Operations Yard: Maruti Truck Parking, Gurugram, Haryana.
            </p>
            <p className="text-[9.5px] text-slate-600 font-sans leading-relaxed">
              Disclaimer: All logo designs, brand certifications, IBA approvals and packing structures shown are implemented to illustrate premium logistics excellence.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-mono justify-center md:justify-start">
            <div className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              <Award className="h-3.5 w-3.5 text-orange-500" />
              <span>ISO 9001:2015</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              <span>IBA APPROVED TRANSIT</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
              <span>SCHEMA STRUCTURED</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
