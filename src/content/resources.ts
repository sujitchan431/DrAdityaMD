export interface PatientResource {
  title: string;
  description: string;
  category: string;
  icon: string;
}

export const resources: PatientResource[] = [
  {
    title: "Understanding Your Blood Test Results",
    description:
      "A simple guide to understanding common blood test parameters like CBC, blood sugar, lipid profile, kidney function, and liver function tests.",
    category: "Diagnostics",
    icon: "🔬",
  },
  {
    title: "Diabetes-Friendly Diet Plan",
    description:
      "A practical 7-day Indian meal plan for diabetes management with portion control guidelines and glycemic index awareness.",
    category: "Nutrition",
    icon: "🥗",
  },
  {
    title: "How to Monitor Blood Pressure at Home",
    description:
      "Step-by-step guide on correctly measuring blood pressure at home, choosing a BP monitor, and maintaining a BP log for your doctor.",
    category: "Self-Monitoring",
    icon: "📊",
  },
  {
    title: "Exercise Guide for Beginners",
    description:
      "A safe and gradual approach to starting an exercise routine, including walking plans, stretching, and activity recommendations for different age groups.",
    category: "Fitness",
    icon: "🚶",
  },
  {
    title: "Understanding Thyroid Function Tests",
    description:
      "What TSH, T3, and T4 mean, how to interpret your thyroid test results, and what abnormal values might indicate.",
    category: "Diagnostics",
    icon: "📋",
  },
  {
    title: "Low-Salt Diet for Hypertension",
    description:
      "Practical tips for reducing sodium in your Indian diet, hidden salt sources to avoid, and DASH diet principles adapted for Indian cooking.",
    category: "Nutrition",
    icon: "🧂",
  },
  {
    title: "Warning Signs You Should Never Ignore",
    description:
      "Learn about red-flag symptoms that require immediate medical attention, including chest pain, stroke signs, and other medical emergencies.",
    category: "Awareness",
    icon: "⚠️",
  },
  {
    title: "Managing Stress for Better Health",
    description:
      "Evidence-based stress reduction techniques including breathing exercises, mindfulness, sleep hygiene, and work-life balance strategies.",
    category: "Wellness",
    icon: "🧘",
  },
  {
    title: "Vaccination Guide for Adults",
    description:
      "Recommended vaccines for adults in India including influenza, pneumococcal, hepatitis B, tetanus, and COVID-19 boosters.",
    category: "Prevention",
    icon: "💉",
  },
  {
    title: "Common Vitamin Deficiencies in Indians",
    description:
      "Why Vitamin D, B12, and iron deficiencies are common in India, how to identify them, and dietary + supplementation strategies.",
    category: "Nutrition",
    icon: "💊",
  },
  {
    title: "Preparing for Your Doctor's Appointment",
    description:
      "A checklist of what to bring, what to ask, and how to describe your symptoms effectively to get the most from your consultation.",
    category: "General",
    icon: "📝",
  },
  {
    title: "Heart-Healthy Lifestyle Guide",
    description:
      "Comprehensive guide covering diet, exercise, smoking cessation, and regular screening for maintaining cardiovascular health.",
    category: "Prevention",
    icon: "❤️",
  },
];
