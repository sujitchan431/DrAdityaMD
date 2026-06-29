export const siteConfig = {
  url: "https://www.dradityamd.com",
  name: "Dr. Aditya Davhale",
  fullName: "Dr. Aditya Davhale",
  credentials: "MBBS, MD, DNB (Internal Medicine)",
  title: "Assistant Professor & Consultant Physician — Internal Medicine",
  tagline: "Evidence-Based Care for Modern Living",
  shortBio:
    "Dr. Aditya Davhale is an Assistant Professor and Consultant Physician (Internal Medicine) based in Navi Mumbai, with expertise in diabetes, hypertension, fever, infectious diseases, ICU & critical care, and chronic lifestyle conditions.",
  fullBio: `Dr. Aditya Davhale is an Assistant Professor and Consultant Physician specialising in Internal Medicine, based in Navi Mumbai. He is known for evidence-based, patient-centred care across adult medicine, diabetes, hypertension, fever, infectious diseases, and ICU & critical care.

He completed his MBBS from TN Medical College & BYL Nair Hospital, Mumbai, and his MD in General Medicine from Dr. D. Y. Patil Medical College, Navi Mumbai. He has cleared his DNB (General Medicine) theory examinations and is further expanding his clinical depth through a Fellowship in 2D Echocardiography.

He currently serves as Assistant Professor in the Department of General Medicine at Dr. D. Y. Patil University School of Medicine and consults at leading hospitals across Navi Mumbai, including Apollo Hospitals (Belapur), Seawoods Hospital, Terna Specialty Hospital (Nerul), MPCT Hospital (Sanpada), and New Era Hospital (Vashi).

His approach combines compassionate consultation, evidence-based medicine, preventive healthcare, and personalized treatment planning, supported by hands-on critical-care and procedural expertise.`,

  // High-level specialties shown on the site (from clinical profile)
  specialties: [
    "Adult Medicine",
    "Diabetes",
    "Hypertension",
    "Fever",
    "ICU & Critical Care",
  ],

  // Hospital & academic appointments across Navi Mumbai
  hospitals: [
    {
      role: "Assistant Professor",
      name: "Dr. D. Y. Patil University School of Medicine",
      location: "Nerul, Navi Mumbai",
    },
    {
      role: "Clinical Associate",
      name: "Apollo Hospitals",
      location: "Belapur, Navi Mumbai",
    },
    {
      role: "Consultant Physician",
      name: "Seawoods Hospital",
      location: "Nerul, Navi Mumbai",
    },
    {
      role: "Visiting Consultant",
      name: "Terna Specialty Hospital",
      location: "Nerul, Navi Mumbai",
    },
    {
      role: "Consultant Physician",
      name: "MPCT Hospital",
      location: "Sanpada, Navi Mumbai",
    },
    {
      role: "Consultant Physician",
      name: "New Era Hospital",
      location: "Vashi, Navi Mumbai",
    },
  ],

  // Core clinical expertise (resume)
  expertise: [
    "Diabetes, Hypertension & CKD",
    "Stroke & Neurological Emergencies",
    "Infectious Diseases Management",
    "Gastrointestinal Disorders",
    "Obesity & Lifestyle Medicine",
    "ICU & Critical Care",
  ],

  // Procedural skills (resume)
  procedures: [
    "Central & Arterial Line Insertion",
    "Lumbar Puncture",
    "Ascitic & Pleural Taps",
    "Ventilator Management",
    "2D Echocardiography (Advanced Training)",
  ],

  clinic: {
    name: "Seawoods Hospital",
    address: "Nerul Sector 48, Navi Mumbai, Maharashtra 400706",
    postalCode: "400706",
    phone: "+91 99606 28111",
    phoneRaw: "+919960628111",
    whatsapp: "919960628111",
    email: "dradityadavhale@gmail.com",
    hours: {
      days: "Monday to Sunday",
      time: "7:00 PM – 10:00 PM",
    },
    consultationFee: "₹800",
    geo: {
      latitude: 19.033,
      longitude: 73.0186,
    },
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.5!2d73.0186!3d19.033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAxJzU4LjgiTiA3M8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000",
  },

  stats: {
    yearsExperience: 6,
    qualifications: ["MBBS", "MD (Internal Medicine)", "DNB (Internal Medicine)"],
    keyFacts: [
      "MBBS, MD, DNB (Internal Medicine)",
      "Assistant Professor, DY Patil University",
      "Consultant at 5+ Navi Mumbai Hospitals",
      "ICU & Critical Care Expertise",
      "2D Echocardiography Fellowship",
      "Evidence-Based Patient Care",
    ],
  },

  timeline: [
    {
      year: "2014–2020",
      title: "MBBS",
      description: "TN Medical College & BYL Nair Hospital, Mumbai",
    },
    {
      year: "2021–2024",
      title: "MD General Medicine",
      description: "Dr. D. Y. Patil Medical College, Navi Mumbai",
    },
    {
      year: "2025",
      title: "DNB General Medicine",
      description: "National Board of Examinations",
    },
    {
      year: "2025–2026",
      title: "Senior Resident",
      description: "Department of General Medicine",
    },
    {
      year: "2026–Present",
      title: "Assistant Professor",
      description: "Dr. D. Y. Patil University School of Medicine",
    },
  ],

  social: {
    linkedin: "https://linkedin.com/", // ⚠️ Replace with doctor profile
    facebook: "https://facebook.com/", // ⚠️ Replace with practice page URL
    twitter: "https://twitter.com/", // ⚠️ Replace with practice profile
    youtube: "https://youtube.com/",
    practo: "https://practo.com/",
    whatsapp: "https://wa.me/919960628111",
  },

  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
    { label: "Patient Resources", href: "/resources" },
  ],
} as const;
