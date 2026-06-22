export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  badge?: string;
  features: string[];
  description?: string;
}

export interface CoreCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  startingPrice: number;
  baseTimelineDays: number;
}

export interface CorePackage {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  priceDisplay: string;
  description: string;
  deliveryDays: number;
  confidence: 'high' | 'medium' | 'discovery';
  deliverables: string[];
}

export interface Feature {
  id: string;
  name: string;
  oneTimeCost: number;
  monthlyCost?: number;
  yearlyCost?: number;
  deliveryDays: number;
  complexity: 'small' | 'medium' | 'large';
  category: string;
  dependencies?: string[];
  recommendedFor?: string[];
  description: string;
}

export interface ThirdPartyService {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly' | 'one-time' | 'transactional';
  priceDisplay: string;
  description: string;
}

export interface MaintenanceTier {
  id: string;
  name: string;
  price: number; // monthly
  priceDisplay: string;
  billingPeriod: string;
  features?: string[];
}

export interface LeadQuote {
  quoteId: string;
  clientName: string;
  businessName?: string;
  phone: string;
  email: string;
  leadStatus: 'new' | 'contacted' | 'proposal_sent' | 'won' | 'lost';
  notes?: string;
  followUpDate?: string;
  createdAt: string;
  selectedOptionsSummary: string;
  totalCost: number;
}

// Brand Information
export const BRAND_INFO = {
  name: "Hardik Kanajariya",
  tagline: "SaaS-Grade Predefined-Module Estimation Engine",
  subheading: "Interactive Software Cost Estimator",
  highlights: [
    "Fixed-Module Transparency",
    "No Hidden Coding Fees",
    "Predefined Scope Deliverables",
    "Direct Developer Communication"
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

// Core Categories (Step 1)
export const CORE_CATEGORIES: CoreCategory[] = [
  { id: "web", name: "Business Website", description: "Brochure websites, content blogs, portfolios, and inquiry forms.", icon: "LayoutGrid", startingPrice: 8000, baseTimelineDays: 5 },
  { id: "ecommerce", name: "E-Commerce Website", description: "Online stores with product catalogs, shopping carts, and order management.", icon: "ShoppingBag", startingPrice: 30000, baseTimelineDays: 12 },
  { id: "mobile", name: "Mobile Application", description: "Native or hybrid app listing platforms on Android & iOS devices.", icon: "Smartphone", startingPrice: 25000, baseTimelineDays: 14 },
  { id: "desktop", name: "Desktop Application", description: "Stand-alone Windows utility executables working local or cloud-sync.", icon: "Monitor", startingPrice: 25000, baseTimelineDays: 14 },
  { id: "shopify", name: "Shopify Store", description: "Setup configurations, customization, custom sections, or features.", icon: "Wrench", startingPrice: 7500, baseTimelineDays: 4 },
  { id: "custom", name: "Custom Software", description: "Complex bespoke web applications, ERPs, client dashboards, or CRMs.", icon: "Briefcase", startingPrice: 25000, baseTimelineDays: 15 },
  { id: "automation", name: "Automation Tool", description: "Scheduled data scripts, scraping jobs, notifications, or sheet sync logs.", icon: "Cpu", startingPrice: 2500, baseTimelineDays: 3 },
  { id: "ai", name: "AI Solution", description: "Custom LLM integrations, conversational chatbots, or automation pipelines.", icon: "Brain", startingPrice: 10000, baseTimelineDays: 7 }
];

// Core Packages (Step 2)
export const CORE_PACKAGES: CorePackage[] = [
  // Website
  {
    id: "web_starter",
    categoryId: "web",
    name: "Starter Website",
    price: 8000,
    priceDisplay: "₹8,000",
    description: " brochure-style static pages for small local service shops.",
    deliveryDays: 5,
    confidence: "high",
    deliverables: ["Up to 5 Pages", "Home Page", "About Page", "Services Page", "Contact Page", "Gallery Page", "Mobile Responsive Design", "Contact Form", "WhatsApp Button", "Basic SEO", "Vercel Hosting Setup", "SSL Certificate"]
  },
  {
    id: "web_business",
    categoryId: "web",
    name: "Business Website",
    price: 15000,
    priceDisplay: "₹15,000",
    description: "Dynamic pages containing Google Sheets CMS integrations and custom blog post support.",
    deliveryDays: 10,
    confidence: "high",
    deliverables: ["Up to 15 Pages", "Everything in Starter Website", "Blog System", "Dynamic Content Integration", "Google Sheets CMS Control", "Cloudinary Image Delivery Cloud", "Unlimited Blog Articles Support", "Visual Product Catalog", "SEO Friendly URLs", "Search Functionality"]
  },
  {
    id: "web_advanced",
    categoryId: "web",
    name: "Advanced Business Website",
    price: 25000,
    priceDisplay: "₹25,000",
    description: "High performance custom React applications with lead inquiries databases.",
    deliveryDays: 15,
    confidence: "medium",
    deliverables: ["Everything in Business Website", "Secure Custom Admin Panel", "Lead Management DB", "Contact Inquiry Dashboard", "User Management Interface", "Analytics Dashboard graphs", "Custom Cloud Database", "API Integrations"]
  },

  // E-Commerce
  {
    id: "eco_basic",
    categoryId: "ecommerce",
    name: "Basic E-Commerce",
    price: 30000,
    priceDisplay: "₹30,000",
    description: "Online catalog setup with manual checkout trigger notifications.",
    deliveryDays: 12,
    confidence: "high",
    deliverables: ["Product Listing grid", "Product Details page", "Categories filtering", "Search inputs", "Shopping Cart", "WhatsApp Checkout Request", "Admin Panel control", "Order Management Logs", "Customer Profile List"]
  },
  {
    id: "eco_standard",
    categoryId: "ecommerce",
    name: "Standard E-Commerce",
    price: 45000,
    priceDisplay: "₹45,000",
    description: "Complete online shop with automated checkout and payment portals.",
    deliveryDays: 20,
    confidence: "medium",
    deliverables: ["Everything in Basic E-Commerce", "Payment Gateway Integration", "Customer Login auth", "Customer Registration portal", "Online Orders tracker", "Order Status tracking page", "Discount Coupon System", "Invoice PDF Generation", "Email Notifications alerts"]
  },
  {
    id: "eco_premium",
    categoryId: "ecommerce",
    name: "Premium E-Commerce",
    price: 75000,
    priceDisplay: "₹75,000+",
    description: "Complex vendor store structures, inventory management, and invoice logs.",
    deliveryDays: 30,
    confidence: "discovery",
    deliverables: ["Everything in Standard E-Commerce", "Inventory Management Ledger", "GST Invoice Calculations", "Advanced sales reports", "Multiple Staff Accounts", "Vendor Portal Support", "Custom features architecture"]
  },

  // Mobile
  {
    id: "mob_basic",
    categoryId: "mobile",
    name: "Basic Mobile App",
    price: 25000,
    priceDisplay: "₹25,000",
    description: "Android platform application with REST API connections.",
    deliveryDays: 14,
    confidence: "high",
    deliverables: ["Android Application build", "Up to 5 Screens layouts", "REST API integration", "Contact Forms submit", "Push notifications integrations"]
  },
  {
    id: "mob_business",
    categoryId: "mobile",
    name: "Business Application",
    price: 50000,
    priceDisplay: "₹50,000",
    description: "Android & iOS platform dashboard application with push alert features.",
    deliveryDays: 25,
    confidence: "medium",
    deliverables: ["Cross-platform app (Android + iOS)", "User Authentication log", "User dashboard interface", "Admin panel control API", "Push notifications logs"]
  },
  {
    id: "mob_ecommerce",
    categoryId: "mobile",
    name: "E-Commerce App",
    price: 75000,
    priceDisplay: "₹75,000",
    description: "Native store application including catalogs, carts, and gateways.",
    deliveryDays: 35,
    confidence: "discovery",
    deliverables: ["Cross-platform store (Android + iOS)", "Product catalog list", "Shopping Cart", "Order checkout flows", "Online payments modules", "Customer Accounts list", "Wishlist database"]
  },

  // Desktop
  {
    id: "desk_basic",
    categoryId: "desktop",
    name: "Electron Desktop App",
    price: 25000,
    priceDisplay: "Starting ₹25,000",
    description: "Standard offline desktop utility for Windows platforms.",
    deliveryDays: 14,
    confidence: "high",
    deliverables: ["Windows Installer release", "Local Database file system", "Basic reports configuration"]
  },
  {
    id: "desk_adv",
    categoryId: "desktop",
    name: "Advanced Desktop App",
    price: 50000,
    priceDisplay: "₹50,000+",
    description: "Multi-user networked desktop systems with cloud backups.",
    deliveryDays: 30,
    confidence: "discovery",
    deliverables: ["Multi-user auth logs", "Cloud synchronization script", "Direct local printing integration", "Advanced CSV export tools"]
  },

  // Shopify
  {
    id: "shop_setup",
    categoryId: "shopify",
    name: "Shopify Store Setup",
    price: 7500,
    priceDisplay: "₹7,500",
    description: "Setup configurations, shipping settings, and domain bindings.",
    deliveryDays: 4,
    confidence: "high",
    deliverables: ["Theme Installation & Activation", "Store setup (settings, locations)", "Shipping Setup & Rates", "Payment Gateway Gateway setup", "Domain binding configuration"]
  },
  {
    id: "shop_custom",
    categoryId: "shopify",
    name: "Shopify Theme Customization",
    price: 15000,
    priceDisplay: "₹10,000 – ₹25,000",
    description: "Editing theme architectures and injecting custom landing sections.",
    deliveryDays: 8,
    confidence: "medium",
    deliverables: ["Custom template pages", "Liquid section code configurations", "Design adaptation styling", "Basic app installations"]
  },
  {
    id: "shop_dev",
    categoryId: "shopify",
    name: "Shopify Custom Theme Dev",
    price: 40000,
    priceDisplay: "Starting From ₹40,000",
    description: "Designing bespoke Shopify store layouts from Figma mockups.",
    deliveryDays: 18,
    confidence: "discovery",
    deliverables: ["Bespoke layout design", "Responsive custom liquid code blocks", "SEO Schema mappings", "Custom product configurations page"]
  },

  // Custom Software
  {
    id: "cust_mvp",
    categoryId: "custom",
    name: "Basic Custom MVP",
    price: 25000,
    priceDisplay: "Starting ₹25,000",
    description: "Quick-to-market web portals with database tables and operations pipelines.",
    deliveryDays: 15,
    confidence: "medium",
    deliverables: ["MVP functional dashboard", "Database structures setup", "Dynamic CRUD inputs", "API controller hooks"]
  },
  {
    id: "cust_enterprise",
    categoryId: "custom",
    name: "Enterprise Software System",
    price: 60000,
    priceDisplay: "₹60,000+",
    description: "Complex dashboards, automated triggers, audits logs, and analytics.",
    deliveryDays: 30,
    confidence: "discovery",
    deliverables: ["Advanced permissions groups", "Cloud database configurations", "Business operations pipeline automations", "Metrics visualizations charts"]
  },

  // Automation Tool
  {
    id: "auto_basic",
    categoryId: "automation",
    name: "Basic Automation Script",
    price: 2500,
    priceDisplay: "₹2,500",
    description: "Simple server scripts, CSV formatters, or file conversions.",
    deliveryDays: 3,
    confidence: "high",
    deliverables: ["Single automation script file", "CSV/XLSX processing parser", "Email/API notification alert triggers"]
  },
  {
    id: "auto_adv",
    categoryId: "automation",
    name: "Advanced Automation Tool",
    price: 5000,
    priceDisplay: "₹5,000",
    description: "Server tasks, scraping engines, or third-party integrations.",
    deliveryDays: 6,
    confidence: "medium",
    deliverables: ["Cron job script logs", "Third-party API data pipelines", "Web scraping script engines", "Database update schedules"]
  },
  {
    id: "auto_workflow",
    categoryId: "automation",
    name: "Workflow Automation system",
    price: 10000,
    priceDisplay: "Starting ₹10,000",
    description: "Complete order processing sync pipelines and CRM triggers.",
    deliveryDays: 12,
    confidence: "discovery",
    deliverables: ["Full CRM sync pipelines", "Multiple step tasks loops", "Automated billing logs", "Error fallback alerting modules"]
  },

  // AI Solution
  {
    id: "ai_chatbot_plan",
    categoryId: "ai",
    name: "AI Support Chatbot Setup",
    price: 10000,
    priceDisplay: "₹10,000",
    description: "Setup customized support chatbots connected to knowledge bases.",
    deliveryDays: 7,
    confidence: "medium",
    deliverables: ["Interactive chat widget UI", "OpenAI / Claude API vector indexing", "Company profile training prompt", "Lead generation capture pipeline"]
  },
  {
    id: "ai_workflow",
    categoryId: "ai",
    name: "AI Workflow Integration",
    price: 25000,
    priceDisplay: "₹25,000+",
    description: "Automatic text processing summaries and AI classification triggers.",
    deliveryDays: 15,
    confidence: "discovery",
    deliverables: ["LLM classification scripts", "Automated text summarize pipelines", "Data enrichment scripting loops", "Structured JSON output validation"]
  }
];

// Add-on Features (Step 3)
export const FEATURES: Feature[] = [
  {
    id: "feat_auth",
    name: "Authentication System",
    oneTimeCost: 5000,
    deliveryDays: 3,
    complexity: "medium",
    category: "Security & Users",
    description: "User login, registration, password recovery, and secure sessions.",
    recommendedFor: ["web", "ecommerce", "mobile", "desktop", "custom"]
  },
  {
    id: "feat_user_profile",
    name: "User Profile System",
    oneTimeCost: 3000,
    deliveryDays: 2,
    complexity: "small",
    category: "Security & Users",
    dependencies: ["feat_auth"],
    description: "User profiles, avatar upload, and editable account details.",
    recommendedFor: ["web", "mobile", "custom"]
  },
  {
    id: "feat_roles",
    name: "Role-Based Access Control",
    oneTimeCost: 7500,
    deliveryDays: 4,
    complexity: "large",
    category: "Security & Users",
    dependencies: ["feat_auth"],
    description: "Permissions for Admin, Manager, and Staff roles with custom views.",
    recommendedFor: ["custom", "desktop"]
  },
  {
    id: "feat_admin_panel",
    name: "Admin Dashboard",
    oneTimeCost: 10000,
    deliveryDays: 5,
    complexity: "medium",
    category: "Control Panels",
    description: "Secure management interface for content, metrics, configurations, and users.",
    recommendedFor: ["web", "ecommerce", "custom"]
  },
  {
    id: "feat_crm",
    name: "CRM System",
    oneTimeCost: 15000,
    deliveryDays: 7,
    complexity: "large",
    category: "Business Tools",
    dependencies: ["feat_auth"],
    description: "Lead tracking, pipeline tracking, client interaction logs, and summaries.",
    recommendedFor: ["custom", "web"]
  },
  {
    id: "feat_inventory",
    name: "Inventory System",
    oneTimeCost: 10000,
    deliveryDays: 5,
    complexity: "medium",
    category: "Business Tools",
    description: "Real-time stock level monitoring, re-order notifications, and suppliers.",
    recommendedFor: ["ecommerce", "custom", "shopify"]
  },
  {
    id: "feat_invoice_sys",
    name: "Invoice Generation System",
    oneTimeCost: 5000,
    deliveryDays: 3,
    complexity: "medium",
    category: "Business Tools",
    description: "Automatic generation of professional PDFs and invoicing logs.",
    recommendedFor: ["ecommerce", "custom"]
  },
  {
    id: "feat_lead_mgr",
    name: "Lead Management System",
    oneTimeCost: 7500,
    deliveryDays: 4,
    complexity: "medium",
    category: "Business Tools",
    description: "Inquiry pipelines, automatic status transitions, and follow-ups.",
    recommendedFor: ["web", "custom"]
  },
  {
    id: "feat_booking",
    name: "Appointment Booking Calendar",
    oneTimeCost: 7500,
    deliveryDays: 4,
    complexity: "medium",
    category: "Business Tools",
    description: "Interactive scheduling, client slots selection, and automated alerts.",
    recommendedFor: ["web", "custom"]
  },
  {
    id: "feat_ticket_support",
    name: "Helpdesk Ticket System",
    oneTimeCost: 10000,
    deliveryDays: 5,
    complexity: "medium",
    category: "Business Tools",
    dependencies: ["feat_auth"],
    description: "Support ticket submissions, chat replies, and priority queues.",
    recommendedFor: ["custom", "web"]
  },
  {
    id: "feat_payment_gateway",
    name: "Payment Gateway Integration",
    oneTimeCost: 5000,
    deliveryDays: 2,
    complexity: "small",
    category: "Integrations",
    description: "Secure gateway setups for Razorpay, Cashfree, PhonePe, or Stripe.",
    recommendedFor: ["ecommerce", "mobile", "custom", "shopify"]
  },
  {
    id: "feat_logistics",
    name: "Logistics API Integration",
    oneTimeCost: 5000,
    deliveryDays: 3,
    complexity: "medium",
    category: "Integrations",
    description: "Real-time shipping setup with Shiprocket, Delhivery, or Pickrr.",
    recommendedFor: ["ecommerce", "custom", "shopify"]
  },
  {
    id: "feat_whatsapp",
    name: "WhatsApp API Alerts",
    oneTimeCost: 2000,
    deliveryDays: 1,
    complexity: "small",
    category: "Integrations",
    description: "Send direct notifications, alerts, and OTPs on client WhatsApp.",
    recommendedFor: ["web", "ecommerce", "custom", "shopify"]
  },
  {
    id: "feat_sms_otp",
    name: "SMS OTP System",
    oneTimeCost: 5000,
    deliveryDays: 2,
    complexity: "small",
    category: "Integrations",
    description: "Multi-factor safety utilizing OTP checks (SMS credits extra).",
    recommendedFor: ["web", "ecommerce", "mobile", "custom"]
  },
  {
    id: "feat_chatbot",
    name: "AI Support Chatbot",
    oneTimeCost: 10000,
    deliveryDays: 4,
    complexity: "medium",
    category: "AI Solutions",
    description: "AI-based instant support chatbot trained on your company profile.",
    recommendedFor: ["web", "custom", "ai"]
  },
  {
    id: "feat_multilang",
    name: "Multi-Language (Base 2)",
    oneTimeCost: 5000,
    deliveryDays: 3,
    complexity: "medium",
    category: "Other Extras",
    description: "Support localization. Base covers 2 languages (e.g. Gujarati & English).",
    recommendedFor: ["web", "custom", "mobile"]
  },
  {
    id: "feat_pdf_gen",
    name: "PDF Generation Engine",
    oneTimeCost: 3000,
    deliveryDays: 2,
    complexity: "small",
    category: "Other Extras",
    description: "Generate static documents or simple template reports (e.g. receipts).",
    recommendedFor: ["web", "custom", "desktop"]
  },
  {
    id: "feat_dyn_pdf",
    name: "Dynamic PDF Engine",
    oneTimeCost: 7500,
    deliveryDays: 4,
    complexity: "medium",
    category: "Other Extras",
    dependencies: ["feat_pdf_gen"],
    description: "Heavy database-populated PDF generation (e.g. custom visual reports).",
    recommendedFor: ["custom", "desktop"]
  },
  {
    id: "feat_blog",
    name: "SEO Blog System",
    oneTimeCost: 5000,
    deliveryDays: 3,
    complexity: "small",
    category: "Control Panels",
    description: "Publish SEO-optimized articles and dynamic blog categories.",
    recommendedFor: ["web", "custom"]
  },
  {
    id: "feat_push_notif",
    name: "Push Notification System",
    oneTimeCost: 5000,
    deliveryDays: 2,
    complexity: "small",
    category: "Integrations",
    description: "Real-time alerts triggered on client browsers and phones.",
    recommendedFor: ["mobile", "web", "custom"]
  }
];

// Third Party Services (Step 4)
export const THIRD_PARTY_SERVICES: ThirdPartyService[] = [
  { id: "tp_host_static", name: "Vercel Static Hosting", price: 2500, billing: "yearly", priceDisplay: "₹2,500/year", description: "Hosting for static sites (HTML, React, AstroJS) with SSL." },
  { id: "tp_host_dynamic", name: "VPS Cloud Hosting", price: 5000, billing: "yearly", priceDisplay: "₹5,000/year", description: "Database hosting for Next.js, APIs, and Node backends." },
  { id: "tp_domain", name: "Domain Name (.com / .in)", price: 1000, billing: "yearly", priceDisplay: "₹1,000/year", description: "Custom web address registration." },
  { id: "tp_cloudinary", name: "Cloudinary Assets Storage", price: 1500, billing: "yearly", priceDisplay: "₹1,500/year", description: "Storage for images, media assets, and fast deliveries." },
  { id: "tp_workspace", name: "Google Workspace Email", price: 600, billing: "monthly", priceDisplay: "₹600/month", description: "Professional business email account (info@yourcompany.com)." },
  { id: "tp_sms", name: "SMS OTP Gateway Credits", price: 1000, billing: "one-time", priceDisplay: "₹1,000 starting", description: "Prepaid SMS gateway credits for verification OTPs." },
  { id: "tp_play_store", name: "Google Play Developer Account", price: 2500, billing: "one-time", priceDisplay: "₹2,500 (one-time)", description: "Developer console registration required to publish Android apps." },
  { id: "tp_apple_store", name: "Apple Developer Program License", price: 9000, billing: "yearly", priceDisplay: "₹9,000/year", description: "Developer console fee ($99 USD/yr) required for iOS apps." }
];

// Support Options (Step 5)
export const SUPPORT_TIERS: MaintenanceTier[] = [
  { id: "maint_none", name: "No Support Plan", price: 0, priceDisplay: "₹0/month", billingPeriod: "month", features: ["No active updates", "Self-managed backups"] },
  { id: "maint_basic", name: "Basic Support Plan", price: 500, priceDisplay: "₹500/month", billingPeriod: "month", features: ["Monthly Database Backups", "Core Security Patching", "Standard Email Support"] },
  { id: "maint_standard", name: "Standard Support Plan", price: 1000, priceDisplay: "₹1,000/month", billingPeriod: "month", features: ["Weekly Database Backups", "Core & Plugin Security updates", "Priority WhatsApp/Slack Support"] },
  { id: "maint_premium", name: "Premium Support Plan", price: 2500, priceDisplay: "₹2,500/month", billingPeriod: "month", features: ["Daily Database Backups", "SEO & Page Speed Audits", "24/7 Server Uptime Monitoring", "Minor Layout/Design tweaks"] }
];

// 13 Project Type Presets
export interface ProjectPreset {
  id: string;
  name: string;
  icon: string;
  categoryId: string;
  packageId: string;
  featureIds: string[];
  infrastructureIds: string[];
  supportId: string;
  expectedBenefits: string[];
}

export const PROJECT_TYPE_PRESETS: ProjectPreset[] = [
  {
    id: "preset_lead_gen",
    name: "Lead Generation Website",
    icon: "Megaphone",
    categoryId: "web",
    packageId: "web_business",
    featureIds: ["feat_cf", "feat_lead_mgr", "feat_whatsapp"],
    infrastructureIds: ["tp_host_static", "tp_domain"],
    supportId: "maint_basic",
    expectedBenefits: [
      "Better Google Search Visibility (SEO)",
      "Instant WhatsApp inquiry capture",
      "Lead spreadsheet tracking logs",
      "Dynamic service details publishing"
    ]
  },
  {
    id: "preset_company_web",
    name: "Company Website",
    icon: "Briefcase",
    categoryId: "web",
    packageId: "web_business",
    featureIds: ["feat_cf", "feat_blog", "feat_whatsapp"],
    infrastructureIds: ["tp_host_static", "tp_domain", "tp_workspace"],
    supportId: "maint_basic",
    expectedBenefits: [
      "Professional brand presence",
      "Direct email addresses for business cards",
      "Publish company news and announcements",
      "Clear call-to-action capture buttons"
    ]
  },
  {
    id: "preset_portfolio",
    name: "Portfolio Website",
    icon: "LayoutGrid",
    categoryId: "web",
    packageId: "web_starter",
    featureIds: [],
    infrastructureIds: ["tp_host_static", "tp_domain"],
    supportId: "maint_none",
    expectedBenefits: [
      "Showcase project images and details",
      "Super fast edge-speed loading",
      "Professional bio representation",
      "Contact submission email forwards"
    ]
  },
  {
    id: "preset_ecommerce_store",
    name: "E-Commerce Store",
    icon: "ShoppingBag",
    categoryId: "ecommerce",
    packageId: "eco_standard",
    featureIds: ["feat_payment_gateway", "feat_logistics", "feat_whatsapp", "feat_inventory"],
    infrastructureIds: ["tp_host_dynamic", "tp_domain", "tp_cloudinary"],
    supportId: "maint_standard",
    expectedBenefits: [
      "Accept digital cards, UPI, net banking",
      "Automated logistics calculations",
      "Send dispatch alerts on WhatsApp",
      "Dynamic catalog product filtering"
    ]
  },
  {
    id: "preset_marketplace",
    name: "Marketplace",
    icon: "Layers", // mapped in icon routing
    categoryId: "ecommerce",
    packageId: "eco_premium",
    featureIds: ["feat_payment_gateway", "feat_logistics", "feat_roles", "feat_inventory", "feat_invoice_sys"],
    infrastructureIds: ["tp_host_dynamic", "tp_domain", "tp_cloudinary"],
    supportId: "maint_premium",
    expectedBenefits: [
      "Multi-vendor portal dashboards",
      "Automated vendor commission tracking",
      "Automated GST invoice generation",
      "Advanced customer management tools"
    ]
  },
  {
    id: "preset_crm_sys",
    name: "CRM System",
    icon: "Users",
    categoryId: "custom",
    packageId: "cust_mvp",
    featureIds: ["feat_crm", "feat_auth", "feat_roles"],
    infrastructureIds: ["tp_host_dynamic", "tp_domain"],
    supportId: "maint_standard",
    expectedBenefits: [
      "Centralized customer records database",
      "Task schedules and follow-up alerts",
      "Sales metrics dashboards",
      "Different access control for sales staff"
    ]
  },
  {
    id: "preset_erp_sys",
    name: "ERP System",
    icon: "Settings",
    categoryId: "custom",
    packageId: "cust_enterprise",
    featureIds: ["feat_auth", "feat_roles", "feat_inventory", "feat_crm", "feat_invoice_sys", "feat_dyn_pdf"],
    infrastructureIds: ["tp_host_dynamic", "tp_domain"],
    supportId: "maint_premium",
    expectedBenefits: [
      "Unify all company metrics and transactions",
      "Automate generation of staff billing logs",
      "Full cloud security backups",
      "Inventory alerts tied with sales registers"
    ]
  },
  {
    id: "preset_inventory_sys",
    name: "Inventory System",
    icon: "Package",
    categoryId: "custom",
    packageId: "cust_mvp",
    featureIds: ["feat_inventory", "feat_auth", "feat_roles"],
    infrastructureIds: ["tp_host_dynamic", "tp_domain"],
    supportId: "maint_standard",
    expectedBenefits: [
      "Stock inventory ledger databases",
      "Low quantity auto notification warnings",
      "Supplier ledger balances lists",
      "Barcode scanning readiness support"
    ]
  },
  {
    id: "preset_mobile_app",
    name: "Mobile App",
    icon: "Smartphone",
    categoryId: "mobile",
    packageId: "mob_business",
    featureIds: ["feat_push_notif", "feat_auth"],
    infrastructureIds: ["tp_domain", "tp_play_store", "tp_apple_store"],
    supportId: "maint_standard",
    expectedBenefits: [
      "Direct presence on iOS App Store & Android Play Store",
      "Send native push alert pushbacks to users",
      "User engagement retention metrics",
      "Fast native-feel visual design"
    ]
  },
  {
    id: "preset_desktop_software",
    name: "Desktop Software",
    icon: "Monitor",
    categoryId: "desktop",
    packageId: "desk_basic",
    featureIds: ["feat_pdf_gen", "feat_auth"],
    infrastructureIds: ["tp_domain"],
    supportId: "maint_basic",
    expectedBenefits: [
      "Standalone Windows installer distribution",
      "Offline database operation",
      "Direct thermal printer layout integrations",
      "Client management desktop tool logs"
    ]
  },
  {
    id: "preset_internal_tool",
    name: "Internal Company Tool",
    icon: "Wrench",
    categoryId: "custom",
    packageId: "cust_mvp",
    featureIds: ["feat_auth", "feat_admin_panel"],
    infrastructureIds: ["tp_host_dynamic", "tp_domain"],
    supportId: "maint_basic",
    expectedBenefits: [
      "Increase administrative operational velocity",
      "Digitize manual excel paper ledger logs",
      "Secure hosting restricted to staff",
      "Custom operations pipelines workflows"
    ]
  },
  {
    id: "preset_automation_tool",
    name: "Automation Tool",
    icon: "Cpu",
    categoryId: "automation",
    packageId: "auto_adv",
    featureIds: ["feat_whatsapp"],
    infrastructureIds: [],
    supportId: "maint_none",
    expectedBenefits: [
      "Eradicate daily manual file transformations",
      "Automated CRM scheduled follow-up alerts",
      "24/7 scripts loop processing databases",
      "Fast data transfer pipelines setups"
    ]
  },
  {
    id: "preset_ai_tool",
    name: "AI Tool",
    icon: "Brain",
    categoryId: "ai",
    packageId: "ai_chatbot_plan",
    featureIds: ["feat_chatbot", "feat_auth"],
    infrastructureIds: ["tp_host_dynamic", "tp_domain"],
    supportId: "maint_standard",
    expectedBenefits: [
      "Decrease customer support response delays",
      "Trained LLM answers customer inquiries 24/7",
      "Integrate lead capture inside conversation flow",
      "Decrease administrative support costs"
    ]
  }
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
