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
  category: 
    | 'pages' 
    | 'email' 
    | 'pdf' 
    | 'users' 
    | 'business' 
    | 'automation' 
    | 'mobile_app' 
    | 'play_store' 
    | 'devops' 
    | 'integrations' 
    | 'shopify' 
    | 'support';
  description?: string;
  features?: string[];
  deliveryDays?: number;
  complexity?: 'small' | 'medium' | 'large';
}

export interface ShopifyServiceItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  features?: string[];
  description?: string;
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
  features: string[];
}

export interface MaintenanceTier {
  id: string;
  name: string;
  price: number; // monthly
  priceDisplay: string;
  billingPeriod: string;
  features?: string[];
}

// Brand Information
export const BRAND_INFO = {
  name: "Hardik Kanajariya",
  tagline: "Transparent Predefined-Module Web Solutions",
  subheading: "Transparent Pricing & Service Catalog",
  highlights: [
    "Transparent Pricing",
    "No Hidden Charges",
    "Predefined Modules",
    "Gujarat Native Support"
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
    badge: "Best For Small Shops & Local Businesses",
    description: " brochure-style web presence for small shops, local businesses, and service providers.",
    features: [
      "Home Page",
      "About Page",
      "Services Page",
      "Contact Page",
      "Gallery Page",
      "Mobile Responsive Design",
      "Contact Form",
      "WhatsApp Button",
      "Basic SEO",
      "Vercel Hosting Setup",
      "SSL Certificate"
    ]
  },
  {
    id: "web_business",
    name: "Business Website",
    price: 15000,
    priceDisplay: "₹15,000",
    badge: "Best for Growing Brands",
    description: "Everything in Starter Website plus blog posts, Google Sheets CMS, and product catalog.",
    features: [
      "Blog System",
      "Dynamic Content",
      "Google Sheets CMS",
      "Cloudinary Image Management",
      "Unlimited Blog Posts",
      "Product Catalog",
      "SEO Friendly URLs",
      "Search Functionality"
    ]
  },
  {
    id: "web_advanced",
    name: "Advanced Business Website",
    price: 25000,
    priceDisplay: "₹25,000",
    badge: "Best For Growing Businesses",
    description: "High-performance applications requiring dynamic databases, inquiry panels, and API integrations.",
    features: [
      "Admin Panel",
      "Lead Management",
      "Contact Inquiry Dashboard",
      "User Management",
      "Analytics Dashboard",
      "Custom Database",
      "API Integrations"
    ]
  }
];

// E-Commerce Packages
export const ECOMMERCE_PACKAGES: PricingPackage[] = [
  {
    id: "eco_basic",
    name: "Basic E-Commerce",
    price: 30000,
    priceDisplay: "₹30,000",
    badge: "Starter E-Shop",
    description: "A professional online catalog with order management and customer controls.",
    features: [
      "Product Listing",
      "Product Details",
      "Categories",
      "Search",
      "Cart",
      "Checkout Request",
      "Admin Panel",
      "Order Management",
      "Customer Management"
    ]
  },
  {
    id: "eco_standard",
    name: "Standard E-Commerce",
    price: 45000,
    priceDisplay: "₹45,000",
    badge: "Most Popular",
    description: "A complete online store setup with automated payments, customer registration, and tracking.",
    features: [
      "Payment Gateway",
      "Customer Login",
      "Customer Registration",
      "Online Orders",
      "Order Tracking",
      "Coupon System",
      "Invoice Generation",
      "Email Notifications"
    ]
  },
  {
    id: "eco_premium",
    name: "Premium E-Commerce",
    price: 75000,
    priceDisplay: "₹75,000+",
    badge: "Enterprise Ready",
    description: "Advanced multi-staff marketplace or complex billing store with inventory management.",
    features: [
      "Inventory Management",
      "GST Invoices",
      "Advanced Reports",
      "Multiple Staff Accounts",
      "Vendor Support",
      "Custom Features"
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
    description: "Android application with API integration and push notifications.",
    features: [
      "Android Application",
      "Up to 5 Screens",
      "API Integration",
      "Contact Forms",
      "Push Notifications"
    ]
  },
  {
    id: "mob_business",
    name: "Business Application",
    price: 50000,
    priceDisplay: "₹50,000",
    description: "Cross-platform authentication dashboard app for both Android and iOS.",
    features: [
      "Authentication",
      "Dashboard",
      "Admin APIs",
      "Push Notifications",
      "Android + iOS"
    ]
  },
  {
    id: "mob_ecommerce",
    name: "E-Commerce App",
    price: 75000,
    priceDisplay: "₹75,000",
    description: "Full-featured shopping app with catalog, cart, and payments on Android + iOS.",
    features: [
      "Product Catalog",
      "Cart",
      "Orders",
      "Payments",
      "Customer Accounts",
      "Wishlist",
      "Android + iOS"
    ]
  }
];

// Individual Add-on Services
export const INDIVIDUAL_SERVICES: ServiceItem[] = [
  // 1. WEBSITE CONTENT & PAGE SERVICES
  { 
    id: "srv_page_static", 
    name: "Additional Static Page", 
    price: 500, 
    priceDisplay: "₹500 / Page", 
    category: "pages",
    description: "Examples: About Us, Team, FAQ, Privacy Policy, Terms."
  },
  { 
    id: "srv_page_dynamic", 
    name: "Additional Dynamic Page", 
    price: 2000, 
    priceDisplay: "₹2,000 / Page", 
    category: "pages",
    description: "Examples: Blog Listing, Product Listing, Category Page, Search Page."
  },
  { 
    id: "srv_cf", 
    name: "Contact Form Module", 
    price: 1000, 
    priceDisplay: "₹1,000", 
    category: "pages",
    features: ["Form Creation", "Validation", "Email Delivery"]
  },
  { 
    id: "srv_cf_adv", 
    name: "Advanced Contact Form", 
    price: 3000, 
    priceDisplay: "₹3,050", // price display helper, let's keep exact 3000
    category: "pages",
    features: ["Multiple Fields", "File Uploads", "Database Storage"]
  },

  // 2. EMAIL & COMMUNICATION
  { 
    id: "smtp_setup", 
    name: "SMTP Setup", 
    price: 2000, 
    priceDisplay: "₹2,000", 
    category: "email",
    description: "Supported Providers: Gmail, Zoho, Outlook, Hostinger."
  },
  { 
    id: "srv_email_tmpl", 
    name: "Email Templates", 
    price: 500, 
    priceDisplay: "₹500 / Template", 
    category: "email",
    description: "Examples: Welcome Email, Order Confirmation, Contact Request."
  },
  { 
    id: "srv_newsletter", 
    name: "Newsletter System", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "email"
  },

  // 3. PDF & DOCUMENT SYSTEMS
  { 
    id: "srv_pdf_gen", 
    name: "PDF Generation", 
    price: 3000, 
    priceDisplay: "₹3,000", 
    category: "pdf",
    description: "Examples: Invoice PDF, Quote PDF, Report PDF."
  },
  { 
    id: "srv_pdf_dyn", 
    name: "Dynamic PDF System", 
    price: 7500, 
    priceDisplay: "₹7,500", 
    category: "pdf",
    features: ["Templates", "Branding", "Database Data"]
  },

  // 4. USER MANAGEMENT
  { 
    id: "srv_auth", 
    name: "Authentication System", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "users",
    features: ["Login", "Registration", "Forgot Password"]
  },
  { 
    id: "srv_user_profile", 
    name: "User Profile System", 
    price: 3000, 
    priceDisplay: "₹3,000", 
    category: "users"
  },
  { 
    id: "srv_roles", 
    name: "Role Based Permissions", 
    price: 7500, 
    priceDisplay: "₹7,500", 
    category: "users",
    features: ["Admin Access", "Manager Portal", "Staff Control"]
  },

  // 5. BUSINESS MODULES
  { 
    id: "srv_crm", 
    name: "CRM System", 
    price: 15000, 
    priceDisplay: "₹15,000", 
    category: "business" 
  },
  { 
    id: "srv_inv", 
    name: "Inventory System", 
    price: 10000, 
    priceDisplay: "₹10,000", 
    category: "business" 
  },
  { 
    id: "srv_invoice_sys", 
    name: "Invoice System", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "business" 
  },
  { 
    id: "srv_lead_mgr", 
    name: "Lead Management", 
    price: 7500, 
    priceDisplay: "₹7,500", 
    category: "business" 
  },
  { 
    id: "srv_booking", 
    name: "Appointment Booking", 
    price: 7500, 
    priceDisplay: "₹7,500", 
    category: "business" 
  },
  { 
    id: "srv_ticket", 
    name: "Ticket Support System", 
    price: 10000, 
    priceDisplay: "₹10,000", 
    category: "business" 
  },

  // 6. AUTOMATION & SCRIPTING
  { 
    id: "srv_auto_basic", 
    name: "Basic Automation Script", 
    price: 2500, 
    priceDisplay: "₹2,500", 
    category: "automation",
    description: "Examples: CSV Processing, File Conversion, Data Cleanup."
  },
  { 
    id: "srv_auto_adv", 
    name: "Advanced Automation Script", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "automation",
    description: "Examples: API Automation, Email Automation, Scheduled Tasks."
  },
  { 
    id: "srv_auto_workflow", 
    name: "Business Workflow Automation", 
    price: 10000, 
    priceDisplay: "₹10,000+", 
    category: "automation",
    description: "Examples: Order Processing, Invoice Generation, CRM Automation."
  },
  { 
    id: "srv_desktop_electron", 
    name: "Electron Desktop Application", 
    price: 25000, 
    priceDisplay: "Starting ₹25,000", 
    category: "automation",
    features: ["Windows Installer", "Local Database", "Basic Features"]
  },
  { 
    id: "srv_desktop_adv", 
    name: "Advanced Desktop Application", 
    price: 50000, 
    priceDisplay: "₹50,000+", 
    category: "automation",
    features: ["Multi User Support", "Cloud Sync", "Reports", "Direct Printing"]
  },

  // 7. MOBILE APPLICATION SERVICES
  { 
    id: "srv_mob_android", 
    name: "Android Application Only", 
    price: 25000, 
    priceDisplay: "Starting ₹25,000", 
    category: "mobile_app" 
  },
  { 
    id: "srv_mob_ios", 
    name: "iOS Application Addition", 
    price: 10000, 
    priceDisplay: "Additional ₹10,000", 
    category: "mobile_app",
    description: "Applicable if Android application already exists."
  },
  { 
    id: "srv_push", 
    name: "Push Notifications", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "mobile_app" 
  },
  { 
    id: "srv_app_release", 
    name: "App Update Release", 
    price: 2000, 
    priceDisplay: "₹2,000 / Release", 
    category: "mobile_app" 
  },

  // 8. PLAY STORE SERVICES
  { 
    id: "srv_play_setup", 
    name: "Google Play Store Account Setup", 
    price: 2500, 
    priceDisplay: "₹2,500", 
    category: "play_store",
    description: "Client pays Google console fees ($25) separately."
  },
  { 
    id: "srv_play_publish", 
    name: "Play Store Publishing", 
    price: 3000, 
    priceDisplay: "₹3,000", 
    category: "play_store",
    features: ["Build Generation", "Asset Uploads", "Screenshots", "Listing Settings"]
  },
  { 
    id: "srv_play_maint", 
    name: "Play Store Maintenance", 
    price: 500, 
    priceDisplay: "₹500 / month", 
    category: "play_store",
    features: ["Minor Updates", "Version Uploads"]
  },
  { 
    id: "srv_app_publish", 
    name: "App Store Publishing", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "play_store",
    description: "Client pays Apple developer fees ($99/year) separately."
  },
  { 
    id: "srv_app_maint", 
    name: "App Store Maintenance", 
    price: 1000, 
    priceDisplay: "₹1,000 / month", 
    category: "play_store" 
  },

  // 9. SERVER & DEVOPS
  { 
    id: "srv_vps_setup", 
    name: "VPS Setup", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "devops",
    features: ["Ubuntu Server Configuration", "Firewall Rules", "SSL setup", "Nginx Server Block"]
  },
  { 
    id: "srv_vps_migration", 
    name: "VPS Migration", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "devops" 
  },
  { 
    id: "srv_cicd", 
    name: "CI/CD Setup", 
    price: 5000, 
    priceDisplay: "₹5,000", 
    category: "devops",
    features: ["GitHub Actions Config", "Auto Deployments Setup"]
  },
  { id: "srv_domain_setup", name: "Domain Setup", price: 500, priceDisplay: "₹500", category: "devops" },
  { id: "srv_dns_config", name: "DNS Configuration", price: 500, priceDisplay: "₹500", category: "devops" },
  { id: "srv_ssl_setup", name: "SSL Setup", price: 500, priceDisplay: "₹500", category: "devops" },
  { id: "srv_email_server", name: "Email Server Setup", price: 3000, priceDisplay: "₹3,000", category: "devops" },

  // 10. API INTEGRATIONS
  { id: "srv_api_pg", name: "Payment Gateway", price: 5000, priceDisplay: "₹5,000", category: "integrations" },
  { id: "srv_api_logistics", name: "Logistics Provider", price: 5000, priceDisplay: "₹5,000", category: "integrations" },
  { id: "srv_api_gmaps", name: "Google Maps", price: 3000, priceDisplay: "₹3,000", category: "integrations" },
  { id: "srv_api_whatsapp", name: "WhatsApp API", price: 10000, priceDisplay: "₹10,000", category: "integrations" },
  { id: "srv_api_sms", name: "SMS API", price: 5000, priceDisplay: "₹5,000", category: "integrations" },
  { id: "srv_api_msgraph", name: "Microsoft Graph", price: 15000, priceDisplay: "₹15,000", category: "integrations" },
  { 
    id: "srv_api_thirdparty", 
    name: "Third Party API Integration", 
    price: 5000, 
    priceDisplay: "₹5,000+", 
    category: "integrations",
    description: "Depends on endpoint complexity and documentation."
  },

  // 11. SHOPIFY ADDITIONAL SERVICES
  { id: "srv_shop_import", name: "Product Import", price: 1000, priceDisplay: "₹1,000 - ₹7,500", category: "shopify" },
  { id: "srv_shop_collection", name: "Collection Setup", price: 1000, priceDisplay: "₹1,000", category: "shopify" },
  { id: "srv_shop_shipping", name: "Shipping Rules Setup", price: 2000, priceDisplay: "₹2,000", category: "shopify" },
  { id: "srv_shop_discount", name: "Discount Configuration", price: 2000, priceDisplay: "₹2,000", category: "shopify" },
  { id: "srv_shop_section", name: "Custom Shopify Section", price: 3000, priceDisplay: "₹3,000", category: "shopify" },
  { id: "srv_shop_appfeat", name: "Custom Shopify App Feature", price: 5000, priceDisplay: "₹5,000+", category: "shopify" },

  // 12. MAINTENANCE & SUPPORT
  { id: "srv_support_emergency", name: "Emergency Support", price: 1000, priceDisplay: "₹1,000 / hour", category: "support" },
  { id: "srv_support_bugfix", name: "Bug Fixing", price: 500, priceDisplay: "₹500 / hour", category: "support" },
  { 
    id: "srv_support_consultation", 
    name: "Consultation Call", 
    price: 500, 
    priceDisplay: "₹500 / 30 Minutes", 
    category: "support",
    description: "Free if the project is awarded."
  },
  { id: "srv_support_training", name: "Training Session", price: 1000, priceDisplay: "₹1,000 / hour", category: "support" }
];

// Adjust advanced form display price
INDIVIDUAL_SERVICES[3].price = 3000;

// Shopify Services
export const SHOPIFY_SERVICES: ShopifyServiceItem[] = [
  {
    id: "shop_setup",
    name: "Shopify Store Setup",
    price: 7500,
    priceDisplay: "₹7,500",
    features: [
      "Theme Installation",
      "Store Configuration",
      "Payment Setup",
      "Shipping Setup",
      "Domain Setup",
      "Basic Store Settings"
    ]
  },
  {
    id: "shop_custom",
    name: "Shopify Theme Customization",
    price: 10000, // Starting price
    priceDisplay: "₹10,000 - ₹25,000",
    description: "Depends On: Number Of Pages, Design Complexity, Custom Sections"
  },
  {
    id: "shop_dev",
    name: "Shopify Custom Theme Development",
    price: 40000, // Starting price
    priceDisplay: "Starting From ₹40,000",
    features: [
      "Custom Design",
      "Custom Sections",
      "Responsive Layout",
      "Theme Architecture"
    ]
  },
  {
    id: "shop_feat",
    name: "Shopify Custom Features",
    price: 5000, // Starting price
    priceDisplay: "Starting Price: ₹5,000",
    description: "Examples: Bundle System, Product Personalization, Custom Cart, Custom Checkout Logic, Product Configurator"
  }
];

// Product Upload Tier Pricing
export const PRODUCT_UPLOAD_TIERS: ProductUploadTier[] = [
  { id: "upload_50", range: "1 - 50 Products", price: 1000, priceDisplay: "₹1,000" },
  { id: "upload_200", range: "51 - 200 Products", price: 3000, priceDisplay: "₹3,000" },
  { id: "upload_500", range: "201 - 500 Products", price: 7500, priceDisplay: "₹7,500" },
  { id: "upload_more", range: "501+ Products", price: 0, priceDisplay: "Custom Quote" }
];

// Hosting Section
export const HOSTING_OPTIONS: HostingTier[] = [
  { 
    id: "host_static", 
    name: "Static Website Hosting", 
    price: 2500, 
    priceDisplay: "₹2,500/year", 
    type: "static",
    features: ["Hosting", "SSL", "Deployments"]
  },
  { 
    id: "host_dynamic", 
    name: "Dynamic Website Hosting", 
    price: 5000, 
    priceDisplay: "₹5,000/year", 
    type: "dynamic",
    features: ["Database", "Hosting", "Deployments"]
  },
  { 
    id: "host_vps", 
    name: "Managed VPS Hosting", 
    price: 10000, 
    priceDisplay: "₹10,000/year", 
    type: "vps",
    features: ["Server Monitoring", "Security Updates", "Deployments"]
  }
];

// Maintenance Section
export const MAINTENANCE_OPTIONS: MaintenanceTier[] = [
  { id: "maint_basic", name: "Basic Maintenance Plan", price: 500, priceDisplay: "₹500/month", billingPeriod: "month" },
  { id: "maint_standard", name: "Standard Maintenance Plan", price: 1000, priceDisplay: "₹1,000/month", billingPeriod: "month" },
  { id: "maint_premium", name: "Premium Maintenance Plan", price: 2500, priceDisplay: "₹2,500/month", billingPeriod: "month" }
];

// Why Choose Us
export const WHY_CHOOSE_US = [
  { title: "Affordable Pricing", description: "High quality development tailored to fit your budgets without compromise." },
  { title: "Modern Technology Stack", description: "Built using AstroJS, Next.js, and React to ensure blazing fast loading speeds and high SEO performance." },
  { title: "Fast Delivery", description: "Efficient and optimized coding processes to deliver your project on schedule." },
  { title: "Clear Communication", description: "Updates and feedback loops so you always know exactly what status your application is in." },
  { title: "Custom Software Solutions", description: "No generic templates. Tailor-made software built to match your unique workflow needs." },
  { title: "Gujarat Local Support", description: "Local assistance based in Gujarat, speaking your language, and understanding your business landscape." },
  { title: "Direct Developer Communication", description: "Talk directly with the person writing your code. Fast turnarounds, no middlemen." },
  { title: "No Agency Overhead", description: "Pay strictly for quality engineering and execution, not for account managers." }
];

// Client Responsibilities
export const CLIENT_RESPONSIBILITIES = [
  "Logo",
  "Images",
  "Business Information",
  "Product Information",
  "Required Approvals"
];

// Third Party Costs
export const THIRD_PARTY_COSTS = [
  "Domain Purchase",
  "SMS Credits",
  "Payment Gateway Charges",
  "Shipping Charges",
  "Google Workspace",
  "Premium Plugins",
  "Premium APIs"
];
