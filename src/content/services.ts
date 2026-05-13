export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  conditions: string[];
  symptoms: string[];
  benefits: string[];
  keywords: string;
}

export const services: Service[] = [
  {
    id: "diabetes-management",
    title: "Diabetes Management",
    shortDescription:
      "Comprehensive care for Type 1 and Type 2 diabetes with personalized treatment plans.",
    longDescription:
      "Dr. Aditya Davhale provides comprehensive diabetes care including blood sugar monitoring, medication management, lifestyle modification guidance, and prevention of diabetes-related complications. Tailored treatment plans address each patient's unique needs.",
    icon: "🩸",
    conditions: [
      "Type 1 Diabetes",
      "Type 2 Diabetes",
      "Prediabetes",
      "Gestational Diabetes",
      "Diabetic Neuropathy",
    ],
    symptoms: [
      "Frequent urination",
      "Excessive thirst",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing wounds",
    ],
    benefits: [
      "Better blood sugar control",
      "Reduced complication risk",
      "Personalized diet plans",
      "Regular monitoring & follow-up",
      "Medication optimization",
    ],
    keywords: "diabetes doctor Navi Mumbai, sugar specialist, diabetes treatment",
  },
  {
    id: "hypertension-treatment",
    title: "Hypertension Treatment",
    shortDescription:
      "Evidence-based management of high blood pressure to protect your heart, brain, and kidneys.",
    longDescription:
      "Comprehensive hypertension management includes accurate blood pressure monitoring, identification of underlying causes, medication management, salt-restricted diet counseling, stress management techniques, and regular follow-up to prevent long-term organ damage.",
    icon: "❤️",
    conditions: [
      "Primary Hypertension",
      "Secondary Hypertension",
      "Resistant Hypertension",
      "White Coat Hypertension",
      "Hypertensive Heart Disease",
    ],
    symptoms: [
      "Morning headaches",
      "Dizziness",
      "Nosebleeds",
      "Shortness of breath",
      "Chest pain (in severe cases)",
      "Vision changes",
    ],
    benefits: [
      "Lower cardiovascular risk",
      "Prevention of stroke",
      "Kidney protection",
      "Improved quality of life",
      "Medication-free control possible",
    ],
    keywords: "hypertension specialist Navi Mumbai, BP doctor, high blood pressure treatment",
  },
  {
    id: "thyroid-disorder-management",
    title: "Thyroid Disorder Management",
    shortDescription:
      "Expert diagnosis and treatment of hypothyroidism, hyperthyroidism, and thyroid nodules.",
    longDescription:
      "Dr. Aditya offers comprehensive thyroid care including thyroid function testing, ultrasound-guided evaluation, medication management for hypo and hyperthyroidism, goiter assessment, and long-term monitoring to maintain optimal thyroid hormone levels.",
    icon: "🦋",
    conditions: [
      "Hypothyroidism",
      "Hyperthyroidism",
      "Thyroid Nodules",
      "Goiter",
      "Hashimoto's Thyroiditis",
      "Graves' Disease",
    ],
    symptoms: [
      "Unexplained weight changes",
      "Fatigue and weakness",
      "Hair loss",
      "Temperature sensitivity",
      "Mood changes",
      "Neck swelling",
    ],
    benefits: [
      "Symptom resolution",
      "Normalized metabolism",
      "Weight management",
      "Improved energy levels",
      "Regular TSH monitoring",
    ],
    keywords: "thyroid specialist Navi Mumbai, thyroid doctor, TSH treatment",
  },
  {
    id: "fever-infectious-disease-care",
    title: "Fever & Infectious Disease Care",
    shortDescription:
      "Prompt diagnosis and treatment of acute infections including viral fevers, dengue, malaria, and typhoid.",
    longDescription:
      "Expert care for common and tropical infectious diseases with accurate diagnosis through blood tests and clinical evaluation. Prompt treatment protocols for viral fevers, dengue, malaria, typhoid, respiratory infections, urinary tract infections, and gastroenteritis.",
    icon: "🦠",
    conditions: [
      "Viral Fever",
      "Dengue",
      "Malaria",
      "Typhoid",
      "Respiratory Infections",
      "Urinary Tract Infections",
      "Gastroenteritis",
    ],
    symptoms: [
      "High fever with chills",
      "Body aches and fatigue",
      "Cough and cold",
      "Nausea and vomiting",
      "Diarrhea",
      "Rashes",
    ],
    benefits: [
      "Rapid diagnosis",
      "Targeted antibiotic therapy",
      "Symptom relief",
      "Prevention of complications",
      "Complete recovery monitoring",
    ],
    keywords: "fever doctor Navi Mumbai, infection specialist, dengue treatment",
  },
  {
    id: "preventive-health-checkups",
    title: "Preventive Health Checkups",
    shortDescription:
      "Comprehensive annual health screenings to detect and prevent diseases before symptoms appear.",
    longDescription:
      "Regular preventive health checkups are the cornerstone of long-term wellness. Comprehensive packages include blood tests, cardiac screening, kidney and liver function tests, diabetes screening, thyroid function, vitamin levels, and cancer screening based on age and risk factors.",
    icon: "🩺",
    conditions: [
      "Annual Health Screening",
      "Cardiac Risk Assessment",
      "Diabetes Screening",
      "Cancer Screening",
      "Vitamin Deficiency Testing",
    ],
    symptoms: ["Often asymptomatic", "Best for early detection"],
    benefits: [
      "Early disease detection",
      "Personalized health roadmap",
      "Risk factor identification",
      "Peace of mind",
      "Cost-effective prevention",
    ],
    keywords: "health checkup Navi Mumbai, preventive health, annual screening",
  },
  {
    id: "lifestyle-disease-management",
    title: "Lifestyle Disease Management",
    shortDescription:
      "Holistic management of obesity, high cholesterol, fatty liver, and metabolic syndrome.",
    longDescription:
      "Modern lifestyle diseases require a comprehensive approach combining medical management with sustainable lifestyle changes. Dr. Aditya provides guidance on weight management, cholesterol control, fatty liver reversal, metabolic syndrome correction, and prevention of future complications.",
    icon: "🏃",
    conditions: [
      "Obesity",
      "High Cholesterol",
      "Fatty Liver Disease",
      "Metabolic Syndrome",
      "PCOD/PCOS",
      "Vitamin D/B12 Deficiency",
    ],
    symptoms: [
      "Weight gain",
      "Fatigue",
      "Indigestion",
      "Irregular periods",
      "Joint pain",
      "Poor sleep",
    ],
    benefits: [
      "Sustainable weight loss",
      "Improved lipid profile",
      "Better energy and sleep",
      "Reduced medication dependency",
      "Long-term health improvement",
    ],
    keywords: "lifestyle disease doctor, obesity treatment Navi Mumbai, cholesterol specialist",
  },
  {
    id: "chronic-disease-monitoring",
    title: "Chronic Disease Monitoring",
    shortDescription:
      "Ongoing care and monitoring for patients with long-term medical conditions.",
    longDescription:
      "Patients with chronic conditions like diabetes, hypertension, heart disease, kidney disease, or thyroid disorders need regular monitoring to prevent disease progression and complications. Structured follow-up schedules, periodic testing, and medication reviews ensure optimal disease control.",
    icon: "📋",
    conditions: [
      "Chronic Kidney Disease",
      "Heart Failure",
      "COPD",
      "Arthritis",
      "Chronic Liver Disease",
    ],
    symptoms: ["Varies by condition"],
    benefits: [
      "Disease progression prevention",
      "Medication optimization",
      "Better quality of life",
      "Reduced hospitalizations",
      "Coordinated specialist care",
    ],
    keywords: "chronic disease management, long-term care Navi Mumbai",
  },
  {
    id: "general-physician-consultation",
    title: "General Physician Consultation",
    shortDescription:
      "Primary care consultations for common health concerns, minor illnesses, and medical guidance.",
    longDescription:
      "As a Consultant General Physician, Dr. Aditya serves as your first point of contact for any health concern. From common colds and body aches to complex diagnostic puzzles, he provides thorough evaluation, appropriate testing, and evidence-based treatment or specialist referral when needed.",
    icon: "👨‍⚕️",
    conditions: [
      "Common illnesses",
      "Unexplained symptoms",
      "Health concerns",
      "Medical guidance",
      "Pre-surgery evaluation",
      "Insurance health checks",
    ],
    symptoms: ["Any health concern", "Unexplained symptoms", "General wellness check"],
    benefits: [
      "Trusted medical guidance",
      "Appropriate specialist referral",
      "Comprehensive evaluation",
      "Continuity of care",
      "Evidence-based advice",
    ],
    keywords: "general physician Navi Mumbai, family doctor, primary care doctor Nerul",
  },
  {
    id: "heart-health-monitoring",
    title: "Heart Health Monitoring",
    shortDescription:
      "Cardiac risk assessment, ECG interpretation, and preventive heart care.",
    longDescription:
      "Heart disease is the leading cause of mortality in India. Regular cardiac risk assessment including blood pressure monitoring, lipid profile, ECG, and lifestyle evaluation helps identify risks early. Dr. Aditya provides comprehensive heart health monitoring and preventive cardiology consultation.",
    icon: "💓",
    conditions: [
      "Coronary Artery Disease Risk",
      "Arrhythmias",
      "Heart Failure",
      "Post-heart attack care",
      "Chest pain evaluation",
    ],
    symptoms: [
      "Chest discomfort",
      "Palpitations",
      "Shortness of breath",
      "Ankle swelling",
      "Exercise intolerance",
    ],
    benefits: [
      "Early cardiac risk detection",
      "ECG and 2D Echo coordination",
      "Lipid management",
      "Lifestyle cardiology",
      "Cardiologist referral when needed",
    ],
    keywords: "heart doctor Navi Mumbai, cardiac checkup, ECG specialist",
  },
  {
    id: "kidney-disease-evaluation",
    title: "Kidney Disease Evaluation",
    shortDescription:
      "Screening and management of kidney function disorders and associated conditions.",
    longDescription:
      "Kidney disease often progresses silently. Regular kidney function testing (serum creatinine, eGFR, urine analysis) is crucial, especially for patients with diabetes, hypertension, or family history of kidney disease. Early detection and management can significantly slow disease progression.",
    icon: "🫘",
    conditions: [
      "Chronic Kidney Disease",
      "Acute Kidney Injury",
      "Kidney Stones",
      "Urinary Tract Infections",
      "Proteinuria",
    ],
    symptoms: [
      "Swelling in legs/face",
      "Changes in urination",
      "Fatigue",
      "Nausea",
      "High blood pressure",
      "Back pain",
    ],
    benefits: [
      "Early CKD detection",
      "Slowed disease progression",
      "Dietary guidance for kidneys",
      "Blood pressure optimization",
      "Nephrologist coordination",
    ],
    keywords: "kidney specialist Navi Mumbai, kidney function test, nephrology consultation",
  },
  {
    id: "online-consultation",
    title: "Online Consultation",
    shortDescription:
      "Virtual medical consultations for patients who cannot visit the clinic in person.",
    longDescription:
      "For patients with mobility issues, busy schedules, or those living outside Navi Mumbai, Dr. Aditya offers telemedicine consultations via video or phone call. Online consultations are suitable for follow-up visits, medication reviews, test report discussions, and minor health concerns.",
    icon: "💻",
    conditions: [
      "Follow-up consultations",
      "Test report review",
      "Medication management",
      "Minor health concerns",
      "Lifestyle counseling",
      "Diet and nutrition advice",
    ],
    symptoms: ["Any non-emergency condition suitable for virtual assessment"],
    benefits: [
      "Consult from home",
      "Save travel time",
      "Flexible scheduling",
      "Continuity of care",
      "Quick follow-ups",
    ],
    keywords: "online doctor consultation, telemedicine Navi Mumbai, video consultation",
  },
  {
    id: "health-counseling",
    title: "Health Counseling",
    shortDescription:
      "Personalized guidance on nutrition, exercise, stress management, and preventive lifestyle changes.",
    longDescription:
      "Beyond prescribing medicines, Dr. Aditya believes in empowering patients through health education. One-on-one counseling sessions cover diet planning, exercise recommendations, stress management techniques, sleep hygiene, smoking cessation, and sustainable habit formation for long-term wellness.",
    icon: "🧠",
    conditions: [
      "Stress and Anxiety",
      "Sleep Disorders",
      "Nutritional Deficiencies",
      "Weight Management",
      "Smoking Cessation",
      "Work-Life Balance",
    ],
    symptoms: [
      "Poor sleep quality",
      "Chronic stress",
      "Low energy",
      "Unhealthy eating patterns",
      "Lack of motivation",
    ],
    benefits: [
      "Personalized wellness plan",
      "Sustainable habit change",
      "Better mental health",
      "Improved nutrition",
      "Enhanced quality of life",
    ],
    keywords: "health counseling, wellness coach, lifestyle modification Navi Mumbai",
  },
];
