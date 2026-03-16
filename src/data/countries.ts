export interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  score: number;
  salary: number;
  costOfLiving: number;
  visaDifficulty: number;
  population: string;
  languages: string[];
  currency: string;
  gdp: string;
  safetyScore: number;
  healthcareQuality: number;
  climate: string;
  description: string;
  immigrationPrograms: ImmigrationProgram[];
  costBreakdown: CostBreakdown;
}

export interface ImmigrationProgram {
  name: string;
  type: "work" | "pr" | "student";
  processingTime: string;
  difficulty: number;
  steps: string[];
}

export interface CostBreakdown {
  rent: number;
  food: number;
  transport: number;
  taxes: number;
  utilities: number;
  entertainment: number;
}

export const countries: Country[] = [
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    score: 92,
    salary: 65000,
    costOfLiving: 72,
    visaDifficulty: 2,
    population: "38.2M",
    languages: ["English", "French"],
    currency: "CAD",
    gdp: "$1.99T",
    safetyScore: 82,
    healthcareQuality: 88,
    climate: "Continental",
    description: "Canada offers a high quality of life, multicultural society, and strong immigration programs including Express Entry.",
    immigrationPrograms: [
      {
        name: "Express Entry",
        type: "pr",
        processingTime: "6-12 months",
        difficulty: 2,
        steps: ["Create Express Entry profile", "Receive ITA", "Submit PR application", "Land in Canada"],
      },
      {
        name: "Work Permit (LMIA)",
        type: "work",
        processingTime: "3-6 months",
        difficulty: 2,
        steps: ["Get job offer", "Employer obtains LMIA", "Apply for work permit", "Begin employment"],
      },
    ],
    costBreakdown: { rent: 1800, food: 450, transport: 120, taxes: 1625, utilities: 150, entertainment: 200 },
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    score: 89,
    salary: 58000,
    costOfLiving: 65,
    visaDifficulty: 2,
    population: "83.2M",
    languages: ["German"],
    currency: "EUR",
    gdp: "$4.26T",
    safetyScore: 85,
    healthcareQuality: 91,
    climate: "Temperate",
    description: "Germany is Europe's economic powerhouse with excellent healthcare, strong worker protections, and the EU Blue Card program.",
    immigrationPrograms: [
      {
        name: "EU Blue Card",
        type: "work",
        processingTime: "1-3 months",
        difficulty: 2,
        steps: ["Get qualified job offer", "Apply for Blue Card visa", "Move to Germany", "Apply for permanent residence after 21 months"],
      },
      {
        name: "Job Seeker Visa",
        type: "work",
        processingTime: "1-2 months",
        difficulty: 1,
        steps: ["Prove qualifications", "Show financial means", "Apply at embassy", "Search for jobs in Germany"],
      },
    ],
    costBreakdown: { rent: 1200, food: 350, transport: 90, taxes: 1450, utilities: 200, entertainment: 150 },
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    region: "Europe",
    score: 86,
    salary: 32000,
    costOfLiving: 48,
    visaDifficulty: 1,
    population: "10.3M",
    languages: ["Portuguese"],
    currency: "EUR",
    gdp: "$253B",
    safetyScore: 87,
    healthcareQuality: 79,
    climate: "Mediterranean",
    description: "Portugal offers affordable living in Europe, a welcoming culture, excellent climate, and attractive digital nomad and D7 visa programs.",
    immigrationPrograms: [
      {
        name: "D7 Passive Income Visa",
        type: "pr",
        processingTime: "2-4 months",
        difficulty: 1,
        steps: ["Prove passive income", "Get NIF number", "Apply at consulate", "Receive residence permit"],
      },
      {
        name: "Digital Nomad Visa",
        type: "work",
        processingTime: "1-3 months",
        difficulty: 1,
        steps: ["Prove remote employment", "Show minimum income", "Apply for visa", "Live and work remotely"],
      },
    ],
    costBreakdown: { rent: 900, food: 280, transport: 50, taxes: 800, utilities: 120, entertainment: 100 },
  },
  {
    id: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    score: 88,
    salary: 56000,
    costOfLiving: 70,
    visaDifficulty: 2,
    population: "17.4M",
    languages: ["Dutch", "English"],
    currency: "EUR",
    gdp: "$1.01T",
    safetyScore: 83,
    healthcareQuality: 90,
    climate: "Maritime",
    description: "The Netherlands is known for its high English proficiency, bike-friendly cities, tech hub status, and the 30% ruling tax benefit.",
    immigrationPrograms: [
      {
        name: "Highly Skilled Migrant",
        type: "work",
        processingTime: "2-6 weeks",
        difficulty: 2,
        steps: ["Get job at recognized sponsor", "Employer applies for permit", "Receive residence permit", "Register at municipality"],
      },
      {
        name: "Orientation Year Visa",
        type: "work",
        processingTime: "1-2 months",
        difficulty: 1,
        steps: ["Graduate from Dutch or top-ranked university", "Apply within 3 years", "Search for employment", "Switch to work permit"],
      },
    ],
    costBreakdown: { rent: 1500, food: 380, transport: 100, taxes: 1400, utilities: 170, entertainment: 180 },
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    score: 85,
    salary: 72000,
    costOfLiving: 78,
    visaDifficulty: 3,
    population: "25.7M",
    languages: ["English"],
    currency: "AUD",
    gdp: "$1.55T",
    safetyScore: 80,
    healthcareQuality: 86,
    climate: "Varied",
    description: "Australia offers high salaries, outdoor lifestyle, and a points-based immigration system that values skilled workers.",
    immigrationPrograms: [
      {
        name: "Skilled Independent (189)",
        type: "pr",
        processingTime: "6-18 months",
        difficulty: 3,
        steps: ["Skills assessment", "Submit EOI", "Receive invitation", "Apply for PR visa"],
      },
      {
        name: "Employer Sponsored (482)",
        type: "work",
        processingTime: "1-4 months",
        difficulty: 2,
        steps: ["Get employer sponsorship", "Skills assessment", "Apply for visa", "Begin working"],
      },
    ],
    costBreakdown: { rent: 2000, food: 500, transport: 150, taxes: 1800, utilities: 180, entertainment: 220 },
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Asia",
    score: 83,
    salary: 68000,
    costOfLiving: 82,
    visaDifficulty: 2,
    population: "5.7M",
    languages: ["English", "Mandarin", "Malay", "Tamil"],
    currency: "SGD",
    gdp: "$397B",
    safetyScore: 94,
    healthcareQuality: 92,
    climate: "Tropical",
    description: "Singapore is Asia's premier business hub with world-class infrastructure, safety, and low tax rates for professionals.",
    immigrationPrograms: [
      {
        name: "Employment Pass",
        type: "work",
        processingTime: "3-8 weeks",
        difficulty: 2,
        steps: ["Get job offer", "Employer applies for EP", "Receive Employment Pass", "Register for FIN"],
      },
    ],
    costBreakdown: { rent: 2200, food: 400, transport: 100, taxes: 1100, utilities: 130, entertainment: 250 },
  },
];

export const cities: Record<string, string[]> = {
  canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
  portugal: ["Lisbon", "Porto", "Faro", "Braga", "Coimbra"],
  netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  singapore: ["Singapore"],
};
