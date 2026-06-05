import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Truck, Clock, Award, CheckCircle, Package, ArrowRight, 
  HelpCircle, Phone, MessageCircle, Star, MapPin, Users, Lock, ChevronLeft, 
  ChevronRight, ZoomIn, Eye, X, Send, Mail, Briefcase, Sparkles, RefreshCw 
} from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { Lead } from '../types';
import { RenderCustomCard } from './GalleryView';

interface HomeViewProps {
  onLeadSubmit: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  onNavigate: (view: string, slug?: string) => void;
}

export default function HomeView({ onLeadSubmit, onNavigate }: HomeViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxCustomType, setLightboxCustomType] = useState<'actual-signboard' | 'actual-cabin' | 'actual-yard' | null>(null);
  
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactIsSubmitting, setContactIsSubmitting] = useState(false);

  const stats = [
    { value: '10,000+', label: 'Successful Relocations', icon: Truck, color: 'text-blue-500' },
    { value: '5,000+', label: 'Delighted Customers', icon: Users, color: 'text-orange-500' },
    { value: '100+', label: 'Famous Cities Covered', icon: MapPin, color: 'text-emerald-500' },
    { value: '24/7', label: 'Continuous Track Support', icon: Clock, color: 'text-purple-500' },
  ];

  const highlights = [
    {
      title: 'Safe Cargo Encapsulation',
      desc: 'Double-laminate corrugated rolls combined with customized corner foam cushions to safeguard high-value electronics.',
      icon: Package,
      badge: 'Certified Wrapping'
    },
    {
      title: 'Trained & Vetted Shifting Teams',
      desc: 'All loaders and logistics supervisors are direct full-time employees, trained in micro-handling and professional disassembly.',
      icon: Users,
      badge: 'Zero Part-Timers'
    },
    {
      title: 'Absolute Flat-Rate Guarantee',
      desc: 'Upfront verified digital rate card. We declare zero mid-highway toll surcharges or post-arrival unloading extortion.',
      icon: Lock,
      badge: 'No Hidden Costs'
    },
    {
      title: 'Pan India Enclosed Network',
      desc: 'Operating exclusively with weatherproof container cargo fleets from our central Maruti truck yard to major Indian capitals.',
      icon: ShieldCheck,
      badge: 'IBA Approved'
    }
  ];

  const processes = [
    { step: '01', title: 'Submit Shifting Request', desc: 'Input pickup origin, destination parameters, and load details in our 5-Step interactive quote engine.' },
    { step: '02', title: 'IBA Survey Verification', desc: 'Our coordinator, Irshad Khan, prepares a transparent flat-rate quotation with certified cargo protection.' },
    { step: '03', title: 'Multi-Layer Heavy Packing', desc: 'Vetted crews arrive with heavy bubble sheets, heavy cargo crates, and custom furniture locks.' },
    { step: '04', title: 'Enclosed Safe Highway Transit', desc: 'Secure direct dispatch from Maruti parking hub using high-sided waterproof containerized vehicles.' },
    { step: '05', title: 'Unpacking & Furniture Assembly', desc: 'Precision delivery, positioning household boxes, bed set-up, and home furniture re-alignment.' },
  ];

  const testimonials = [
    {
      name: 'Rohan Malhotra',
      role: 'Director of Operations, CyberTech DLF Phase II',
      text: 'Extremely professional shifting experience! Relocated our 3 BHK villa from Gurgaon DLF to Bangalore. Irshad Khans team handled heavy double-door refrigerators and fragile glassware with multi-layer bubble wraps. Truly zero hidden costs, highly recommended.',
      rating: 5,
      date: 'March 2026',
      city: 'Gurgaon to Bangalore'
    },
    {
      name: 'Captain Amit Verma',
      role: 'Indian Army Officer',
      text: 'Shifting official household luggage contains complex security regulations. Ekta Logistics packed everything with extreme care, ensuring direct vehicle loading under my supervision at Gurgaon Maruti Truck yard. Direct transit, safe arrival, full support.',
      rating: 5,
      date: 'April 2026',
      city: 'Delhi NCR to Pune'
    },
    {
      name: 'Prerna Singhal',
      role: 'SaaS Startup Lead, Cyber City',
      text: 'I was genuinely terrified of packers holding cargo hostage as many local transporters in India do. Ekta Logistics gave me a written upfront quote. Absolutely professional loaders, finished packing in 3 hours. Pristine delivery. Five stars!',
      rating: 5,
      date: 'May 2026',
      city: 'Gurugram to Hyderabad'
    }
  ];

  const galleryImages = [
    { url: '', caption: 'Official Physical Signboard Banner', isCustomCard: true, customCardType: 'actual-signboard' as const },
    { url: '', caption: 'On-Field Office Portable Cabin', isCustomCard: true, customCardType: 'actual-cabin' as const },
    { url: '', caption: 'Gurgaon Dispatch & Truck Zone', isCustomCard: true, customCardType: 'actual-yard' as const },
    { url: 'https://images.unsplash.com/photo-1566576912321-d58def7a6088?auto=format&fit=crop&q=80&w=600', caption: 'Secure Heavy Bubble Packing' },
    { url: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=80&w=600', caption: 'Nationwide Cargo Express' },
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600', caption: 'Professional Shifting Dispatch' }
  ];

  const faqs = [
    { q: "How do you calculate shifting rates across cities?", a: "Shifting rates are mathematically determined by direct highway transport distances, cargo payload volume (count of cardboard boxes, furniture items, heavy appliances), required layers of premium wrapping material, and destination site floor access elevator options." },
    { q: "Are all transport fleets closed metal containers?", a: "Yes. EKTA LOGISTICS operates exclusively closed steel containers of variable dimensions. This prevents water ingress, dust penetration, and highway weather elements, guaranteeing safe, high-end, weather-proof transit." },
    { q: "Do you offer full shifting accountability & claim settlements?", a: "Absolutely. We prepare a formal physical inventory receipt upon packing, matching custom declared values. If any damage occurs during transit, our supervisor settles the repair or replace evaluations directly under certified insurance support." },
    { q: "How do I book a free home survey in Gurugram?", a: "Simply submit your primary route coordinates on our Quote Estimator or tap the direct WhatsApp button. Our central Gurugram dispatch office will schedule a local logistics advisor for an absolute zero-cost, flat-rate physical survey." }
  ];

  // Auto-testimonials slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    setContactIsSubmitting(true);
    
    // Save locally via mock handler
    onLeadSubmit({
      name: contactName,
      phone: contactPhone,
      email: '',
      pickupCity: 'Gurugram Home View Inline',
      destinationCity: 'Callback Requested',
      movingDate: new Date().toISOString().split('T')[0],
      propertyType: 'Contact Callback',
      houseSize: 'N/A',
      notes: contactMessage || 'Direct home view form message',
      source: 'contact_form'
    });

    setTimeout(() => {
      setContactIsSubmitting(false);
      setContactSubmitted(true);
      
      // Auto open WhatsApp with message
      const msg = `Hello EKTA LOGISTICS,\n\nI just filled out the callback form on your homepage.\n- Name: ${contactName}\n- Phone: +91 ${contactPhone}\n- Message: ${contactMessage || 'No extra message'}\n\nPlease call me back as soon as possible.`;
      window.open(`https://wa.me/919690499137?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1100);
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-white">
      
      {/* 1. HERO SECTION & INTEGRATIVE ESTIMATOR */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-28 overflow-hidden" aria-label="Welcome to Ekta Logistics">
        {/* Premium layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        {/* Animated floating gradient orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 top-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/[0.07] via-blue-400/[0.04] to-transparent blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 top-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-500/[0.06] via-amber-300/[0.03] to-transparent blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute right-1/4 bottom-10 w-[300px] h-[300px] rounded-full bg-gradient-to-t from-emerald-500/[0.04] to-transparent blur-3xl pointer-events-none"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Heading Left Side */}
            <motion.div 
              className="lg:col-span-7 space-y-8 text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glass Badge */}
              <motion.div 
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass-panel border border-white/60 shadow-lg shadow-slate-900/5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-slate-700">
                  National Logistics Network — Live & Active
                </span>
              </motion.div>

              <div className="space-y-5">
                <h1 className="font-poppins text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.1]">
                  <span className="text-slate-950">India's Most</span><br />
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    Trusted
                  </span>
                  <span className="text-slate-950"> </span>
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
                      Packers & Movers
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                      <path d="M2 8 C 80 2, 220 2, 298 8" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" fill="none" />
                      <defs>
                        <linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0">
                          <stop offset="0%" stopColor="#2563EB" />
                          <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>
                <p className="font-sans text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl font-medium">
                  Premium household & corporate relocation from Gurugram to all India. 
                  <span className="text-slate-700 font-semibold"> Flat rates. Zero hidden charges. IBA-approved transit.</span>
                </p>
              </div>

              {/* Premium Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                {[
                  { value: '10K+', label: 'Moves Done', gradient: 'from-blue-600 to-blue-700', icon: '📦' },
                  { value: '100+', label: 'Cities', gradient: 'from-emerald-600 to-emerald-700', icon: '🗺️' },
                  { value: '24/7', label: 'Live Support', gradient: 'from-purple-600 to-purple-700', icon: '🕐' },
                  { value: '4.9★', label: 'Google Rated', gradient: 'from-orange-500 to-orange-600', icon: '⭐' },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                    className="group relative bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/0 to-orange-500/0 group-hover:from-blue-600/[0.02] group-hover:to-orange-500/[0.02] transition-all" />
                    <div className="relative">
                      <div className="text-lg mb-1">{item.icon}</div>
                      <div className={`text-lg sm:text-xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent font-poppins leading-none`}>
                        {item.value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 font-mono">
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  onClick={() => {
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="group relative flex items-center space-x-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-poppins text-xs font-extrabold tracking-wider uppercase px-8 py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">Get Shifting Quote</span>
                  <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  href={`https://wa.me/919690499137?text=${encodeURIComponent('Hello Ekta Logistics. I want to book a professional packing and moving job.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center space-x-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-poppins text-xs font-extrabold tracking-wider uppercase px-8 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5 fill-white/20 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Crew</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Hero Interactive Estimator - Right Column */}
            <motion.div 
              className="lg:col-span-5 relative mt-6 lg:mt-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium glow behind form */}
              <div className="absolute -inset-3 rounded-[40px] bg-gradient-to-br from-blue-600/15 via-orange-500/10 to-blue-700/15 blur-2xl opacity-60" />
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-blue-600/5 to-orange-500/5" />
              <div className="relative">
                <QuoteForm onLeadSubmit={onLeadSubmit} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. LIVE TELEMETRY DEPARTURES STATUS BOARD */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-white/[0.06] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-dot-pattern opacity-10" />
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-blue-500/[0.07] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-orange-500/[0.05] rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="space-y-4 max-w-md text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Verified Logistics Framework</span>
              </div>
              <h3 className="font-poppins text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                National Security<br />Certification Seals
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-sans font-medium leading-relaxed">
                Licensed operations matching certified standards of protective layer lamination, secure cargo containers, and IBA approvals.
              </p>
            </div>

            {/* Departure Status Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:flex-1 lg:max-w-4xl font-sans">
              
              {[
                { icon: <Award className="h-5 w-5" />, title: 'ISO 9001:2015', badge: 'Approved System', badgeColor: 'text-orange-500', iconBg: 'bg-orange-500/15 text-orange-400', desc: 'Strict administrative rules on inventory checks and high-durability wrapping layers.' },
                { icon: <ShieldCheck className="h-5 w-5" />, title: 'Full Cargo Care', badge: 'Vetted Supervisors', badgeColor: 'text-blue-400', iconBg: 'bg-blue-500/15 text-blue-400', desc: 'Full background-checks executed on all packing staff and dedicated truck drivers.' },
                { icon: <Lock className="h-5 w-5" />, title: 'No Highway Extort', badge: 'Written Quote Lock', badgeColor: 'text-emerald-400', iconBg: 'bg-emerald-500/15 text-emerald-400', desc: 'Upfront transparent flat rates matching digital estimates to block highway extortion.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg} mb-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h4 className="text-[12px] font-bold tracking-wider text-white font-mono uppercase">{item.title}</h4>
                  <span className={`text-[9px] ${item.badgeColor} font-mono font-bold uppercase block mt-1`}>{item.badge}</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-normal font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED METRICS OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Company statistics">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl shadow-slate-900/[0.03]">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-orange-50 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm border border-slate-200/50 group-hover:shadow-md transition-all">
                    <Icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-poppins leading-none">{s.value}</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-1.5">{s.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM COMPREHENSIVE SERVICES AREA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Enterprise Logistics Divisions</span>
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            High-Performance Shifting Catalog
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-sans font-medium max-w-2xl mx-auto">
            Deploying vetted moving squads, heavy duty multi-layer wrapping rolls, and custom transit containment units nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {[
            { 
              num: '01', name: 'Household Relocation', 
              desc: 'Custom bubble-wrap lamination, wardrobe boxes, appliance corner caps, and bed disassembly setting.',
              features: ['Glass/LED Specialized Crates', 'Free Pre-assembly', 'Complete Cabinet Setup'],
              icon: '🏠', gradient: 'from-blue-600 to-blue-700' 
            },
            { 
              num: '02', name: 'Office Relocation', 
              desc: 'Server stack containment, physical document sorting, IT setups, and synchronized weekend transfers.',
              features: ['CCTV Secured Container Run', 'Data Server Protection', 'Zero-Downtime Blueprint'],
              icon: '🏢', gradient: 'from-orange-500 to-orange-600' 
            },
            { 
              num: '03', name: 'Vehicle Carrier Transit', 
              desc: 'Hydraulic closed-deck car container fleets and specialized foam bike-mount safety carriers.',
              features: ['No-Friction Rim Straps', 'Guaranteed Enclosed Truck', 'Zero-Ramp Scrapes'],
              icon: '🚚', gradient: 'from-emerald-600 to-emerald-700' 
            },
            { 
              num: '04', name: 'Secure Storage Vaults', 
              desc: 'Climatized, dry storage warehouse facilities with round-the-clock manual guard duty & CCTV.',
              features: ['Moisture-Free Flooring', '24/7 Guard Monitoring', 'Flexible Weekly Leases'],
              icon: '🔑', gradient: 'from-purple-600 to-purple-700' 
            }
          ].map((serv, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="group relative bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-600/[0.06] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${serv.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${serv.gradient} text-2xl shadow-lg shadow-slate-900/10 group-hover:scale-110 transition-transform duration-300`}>
                    {serv.icon}
                  </div>
                  <span className="font-mono text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                    {serv.num}
                  </span>
                </div>
                
                <h3 className="font-poppins text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors duration-300">
                  {serv.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-sans mt-2.5 leading-relaxed font-medium">
                  {serv.desc}
                </p>

                <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-[11px] font-bold text-slate-600 font-sans">
                  {serv.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2">
                      <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${serv.gradient} text-white text-[8px] font-black`}>✔</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('services')}
                className="group/btn flex items-center space-x-1.5 text-xs text-blue-600 hover:text-blue-700 font-bold font-sans mt-6 pt-4 border-t border-slate-100 w-full text-left"
              >
                <span>Read detailed process</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ACCOUNTABILITY FEATURES ("WHY CHOOSE US") */}
      <section className="bg-slate-50 py-20 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 uppercase">
                ★ Ultimate Crew Protection
              </span>
              <h2 className="font-poppins text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                No intermediate brokers, No road extortion.
              </h2>
              <p className="text-sm sm:text-base text-slate-605-0 text-slate-600 font-sans leading-relaxed font-medium">
                The Indian local packers and movers sector is riddled with brokers who attract users with low phone pricing only to hold cargo hostage for extra tolls midway. 
              </p>
              <p className="text-sm text-slate-500 font-sans leading-relaxed">
                EKTA LOGISTICS operates exclusively with direct verified staff out of Gurgaon, issuing written flat-rate estimates locked by ISO-certified standards.
              </p>

              <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 flex items-start space-x-3.5 shadow-sm max-w-lg">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-poppins text-sm font-bold text-slate-900 leading-tight">100% Shifting Transit Protection</h4>
                  <p className="text-xs text-slate-500 font-sans font-medium mt-1 leading-normal leading-normal">
                    We cover and log all inventory parameters on a certified checklist. Transit events feature direct, fast administrative dispute settlements.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-3xs space-y-3 hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold bg-slate-150-1 text-blue-600 bg-blue-50/50 px-2.5 py-0.5 rounded-full uppercase">
                        {h.badge}
                      </span>
                    </div>
                    <h4 className="font-poppins text-base font-bold text-slate-950">{h.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed font-medium">
                      {h.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 6. ADVANCED STEP TIMELINE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-widest text-emerald-600 uppercase bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span>Seamless Process</span>
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Our 5-Step Operational Flow
          </h2>
          <p className="text-sm text-slate-500 font-sans font-medium">
            From the initial online calculation up to post-delivery bed alignments, we secure every timeline interval.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-12 relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-200 via-blue-300 to-emerald-200" />
          {processes.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-600/[0.05] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Step number circle */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-mono text-sm font-black mb-4 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                {p.step}
              </div>
              <h4 className="font-poppins text-sm font-bold text-slate-950">{p.title}</h4>
              <p className="text-xs text-slate-500 font-sans mt-2.5 leading-relaxed font-medium">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. PRESTIGE REGIONAL OPERATING DEPUTY INFO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-tr from-blue-600/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex text-[10px] font-mono tracking-widest bg-blue-600/20 text-blue-400 border border-blue-500/10 px-3 py-1 rounded-full uppercase font-bold">
                ★ Gurugram Central Operations
              </span>
              <h2 className="font-poppins text-2.5xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                Premium Shifting Crew Centered Out of Gurgaon
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                Our main transport compound sits directly near Maruti Truck Parking in Gurgaon. This central location unlocks zero-delay dispatch runs across Cyber City, DLF colonies, sector complexes, Faridabad border gates, and New Delhi highway checkpoints.
              </p>
              
              <div className="space-y-3.5 text-xs text-slate-300 font-medium font-mono pt-3">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Depot Center: Shop No. 14, Cartepuri Road, Maruti Truck Parking, Gurugram, Haryana - 122017</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Clock className="h-5 w-5 text-blue-400 shrink-0" />
                  <span>Operations: 24/7 Crew Desks & Container Loading</span>
                </div>
              </div>
            </div>

            {/* Simulated Logistics Counter Monitor */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">LIVE TRANSIT CONTROLLER</span>
                  <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-mono font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping mr-1" />
                    <span>SYSTEM ONLINE</span>
                  </span>
                </div>
                
                <div className="space-y-3 text-xs sm:text-sm">
                  {[
                    { loc: 'GURGAON YARD DISPATCH STATUS', val: 'Crews Loaded 🟢' },
                    { loc: 'HIGHWAY EXPRESS HIGH-WAY CLEARANCE', val: 'IBA Permit Checked ✔' },
                    { loc: 'MUMBAI / BLR SPECIAL CONTAINER TRANSIT', val: 'Fleet Active 🚚' }
                  ].map((x, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 p-3 rounded-xl">
                      <span className="text-slate-300 font-bold font-mono tracking-tight text-[11px]">{x.loc}</span>
                      <span className="text-white font-mono font-bold text-[11px]">{x.val}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold font-mono uppercase">
                  <button 
                    onClick={() => onNavigate('cities')}
                    className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md text-center cursor-pointer"
                  >
                    Metropolitan Hubs
                  </button>
                  <button 
                    onClick={() => onNavigate('routes')}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all text-center cursor-pointer"
                  >
                    Transit Lines
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. GURGAON TO INDIAN CITIES ROUTER */}
      <section className="bg-slate-50 py-20 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Pan India Express Lines</span>
            </span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-black text-slate-950 tracking-tight text-center">
              Shifting from Gurgaon to Other Cities
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-sans font-medium text-center max-w-2xl mx-auto">
              We operate daily customized container dispatches leaving Gurgaon to all famous corporate cities. No price/time variables—direct flat quotes.
            </p>
          </div>

          {/* Clean 3-column rows of famous Indian cities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { destination: 'Mumbai', state: 'Maharashtra', dist: '1,420 km', label: 'Financial Capital', slug: 'mumbai', type: 'city-seo' },
              { destination: 'Bangalore', state: 'Karnataka', dist: '2,150 km', label: 'Tech Innovation Hub', slug: 'bangalore', type: 'city-seo' },
              { destination: 'Hyderabad', state: 'Telangana', dist: '1,580 km', label: 'Cyber Corridor Area', slug: 'hyderabad', type: 'city-seo' },
              { destination: 'Pune', state: 'Maharashtra', dist: '1,440 km', label: 'Educational & IT Base', slug: 'gurgaon-to-pune', type: 'route-seo' },
              { destination: 'Chennai', state: 'Tamil Nadu', dist: '2,204 km', label: 'Southern Capital Hub', slug: 'chennai', type: 'city-seo' },
              { destination: 'Kolkata', state: 'West Bengal', dist: '1,475 km', label: 'Eastern Gateway Terminal', slug: 'kolkata', type: 'city-seo' },
              { destination: 'Ahmedabad', state: 'Gujarat', dist: '945 km', label: 'Commercial Core Zone', slug: 'ahmedabad', type: 'city-seo' },
              { destination: 'Jaipur', state: 'Rajasthan', dist: '240 km', label: 'Pink City Expressway', slug: 'jaipur', type: 'scroll' },
              { destination: 'Lucknow', state: 'Uttar Pradesh', dist: '510 km', label: 'Avadh Heritage Highway', slug: 'lucknow', type: 'scroll' }
            ].map((city, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="group bg-white border border-slate-200 hover:border-blue-500/40 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-blue-600/[0.06] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase border border-blue-100">
                      {city.label}
                    </span>
                    <span className="flex items-center space-x-1.5 text-[10px] text-emerald-600 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Fleet Active</span>
                    </span>
                  </div>
                  
                  <h3 className="font-poppins text-lg font-black text-slate-950 flex items-center justify-between">
                    <span>Gurgaon ➔ {city.destination}</span>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <span className="text-slate-400 text-xs font-semibold block mt-0.5 font-sans">({city.state})</span>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium font-sans">Highway Distance</span>
                    <strong className="text-slate-800 font-mono font-bold bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-lg">
                      {city.dist}
                    </strong>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      if (city.type === 'city-seo') {
                        onNavigate('city-seo', city.slug);
                      } else if (city.type === 'route-seo') {
                        onNavigate('route-seo', city.slug);
                      } else {
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                        setTimeout(() => {
                          const destInput = document.querySelector('input[placeholder*="Hitech City"]');
                          if (destInput) (destInput as HTMLInputElement).focus();
                        }, 400);
                      }
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-extrabold font-poppins uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <span>Request Shifting Plan</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sub metropolitan badge indices containing other famous cities of India */}
          <div className="mt-10 bg-white border border-slate-205-0 border-slate-200 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-sm">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.01),transparent_50%)] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h4 className="font-poppins text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3.5 flex items-center justify-between">
                <span>Secondary national terminals covered from Gurugram yard</span>
                <span className="hidden sm:inline-flex items-center space-x-1.5 text-[10px] text-emerald-600 font-mono font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>100% Pan-India Covered</span>
                </span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Surat', 'Indore', 'Patna', 'Bhopal', 'Ludhiana', 'Agra', 'Vadodara', 'Nashik', 
                  'Visakhapatnam', 'Rajkot', 'Amritsar', 'Dehradun', 'Chandigarh', 'Coimbatore', 
                  'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 
                  'Kochi', 'Nagpur', 'Kanpur', 'Allahabad', 'Ranchi', 'Howrah', 'Thane', 'Solapur', 
                  'Goa', 'Srinagar', 'Jamshedpur', 'Bareilly', 'Moradabad', 'Mysore', 'Jalandhar', 
                  'Varanasi', 'Aurangabad', 'Bhubaneswar', 'Salem', 'Tiruchirappalli', 'Meerut'
                ].map((name, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                      setTimeout(() => {
                        const destInput = document.querySelector('input[placeholder*="Hitech City"]');
                        if (destInput) {
                          (destInput as HTMLInputElement).value = name;
                          (destInput as HTMLInputElement).focus();
                        }
                      }, 400);
                    }}
                    className="px-3 py-1.5 text-[10.5px] font-bold font-sans bg-slate-50 hover:bg-orange-50 border border-slate-150-0 border-slate-200 rounded-xl hover:border-orange-500/20 text-slate-650 hover:text-orange-600 transition-all cursor-pointer"
                  >
                    <span>Gurgaon ➔ {name}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                * Operational compliance guaranteed. National permits are active. Custom layouts, wooden crating options, and heavy carrier fleets are fully available under vetted supervisors.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 9. PREMIUM CLIENT TESTIMONIAL CAROUSEL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Customer testimonials">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-[32px] p-6 sm:p-14 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left intro text info */}
            <div className="space-y-4 max-w-md text-center lg:text-left shrink-0">
              <span className="text-[10px] font-mono tracking-widest text-orange-400 uppercase bg-white/5 px-2.5 py-1 rounded-full">
                ★ Genuine Customer Feedback
              </span>
              <h2 className="font-poppins text-3xl sm:text-4xl font-black text-white leading-tight">
                Verified Shifting Success
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We take immense pride in transporting homes safely. Explore absolute reviews from families, army officers, and corporate professionals relocated securely.
              </p>

              <div className="flex items-center justify-center lg:justify-start space-x-1 pt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 text-orange-400 fill-orange-400" />
                ))}
                <span className="text-white text-xs font-bold font-mono ml-2">4.9/5 Certified average</span>
              </div>
            </div>

            {/* Carousel Interactive Review Card */}
            <div className="w-full max-w-xl">
              <div className="relative h-72 sm:h-64 flex flex-col justify-between bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
                
                {/* Micro icon decorative quotation mark */}
                <span className="font-serif text-5xl text-blue-500/20 absolute right-6 top-4 select-none">“</span>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-orange-400 font-mono font-bold">{testimonials[currentTestimonial].city}</span>
                    <span className="text-slate-400 font-bold">{testimonials[currentTestimonial].date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium italic min-h-[100px]">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-white">{testimonials[currentTestimonial].name}</h4>
                    <span className="text-[10px] text-slate-400 block font-sans font-medium mt-0.5">{testimonials[currentTestimonial].role}</span>
                  </div>
                  
                  {/* Slider controls button */}
                  <div className="flex space-x-2" role="group" aria-label="Testimonial navigation">
                    <button 
                      onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      aria-label="Previous testimonial"
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
                    >
                      <ChevronLeft className="h-4.5 w-4.5" />
                    </button>
                    <button 
                      onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                      aria-label="Next testimonial"
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
                    >
                      <ChevronRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. SHIFTING FAQS ACCORDION */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
            ⚙ Solving Anxiety Accordion
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Frequently Shifting Questions
          </h2>
          <p className="text-sm text-slate-500 font-sans font-medium">
            Real answers on packing methods, flat price protections, and container fleet parameters.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-350 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-sans text-sm sm:text-base font-extrabold text-slate-900 bg-white hover:bg-slate-50/50 justify-between focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <div className={`h-6 w-6 rounded-lg bg-slate-50 border border-slate-150-0 flex items-center justify-center shrink-0 ml-3 transform transition-transform ${isOpen ? 'rotate-180 bg-blue-50 border-blue-200' : ''}`}>
                    <ChevronRight className={`h-4 w-4 text-slate-650 transform transition-transform duration-300 ${isOpen ? 'rotate-90 text-blue-700' : ''}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-500 font-sans leading-relaxed bg-[#f8fafc] font-medium leading-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. HIGH-CONVERT CONTACT SPLIT FRAME */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-slate-50 rounded-[40px] border border-slate-200 p-6 sm:p-12 relative overflow-hidden shadow-3xs">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Left Contact Side info panels */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono tracking-widest text-blue-600 bg-blue-105-0 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                ⚡ Direct Shifting Hotline
              </span>
              <h2 className="font-poppins text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Request a Callback
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                Want to book a shift or arrange a local physical survey? Enter your primary coordinates—Irshad Khan (Owner) or our Gurgaon dispatch desks will reach back to you in under 15 minutes!
              </p>

              <div className="space-y-4 pt-2 font-mono text-slate-800 text-xs">
                
                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-650">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Immediate hotline</span>
                    <a href="tel:+919690499137" className="text-slate-900 font-black text-xs sm:text-sm block hover:text-blue-600 mt-0.5">+91 96904 99137</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-750">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Office dispatch email</span>
                    <a href="mailto:ektalogistics0@gmail.com" className="text-slate-930 text-xs sm:text-sm font-black block mt-0.5">ektalogistics0@gmail.com</a>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-3xl flex items-start space-x-3">
                <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed font-semibold">
                  We process all submissions strictly under domestic privacy laws. Your contact numbers will never be sold to spam agencies.
                </p>
              </div>
            </div>

            {/* Right Callback Form Panel */}
            <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-orange-500 rounded-t-3xl" />
              
              {contactSubmitted ? (
                <div className="text-center py-10 px-4 space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500/20">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-poppins text-xl font-bold text-slate-950">Callback Inquiry Sent!</h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Your request was recorded on Sheet storage. Launching WhatsApp connection...
                  </p>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
                  <h3 className="font-poppins text-lg font-black text-slate-900">
                    Gurgaon Dispatch Office
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Submit coordinates below to request an absolute zero-cost survey or tariff quote.
                  </p>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                        Full Name / Company
                      </label>
                      <input 
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Captain Amit Sharma"
                        required
                        className="block w-full rounded-2xl border-2 border-slate-100 pl-4 pr-4 py-3 text-sm text-slate-905-0 text-slate-900 outline-none focus:border-blue-600 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                        10-Digit Mobile Phone
                      </label>
                      <input 
                        type="tel"
                        maxLength={10}
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        required
                        className="block w-full rounded-2xl border-2 border-slate-100 pl-4 pr-4 py-3 text-sm text-slate-905-0 text-slate-900 outline-none focus:border-blue-600 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                        Brief details of goods or route
                      </label>
                      <textarea 
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="e.g. Shifting 2 BHK from DLF phase 5 to Mumbai. Need packing for expensive TVs and glass table."
                        rows={3}
                        className="block w-full rounded-2xl border-2 border-slate-100 pl-4 pr-4 py-3 text-sm text-slate-905-0 text-slate-900 outline-none focus:border-blue-600 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={contactIsSubmitting}
                    className="w-full flex items-center justify-center space-x-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-poppins text-xs font-extrabold uppercase tracking-widest py-3.5 rounded-2xl shadow-lg transition-all active:scale-99 disabled:opacity-50 cursor-pointer mt-2"
                  >
                    {contactIsSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Coordinator Callback</span>
                        <Send className="h-4 w-4 fill-white text-white" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
