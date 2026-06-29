export const SITE_URL = "https://www.dradityamd.com";

export const WHATSAPP_NUMBER = "919960628111";

/** Build a wa.me deep link with an optional pre-filled message. */
export const whatsappLink = (
  message = "Hello Dr. Aditya Davhale, I would like to book an appointment.",
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  appointment: "/appointment",
  faqs: "/faqs",
  resources: "/resources",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const BLOG_CATEGORIES = [
  { slug: "diabetes", label: "Diabetes" },
  { slug: "hypertension", label: "Hypertension" },
  { slug: "thyroid", label: "Thyroid" },
  { slug: "preventive-healthcare", label: "Preventive Healthcare" },
  { slug: "lifestyle-diseases", label: "Lifestyle Diseases" },
  { slug: "nutrition", label: "Nutrition" },
  { slug: "heart-health", label: "Heart Health" },
  { slug: "kidney-health", label: "Kidney Health" },
  { slug: "general-medicine", label: "General Medicine" },
  { slug: "viral-infections", label: "Viral Infections" },
  { slug: "medical-awareness", label: "Medical Awareness" },
] as const;

export const POSTS_PER_PAGE = 9;
