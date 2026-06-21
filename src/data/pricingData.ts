export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  badge?: string;
  features: string[];
  description?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  category: 'integration' | 'marketing' | 'system' | 'other';
}

export interface ShopifyServiceItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  features?: string[];
}

export interface ProductUploadTier {
  id: string;
  range: string;
  price: number;
  priceDisplay: string;
}

export interface HostingTier {
  id: string;
  name: string;
  price: number; // yearly
  priceDisplay: string;
  type: 'static' | 'dynamic' | 'vps';
}

export interface MaintenanceTier {
  id: string;
  name: string;
  price: number; // monthly
  priceDisplay: string;
  billingPeriod: string;
}

// Brand Information
export const BRAND_INFO = {
  name: "Hardik Kanajariya",
  tagline: "Affordable Software & Web Solutions",
  subheading: "Transparent Pricing for Gujarat Small Businesses",
  highlights: [
    "Affordable Pricing",
    "Modern Technology",
    "Fast Delivery",
    "Gujarat Based Support"
  ],
  contacts: {
    phone: "+916353485415", 
    whatsapp: "https://wa.me/916353485415",
    email: "hkdevs@hardikkanajariya.in",
    website: "https://hardikkanajariya.in",
    github: "https://github.com/hardik-kanajariya",
    linkedin: "https://www.linkedin.com/in/hardik-kanajariya/",
    twitter: "https://x.com/hardik_web",
    instagram: "https://www.instagram.com/kanajariyahardik/",
    facebook: "https://www.facebook.com/profile.php?id=61580436523509",
    pinterest: "https://in.pinterest.com/hardik_kanajariya",
    reddit: "https://www.reddit.com/user/hardikKanajariya/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    devto: "https://dev.to/hardikkanajariya"
  }
};

// Website Packages
export const WEBSITE_PACKAGES: PricingPackage[] = [
  {
    id: "web_starter",
    name: "Starter Website",
    price: 8000,
    priceDisplay: "₹8,000",
    badge: "Perfect for Small Businesses",
    description: "Ideal for local shops, freelancers, and brochure-style business web representation.",
    features: [
      "AstroJS (Super Fast Speed)",
      "Vercel Hosting Setup",
      "Free Domain Configuration",
      "Up to 5 Pages",
      "Mobile Responsive Layout",
      "Functional Contact Form",
      "Basic SEO Setup"
    ]
  },
  {
    id: "web_business",
    name: "Business Website",
    price: 15000,
    priceDisplay: "₹15,000",
    badge: "Best for Growing Businesses",
    description: "Perfect for businesses requiring content updates, a product catalog, or blogging.",
    features: [
      "AstroJS (Modern Frontend)",
      "Google Sheets CMS (Easy Updates)",
      "Cloudinary Image Delivery",
      "Up to 15 Pages",
      "Interactive Blog Section",
      "Visual Product Catalog",
      "WhatsApp Direct Integration",
      "Advanced On-Page SEO"
    ]
  },
  {
    id: "web_advanced",
    name: "Advanced Website",
    price: 25000,
    priceDisplay: "₹25,000",
    badge: "Powerful & Scalable",
    description: "High-performance applications requiring dynamic databases, panels, and lead capture.",
    features: [
      "Next.js (React Framework)",
      "Dynamic Content Rendering",
      "Secure Admin Dashboard",
      "Lead Management Panel",
      "Cloud Database Integration",
      "Cloudinary Asset Cloud",
      "Advanced SEO Optimization"
    ]
  }
];

// E-Commerce Packages
export const ECOMMERCE_PACKAGES: PricingPackage[] = [
  {
    id: "eco_basic",
    name: "Basic Store",
    price: 20000,
    priceDisplay: "₹20,000",
    badge: "Starter E-Commerce",
    description: "A professional online catalog with cart functionality and manual checkout requests.",
    features: [
      "Product Catalog Listing",
      "Shopping Cart Functionality",
      "WhatsApp/Email Checkout Request",
      "Secure Admin Panel",
      "Cloudinary Cloud Hosting",
      "No Payment Gateway (Manual UPI)"
    ]
  },
  {
    id: "eco_standard",
    name: "Standard Store",
    price: 35000,
    priceDisplay: "₹35,000",
    badge: "Most Popular",
    description: "A complete online store setup with automated payments, customer accounts, and coupons.",
    features: [
      "Everything in Basic Store",
      "Payment Gateway Integration",
      "Customer Accounts & Login",
      "Comprehensive Order Management",
      "Discount & Coupon System",
      "Automatic Email Notifications"
    ]
  },
  {
    id: "eco_premium",
    name: "Premium Store",
    price: 60000,
    priceDisplay: "₹60,000+",
    badge: "Enterprise Ready",
    description: "Advanced marketplace or customized store with complex logic, multi-vendor support, and analytics.",
    features: [
      "Everything in Standard Store",
      "Multi Vendor Functionality",
      "Advanced Inventory Management",
      "GST Invoice Generation",
      "Advanced Analytics Dashboard",
      "Fully Custom Feature Additions"
    ]
  }
];

// Mobile Application Packages
export const MOBILE_PACKAGES: PricingPackage[] = [
  {
    id: "mob_basic",
    name: "Basic App",
    price: 25000,
    priceDisplay: "₹25,000",
    description: "Ideal for basic informational apps or internal workflows on Android.",
    features: [
      "Up to 5 Screens",
      "REST API Integration",
      "Android Platform Only",
      "Standard Clean UI/UX Design"
    ]
  },
  {
    id: "mob_business",
    name: "Business App",
    price: 50000,
    priceDisplay: "₹50,000",
    description: "A complete multi-platform app with user auth and dashboard alerts.",
    features: [
      "User Authentication & Login",
      "Push Notification Support",
      "Interactive Dashboard",
      "Admin APIs Control Panel",
      "Cross-Platform (Android + iOS)"
    ]
  },
  {
    id: "mob_ecommerce",
    name: "E-Commerce App",
    price: 75000,
    priceDisplay: "₹75,000",
    description: "Full-featured shopping application integrated with checkout, payments, and accounts.",
    features: [
      "Product Catalog Listings",
      "Shopping Cart & Checkout Flow",
      "Order Tracking & Details",
      "Online Payments Integration",
      "User Accounts & Profiles"
    ]
  }
];

// Individual Add-on Services
export const INDIVIDUAL_SERVICES: ServiceItem[] = [
  { id: "srv_pg", name: "Payment Gateway Integration", price: 5000, priceDisplay: "₹5,000", category: "integration" },
  { id: "srv_log", name: "Logistics Integration", price: 5000, priceDisplay: "₹5,000", category: "integration" },
  { id: "srv_pg_log_bundle", name: "Payment + Logistics Bundle", price: 8000, priceDisplay: "₹8,000", category: "integration" },
  { id: "srv_wa", name: "WhatsApp Integration", price: 2000, priceDisplay: "₹2,000", category: "integration" },
  { id: "srv_cf", name: "Contact Form Setup", price: 1000, priceDisplay: "₹1,000", category: "integration" },
  { id: "srv_email", name: "Email Configuration", price: 2000, priceDisplay: "₹2,000", category: "integration" },
  { id: "srv_otp", name: "SMS OTP Integration", price: 5000, priceDisplay: "₹5,000", category: "integration" },
  { id: "srv_ga", name: "Google Analytics Setup", price: 1500, priceDisplay: "₹1,500", category: "marketing" },
  { id: "srv_sc", name: "Search Console Setup", price: 1500, priceDisplay: "₹1,500", category: "marketing" },
  { id: "srv_seo", name: "Basic SEO Setup", price: 3000, priceDisplay: "₹3,000", category: "marketing" },
  { id: "srv_blog", name: "Blog System", price: 5000, priceDisplay: "₹system" }, // system/other
  { id: "srv_admin", name: "Admin Panel", price: 10000, priceDisplay: "₹10,000", category: "system" },
  { id: "srv_inv", name: "Inventory Management", price: 10000, priceDisplay: "₹10,000", category: "system" },
  { id: "srv_crm", name: "CRM Module", price: 15000, priceDisplay: "₹15,000", category: "system" },
  { id: "srv_lang", name: "Multi Language Support", price: 5000, priceDisplay: "₹5,000", category: "other" },
  { id: "srv_chatbot", name: "AI Chatbot Integration", price: 10000, priceDisplay: "₹10,000", category: "integration" }
].map(item => {
  // Fix the category type mapping for Blog System
  if (item.id === "srv_blog") {
    return { ...item, price: 5000, priceDisplay: "₹5,000", category: "system" as const };
  }
  return item;
});

// Shopify Services
export const SHOPIFY_SERVICES: ShopifyServiceItem[] = [
  {
    id: "shop_setup",
    name: "Shopify Store Setup",
    price: 7500,
    priceDisplay: "₹7,500",
    features: [
      "Theme Setup & Activation",
      "Store configuration (settings)",
      "Shipping Setup & Rates",
      "Payment Gateway Setup"
    ]
  },
  {
    id: "shop_custom",
    name: "Shopify Theme Customization",
    price: 10000, // Base price for builder
    priceDisplay: "₹10,000 – ₹25,000"
  },
  {
    id: "shop_dev",
    name: "Shopify Custom Theme Development",
    price: 40000, // Base price for builder
    priceDisplay: "₹40,000+"
  },
  {
    id: "shop_feat",
    name: "Shopify Custom Feature Addition",
    price: 5000, // Base price for builder
    priceDisplay: "₹5,000+"
  }
];

// Product Upload Tier Pricing
export const PRODUCT_UPLOAD_TIERS: ProductUploadTier[] = [
  { id: "upload_50", range: "1–50 Products", price: 1000, priceDisplay: "₹1,000" },
  { id: "upload_200", range: "50–200 Products", price: 3000, priceDisplay: "₹3,000" },
  { id: "upload_500", range: "200–500 Products", price: 7500, priceDisplay: "₹7,500" },
  { id: "upload_more", range: "500+ Products", price: 0, priceDisplay: "Custom Quote" }
];

// Hosting Section
export const HOSTING_OPTIONS: HostingTier[] = [
  { id: "host_static", name: "Static Website Hosting", price: 2500, priceDisplay: "₹2,500/year", type: "static" },
  { id: "host_dynamic", name: "Dynamic Website Hosting", price: 5000, priceDisplay: "₹5,000/year", type: "dynamic" },
  { id: "host_vps", name: "Managed VPS Hosting", price: 10000, priceDisplay: "₹10,000/year", type: "vps" }
];

// Maintenance Section
export const MAINTENANCE_OPTIONS: MaintenanceTier[] = [
  { id: "maint_basic", name: "Basic Maintenance", price: 500, priceDisplay: "₹500/month", billingPeriod: "month" },
  { id: "maint_standard", name: "Standard Maintenance", price: 1000, priceDisplay: "₹1,000/month", billingPeriod: "month" },
  { id: "maint_premium", name: "Premium Maintenance", price: 2500, priceDisplay: "₹2,500/month", billingPeriod: "month" }
];

// Why Choose Us
export const WHY_CHOOSE_US = [
  { title: "Affordable Pricing", description: "High quality development tailored to fit Gujarat small business budgets without compromise." },
  { title: "Modern Technology Stack", description: "Built using AstroJS, Next.js, and React to ensure blazing fast loading speeds and high SEO performance." },
  { title: "Fast Delivery", description: "Efficient and optimized coding processes to deliver your project on schedule." },
  { title: "Clear Communication", description: "Updates and feedback loops so you always know exactly what status your application is in." },
  { title: "Custom Software Solutions", description: "No generic templates. Tailor-made software built to match your unique workflow needs." },
  { title: "Gujarat Local Support", description: "Local assistance based in Gujarat, speaking your language, and understanding your business landscape." },
  { title: "Direct Developer Communication", description: "Talk directly with the person writing your code. Fast turnarounds, no middlemen." },
  { title: "No Agency Overhead", description: "Pay strictly for quality engineering and execution, not for account managers or fancy offices." }
];
