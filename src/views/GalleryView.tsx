import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, CheckCircle2, Award, ShieldCheck, Lock, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import { GalleryPhoto } from '../types';

export function RenderCustomCard({ type, isLightbox = false }: { type: 'business-card' | 'gst' | 'office-yard' | 'actual-signboard' | 'actual-cabin' | 'actual-yard'; isLightbox?: boolean }) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, label: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (type === 'business-card') {
    return (
      <div className={`w-full h-full bg-slate-900 text-white p-5 rounded-xl flex flex-col justify-between border-2 border-orange-500 shadow-lg relative overflow-hidden select-none font-sans ${isLightbox ? 'aspect-[1.58] max-w-md mx-auto py-7 px-6' : 'h-56'}`}>
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 text-slate-900 font-extrabold h-8 w-8 rounded-full flex items-center justify-center text-xs border border-slate-700">
              EL
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-widest font-mono text-orange-400 block uppercase">MILITARY CERTIFIED</span>
              <h4 className="font-extrabold text-xs tracking-wide leading-none text-white whitespace-nowrap">EKTA LOGISTICS</h4>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-mono text-slate-400 block">ESTD. 2018</span>
            <span className="text-[8px] tracking-wide text-emerald-400 font-bold bg-emerald-955/40 px-1.5 py-0.5 rounded border border-emerald-900 block mt-0.5">VERIFIED</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-1.5 my-2.5">
          <div className="text-[10px] font-bold text-slate-200">
            Proprietors:
            <span className="text-orange-400 font-mono text-[11px] ml-1.5 block sm:inline">Irshad Khan / Intjar Khan</span>
          </div>
          <p className="text-[8px] text-slate-300 uppercase tracking-wider font-mono">
            ARMY • AIRFORCE • NAVY • MOVERS & CAR TRANSIT SPECIALIST
          </p>
          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-800 text-[9px] text-slate-400">
            <button
              onClick={(e) => handleCopy(e, "9690499137", "ph1")}
              className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer text-left"
            >
              <Phone className="h-2.5 w-2.5 text-orange-500 shrink-0" />
              <span className="font-mono">9690499137</span>
              {copied === "ph1" ? <span className="text-[7px] text-emerald-400">✔</span> : <Copy className="h-2 w-2 text-slate-500 hover:text-white shrink-0" />}
            </button>
            <button
              onClick={(e) => handleCopy(e, "7464979144", "ph2")}
              className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer justify-end text-right"
            >
              <Phone className="h-2.5 w-2.5 text-orange-500 shrink-0" />
              <span className="font-mono">7464979144</span>
              {copied === "ph2" ? <span className="text-[7px] text-emerald-400">✔</span> : <Copy className="h-2 w-2 text-slate-500 hover:text-white shrink-0" />}
            </button>
          </div>
        </div>

        {/* Card Footer */}
        <div className="border-t border-dashed border-slate-800 pt-1.5 text-[8px] text-slate-400 flex justify-between items-end">
          <div className="max-w-[65%]">
            <span className="text-slate-500 block uppercase font-mono text-[6px]">Office Address</span>
            <span className="font-semibold block truncate">Shop 14, Cartepuri Rd, Maruti Truck Parking</span>
          </div>
          <div className="text-right">
            <button 
              onClick={(e) => handleCopy(e, "ektalogistics0@gmail.com", "email")}
              className="font-mono text-orange-400 hover:text-white transition-colors flex items-center space-x-0.5 justify-end text-[8px]"
            >
              <span>ektalogistics0@gmail.com</span>
              {copied === "email" ? <span className="text-emerald-400">✔</span> : <Copy className="h-1.5 w-1.5 text-slate-600 ml-0.5" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'gst') {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-slate-950 to-slate-900 text-white p-5 rounded-xl flex flex-col justify-between border-2 border-blue-500 shadow-lg font-sans ${isLightbox ? 'aspect-[1.58] max-w-md mx-auto py-7' : 'h-56'}`}>
        <div className="flex justify-between items-center bg-blue-950/40 p-1.5 rounded border border-blue-900">
          <div className="flex items-center space-x-2">
            <span className="h-5 w-5 rounded bg-blue-600 text-[9px] font-black flex items-center justify-center font-mono">GST</span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-200">Govt Registered Seal</span>
          </div>
          <span className="text-[8px] font-mono text-emerald-400 font-bold flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse block"></span>
            <span>ACTIVE CERTIFICATE</span>
          </span>
        </div>

        <div className="text-center my-3.5 space-y-1.5">
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block">REGISTRATION NUMBER</span>
          <div className="inline-flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            <code className="text-xs sm:text-sm font-mono font-black tracking-widest text-blue-400 select-all">
              06AHMPI4161M2Z1
            </code>
            <button 
              onClick={(e) => handleCopy(e, "06AHMPI4161M2Z1", "gst")}
              className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-500 hover:text-white shrink-0 cursor-pointer"
            >
              {copied === "gst" ? <span className="text-[9px] text-emerald-400 font-bold">✔</span> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <p className="text-[8px] font-sans text-slate-400">
            Compliant intercity dispatch with genuine cargo transport bills.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-1.5 flex justify-between items-center text-[8px] text-slate-400">
          <div>
            <span className="text-slate-500 block text-[6px] uppercase font-mono">Issued To</span>
            <span className="font-bold text-slate-300">EKTA LOGISTICS PACKERS & MOVERS</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[6px] uppercase font-mono">Zone Details</span>
            <span className="font-bold text-slate-300">Haryana Tax Authority, Gurgaon</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'actual-signboard') {
    return (
      <div className={`w-full h-full bg-slate-100 text-slate-800 p-3 sm:p-4 rounded-xl flex flex-col justify-between border-[3px] border-slate-300 shadow-xl font-sans relative overflow-hidden select-all ${isLightbox ? 'aspect-[1.58] max-w-xl mx-auto py-6 px-5' : 'h-56'}`}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300" />
        
        <div className="bg-white border-2 border-red-500 p-2 sm:p-3 rounded-md shadow-inner flex flex-col justify-between h-full relative">
          <div className="flex justify-between items-start text-[6.5px] sm:text-[9px] font-mono font-bold text-slate-700 leading-tight">
            <div>
              <span className="block text-blue-900 font-extrabold uppercase">GSTIN: 06AHMPI4161M2Z1</span>
              <span className="block text-slate-500 lowercase mt-0.5">E-mail: ektaektalogistics@gmail.com</span>
            </div>
            <div className="text-right">
              <span className="block text-red-600 font-extrabold">Irshad Khan : 9690499137</span>
              <span className="block text-slate-600 font-extrabold mt-0.5 animate-pulse">Intjar Khan : 7464979144</span>
              <span className="block text-slate-400 font-bold">8171777536</span>
            </div>
          </div>

          <div className="text-center my-1 sm:my-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-red-600 tracking-wider leading-none uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)] font-mono">
              EKTA LOGISTICS
            </h2>
            <h3 className="text-[10px] sm:text-xs md:text-sm font-extrabold text-slate-800 tracking-widest mt-1 uppercase font-sans">
              PACKERS & MOVERS
            </h3>
          </div>

          <div className="text-center bg-blue-50/70 py-1 px-1 rounded border border-blue-105 my-0.5">
            <p className="text-[6px] sm:text-[8px] font-extrabold text-blue-800 leading-tight uppercase tracking-wide">
              ARMY, AIRFORCE, NAVY, HOUSE OF PACKING, MOVING SOLUTION SERVICES, HOUSE SHIFTING, PROFESSIONAL PACKING & CAR TRANSPORT
            </p>
          </div>

          <div className="flex justify-between items-center text-[6px] sm:text-[8px] border-t border-slate-100 pt-1 mt-0.5 font-bold text-slate-500 uppercase">
            <span className="font-mono text-slate-600">★ ALL INDIA PERMIT ★</span>
            <span className="bg-red-50 text-red-600 font-black px-1.5 py-0.5 rounded border border-red-100 text-[6.5px] sm:text-[7.5px] tracking-wider">
              ALL OVER INDIA
            </span>
            <span className="font-mono text-slate-600">★ CAR CARRIER TRANSIT ★</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'actual-cabin') {
    return (
      <div className={`w-full h-full bg-slate-900 text-white p-4 sm:p-5 rounded-xl flex flex-col justify-between border-2 border-blue-500 shadow-xl font-sans relative overflow-hidden select-none ${isLightbox ? 'aspect-[1.58] max-w-lg mx-auto py-6 px-6' : 'h-56'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-blue-900/10 to-blue-950/40 opacity-70 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none flex justify-between px-2 opacity-15">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="w-[1.5px] h-full bg-white" />
          ))}
        </div>

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-900 to-emerald-800 border border-emerald-500 flex items-center justify-center relative shrink-0 shadow-sm">
              <span className="font-black text-[9px] text-red-400 tracking-tighter z-10 font-mono">EL</span>
            </div>
            <div>
              <span className="text-[6.5px] text-emerald-400 font-mono block uppercase tracking-widest font-black leading-none">OFFICIAL DEPOT</span>
              <h4 className="font-extrabold text-[9px] sm:text-[10.5px] text-white uppercase tracking-wider">Portable Depot Cabin #14</h4>
            </div>
          </div>
          <span className="text-[7.5px] font-mono text-blue-300 font-bold bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800">
            SECURE OUTPOST
          </span>
        </div>

        <div className="my-2 bg-blue-950/50 border border-blue-800 p-2 rounded-lg text-center relative z-10 space-y-1">
          <div className="flex justify-around items-center text-xs sm:text-sm font-black text-amber-400 font-mono tracking-widest uppercase">
            <span className="border-b border-dashed border-amber-400/30 pb-0.5 px-1.5">EKTA</span>
            <span className="text-[8px] text-slate-300 font-normal">LOGISTICS</span>
            <span className="border-b border-dashed border-amber-400/30 pb-0.5 px-1.5">EKTA</span>
          </div>

          <div className="flex justify-center space-x-4 font-mono text-[8.5px] sm:text-[9.5px] font-bold text-white tracking-wider">
            <span className="flex items-center space-x-1">
              <Phone className="h-2 w-2 text-amber-400 shrink-0" />
              <span>9690499137</span>
            </span>
            <span className="flex items-center space-x-1">
              <Phone className="h-2 w-2 text-amber-400 shrink-0" />
              <span>7464979144</span>
            </span>
          </div>

          <p className="text-[8px] font-medium tracking-wide text-slate-200 uppercase leading-none font-sans">
            LOGISTICS • PACKERS & MOVERS
          </p>
        </div>

        <div className="mt-1 border-t border-blue-900 pt-1.5 flex justify-between items-end z-10">
          <div className="flex items-center space-x-1">
            <div className="flex items-end space-x-1 ml-1">
              {/* Visual plants */}
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-emerald-400 leading-none">🌿</span>
                <div className="h-1 w-2 bg-amber-800 rounded-b" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-emerald-400 leading-none">🌱</span>
                <div className="h-1 w-1.5 bg-stone-600 rounded-b" />
              </div>
              <div className="flex flex-col items-center -mb-0.5">
                <span className="text-[8px] text-emerald-300 leading-none">🌵</span>
                <div className="h-1 w-1.5 bg-zinc-700 rounded-b" />
              </div>
            </div>
            <span className="text-[7.5px] font-sans text-slate-500 font-medium pl-1">Cabin Flowerpot Decor</span>
          </div>
          <span className="text-[7.5px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-1.5 py-0.5 rounded">
            HQ OFFICE
          </span>
        </div>
      </div>
    );
  }

  if (type === 'actual-yard') {
    return (
      <div className={`w-full h-full bg-slate-900 text-white p-4 rounded-xl flex flex-col justify-between border-2 border-emerald-600 shadow-xl font-sans relative overflow-hidden select-none ${isLightbox ? 'aspect-[1.58] max-w-lg mx-auto py-6 px-6' : 'h-56'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        
        <div className="flex justify-between items-start z-10">
          <div>
            <div className="flex items-center space-x-1 bg-amber-950/80 text-amber-500 border border-amber-900 text-[7px] sm:text-[8px] font-mono px-2 py-0.5 rounded uppercase font-bold w-fit">
              <MapPin className="h-2.5 w-2.5 mr-0.5" />
              <span>Maruti Truck Parking, Gurugram</span>
            </div>
            <h4 className="font-extrabold text-[9px] sm:text-[10.5px] text-white tracking-wide mt-1 uppercase">Fleet Sorting & Loading Depot</h4>
          </div>
          <span className="text-[8px] font-mono text-emerald-400 font-bold bg-emerald-955/40 border border-emerald-900 px-1.5 py-0.5 rounded">
            CENTRAL PLAZA
          </span>
        </div>

        <div className="my-1.5 h-20 bg-slate-950/80 border border-slate-800 rounded-lg relative overflow-hidden flex items-stretch">
          <div className="flex-1 bg-slate-800/20 p-1.5 border-r border-slate-800 flex flex-col justify-between">
            <div className="bg-white text-slate-800 p-0.5 rounded border border-red-500 text-center font-bold scale-90 origin-top">
              <span className="text-[5.5px] font-extrabold text-red-655 block">EKTA LOGISTICS</span>
              <span className="text-[3.5px] text-slate-500 uppercase block">Packers & Movers</span>
            </div>
            
            <div className="bg-blue-950 border border-blue-900 p-0.5 rounded text-center scale-95 origin-bottom">
              <span className="text-[5px] font-black text-amber-400 tracking-tighter uppercase block leading-none">EKTA HYUNDAI</span>
              <span className="text-[4px] text-slate-500 block uppercase font-mono mt-0.5">Sliding Gate</span>
            </div>
          </div>

          <div className="w-[45%] bg-blue-950/60 p-1.5 flex flex-col justify-between relative">
            <div className="text-center z-10 scale-95 origin-top">
              <span className="text-[6px] font-black text-amber-400 leading-none block">EKTA CABIN #14</span>
              <span className="text-[4px] text-slate-400 block mt-0.5">Physical Hub</span>
            </div>
            
            <div className="flex justify-between items-end pt-1 z-10 border-t border-blue-900">
              <div className="flex flex-col space-y-[1px]">
                <div className="w-3 h-[1px] bg-slate-500" />
                <div className="w-4 h-[1px] bg-slate-500" />
              </div>
              <div className="flex space-x-0.5">
                <span className="text-[7px]">🌿</span>
                <span className="text-[7px]">🌱</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-1.5 flex justify-between items-center text-[7.5px] text-slate-400 z-10 leading-normal">
          <div>
            <span className="text-slate-505 block text-[6px] uppercase font-mono">Headquarters Location</span>
            <span className="font-extrabold text-slate-300 block">Shop 14, Cartepuri Road, Gurugram</span>
          </div>
          <p className="text-right max-w-[50%] text-[7px] text-slate-400 font-sans">
            Opposite Maruti Udyog Gate 2. Container fleets park directly on load out.
          </p>
        </div>
      </div>
    );
  }

  // office-yard
  return (
    <div className={`w-full h-full bg-slate-900 text-white p-5 rounded-xl flex flex-col justify-between border-2 border-emerald-600 shadow-lg relative overflow-hidden font-sans ${isLightbox ? 'aspect-[1.58] max-w-md mx-auto py-7' : 'h-56'}`}>
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[8px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 inline-block uppercase font-bold tracking-wider">OPERATIONAL PROOF</span>
          <h4 className="font-extrabold text-xs text-slate-200 mt-1 whitespace-nowrap">Gurugram Dispatch Office & Yard</h4>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Cabin #14</span>
      </div>

      <div className="my-2 bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
        <div className="text-[9px] text-slate-300 flex items-center space-x-1.5 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 block shrink-0" />
          <span>Maruti Truck Parking base, Gurugram</span>
        </div>
        <p className="text-[9px] text-slate-400 leading-relaxed pl-3 font-sans">
          Opposite Maruti Udyog Limited Gate No. 2, Cartepuri Road. Our direct GPS-linked fleets dispatch from this cargo zone.
        </p>
      </div>

      <div className="flex justify-between items-center text-[8px] border-t border-slate-800 pt-1.5 text-slate-400">
        <div>
          <span className="text-slate-550 block text-[6px] uppercase font-mono">Operating Hours</span>
          <span className="font-bold text-slate-300 font-mono">24 Hours / 365 Days</span>
        </div>
        <span className="text-emerald-400 font-bold font-mono tracking-widest bg-emerald-955/40 border border-emerald-900 px-1.5 py-0.5 rounded text-[7px]">
          HEADQUARTERS YARD
        </span>
      </div>
    </div>
  );
}

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (selectedPhotoIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhotoIdx(null);
      if (e.key === 'ArrowRight') setSelectedPhotoIdx((prev) => prev !== null ? (prev + 1) % galleryPhotos.length : null);
      if (e.key === 'ArrowLeft') setSelectedPhotoIdx((prev) => prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIdx]);

  // Prevent body scroll when lightbox is open
  React.useEffect(() => {
    if (selectedPhotoIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPhotoIdx]);

  // High quality representative items with localized descriptives
  const galleryPhotos: GalleryPhoto[] = [
    {
      id: "real-sign",
      url: "",
      title: "EKTA LOGISTICS Physical Signboard Banner",
      category: "credentials",
      alt: "Official physical office signboard displaying GSTIN: 06AHMPI4161M2Z1, mobile contacts, Irshad Khan, Intjar Khan, and business registration details.",
      isCustomCard: true,
      customCardType: "actual-signboard"
    },
    {
      id: "real-cabin",
      url: "",
      title: "EKTA LOGISTICS Portable Office Cabin #14",
      category: "credentials",
      alt: "Our authentic dark-blue ribbed cargo unit modified into an on-field manager station, with decorative plants and contact stencils, parked at Gurugram, opposite Maruti Gate No.2.",
      isCustomCard: true,
      customCardType: "actual-cabin"
    },
    {
      id: "real-yard",
      url: "",
      title: "EKTA LOGISTICS Fleet Dispatch Depot",
      category: "credentials",
      alt: "Full view of our active transit base showing the corrugated tin signboard installation, manager cabin, and direct loading spaces at Gurgaon.",
      isCustomCard: true,
      customCardType: "actual-yard"
    },
    {
      id: "c1",
      url: "https://images.unsplash.com/photo-1549194388-f61be84d6e9e?auto=format&fit=crop&w=800&q=80",
      title: "EKTA LOGISTICS Business Card",
      category: "credentials",
      alt: "Proprietor Irshad Khan & Intjar Khan. Call/WhatsApp 9690499137, 7464979144. Located at Shop No.14, Cartepuri Road, Maruti Truck Parking, Gurugram.",
      isCustomCard: true,
      customCardType: "business-card"
    },
    {
      id: "c2",
      url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
      title: "Official Government GSTIN Registration",
      category: "credentials",
      alt: "Active GST Registration 06AHMPI4161M2Z1, confirming transit billing compliance and valid tax invoices in Haryana.",
      isCustomCard: true,
      customCardType: "gst"
    },
    {
      id: "c3",
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      title: "Maruti Parking Dispatch Yard Proof",
      category: "credentials",
      alt: "Physical Office container at Shop 14, Cartepuri Road, Maruti Truck Parking near Maruti Udyog Limited, Gurgaon.",
      isCustomCard: true,
      customCardType: "office-yard"
    },
    {
      id: "p1",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      title: "Tri-Layer Protection Packing",
      category: "packing",
      alt: "EKTA LOGISTICS crew wrapping delicate wooden furniture with thick airbubble lamination safely."
    },
    {
      id: "t1",
      url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
      title: "Closed Cargo Carrier Fleet",
      category: "trucks",
      alt: "EKTA LOGISTICS high-security closed container trucks parked at our central Gurugram sorting yard."
    },
    {
      id: "t2",
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      title: "Bike Loading & Lash Downs",
      category: "trucks",
      alt: "Motorcycle safely stabilized inside direct highway carriage trailers with tension ratchet wraps."
    },
    {
      id: "m2",
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      title: "Coordination Checklists Audit",
      category: "team",
      alt: "Professional logistics coordinator verifying inventories and marking lead registers at Gurgaon."
    }
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? galleryPhotos 
    : galleryPhotos.filter((p) => p.category === activeFilter);

  const openLightbox = (photoId: string) => {
    const idx = galleryPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setSelectedPhotoIdx(idx);
    }
  };

  const closeLightbox = () => {
    setSelectedPhotoIdx(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIdx !== null) {
      setSelectedPhotoIdx((selectedPhotoIdx + 1) % galleryPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIdx !== null) {
      setSelectedPhotoIdx((selectedPhotoIdx - 1 + galleryPhotos.length) % galleryPhotos.length);
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Head section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold font-mono tracking-widest text-blue-750 bg-blue-50 px-2.5 py-1 rounded-full uppercase">
          OPERATIONAL PROOF
        </span>
        <h1 className="font-sans text-3xl font-extrabold text-slate-900 tracking-tight">
          EKTA LOGISTICS Shifting Gallery
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          Real on-ground glimpses representing our loading tasks, premium cartoning standards, and direct carrier fleets operating out of Gurgaon.
        </p>
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto bg-slate-100 p-1.5 rounded-xl border border-slate-200" role="tablist" aria-label="Gallery filter">
        {[
          { label: 'All Photos', value: 'all' },
          { label: 'Verified Proofs', value: 'credentials' },
          { label: 'Smart Packing', value: 'packing' },
          { label: 'Carrier Fleet', value: 'trucks' },
          { label: 'Uniform Crews', value: 'team' }
        ].map((btn) => {
          const isSelected = activeFilter === btn.value;
          return (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value)}
              role="tab"
              aria-selected={isSelected}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg uppercase tracking-wider transition-all focus:outline-none cursor-pointer whitespace-nowrap ${
                isSelected 
                  ? 'bg-white text-blue-750 shadow-sm border-b-2 border-blue-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id}
            onClick={() => openLightbox(photo.id)}
            className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1 block"
          >
            {/* Visual Frame */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900 flex items-center justify-center">
              {photo.isCustomCard ? (
                <div className="w-full h-full p-2 bg-slate-950 flex items-center justify-center">
                  <RenderCustomCard type={photo.customCardType!} />
                </div>
              ) : (
                <img 
                  src={photo.url} 
                  alt={photo.alt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              )}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-white/90 text-blue-700 flex items-center justify-center shadow">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Bottom Descriptions */}
            <div className="p-4 bg-white">
              <span className={`text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border ${
                photo.category === 'credentials' 
                  ? 'bg-orange-50 text-orange-655 border-orange-200' 
                  : 'bg-blue-50 text-blue-750 border-blue-200'
              }`}>
                {photo.category} standard
              </span>
              <h3 className="font-sans text-xs font-bold text-slate-900 mt-2">{photo.title}</h3>
              <p className="text-[11px] text-slate-500 font-sans mt-1 leading-normal">
                {photo.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIdx !== null && (
        <div 
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/98 text-white p-4"
        >
          {/* Close Header */}
          <div className="absolute top-4 right-4 z-10 flex items-center space-x-3.5">
            <span className="text-[10px] font-mono text-slate-400" aria-live="polite">
              Photo {selectedPhotoIdx + 1} of {galleryPhotos.length}
            </span>
            <button 
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 hover:text-red-400 text-white rounded-full focus:outline-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lightbox frame box */}
          <div className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center">
            
            {/* Prev arrow Button */}
            <button 
              onClick={prevPhoto}
              aria-label="Previous image"
              className="absolute left-2 sm:-left-16 z-20 h-10 w-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Real Active Img */}
            {galleryPhotos[selectedPhotoIdx].isCustomCard ? (
              <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg p-2">
                <RenderCustomCard type={galleryPhotos[selectedPhotoIdx].customCardType!} isLightbox={true} />
              </div>
            ) : (
              <img 
                src={galleryPhotos[selectedPhotoIdx].url} 
                alt={galleryPhotos[selectedPhotoIdx].alt}
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()} // Prevents clicks inside image from closing the frame
                className="max-h-[75vh] max-w-full object-contain rounded-xl border border-slate-800 shadow-2xl"
              />
            )}

            {/* Next arrow Button */}
            <button 
              onClick={nextPhoto}
              aria-label="Next image"
              className="absolute right-2 sm:-right-16 z-20 h-10 w-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Descriptive labels */}
          <div className="text-center mt-6 max-w-lg px-2 space-y-1">
            <h4 className="font-sans text-sm font-bold text-orange-400">{galleryPhotos[selectedPhotoIdx].title}</h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {galleryPhotos[selectedPhotoIdx].alt}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
