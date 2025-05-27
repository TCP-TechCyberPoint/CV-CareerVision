export enum CvStyle {
  Minimal = "minimal",
  Creative = "creative",
  Corporate = "corporate",
}

export enum CvPurpose {
  JobHunt = "job hunt",
  Freelance = "freelance",
  Portfolio = "portfolio",
  CareerChange = "career change",
  Networking = "networking",
  AcademicApplication = "academic application",
}

export enum ProfessionalPreference {
  FullstackDeveloper = "fullstack developer",
  FrontendDeveloper = "frontend developer",
  BackendDeveloper = "backend developer",
  MobileDeveloper = "mobile developer",
  DevOpsEngineer = "DevOps engineer",
  DataScientist = "data scientist",
  DataAnalyst = "data analyst",
  MachineLearningEngineer = "machine learning engineer",
  ProductManager = "product manager",
  ProjectManager = "project manager",
  UIUXDesigner = "UI/UX designer",
  QAEngineer = "QA engineer",
  SecurityEngineer = "security engineer",
  CISO = "CISO",
  ITSystemAdmin = "IT system administrator",
  CloudArchitect = "cloud architect",
  SoftwareArchitect = "software architect",
  TechnicalLead = "technical lead",
  EngineeringManager = "engineering manager",
}

export enum ExperienceLevel {
  Entry = "entry level (0-2 years)",
  Junior = "junior (2-4 years)",
  Mid = "mid-level (4-7 years)",
  Senior = "senior (7-10 years)",
  Lead = "lead/principal (10+ years)",
  Executive = "executive/C-level",
}

export enum Industry {
  All = "all industries",
  Technology = "technology",
  Finance = "finance",
  Healthcare = "healthcare",
  Education = "education",
  Ecommerce = "e-commerce",
  Gaming = "gaming",
  Fintech = "fintech",
  Startup = "startup",
  Enterprise = "enterprise",
  Government = "government",
  NonProfit = "non-profit",
  Consulting = "consulting",
  Media = "media",
  Automotive = "automotive",
  Other = "other",
}

export enum SalaryRange {
  NotSpecified = "prefer not to specify",
  Under50k = "under $50,000",
  Range50to70k = "$50,000 - $70,000",
  Range70to100k = "$70,000 - $100,000",
  Range100to150k = "$100,000 - $150,000",
  Range150to200k = "$150,000 - $200,000",
  Over200k = "over $200,000",
}

export interface Preferences {
  cvStyle: CvStyle;
  cvPurpose: CvPurpose;
  professionalPreference: ProfessionalPreference;
  experienceLevel: ExperienceLevel;
  industryPreference: Industry;
  targetSalaryRange: SalaryRange;
}
