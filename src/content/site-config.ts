export const siteConfig = {
  url: "https://www.dradityadavhale.com",
  name: "Dr. Aditya Davhale",
  fullName: "Dr. Aditya Davhale",
  credentials: "MBBS, MD, DNB (Internal Medicine)",
  title: "Consultant General Physician & Internal Medicine Specialist",
  tagline: "Evidence-Based Care for Modern Living",
  shortBio:
    "Dr. Aditya Davhale is a Consultant General Physician and Internal Medicine Specialist based in Navi Mumbai, known for his expertise in managing diabetes, hypertension, thyroid disorders, infectious diseases, and chronic lifestyle conditions.",
  fullBio: `Dr. Aditya Davhale is a Consultant General Physician and Internal Medicine Specialist based in Navi Mumbai, known for his expertise in managing diabetes, hypertension, thyroid disorders, infectious diseases, and chronic lifestyle conditions.

He completed his MBBS from TNMC & BYL Nair Hospital and earned his MD in General Medicine from DY Patil Hospital, Navi Mumbai. He has also successfully completed DNB Internal Medicine.

Dr. Aditya currently serves as Assistant Professor in the Department of General Medicine at Dr. D. Y. Patil University School of Medicine, contributing actively to academics, research, and patient care.

His approach combines compassionate consultation, evidence-based medicine, preventive healthcare, and personalized treatment planning.`,

  clinic: {
    name: "Seawoods Hospital",
    address: "Nerul Sector 48, Navi Mumbai, Maharashtra 400706",
    postalCode: "400706",
    phone: "+91-XXXXX-XXXXX",
    email: "dr.adityadavhale@gmail.com",
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
      "6+ Years Experience",
      "Assistant Professor at DY Patil University",
      "Evidence-Based Patient Care",
      "Preventive Health Focus",
    ],
  },

  timeline: [
    { year: "2017", title: "MBBS", description: "TNMC & BYL Nair Hospital, Mumbai" },
    {
      year: "2021",
      title: "MD General Medicine",
      description: "DY Patil Hospital, Navi Mumbai",
    },
    { year: "2022", title: "DNB Internal Medicine", description: "National Board of Examinations" },
    { year: "2021–2022", title: "Resident Doctor", description: "DY Patil Hospital, Navi Mumbai" },
    { year: "2022–2023", title: "Senior Resident", description: "Department of General Medicine" },
    {
      year: "2023–Present",
      title: "Assistant Professor",
      description: "Dr. D. Y. Patil University School of Medicine",
    },
  ],

  social: {
    linkedin: "https://linkedin.com/",
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/",
    practo: "https://practo.com/",
    whatsapp: "https://wa.me/91XXXXXXXXXX",
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
