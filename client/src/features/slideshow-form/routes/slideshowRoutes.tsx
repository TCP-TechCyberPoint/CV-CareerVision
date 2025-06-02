import type { RouteObject } from "react-router-dom";
import SlideshowForm from "../SlideshowForm";
import Dashboard from "../Dashboard";
import { slideMap } from "../constants/slides-map";

export const slideshowRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/create-cv/:step",
    element: <SlideshowForm />,
  },
  {
    path: "/create-cv",
    element: <SlideshowForm />, // Default to intro step
  },
];

// Export route paths for easy navigation
export const SLIDESHOW_PATHS = {
  DASHBOARD: "/dashboard",
  CREATE_CV: "/create-cv",
  // Generate step paths dynamically
  STEPS: Object.keys(slideMap).reduce((acc, stepKey) => {
    acc[stepKey.toUpperCase() as keyof typeof acc] = `/create-cv/${stepKey}`;
    return acc;
  }, {} as Record<string, string>),
} as const;

// Helper function to get step path
export const getStepPath = (step: keyof typeof slideMap) => `/create-cv/${step}`;

// Helper function to navigate from dashboard cards
export const getSectionStepPath = (section: string) => {
  // Map dashboard sections to their corresponding steps
  const sectionToStepMap: Record<string, keyof typeof slideMap> = {
    vitals: 'vitals',
    hardSkills: 'hardSkills', 
    softSkills: 'softSkills',
    education: 'education',
    experience: 'experience',
    projects: 'projects',
    preferences: 'preferences',
  };
  
  const step = sectionToStepMap[section];
  return step ? getStepPath(step) : SLIDESHOW_PATHS.CREATE_CV;
}; 