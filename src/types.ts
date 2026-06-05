export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  pickupCity: string;
  destinationCity: string;
  movingDate: string;
  propertyType: string;
  houseSize: string;
  notes?: string;
  createdAt: string;
  source: 'quote_form' | 'contact_form' | 'floating_call' | 'whatsapp_click';
  status: 'Fresh' | 'Contacted' | 'Quoted' | 'Booking Confirmed';
}

export interface CitySEO {
  slug: string; // e.g. "gurgaon"
  name: string; // e.g. "Gurgaon (Gurugram)"
  state: string; // Haryana
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  localHeading: string;
  localContentIntro: string;
  benefits: { title: string; desc: string }[];
  localFaqs: { q: string; a: string }[];
  localTestimonials: { name: string; location: string; text: string; rating: number }[];
}

export interface RouteSEO {
  slug: string; // e.g. "delhi-to-mumbai"
  origin: string; // Delhi
  destination: string; // Mumbai
  distance: string; // "1,420 km"
  transitTime: string; // "3-4 Days"
  metaTitle: string;
  metaDescription: string;
  basePriceRange: string; // "₹12,000 - ₹28,000"
  highlights: string[];
  pricingFactors: { factor: string; details: string }[];
  faqs: { q: string; a: string }[];
}

export interface FAQItem {
  q: string;
  a: string;
  category: 'general' | 'pricing' | 'safety' | 'transit';
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  date: string;
  serviceType: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'packing' | 'trucks' | 'team' | 'credentials';
  alt: string;
  isCustomCard?: boolean;
  customCardType?: 'business-card' | 'gst' | 'office-yard' | 'actual-signboard' | 'actual-cabin' | 'actual-yard';
}
