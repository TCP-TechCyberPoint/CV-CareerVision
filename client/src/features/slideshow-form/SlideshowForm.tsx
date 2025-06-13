import { useNavigate, useParams } from "react-router-dom";
import { slideMap } from "./constants/slides-map";
import {
  StepIntro,
  StepVitals,
  StepHardSkills,
  StepSoftSkills,
  StepEducation,
  StepProjects,
  StepPreferences,
  StepEnd,
} from "./steps";
import { useSlideshowFormStore } from "./store";
import StepExperience from "./steps/StepExperience";
import { CriticalErrorBoundary } from "@/components/shared/ErrorBoundary";
import cvService, {
  type SectionName,
  type SectionData,
} from "./services/cvService";

const slideComponents = {
  intro: StepIntro,
  vitals: StepVitals,
  hardSkills: StepHardSkills,
  softSkills: StepSoftSkills,
  education: StepEducation,
  experience: StepExperience,
  projects: StepProjects,
  preferences: StepPreferences,
  end: StepEnd,
};

const SlideshowForm = () => {
  const { step = "intro" } = useParams<{ step: keyof typeof slideMap }>();
  const navigate = useNavigate();
  const currentIndex = slideMap[step];

  const entries = Object.entries(slideMap);

  const nextStep = async () => {
    // Get fresh data from the store
    const freshData = useSlideshowFormStore.getState().formData;
    
    // Save current step data before moving to next
    if (step !== "intro" && step !== "end") {
      const sectionData = freshData[step as keyof typeof freshData];
      if (sectionData) {
        await cvService.saveSection(
          step as SectionName,
          sectionData as SectionData
        );
      }
    }

    const nextEntry = entries.find(([, i]) => i === currentIndex + 1);
    if (nextEntry) navigate(`/create-cv/${nextEntry[0]}`);
  };

  const prevStep = () => {
    const prevEntry = entries.find(([, i]) => i === currentIndex - 1);
    if (prevEntry) navigate(`/create-cv/${prevEntry[0]}`);
  };

  const Component = slideComponents[step] || (() => <div>Step not found</div>);

  return (
    <CriticalErrorBoundary>
      <Component nextStep={nextStep} prevStep={prevStep} />
    </CriticalErrorBoundary>
  );
};

export default SlideshowForm;
