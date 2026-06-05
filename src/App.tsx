import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, BarChart3, ShieldCheck, X, Check, Globe, HelpCircle } from 'lucide-react';
import { Lead } from './types';

// Importing elements
import Header from './components/Header';
import Footer from './components/Footer';

// Importing views
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import ServicesView from './views/ServicesView';
import CitySEOView from './views/CitySEOView';
import RouteView from './views/RouteView';
import GalleryView from './views/GalleryView';
import ContactView from './views/ContactView';
import LeadDashboard from './components/LeadDashboard';
import AdminLogin from './components/AdminLogin';

const DEMO_LEADS: Lead[] = [
  {
    id: "L-28491",
    name: "Mukesh Agarwal",
    phone: "9812304918",
    email: "mukesh_agarwal@gmail.com",
    pickupCity: "Sohna Road, Gurgaon",
    destinationCity: "Whitefield, Bangalore",
    movingDate: "2026-06-15",
    propertyType: "Apartment",
    houseSize: "3 BHK",
    notes: "Requires dismantling a high-end modular wardrobe and double-door fridge.",
    createdAt: "2026-06-02T10:14:00Z",
    source: "quote_form",
    status: "Fresh"
  },
  {
    id: "L-47102",
    name: "Aakash Mehta",
    phone: "9829014193",
    email: "aakash@mehta.info",
    pickupCity: "Sector 62, Noida",
    destinationCity: "Andheri East, Mumbai",
    movingDate: "2026-06-10",
    propertyType: "Office",
    houseSize: "Office Relocation",
    notes: "Moving 15 high-value desktop systems and sensitive network switches.",
    createdAt: "2026-06-01T15:30:00Z",
    source: "quote_form",
    status: "Contacted"
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeCitySlug, setActiveCitySlug] = useState<string>('gurgaon');
  const [activeRouteSlug, setActiveRouteSlug] = useState<string>('delhi-to-mumbai');
  
  // Simulated Analytics Log Frame
  const [analyticsLogs, setAnalyticsLogs] = useState<string[]>(['GA4: Instance Initialized near Gurugram Hub']);
  const [showConsole, setShowConsole] = useState<boolean>(true);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ekta_admin_auth') === 'true' || 
           sessionStorage.getItem('ekta_admin_auth') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    triggerLog('AUTH: Administrator successfully logged into console');
  };

  const handleLogout = () => {
    localStorage.removeItem('ekta_admin_auth');
    sessionStorage.removeItem('ekta_admin_auth');
    setIsAdminAuthenticated(false);
    triggerLog('AUTH: Administrator signed out securely');
    setCurrentView('home');
  };

  // Lead State
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('safeshift_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_LEADS;
      }
    }
    return DEMO_LEADS;
  });

  // Sync leads to storage
  useEffect(() => {
    localStorage.setItem('safeshift_leads', JSON.stringify(leads));
  }, [leads]);

  // Log simulated GA4 and metadata audits
  const triggerLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setAnalyticsLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 49)]);
  };

  // Dynamic SEO Metas, Canonicals and GA4 tracking
  useEffect(() => {
    let relativeUrl = `/${currentView === 'home' ? '' : currentView}`;
    if (currentView === 'city-seo') relativeUrl = `/packers-movers-${activeCitySlug}`;
    if (currentView === 'route-seo') relativeUrl = `/routes/${activeRouteSlug}`;
    
    const absoluteUrl = `https://ektalogistics.in${relativeUrl === '/' ? '' : relativeUrl}`;

    // Update document title dynamically based on navigation view
    let titleStr = "EKTA LOGISTICS PACKERS & MOVERS | Trusted Shifting Services India";
    if (currentView === 'about') titleStr = "About Us - EKTA LOGISTICS Packers & Movers";
    if (currentView === 'services') titleStr = "Our Shifting Services - EKTA LOGISTICS";
    if (currentView === 'gallery') titleStr = "Cargo & Shifting Gallery - EKTA LOGISTICS";
    if (currentView === 'contact') titleStr = "Contact Us & Get Free Shifting Quotes - EKTA LOGISTICS";
    if (currentView === 'city-seo') {
      const cityName = activeCitySlug.charAt(0).toUpperCase() + activeCitySlug.slice(1);
      titleStr = `Reliable Packers and Movers in ${cityName} | EKTA LOGISTICS`;
    }
    if (currentView === 'route-seo') {
      const routeFormatted = activeRouteSlug.split('-to-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' to ');
      titleStr = `Professional Packers and Movers ${routeFormatted} | EKTA LOGISTICS`;
    }
    document.title = titleStr;

    // Secure canonical head element update dynamically
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', absoluteUrl);

    // Secure Open Graph standard metadata
    let ogUrl: HTMLMetaElement | null = document.querySelector("meta[property='og:url']");
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', absoluteUrl);

    let ogTitle: HTMLMetaElement | null = document.querySelector("meta[property='og:title']");
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', titleStr);

    triggerLog(`GA4: [PageView] url="${relativeUrl}" title="${titleStr}"`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeCitySlug, activeRouteSlug]);

  const handleLeadSubmit = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const record: Lead = {
      ...newLeadData,
      id: 'L-' + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
      status: 'Fresh'
    };
    
    setLeads((prev) => [record, ...prev]);
    triggerLog(`GA4: [Event] "lead_generated" source="${record.source}" size="${record.houseSize}" id="${record.id}"`);
    triggerLog(`INTEGRATION: Google Sheets ROW APPEND OK (ID: ${record.id})`);
    triggerLog(`EMAILJS: Dispatched booking details to corporate dispatch desk`);
  };

  const handleUpdateStatus = (id: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    triggerLog(`DATABASE: Record ${id} status updated to [${newStatus}]`);
  };

  const handleClearLeads = () => {
    setLeads([]);
    localStorage.removeItem('safeshift_leads');
    triggerLog('DATABASE: Cleared all simulated lead logs');
  };

  const handlePopulateDemoLeads = () => {
    setLeads(DEMO_LEADS);
    triggerLog('DATABASE: Populated test client rows successfully');
  };

  const handleNavigate = (view: string, slug?: string) => {
    setCurrentView(view);
    if (view === 'city-seo' && slug) {
      setActiveCitySlug(slug);
    }
    if (view === 'route-seo' && slug) {
      setActiveRouteSlug(slug);
    }
  };

  // Simulated click telemetry tracking
  const handleCallTracking = (channel: string) => {
    triggerLog(`GA4: [Event] "click_to_call" channel="${channel}" phone="+919999999999"`);
  };

  const handleWhatsAppTracking = (channel: string) => {
    triggerLog(`GA4: [Event] "whatsapp_inquiry_start" channel="${channel}"`);
  };

  // Inject Schemas according to active view
  const renderJSONLDSchemas = () => {
    // 1. LocalBusiness Headquarters Schema standard
    const hqSchema = {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      "name": "EKTA LOGISTICS PACKERS & MOVERS",
      "image": "https://ektalogistics.in/assets/ekta-logistics-headquarters-signboard.jpg",
      "@id": "https://ektalogistics.in/#corporation",
      "url": "https://ektalogistics.in",
      "telephone": "+919690499137",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 14, Cartepuri Road, Maruti Truck Parking, Near Maruti Udyog Limited",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122017",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.4595,
        "longitude": 77.0266
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    };

    return JSON.stringify(hqSchema, null, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-700 selection:text-white flex flex-col font-sans">
      
      {/* Skip to main content for screen reader users */}
      <a href="#main-content" className="skip-to-content">Skip to main content</a>

      {/* Schemas Indicator */}
      <script type="application/ld+json">
        {renderJSONLDSchemas()}
      </script>

      {/* Header element */}
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        leadCount={leads.filter(l => l.status === 'Fresh').length} 
      />

      {/* Main Dynamic View Area */}
      <main id="main-content" className="flex-grow" role="main">
        {currentView === 'home' && (
          <HomeView onLeadSubmit={handleLeadSubmit} onNavigate={handleNavigate} />
        )}
        
        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'services' && (
          <ServicesView onQuoteStart={(serviceName) => {
            handleNavigate('home');
            triggerLog(`CRO: Scrolled to Quote form representing ${serviceName}`);
          }} />
        )}

        {currentView === 'cities' && (
          <CitySEOView 
            onLeadSubmit={handleLeadSubmit} 
            selectedCitySlug={activeCitySlug}
            onCitySlugChange={(slug) => setActiveCitySlug(slug)}
          />
        )}

        {currentView === 'city-seo' && (
          <CitySEOView 
            onLeadSubmit={handleLeadSubmit} 
            selectedCitySlug={activeCitySlug}
            onCitySlugChange={(slug) => setActiveCitySlug(slug)}
          />
        )}

        {currentView === 'routes' && (
          <RouteView 
            onLeadSubmit={handleLeadSubmit} 
            selectedRouteSlug={activeRouteSlug}
            onRouteSlugChange={(slug) => setActiveRouteSlug(slug)}
          />
        )}

        {currentView === 'route-seo' && (
          <RouteView 
            onLeadSubmit={handleLeadSubmit} 
            selectedRouteSlug={activeRouteSlug}
            onRouteSlugChange={(slug) => setActiveRouteSlug(slug)}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryView />
        )}

        {currentView === 'contact' && (
          <ContactView onLeadSubmit={handleLeadSubmit} />
        )}

        {currentView === 'dashboard' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            {isAdminAuthenticated ? (
              <LeadDashboard 
                leads={leads} 
                onUpdateStatus={handleUpdateStatus} 
                onClearLeads={handleClearLeads}
                onPopulateDemoLeads={handlePopulateDemoLeads}
                onLogout={handleLogout}
              />
            ) : (
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            )}
          </div>
        )}
      </main>

      {/* Footer element */}
      <Footer onNavigate={handleNavigate} />

      {/* Conversion Floating Controls - Desktop */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col space-y-4">
        
        {/* WhatsApp Floating button with pulse wave and online light */}
        <div className="relative group">
          <div className="absolute -inset-1.5 rounded-full bg-emerald-500/30 animate-ping opacity-75 pointer-events-none" />
          <a 
            href={`https://wa.me/919690499137?text=${encodeURIComponent('Hello EKTA LOGISTICS Packers, I want to get a shifting quote safely.')}`}
            target="_blank"
            onClick={() => handleWhatsAppTracking('floating_right')}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none border border-emerald-400/20"
            rel="noreferrer"
            title="Chat & Ask on WhatsApp"
          >
            <MessageCircle className="h-7 w-7 text-white fill-white/10" />
            <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-emerald-600 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </span>
          </a>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
            Irshad Khan (Online)
          </div>
        </div>

        {/* Support Hotline button */}
        <a 
          href="tel:+919690499137"
          onClick={() => handleCallTracking('floating_right')}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-2xl transition-all duration-350 hover:scale-110 active:scale-95 focus:outline-none border border-orange-400/20"
          title="Call Operations Directly"
        >
          <Phone className="h-6 w-6 text-white fill-white/10 animate-bounce" />
        </a>
      </div>

      {/* Mobile Sticky CTA footer bar context */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 flex divide-x divide-white/10 text-center py-3 shadow-2xl">
        <a 
          href="tel:+919690499137"
          onClick={() => handleCallTracking('mobile_sticky')}
          className="flex-1 flex items-center justify-center space-x-1.5 focus:outline-none text-white hover:text-orange-400 font-poppins text-xs font-black uppercase tracking-wider transition-colors"
        >
          <Phone className="h-4.5 w-4.5 text-orange-400 fill-orange-400/20 animate-pulse" />
          <span>Call Dispatch</span>
        </a>
        <a 
          href={`https://wa.me/919690499137?text=${encodeURIComponent('Hi EKTA LOGISTICS, I want to quote a shifting job urgently.')}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => handleWhatsAppTracking('mobile_sticky')}
          className="flex-1 flex items-center justify-center space-x-1.5 focus:outline-none text-emerald-400 hover:text-emerald-300 font-poppins text-xs font-black uppercase tracking-wider transition-colors"
        >
          <MessageCircle className="h-4.5 w-4.5 text-emerald-400 fill-emerald-400/10" />
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* Empty Spacer to offset Mobile Sticky Bar so footer content remains unblocked */}
      <div className="h-14 sm:h-0" />

    </div>
  );
}
