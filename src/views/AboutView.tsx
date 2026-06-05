import React from 'react';
import { Award, ShieldCheck, Flag, Users, Compass, Truck, FlameKindling, Activity } from 'lucide-react';

export default function AboutView() {
  const certifications = [
    { title: 'ISO 9001:2015', desc: 'Certified Quality Management Shifting System' },
    { title: 'IBA Approved Carrier', desc: 'Official validation representing bank transit safety standard compliance' },
    { title: 'ISO 14001:2015', desc: 'Eco-conscious warehousing & green energy recycling logistics' },
  ];

  const safetyStandards = [
    { title: 'Triple-Layer Packing', desc: 'Thick airbubble wrapper plus edge thermocols and heavy grade waterproof plastic cling sheets.' },
    { title: 'Background Checked Crew', desc: 'Every loader, driver and coordinator undergoes mandatory biometric identity check.' },
    { title: 'Sealed Transport Containers', desc: 'No open-body trucks are operated, eliminating risk of highway pilferage or thunderstorm ruins.' },
    { title: 'Accident Spot-Insurance', desc: 'Full physical declarations logged beforehand for swift accidental refunds approval.' },
  ];

  const coreValues = [
    { title: 'Transparency', desc: 'No unannounced charges or arbitrary price negotiations on loading day.', icon: Award },
    { title: 'Accountability', desc: 'We take 100% custody of your goods from loading till final bedroom installation.', icon: ShieldCheck },
    { title: 'Efficiency', desc: 'Fast, synchronized logistics using GPS routing vectors out of Gurgaon.', icon: Activity }
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 px-4">
        <span className="text-xs font-bold font-mono tracking-widest text-blue-700 uppercase bg-blue-50 px-2.5 py-1 rounded-full">
          CORPORATE OVERVIEW
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          India's Most Trusted Moving & Packing Force
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          Headquartered in Gurugram, Haryana. Building gold-standard relocations logistics with transparent operations and verified crews.
        </p>
      </div>

      {/* 2. Story Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-sans text-2xl font-bold text-slate-900">
                EKTA LOGISTICS Relocation Story
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-sans space-y-4 leading-relaxed">
                <p>
                  Founded by <strong>Irshad Khan</strong> in Gurugram, Haryana, EKTA LOGISTICS was built with a clear purpose: to deliver highly secure, transparent, and prompt domestic moving services across all major cities in India. Based near Maruti Udyog Limited, we are positioned right at the heart of Haryana's largest industrial and logistics corridor.
                </p>
                <p>
                  EKTA LOGISTICS PACKERS & MOVERS operates on an unwavering principle of <strong>absolute pricing integrity</strong>. We do not engage brokers; we maintain our own vehicles, packing materials, and verified crews of loading experts to guarantee zero-stress relocations.
                </p>
                <p>
                  From our prime transport park in Gurgaon, we have systematically grown to link Delhi NCR directly with major metropolitan grids including Mumbai, Bangalore, Pune, Hyderabad, and Chennai, ensuring safe arrival of every household, corporate unit, and service vehicle.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-6">
              <div className="space-y-3">
                <Compass className="h-8 w-8 text-orange-500" />
                <h3 className="font-sans text-sm font-bold">Our Mission</h3>
                <p className="text-xs text-slate-300 leading-normal">
                  To deliver premium, safe, stress-free shifting experiences across India with honest rates, rigorous packing safety, and complete accountability.
                </p>
              </div>
              <div className="h-px bg-slate-800" />
              <div className="space-y-3">
                <Users className="h-8 w-8 text-blue-400" />
                <h3 className="font-sans text-sm font-bold">Our Vision</h3>
                <p className="text-xs text-slate-300 leading-normal">
                  To become India's premier digital moving platform, empowering home owners and businesses with transparent, zero-stress logistics systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fleet and Safety Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10">
          <div className="lg:col-span-5 space-y-4">
            <Truck className="h-10 w-10 text-blue-700" />
            <h2 className="font-sans text-2xl font-bold text-slate-900">Our Professional Transit Fleet</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
              We operate exclusively sealed, weatherproof direct carriers. Our vehicles undergo strict maintenance sweeps before initiating long-distance highway passes.
            </p>
            <div className="space-y-2 text-xs text-slate-600 font-mono">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span>Total Transit Carriers:</span>
                <span className="font-bold text-slate-900">45+ Trucks</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span>Premium GPS Trackers:</span>
                <span className="font-bold text-slate-900">100% active</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span>Backup Drivers Layout:</span>
                <span className="font-bold text-slate-900">Double driver structure</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safetyStandards.map((std, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200/30">
                  CRITICAL CODE
                </span>
                <h4 className="font-sans text-xs font-bold text-slate-900 mt-2">{std.title}</h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <h2 className="font-sans text-2xl font-bold text-slate-900">What Sets Us Apart</h2>
          <p className="text-xs text-slate-500">Every decision we make traces back to these core operational principles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-xs text-center space-y-3">
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mx-auto">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-sm font-bold text-slate-900">{v.title}</h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Certifications */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-sans text-xl font-bold">National Logistics Credentials</h2>
            <p className="text-xs text-slate-400 font-sans">
              EKTA LOGISTICS is fully registered with national carrier departments, guaranteeing compliant documentation, toll passes, and corporate allowance clearances.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-lg font-bold text-orange-500 font-sans block">{cert.title}</span>
                <span className="text-xs text-slate-300 font-sans block mt-1">{cert.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
