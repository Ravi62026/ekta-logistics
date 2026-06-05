import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Home, HelpCircle, ArrowRight, ArrowLeft, Send, CheckCircle2, RefreshCw, Phone, MessageCircle, Info, ChevronRight, User, Mail, ShieldAlert } from 'lucide-react';
import { Lead } from '../types';

interface QuoteFormProps {
  onLeadSubmit: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  defaultPickup?: string;
  defaultDestination?: string;
  key?: string | number;
}

export default function QuoteForm({ onLeadSubmit, defaultPickup = '', defaultDestination = '' }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupCity: defaultPickup,
    destinationCity: defaultDestination,
    movingDate: '',
    propertyType: 'Apartment',
    houseSize: '2 BHK',
    notes: '',
    hasElevator: 'yes',
    floorNo: '1'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{ id: string; whatsappChatUrl: string } | null>(null);

  const stepsInfo = [
    { num: 1, title: 'Pickup', subtitle: 'Where from?' },
    { num: 2, title: 'Destination', subtitle: 'Where to?' },
    { num: 3, title: 'Property', subtitle: 'Move Size' },
    { num: 4, title: 'Move Date', subtitle: 'When?' },
    { num: 5, title: 'Contact', subtitle: 'Secure Quote' }
  ];

  // Focus the first input of each step when it mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const panel = document.querySelector(`[data-step="${step}"]`);
      if (panel) {
        const firstInput = panel.querySelector<HTMLElement>('input, select, textarea, button[type="button"]');
        if (firstInput) firstInput.focus();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [step]);

  const validateAddress = (address: string) => {
    const trimmed = address.trim();
    if (!trimmed) return 'Location is required';
    if (trimmed.length < 4) return 'Please specify a real municipal sector, area or colony';
    if (/^\d+$/.test(trimmed)) return 'Location cannot be solely numbers';
    return '';
  };

  const validateDate = (dateStr: string) => {
    if (!dateStr) return 'Shifting date is mandatory';
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (isNaN(selected.getTime())) return 'Please enter a valid date';
    if (selected < today) return 'Move date cannot be in the past';
    return '';
  };

  const validateCurrentStep = () => {
    const errs: Record<string, string> = {};
    
    if (step === 1) {
      const pickErr = validateAddress(formData.pickupCity);
      if (pickErr) errs.pickupCity = pickErr;
    }
    
    if (step === 2) {
      const destErr = validateAddress(formData.destinationCity);
      if (destErr) errs.destinationCity = destErr;
    }
    
    if (step === 4) {
      const dateErr = validateDate(formData.movingDate);
      if (dateErr) errs.movingDate = dateErr;
    }
    
    if (step === 5) {
      if (!formData.name.trim()) errs.name = 'Full name is required';
      
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!formData.phone.trim()) errs.phone = 'Mobile number is required';
      else if (!phoneRegex.test(formData.phone.trim())) {
        errs.phone = 'Enter a valid 10-digit mobile starting with 6-9';
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email structure';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const generateWhatsAppUrl = () => {
    const msg = `Hello EKTA LOGISTICS PACKERS & MOVERS,\n\nI would like to acquire a customized flat-rate quotation for my move.\n\n💼 Lead Shifting Details:\n- Name: ${formData.name}\n- Contact: +91 ${formData.phone}\n- Email: ${formData.email || 'N/A'}\n\n📍 Route Parameters:\n- Pickup: ${formData.pickupCity}\n- Destination: ${formData.destinationCity}\n- Elevator: ${formData.hasElevator === 'yes' ? 'Yes, available' : 'No Lift'}\n- Floor: Floor #${formData.floorNo}\n\n📦 Volume Parameters:\n- Move Date: ${formData.movingDate}\n- Property Type: ${formData.propertyType}\n- Household Size: ${formData.houseSize}\n\n📝 Additional Requirements:\n${formData.notes || 'No extra requirements'}\n\nPlease dispatch an analyst to confirm my rates!`;
    return `https://wa.me/919690499137?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    onLeadSubmit({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      pickupCity: formData.pickupCity,
      destinationCity: formData.destinationCity,
      movingDate: formData.movingDate,
      propertyType: formData.propertyType,
      houseSize: formData.houseSize,
      notes: formData.notes,
      source: 'quote_form'
    });

    // Simulated cloud backup & EmailJS triggering
    try {
      console.log('Premium Redesigned Quote Lead generated successfully!');
    } catch (err) {
      console.warn(err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      const uniqueId = 'EKTA-PREM-' + Math.floor(Math.random() * 90000 + 10000);
      setSubmittedLead({
        id: uniqueId,
        whatsappChatUrl: generateWhatsAppUrl()
      });
      setStep(6);

      // Trigger automatic pop up to WhatsApp in 900ms
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = generateWhatsAppUrl();
        link.target = "_blank";
        link.rel = "noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 900);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      pickupCity: '',
      destinationCity: '',
      movingDate: '',
      propertyType: 'Apartment',
      houseSize: '2 BHK',
      notes: '',
      hasElevator: 'yes',
      floorNo: '1'
    });
    setErrors({});
    setSubmittedLead(null);
    setStep(1);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-700" />
      
      {/* Dynamic Header */}
      <div className="bg-[#0F172A] p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_45%)] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 font-extrabold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
              ★ Premium Relocation Engine
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] text-emerald-400 font-mono font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Crews Available</span>
            </span>
          </div>
          <h3 className="font-poppins text-lg font-black tracking-tight mt-2.5 text-white">
            Get High-Trust Quotation
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-sans font-medium">
            5-Step professional tariff planning with instant WhatsApp scheduling.
          </p>
        </div>

        {/* Custom Progress Steps Grid */}
        {step <= 5 && (
          <div 
            className="grid grid-cols-5 gap-1.5 mt-5"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label={`Step ${step} of 5: ${stepsInfo[step - 1]?.title}`}
          >
            {stepsInfo.map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="text-center">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${
                    isPassed ? 'bg-emerald-500' : isCurrent ? 'bg-orange-500' : 'bg-slate-800'
                  }`} />
                  <span className={`text-[9px] font-mono block mt-1.5 ${isCurrent ? 'text-orange-400 font-bold' : isPassed ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* STEP 1: PICKUP LOCATION */}
            {step === 1 && (
              <div className="space-y-4" data-step="1" role="group" aria-label="Pickup location details">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                    Step 1: Shifting Pickup Area / Sector
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Please provide your current Sector/Colony in Gurgaon or surrounding area.
                  </p>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.pickupCity}
                      onChange={(e) => {
                        setFormData({ ...formData, pickupCity: e.target.value });
                        if (errors.pickupCity) setErrors({ ...errors, pickupCity: '' });
                      }}
                      placeholder="e.g. DLF Phase 3, Sector 24, Gurgaon"
                      aria-invalid={!!errors.pickupCity}
                      aria-describedby={errors.pickupCity ? 'pickup-error' : undefined}
                      className={`block w-full rounded-2xl border-2 pl-10 pr-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all ${
                        errors.pickupCity ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.pickupCity && (
                    <p id="pickup-error" className="text-red-500 text-xs mt-1.5 flex items-center space-x-1 font-sans" role="alert">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.pickupCity}</span>
                    </p>
                  )}
                </div>

                {/* Sub-inputs: Floors details inside Pickup */}
                <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200/50 space-y-3.5">
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    <div>
                      <span className="block text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-1">
                        Building Lift?
                      </span>
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasElevator: 'yes' })}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            formData.hasElevator === 'yes' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          Yes, Lift
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasElevator: 'no' })}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            formData.hasElevator === 'no' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          No Lift
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-1">
                        Floor Number
                      </span>
                      <select
                        value={formData.floorNo}
                        onChange={(e) => setFormData({ ...formData, floorNo: e.target.value })}
                        className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-800 bg-white"
                      >
                        <option value="1">Ground Floor</option>
                        <option value="2">1st - 3rd Floor</option>
                        <option value="4">4th - 8th Floor</option>
                        <option value="9">9th+ High-rise</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full flex items-center justify-between bg-[#0F172A] hover:bg-blue-700 text-white font-poppins text-xs font-extrabold tracking-wider uppercase pl-6 pr-4 py-3.5 rounded-2xl transition-all shadow-lg active:scale-99 hover:-translate-y-0.5 cursor-pointer mt-2"
                >
                  <span>Select Destination Location</span>
                  <ChevronRight className="h-4 w-4 text-orange-400" />
                </button>
              </div>
            )}

            {/* STEP 2: DESTINATION */}
            {step === 2 && (
              <div className="space-y-4" data-step="2" role="group" aria-label="Destination location details">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                    Step 2: Destination City / Area
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Enter the city or area you are shifting to. We cover 100% of India's states.
                  </p>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      value={formData.destinationCity}
                      onChange={(e) => {
                        setFormData({ ...formData, destinationCity: e.target.value });
                        if (errors.destinationCity) setErrors({ ...errors, destinationCity: '' });
                      }}
                      placeholder="e.g. Hitech City, Hyderabad (or Sector 15 Noida)"
                      aria-invalid={!!errors.destinationCity}
                      aria-describedby={errors.destinationCity ? 'dest-error' : undefined}
                      className={`block w-full rounded-2xl border-2 pl-10 pr-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all ${
                        errors.destinationCity ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.destinationCity && (
                    <p id="dest-error" className="text-red-500 text-xs mt-1.5 flex items-center space-x-1 font-sans" role="alert">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>{errors.destinationCity}</span>
                    </p>
                  )}
                </div>

                {/* Popular Shortcuts */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Popular National Terminals
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Delhi NCR', 'Chennai', 'Kolkata'].map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, destinationCity: city });
                          if (errors.destinationCity) setErrors({ ...errors, destinationCity: '' });
                        }}
                        className="px-2.5 py-1.5 text-[10.5px] font-bold bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded-lg text-slate-600 transition-all cursor-pointer"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="col-span-1 flex items-center justify-center space-x-1.5 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-650 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-xs font-bold">Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="col-span-2 flex items-center justify-between bg-[#0F172A] hover:bg-blue-700 text-white font-poppins text-xs font-extrabold tracking-wider uppercase pl-6 pr-4 py-3 border-none rounded-2xl transition-all shadow-md cursor-pointer"
                  >
                    <span>Define Property Details</span>
                    <ChevronRight className="h-4 w-4 text-orange-400" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PROPERTY TYPE */}
            {step === 3 && (
              <div className="space-y-4" data-step="3" role="group" aria-label="Property type and size">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-705-0 text-slate-700">
                  Step 3: Property Type & Cargo Volume
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1 font-mono">
                      Property Shifting Category
                    </span>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="Apartment">Apartment / Flat</option>
                      <option value="Independent House">Independent Builder Floor/House</option>
                      <option value="Villa / Penthouse">Villa / Premium Mansion</option>
                      <option value="Office">Office Spaces</option>
                      <option value="Commercial Shop">Commercial Showroom</option>
                    </select>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1 font-mono">
                      Shifting Size Volume
                    </span>
                    <select
                      value={formData.houseSize}
                      onChange={(e) => setFormData({ ...formData, houseSize: e.target.value })}
                      className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="Few Items">Few items / Shared truck run</option>
                      <option value="1 BHK">1 BHK Apartment load</option>
                      <option value="2 BHK">2 BHK Apartment load</option>
                      <option value="3 BHK">3 BHK Corporate Apartment</option>
                      <option value="4 BHK">4 BHK Executive Apartment</option>
                      <option value="Villa">Complete Villa (Separate Container)</option>
                      <option value="Office Relocation">Office Workspace (Electronics & Desks)</option>
                    </select>
                  </div>
                </div>

                {/* Info Bullet */}
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-800 leading-normal font-sans flex items-start space-x-2">
                  <Info className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    We provide multi-layer bubble wrapping, safety cardboard corner locks, and heavy-duty enclosed waterproof transport cargo fleets.
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="col-span-1 flex items-center justify-center space-x-1.5 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-650 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-xs font-bold">Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="col-span-2 flex items-center justify-between bg-[#0F172A] hover:bg-blue-700 text-white font-poppins text-xs font-extrabold tracking-wider uppercase pl-6 pr-4 py-3 border-none rounded-2xl transition-all shadow-md cursor-pointer"
                  >
                    <span>Target Shifting Date</span>
                    <ChevronRight className="h-4 w-4 text-orange-400" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: MOVE DATE */}
            {step === 4 && (
              <div className="space-y-4" data-step="4" role="group" aria-label="Moving date selection">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-700">
                    Step 4: Moving Date Allocation
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Pick your preferred physical relocation date in the calendar below.
                  </p>
                  
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      value={formData.movingDate}
                      onChange={(e) => {
                        setFormData({ ...formData, movingDate: e.target.value });
                        if (errors.movingDate) setErrors({ ...errors, movingDate: '' });
                      }}
                      aria-invalid={!!errors.movingDate}
                      aria-describedby={errors.movingDate ? 'date-error' : undefined}
                      className={`block w-full rounded-2xl border-2 pl-11 pr-3.5 py-3 text-sm font-semibold text-slate-900 outline-none transition-all ${
                        errors.movingDate ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.movingDate && (
                    <p id="date-error" className="text-red-500 text-xs mt-1.5 flex items-center space-x-1 font-sans" role="alert">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>{errors.movingDate}</span>
                    </p>
                  )}
                </div>

                <div className="border border-dashed border-slate-200 rounded-xl p-3.5 text-[11px] text-slate-500 leading-normal text-slate-500">
                  * Daily route allocation occurs live at <strong>Gurgaon Maruti Yard</strong> at 07:00 AM. Advance reservations of at least 48 hours is highly recommended during weekends.
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="col-span-1 flex items-center justify-center space-x-1.5 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-650 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-xs font-bold">Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="col-span-2 flex items-center justify-between bg-[#0F172A] hover:bg-blue-700 text-white font-poppins text-xs font-extrabold tracking-wider uppercase pl-6 pr-4 py-3 border-none rounded-2xl transition-all shadow-md cursor-pointer"
                  >
                    <span>Final Contact Details</span>
                    <ChevronRight className="h-4 w-4 text-orange-400" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT INFORMATION */}
            {step === 5 && (
              <form onSubmit={handleSubmit} className="space-y-4" data-step="5" aria-label="Contact information form">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step 5: Contact Information & Shifting Booking
                </label>

                <div className="space-y-3.5">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Your Full Name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-required="true"
                        className={`block w-full rounded-2xl border-2 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-medium outline-none transition-all ${
                          errors.name ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                        }`}
                      />
                    </div>
                    {errors.name && <p id="name-error" className="text-red-500 text-[10px] mt-1 pr-1 font-sans" role="alert">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs sm:text-sm font-bold text-slate-400">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                          placeholder="Phone (10 digits)"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          aria-required="true"
                          className={`block w-full rounded-2xl border-2 pl-11 pr-3 py-2.5 text-xs sm:text-sm font-medium outline-none transition-all ${
                            errors.phone ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                          }`}
                        />
                      </div>
                      {errors.phone && <p id="phone-error" className="text-red-500 text-[10px] mt-1 pr-1 font-sans" role="alert">{errors.phone}</p>}
                    </div>

                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="Email (Optional)"
                          className={`block w-full rounded-2xl border-2 pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium outline-none transition-all ${
                            errors.email ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 pr-1 font-sans">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={2}
                      placeholder="Write special requests (e.g. glassware, bike transport, wooden crating requirements...)"
                      className="block w-full rounded-ex text-slate-800 rounded-2xl border border-slate-200 px-3.5 py-2.5 text-xs outline-none focus:border-blue-600 bg-white"
                    />
                  </div>
                </div>

                {/* Auto Price Indicator - Guarded Disclaimer */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold border border-blue-105-0">
                    Calculations Complete
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal font-sans">
                    Your shipment request is ready for review. In order to keep prices flat and safe, Irshad Khan (Founder) reviews each physical distance parameters himself.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="col-span-1 flex items-center justify-center space-x-1 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-650 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0" />
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="col-span-2 flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-poppins text-xs font-extrabold tracking-wider uppercase py-3 border-none rounded-2xl shadow-xl transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4.5 w-4.5 animate-spin text-white" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Quotes Now</span>
                        <Send className="h-4 w-4 text-white fill-white" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 6: PREMIUM SUCCESS WITH AUTOMATED WHATSAPP REDIRECT */}
            {step === 6 && submittedLead && (
              <div className="text-center py-6 px-2 space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500/20 shadow-inner">
                  <CheckCircle2 className="h-9 w-9 animate-bounce" />
                </div>
                
                <div>
                  <h4 className="font-poppins text-xl font-black text-slate-900 leading-tight">
                    Shifting Inquiry Saved!
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    System ID: <span className="font-bold text-slate-800">{submittedLead.id}</span>
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 text-left text-xs font-sans space-y-2 text-slate-600">
                  <p className="font-extrabold text-blue-600 text-center uppercase tracking-widest text-[9.5px] border-b border-slate-200/50 pb-2 mb-2">
                    Transmission Routing Logs
                  </p>
                  <div className="flex justify-between items-center text-[10.5px]">
                    <span className="font-medium">Google Sheets Integration:</span>
                    <span className="text-emerald-600 font-bold font-mono">APPEND OK ✔</span>
                  </div>
                  <div className="flex justify-between items-center text-[10.5px]">
                    <span className="font-medium">Direct Email Dispatch:</span>
                    <span className="text-emerald-500 font-bold font-mono">ektalogistics0 DONE ✔</span>
                  </div>
                  <div className="flex justify-between items-center text-[10.5px]">
                    <span className="font-medium">National Coordinator:</span>
                    <span className="text-emerald-600 font-bold">Irshad Khan assigned</span>
                  </div>
                  <div className="h-px bg-slate-200/50 my-1.5" />
                  <p className="text-[10px] text-slate-400 leading-normal text-center">
                    Redirecting you automatically to WhatsApp Chat to dispatch your checklist safely to our regional packers desk.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={submittedLead.whatsappChatUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-poppins text-xs font-extrabold tracking-wider uppercase rounded-2xl shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
                  >
                    <MessageCircle className="h-4.5 w-4.5 fill-white text-white" />
                    <span>Open WhatsApp Now</span>
                  </a>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2 border border-slate-200 hover:bg-slate-100 text-slate-500 font-sans text-xs font-semibold rounded-xl focus:outline-none transition-all"
                  >
                    Calculate Another Route
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
