import React, { useState } from 'react';
import { Home, Notebook, Ship, Truck, Package, ShieldCheck, HelpCircle, ArrowRight, Phone, MessageCircle } from 'lucide-react';

interface ServicesViewProps {
  onQuoteStart: (serviceType: string) => void;
}

export default function ServicesView({ onQuoteStart }: ServicesViewProps) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const services = [
    {
      id: 'home',
      label: 'Home Shifting',
      icon: Home,
      title: 'Premium Household Packing & Moving Services',
      desc: 'Moving houses is an emotional and physical challenge. EKTA LOGISTICS Packers handles your home goods like sacred assets. We wrap, pack, and transition your entire 1/2/3/4+ BHK apartment with utmost diligence.',
      benefits: [
        { label: 'Thick bubble padding', desc: 'Triple layer protection for wooden dining tables, cabinets, and appliances.' },
        { label: 'Sofa shrink wrapping', desc: 'Moisture resistant plastic shrink wraps standard for upholstered couches and mattresses.' },
        { label: 'Free bed dismantling', desc: 'Expert carpentry crew takes apart modular beds and sets them up at the destination.' }
      ],
      process: [
        { title: 'Room Survey', desc: 'Itemizing assets and planning corridor clearance angles.' },
        { title: 'Safe Packaging', desc: 'Wrapping glass, lining cabinets, and boxing delicate crockery.' },
        { title: 'Loading & Transit', desc: 'Securing loose luggage in container trucks with heavy cargo ties.' },
        { title: 'Unpacking Support', desc: 'Unboxing major cardboard boxes and reassembling beds.' }
      ],
      faqs: [
        { q: 'Will packers unpack and place garments in closets?', a: 'Yes. Our staff unpacks large cardboard cartons and can hang your suits and clothing in wardrobes on request.' },
        { q: 'Do you charge extra for taking items up stairs if there is no elevator?', a: 'Minimal stair-climbing surcharges apply for higher floors without lifts. These are always explained transparently in your initial quote.' }
      ]
    },
    {
      id: 'office',
      label: 'Office Relocation',
      icon: Notebook,
      title: 'Fast & Secure Commercial Office Relocations',
      desc: 'Business downtime directly impacts revenue. Our specialized commercial shifting teams organize IT desk items, servers, delicate smart screens, and file archives seamlessly to ensure zero operational lag.',
      benefits: [
        { label: 'Labelled box tracking', desc: 'Individual employee desk boxes packed and color-tagged systematically.' },
        { label: 'Anti-static packing', desc: 'Special electrostatic discharge secure wrapping for storage arrays and server setups.' },
        { label: 'Weekend night moving', desc: 'We organize night and weekend transits so your employees resume work on Monday morning.' }
      ],
      process: [
        { title: 'Workplace Auditing', desc: 'Mapping server power requirements and desk quantities.' },
        { title: 'Server Cabling Logs', desc: 'Careful disconnected socket diagrams of sensitive smart screens.' },
        { title: 'Safe Highway Passage', desc: 'Air-ride suspension equipped trucks used for highly delicate digital hardware.' },
        { title: 'Instant Desktop Refitting', desc: 'On-time desk alignment at destination as mapped in structural designs.' }
      ],
      faqs: [
        { q: 'Can you relocate complex heavy server cabinets?', a: 'Yes. We utilize specialized hydraulic lifters, high-strength cargo handtrucks, and custom-grooved wooden boards to roll heavy servers.' },
        { q: 'Do you help manage physical documentation files archiving?', a: 'Yes. We provide heavy structural indexed boxes and label folders systematically to ensure records do not get misplaced.' }
      ]
    },
    {
      id: 'intercity',
      label: 'Intercity Moving',
      icon: Ship,
      title: 'Long Distance Interstate Relocation Packers',
      desc: 'Relocating to another state in India involves border clearances, toll checkpoints, and extreme road vibrations. EKTA LOGISTICS handles long-run transits utilizing GPS-linked container trucks.',
      benefits: [
        { label: 'Sealed direct containers', desc: 'No intercity offboarding, sorting, or midway vehicle swaps.' },
        { label: 'All India border permits', desc: 'State toll permits pre-scheduled to bypass highway blockades or delays.' },
        { label: '100% genuine insurance', desc: 'Comprehensive damage coverage with quick, hassle-free settlement programs.' }
      ],
      process: [
        { title: 'Volumetric inspection', desc: 'Determining exact direct cargo space constraints beforehand.' },
        { title: 'Heavy Duty Crate Packing', desc: 'Building secure timber casing layers for delicate mirrors and glassware.' },
        { title: 'Border clearances', desc: 'Processing state permits, green tax and highway tolls transparently.' },
        { title: 'Final Home Delivery', desc: 'Securing structural door entry clearances and placing items inside rooms.' }
      ],
      faqs: [
        { q: 'How do you keep intercity tracking transparent?', a: 'All long-run vehicles host modern, active internal GPS systems. Our supervisors send live location updates directly to your WhatsApp.' },
        { q: 'Is taking insurance safety mandatory?', a: 'While not legally mandatory, taking transit insurance safeguards your household items against accidental highway collisions, fire, or storms.' }
      ]
    },
    {
      id: 'vehicle',
      label: 'Vehicle Transport',
      icon: Truck,
      title: 'Safe Bike & Car Relocation Carrier Services',
      desc: 'Avoid road wear-and-tear, radiator cracks, and tire punctures. We ship luxury sedans, family SUVs, and premium sports bikes in closed car carrier trailers safely.',
      benefits: [
        { label: 'Closed deck carriage', desc: 'Protects cars from highway dust, loose debris, gravel chips, and sun exposure.' },
        { label: 'Zero-slippage tie downs', desc: 'High-strength canvas rachet belts secure car wheels safely to carrier decks.' },
        { label: 'Low fluid safety protocols', desc: 'Detailed checklist inspection including minor fuel drainage, disconnected batteries, and tire adjustments.' }
      ],
      process: [
        { title: 'Pre-Car Inspecting', desc: 'Logging existing scratches, detailing car condition, and compiling checklists.' },
        { title: 'Hydraulic Ramp Loading', desc: 'Slow, precise rolling onto our direct open/closed flatbed carrier vehicles.' },
        { title: 'Sealed Transit Passage', desc: 'Fast passage across designated highways directly to the new city.' },
        { title: 'On-Door Delivery', desc: 'Re-inspecting car condition alongside checklist details at your new gate.' }
      ],
      faqs: [
        { q: 'Do I need to maintain fuel levels during vehicle transport?', a: 'For security rules, we mandate that cars and bikes have minimal fuel (under 10-15%) inside tanks during carrier transit.' },
        { q: 'Should I provide vehicle documentation for highway clearances?', a: 'Yes. We require active copies of Registration Certificate (RC), Pollution (PUC), and Shifting Owner ID.' }
      ]
    },
    {
      id: 'packing',
      label: 'Packing Services',
      icon: Package,
      title: 'Professional Multi-Layer Packing & Unpacking',
      desc: 'A move is only as safe as its packing quality. We use top quality high-density double-corrugated carton boards, thick bubbles, foam packing peanuts, and heavy lamination sheets.',
      benefits: [
        { label: 'Custom wood crating', desc: 'Handcrafted protective wooden frames made on-spot for massive glass monitors and expensive paintings.' },
        { label: 'Corrugated sheet lining', desc: 'Thick heavy cardboard wrap for refrigerator bodies, metal dishwashers, and washing machines.' },
        { label: 'Moisture resistant plastic layers', desc: 'Guarantees completely dry transit during sudden monsoon storms.' }
      ],
      process: [
        { title: 'Packing Station Set', desc: 'Assembling cartons and sorting materials by density and fragile ranks.' },
        { title: 'Multi-layer Wrapping', desc: 'Wrapping items with bubble wrap first, then wrapping edges with corrugated cardboard, and finishing with lamination wrap.' },
        { title: 'Structured Indexing', desc: 'Listing item genres on box tape lines for easy unboxing.' },
        { title: 'Unpacking Support', desc: 'Opening cardboard boxes at destination and sorting items.' }
      ],
      faqs: [
        { q: 'Do you provide loose empty cartons to pack personal drawers myself?', a: 'Yes. If you book early, we can deliver a bundle of 5 to 10 standard carton boxes so you can secure confidential personal archives first.' },
        { q: 'What packing raw materials do you operate with?', a: 'We use dual-layered bubble sheets, thick corrugated cardboard boxes, air-sealed foam blocks, stretch cling film, and heavy adhesive packing tapes.' }
      ]
    },
    {
      id: 'storage',
      label: 'Secure Storage',
      icon: ShieldCheck,
      title: 'Climate Controlled Storage & Warehousing',
      desc: 'Relocating to another country on client assignments, or need to store household furniture due to deferred apartment handovers? Use our secure, lockable, CCTV monitored warehouses in Gurugram.',
      benefits: [
        { label: '24/7 CCTV vigilance', desc: 'Continuous camera recording and professional security guard protocols.' },
        { label: 'Weekly cleaning sweeps', desc: 'Pest control spraying and continuous dust sweeping to preserve wood quality.' },
        { label: 'Flexible lease models', desc: 'Store items on affordable weekly or monthly leasing terms without long locks.' }
      ],
      process: [
        { title: 'Inventory Registering', desc: 'Listing and labeling stored assets on high-fidelity ledger lists.' },
        { title: 'Secure Foam Wrapping', desc: 'Providing heavy wrap shields for items stored long-term.' },
        { title: 'Private Vault Storage', desc: 'Locking items of furniture in private clean warehouse bays.' },
        { title: 'On-Demand Loading', desc: 'Delivering parts or complete household logs to your gate whenever you request.' }
      ],
      faqs: [
        { q: 'What is the pricing model for storing households in Gurgaon?', a: 'Storage pricing is calculated based on floor volume occupied. Standard 2 BHK storage fees typically range from ₹3,000 to ₹6,000 per month.' },
        { q: 'Can I withdraw specific selected boxes halfway through storage lease?', a: 'Yes. You can access your stored items during operational business hours to fetch specific boxes/items, with prior notification.' }
      ]
    }
  ];

  const currentService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Topic Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold font-mono tracking-widest text-blue-750 uppercase bg-blue-50 px-2.5 py-1 rounded-full">
          EXPERT CAPABILITIES
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Shifting Solutions Across India
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          Click any of our core functional moving categories below to inspect custom safety benefits, processes, and service parameters.
        </p>
      </div>

      {/* Tabs list */}
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2 bg-slate-100 p-1 sm:p-1.5 rounded-xl border border-slate-200" role="tablist" aria-label="Service categories">
          {services.map((s) => {
            const IconComp = s.icon;
            const isSelected = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveTab(s.id);
                  setFaqOpen(null);
                }}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`tab-panel-${s.id}`}
                id={`tab-${s.id}`}
                className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 py-2.5 px-1 sm:px-1.5 rounded-lg text-center transition-all focus:outline-none cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-blue-700 shadow-sm font-bold border-b-2 border-blue-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 text-xs sm:text-sm'
                }`}
              >
                <IconComp className={`h-4.5 w-4.5 shrink-0 ${isSelected ? 'text-blue-700' : 'text-slate-400'}`} />
                <span className="text-[10px] sm:text-xs font-semibold tracking-tight leading-none block">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Context content */}
      <div 
        className="mx-auto max-w-6xl bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-10"
        role="tabpanel"
        id={`tab-panel-${currentService.id}`}
        aria-labelledby={`tab-${currentService.id}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info Col */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded border border-orange-200">
                SERVICE STANDARD DIRECTIVE
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                {currentService.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed mt-3.5">
                {currentService.desc}
              </p>
            </div>

            {/* Benefits list */}
            <div>
              <h3 className="font-sans text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3.5">
                Key Security Benefits
              </h3>
              <div className="space-y-3">
                {currentService.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <span className="text-emerald-500 font-bold text-xs shrink-0 mt-0.5">✔</span>
                    <div>
                      <strong className="text-xs text-slate-900 font-sans block">{b.label}</strong>
                      <p className="text-[11px] text-slate-500 font-sans mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              <button
                onClick={() => onQuoteStart(currentService.label)}
                className="flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-800 text-white font-sans text-xs font-bold px-5 py-3 rounded-lg"
              >
                <span>Request {currentService.label} Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <a
                href={`https://wa.me/919690499137?text=${encodeURIComponent(`Hello EKTA LOGISTICS. I am interested in estimating cost for ${currentService.label}`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-sans text-xs font-semibold px-4 py-3 rounded-lg"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>Discuss Shifting Requirements</span>
              </a>
            </div>
          </div>

          {/* Sidebar process Col */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Shifting Steps Timeline progress */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">
                Operational Execution Steps
              </h3>
              <div className="space-y-4">
                {currentService.process.map((p, idx) => (
                  <div key={idx} className="relative flex items-start space-x-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <strong className="text-xs text-slate-950 font-sans block">{p.title}</strong>
                      <p className="text-[11px] text-slate-500 font-sans mt-0.5 leading-normal">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Targeted FAQs */}
            <div className="space-y-2.5">
              <h3 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-1">
                Frequently Asked
              </h3>
              {currentService.faqs.map((f, idx) => {
                const isOpen = faqOpen === idx;
                return (
                  <div key={idx} className="bg-slate-50/50 rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setFaqOpen(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-slate-900 hover:bg-slate-100 focus:outline-none"
                    >
                      <span>{f.q}</span>
                      <span>{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <p className="p-3.5 pt-0 border-t border-slate-200 text-[11px] text-slate-500 leading-normal">
                        {f.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
