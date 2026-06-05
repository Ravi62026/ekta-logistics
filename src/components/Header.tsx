import React, { useState, useEffect, useCallback } from 'react';
import { Phone, MessageCircle, Menu, X, Database, ArrowRight, ChevronDown, Award, ShieldCheck, MapPin, Mail, Clock, Truck, Building2, Car, Warehouse, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EktaLogo from './EktaLogo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, slug?: string) => void;
  leadCount: number;
}

export default function Header({ currentView, onNavigate, leadCount }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [megaTimeout, setMegaTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        if (showMegaMenu) setShowMegaMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showMegaMenu]);

  // Focus trap in mobile drawer
  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const drawer = document.getElementById('mobile-drawer');
      if (!drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const handleMegaEnter = useCallback(() => {
    if (megaTimeout) { clearTimeout(megaTimeout); setMegaTimeout(null); }
    setShowMegaMenu(true);
  }, [megaTimeout]);

  const handleMegaLeave = useCallback(() => {
    const t = setTimeout(() => setShowMegaMenu(false), 200);
    setMegaTimeout(t);
  }, []);

  const mainNavItems = [
    { label: 'Home', view: 'home', icon: <Truck className="h-3.5 w-3.5" /> },
    { label: 'About', view: 'about', icon: <Award className="h-3.5 w-3.5" /> },
    { label: 'Services', view: 'services', icon: <Building2 className="h-3.5 w-3.5" />, hasMega: true },
    { label: 'City Hubs', view: 'cities', icon: <MapPin className="h-3.5 w-3.5" /> },
    { label: 'Routes', view: 'routes', icon: <Truck className="h-3.5 w-3.5" /> },
    { label: 'Gallery', view: 'gallery', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
    { label: 'Contact', view: 'contact', icon: <Headphones className="h-3.5 w-3.5" /> },
  ];

  const megaServices = [
    { name: 'Household Shifting', desc: 'Multi-layer bubble packing, furniture dismantling & reassembly for 1–4+ BHK homes.', icon: <Building2 className="h-5 w-5" />, color: 'blue' },
    { name: 'Office Relocation', desc: 'Zero-downtime corporate moves with labelled desk tracking and server protection.', icon: <Warehouse className="h-5 w-5" />, color: 'orange' },
    { name: 'Car & Bike Carrier', desc: 'Enclosed hydraulic ramp loading with zero-friction tie-down straps.', icon: <Car className="h-5 w-5" />, color: 'emerald' },
    { name: 'Storage Vaults', desc: 'CCTV-monitored, climate-controlled warehouse bays with flexible leasing.', icon: <ShieldCheck className="h-5 w-5" />, color: 'purple' },
  ];

  const isActive = (view: string) =>
    currentView === view ||
    (view === 'cities' && currentView === 'city-seo') ||
    (view === 'routes' && currentView === 'route-seo');

  return (
    <header className="sticky top-0 z-50 w-full font-sans">

      {/* ─── TOP UTILITY STRIP ─── */}
      <div className={`hidden lg:block transition-all duration-300 ${
        isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'
      }`}>
        <div className="bg-slate-950 text-slate-400 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between py-2 text-[10.5px]">
            
            {/* Left — Contact info */}
            <div className="flex items-center space-x-5 font-mono">
              <a href="tel:+919690499137" className="flex items-center space-x-1.5 hover:text-orange-400 transition-colors">
                <Phone className="h-3 w-3 text-orange-500" />
                <span>+91 96904 99137</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="mailto:ektalogistics0@gmail.com" className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors">
                <Mail className="h-3 w-3 text-blue-500" />
                <span>ektalogistics0@gmail.com</span>
              </a>
              <span className="text-slate-700">|</span>
              <span className="flex items-center space-x-1.5">
                <MapPin className="h-3 w-3 text-emerald-500" />
                <span>Gurugram, Haryana</span>
              </span>
            </div>

            {/* Right — Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-md">
                <Award className="h-3 w-3 text-orange-500" />
                <span className="text-slate-300 font-semibold">ISO 9001:2015</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-md">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span className="text-slate-300 font-semibold">IBA Approved</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-md">
                <Clock className="h-3 w-3 text-blue-500" />
                <span className="text-slate-300 font-semibold">24/7 Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVIGATION BAR ─── */}
      <div className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-200/60'
          : 'bg-white border-b border-slate-100'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ─── LOGO ─── */}
            <button
              onClick={() => { onNavigate('home'); setIsOpen(false); }}
              className="flex items-center space-x-3 group focus:outline-none shrink-0"
              aria-label="Go to homepage"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-600/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <EktaLogo className="relative h-10 w-10 sm:h-11 sm:w-11 transition-all duration-300 group-hover:scale-105" />
              </div>
              <div className="hidden sm:block">
                <span className="font-poppins text-base sm:text-lg font-black tracking-tight block uppercase leading-none text-slate-900">
                  EKTA <span className="text-blue-600">LOGISTICS</span>
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-orange-500 font-mono mt-0.5 block font-bold">
                  Packers & Movers
                </span>
              </div>
            </button>

            {/* ─── DESKTOP NAVIGATION (CENTERED) ─── */}
            <nav className="hidden lg:flex items-center" aria-label="Main navigation">
              <div className="flex items-center bg-slate-50/80 border border-slate-200/60 rounded-2xl px-1.5 py-1">
                {mainNavItems.map((item) => {
                  const active = isActive(item.view);

                  if (item.hasMega) {
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={handleMegaEnter}
                        onMouseLeave={handleMegaLeave}
                      >
                        <button
                          onClick={() => onNavigate('services')}
                          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                            active
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* ─── MEGA MENU ─── */}
                        <AnimatePresence>
                          {showMegaMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[460px] z-50"
                              onMouseEnter={handleMegaEnter}
                              onMouseLeave={handleMegaLeave}
                            >
                              <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200/80 p-2 overflow-hidden">
                                {/* Header accent */}
                                <div className="flex items-center justify-between px-4 py-3 mb-1">
                                  <div>
                                    <div className="text-[10px] font-mono tracking-widest text-orange-500 font-bold uppercase">
                                      Shifting Divisions
                                    </div>
                                    <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                                      All services under one trusted roof
                                    </div>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-blue-500 animate-pulse" />
                                </div>

                                <div className="grid grid-cols-2 gap-1.5">
                                  {megaServices.map((svc, idx) => {
                                    const colorMap: Record<string, string> = {
                                      blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
                                      orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
                                      emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
                                      purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
                                    };
                                    return (
                                      <button
                                        key={idx}
                                        onClick={() => { onNavigate('services'); setShowMegaMenu(false); }}
                                        className="group flex items-start space-x-3 p-3.5 rounded-xl hover:bg-slate-50 transition-all text-left"
                                      >
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${colorMap[svc.color]}`}>
                                          {svc.icon}
                                        </div>
                                        <div className="min-w-0">
                                          <h4 className="text-[11.5px] font-bold text-slate-900 leading-tight">{svc.name}</h4>
                                          <p className="text-[9.5px] text-slate-400 mt-0.5 leading-snug line-clamp-2">{svc.desc}</p>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Bottom CTA */}
                                <button
                                  onClick={() => { onNavigate('services'); setShowMegaMenu(false); }}
                                  className="w-full mt-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-[11px] font-bold uppercase tracking-wider transition-all"
                                >
                                  <span>View All Services</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      id={`nav-${item.view}`}
                      onClick={() => onNavigate(item.view)}
                      aria-current={active ? 'page' : undefined}
                      className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                        active
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Lead Desk pill */}
              <button
                onClick={() => onNavigate('dashboard')}
                className={`ml-3 flex items-center space-x-2 px-4 py-2 rounded-xl text-[11px] font-mono font-bold border transition-all duration-200 ${
                  currentView === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <Database className="h-3.5 w-3.5" />
                <span>LEAD DESK</span>
                {leadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-orange-500 text-[9px] text-white font-extrabold animate-bounce shadow-sm shadow-orange-500/30">
                    {leadCount}
                  </span>
                )}
              </button>
            </nav>

            {/* ─── RIGHT SIDE CTAs (DESKTOP) ─── */}
            <div className="hidden lg:flex items-center space-x-2.5">
              <a
                href={`https://wa.me/919690499137?text=${encodeURIComponent('Hello EKTA LOGISTICS, I need a shifting quote.')}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919690499137"
                className="group flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-[11px] font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-600/20 hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4 shrink-0 fill-white/20 group-hover:scale-110 transition-transform" />
                <span className="font-mono">96904 99137</span>
              </a>
            </div>

            {/* ─── MOBILE CONTROLS ─── */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`relative p-2.5 rounded-xl transition-colors ${
                  isScrolled ? 'bg-slate-100 text-slate-700' : 'bg-slate-100 text-slate-800'
                }`}
                aria-label="Lead desk"
              >
                <Database className="h-5 w-5" />
                {leadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[8px] text-white font-bold shadow-sm">
                    {leadCount}
                  </span>
                )}
              </button>
              <a
                href={`https://wa.me/919690499137?text=${encodeURIComponent('Hello EKTA LOGISTICS, I need a shifting quote.')}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE DRAWER ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="max-h-[85vh] overflow-y-auto">
              
              {/* Mobile contact strip */}
              <div className="bg-slate-950 px-4 py-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Phone className="h-3 w-3 text-orange-500" />
                  <a href="tel:+919690499137" className="hover:text-white transition-colors">96904 99137</a>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="h-3 w-3 text-emerald-500" />
                  <span>Gurugram, Haryana</span>
                </div>
              </div>

              {/* Nav Links */}
              <div className="p-4 space-y-1" role="menu">
                <div className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-3 px-1">
                  Navigation
                </div>
                {mainNavItems.map((item) => {
                  const active = isActive(item.view);
                  return (
                    <button
                      key={item.label}
                      onClick={() => { onNavigate(item.view); setIsOpen(false); }}
                      aria-current={active ? 'page' : undefined}
                      role="menuitem"
                      className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                        active
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className={active ? 'text-white/70' : 'text-slate-400'}>{item.icon}</span>
                      <span>{item.label}</span>
                      {active && <span className="ml-auto text-[9px] font-mono bg-white/20 px-2 py-0.5 rounded-full">ACTIVE</span>}
                    </button>
                  );
                })}
              </div>

              <div className="h-px bg-slate-100 mx-4" />

              {/* Lead Desk */}
              <div className="p-4">
                <button
                  onClick={() => { onNavigate('dashboard'); setIsOpen(false); }}
                  className={`flex w-full items-center justify-between rounded-xl p-3.5 text-xs font-mono font-bold transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 shrink-0" />
                    <span>LEAD DESK</span>
                  </div>
                  {leadCount > 0 && (
                    <span className="bg-orange-500 text-white rounded-lg text-[9px] shrink-0 px-2 py-0.5 font-bold">
                      {leadCount} Fresh
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="px-4 pb-5 grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919690499137"
                  className="flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 font-sans text-xs font-bold text-white shadow-md active:scale-95 transition-transform"
                >
                  <Phone className="h-4 w-4 shrink-0 fill-white/20" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/919690499137?text=${encodeURIComponent('Hi EKTA LOGISTICS, I want a shifting quote.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 font-sans text-xs font-bold text-white shadow-md active:scale-95 transition-transform"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Trust badges row */}
              <div className="px-4 pb-5 flex items-center justify-center space-x-3 text-[9px] font-mono text-slate-400">
                <span className="flex items-center space-x-1">
                  <Award className="h-3 w-3 text-orange-500" />
                  <span>ISO Certified</span>
                </span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  <span>IBA Approved</span>
                </span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span>24/7</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
