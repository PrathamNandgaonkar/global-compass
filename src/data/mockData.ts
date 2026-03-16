export const chatMessages = [
  {
    role: "assistant" as const,
    content: "Hello! I'm your AI Relocation Advisor. I can help you with questions about immigration, visas, cost of living, and finding the best country for your situation. What would you like to know?",
  },
];

export const suggestedPrompts = [
  "Can I move to Germany as a software engineer?",
  "Which country has the easiest path to permanent residency?",
  "Compare cost of living between Lisbon and Berlin",
  "What's the best country for remote workers?",
  "How does the Canada Express Entry system work?",
  "Which countries offer digital nomad visas?",
];

export const aiResponses: Record<string, string> = {
  germany: "Germany is excellent for software engineers! The EU Blue Card program offers a fast track: with a qualifying job offer (€43,800+ salary), you can get a residence permit in 1-3 months. After 21 months with B1 German, you can apply for permanent residence. Berlin has a thriving tech scene with companies like Delivery Hero, Zalando, and many startups.",
  easiest: "Portugal and the Netherlands tend to have the most accessible pathways. Portugal's D7 visa requires only proof of passive income (€760/month). The Netherlands' Highly Skilled Migrant permit can be processed in just 2-6 weeks if your employer is a recognized sponsor. Canada's Express Entry is also well-structured but competitive.",
  cost: "Comparing Lisbon vs Berlin: Lisbon averages €900/month rent (1BR center) vs Berlin's €1,200. Food costs are about 20% lower in Lisbon. However, Berlin salaries for tech are typically 40-60% higher. Your net purchasing power depends heavily on your industry and role.",
  remote: "For remote workers, Portugal's Digital Nomad Visa is a top choice — requiring €3,040/month income. Estonia's e-Residency program is great for freelancers. Georgia offers visa-free stays up to 1 year for many nationalities. Bali (Indonesia) has a new digital nomad visa too.",
  canada: "Canada's Express Entry has three programs: Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades. You're scored on age, education, language, and work experience (max 1,200 points). Current draws are typically 480-520 points. Processing takes 6-12 months after invitation.",
  nomad: "Countries with digital nomad visas include: Portugal (€3,040/mo min), Spain (€2,520/mo), Croatia (€2,539/mo), Greece (€3,500/mo), Estonia (€3,504/mo), and Dubai (€3,500/mo). Portugal and Croatia are the most popular due to cost of living and lifestyle balance.",
};

export const assessmentDefaults = {
  personal: { age: 28, citizenship: "", education: "bachelors" },
  career: { profession: "", experience: 3, industry: "" },
  budget: { savings: 20000, expectedSalary: 60000, costPreference: "moderate" },
  lifestyle: { climate: "temperate", setting: "urban", healthcareImportance: "high" },
  goals: { visaType: "work", timeline: "6-12 months" },
};
