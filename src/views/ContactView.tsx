import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { Lead } from '../types';

interface ContactViewProps {
  onLeadSubmit: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
}

export default function ContactView({ onLeadSubmit }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Household Shifting Quote',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) errs.phone = 'Mobile number is required';
    else if (!phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid 10-digit Indian Mobile Number starting with 6-9';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) errs.message = 'Please input your shifting or inquiry message details';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate EmailJS & Google Sheet pipeline triggers
    setTimeout(() => {
      onLeadSubmit({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        pickupCity: 'Contact General',
        destinationCity: 'Contact Desk',
        movingDate: new Date().toISOString().slice(0, 10),
        propertyType: 'Inquiry',
        houseSize: formData.subject,
        notes: formData.message,
        source: 'contact_form'
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Household Shifting Quote',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="space-y-8 sm:space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Head section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold font-mono tracking-widest text-blue-750 bg-blue-50 px-2.5 py-1 rounded-full uppercase">
          STAY IN TOUCH
        </span>
        <h1 className="font-sans text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Our Gurugram Headquarters
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          Have customized heavy machinery moving requests or cargo warehouse leasing queries? Contact our central transit desks directly.
        </p>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact info column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-5 sm:space-y-6">
            <h3 className="font-sans text-base font-bold text-orange-400">Headquarters Credentials</h3>
            
            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">EKTA LOGISTICS Headquarters</strong>
                  <p className="text-slate-300 mt-1 leading-normal">
                    Shop No. 14, Cartepuri Road, Maruti Truck Parking, Near Maruti Udyog Limited, Gurugram, Haryana - 122017
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-slate-800 pt-4">
                <Phone className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Inquiry Hotlines</strong>
                  <p className="text-slate-300 mt-1 font-mono">Primary: +91 96904 99137 (Irshad Khan)</p>
                  <p className="text-slate-300 font-mono">Secondary: +91 74649 79144 / +91 81717 77536</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-slate-800 pt-4">
                <Mail className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Electronic Support Desks</strong>
                  <p className="text-slate-300 mt-1 font-mono">ektalogistics0@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-slate-800 pt-4">
                <Clock className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Operating Shifting Hours</strong>
                  <p className="text-slate-300 mt-1">Schedules departure desks run 24/7</p>
                  <p className="text-slate-300">Office administration: 9:00 AM - 8:00 PM (Everyday)</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-800" />

            <div className="flex items-center justify-between">
              <a
                href={`https://wa.me/919690499137?text=${encodeURIComponent('Hello EKTA LOGISTICS. I want to ask questions related to shifting.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Text On WhatsApp</span>
              </a>
              <a
                href="tel:+919690499137"
                className="flex items-center space-x-1 border border-slate-700 hover:bg-slate-800 text-slate-300 font-sans text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Dial Now</span>
              </a>
            </div>
          </div>

          {/* Simple Vector Map representation block */}
          <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
              <span className="font-mono font-bold text-slate-800">GURUGRAM GEOLOCATION DEPT</span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            
            <div className="bg-slate-200 border border-slate-300 rounded-xl p-8 text-center text-xs text-slate-500 font-mono space-y-2 relative overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute top-1 right-2 text-[8px] text-slate-400">LAT: 28.4595 | LNG: 77.0266</div>
              <MapPin className="h-10 w-10 text-blue-700 shrink-0 animate-bounce" />
              <strong className="text-slate-900 font-bold block">Maruti Parking Hub</strong>
              <span className="text-[10px] block leading-normal px-4">Direct express highway routes to Delhi border checkpoint inside 8 minutes.</span>
            </div>
          </div>

        </div>

        {/* Contact Form column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-3xs">
          
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-500/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-sans text-xl font-bold text-slate-900">Message Delivered Successfully!</h3>
              <p className="text-xs text-slate-500 font-sans max-w-md mx-auto leading-relaxed">
                Thank you for contacting EKTA LOGISTICS. Your information has been saved representatively in our Google Sheets storage and copy dispatched via EmailJS to our head coordinators at ektalogistics0@gmail.com. We will ring you momentarily.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold rounded-lg focus:outline-none"
              >
                Write Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4.5">
              <h3 className="font-sans text-base font-bold text-slate-900">Send an Electronic Inquiry</h3>
              <p className="text-xs text-slate-500 font-sans">
                Our Gurugram administrators log all queries to Google Sheets and respond via phone during standard hours.
              </p>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  className={`block w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors ${
                    errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-blue-700'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-sans">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 uppercase mb-1">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-sm text-slate-400 font-semibold">+91</span>
                    <input
                      id="contact-phone"
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="99999 99999"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      className={`block w-full rounded-lg border pl-11 pr-3 py-2.5 text-sm outline-none transition-colors ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-blue-700'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-sans">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-700"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-sans">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-700 outline-none"
                >
                  <option value="Household Shifting Quote">Household Shifting Quote</option>
                  <option value="Office Relocation SLA">Office Relocation SLA</option>
                  <option value="Vehicle Carrier Rates">Vehicle Carrier Rates</option>
                  <option value="Warehouse Space Rental">Warehouse Space Rental</option>
                  <option value="Franchise Partnership Inquiries">Franchise Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase mb-1">Detailed Message</label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="Outline your luggage counts, pickup coordinates and general shifting demands here..."
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  className={`block w-full rounded-lg border px-3 py-2 text-xs outline-none transition-colors ${
                    errors.message ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-blue-700'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-sans">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-sans text-sm font-semibold py-3 rounded-lg cursor-pointer transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4.5 w-4.5 animate-spin text-white" />
                    <span>Saving to Google Sheet...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
