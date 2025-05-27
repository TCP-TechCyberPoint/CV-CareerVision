import { useNavigate, useParams } from "react-router-dom";
import { slideMap } from "./constants/slides-map";
import {
  StepIntro,
  StepVitals,
  StepHardSkills,
  StepSoftSkills,
  StepEducation,
  StepProjects,
  StepEnd,
} from "./steps";
import { useSlideshowFormStore } from "./store";
import StepExperience from "./steps/StepExperience";

const slideComponents = {
  intro: StepIntro,
  vitals: StepVitals,
  hardSkills: StepHardSkills,
  softSkills: StepSoftSkills,
  education: StepEducation,
  experience: StepExperience,
  projects: StepProjects,
  end: StepEnd,
};

const SlideshowForm = () => {
  const { step = "intro" } = useParams<{ step: keyof typeof slideMap }>();
  const navigate = useNavigate();

  const currentIndex = slideMap[step];
  const entries = Object.entries(slideMap);
  const { formData } = useSlideshowFormStore();

  const nextStep = () => {
    const nextEntry = entries.find(([, i]) => i === currentIndex + 1);
    if (nextEntry) navigate(`/create-cv/${nextEntry[0]}`);
  };

  const prevStep = () => {
    const prevEntry = entries.find(([, i]) => i === currentIndex - 1);
    if (prevEntry) navigate(`/create-cv/${prevEntry[0]}`);
  };

  const Component = slideComponents[step] || (() => <div>Step not found</div>);
  console.log("formData", formData);

  return <Component nextStep={nextStep} prevStep={prevStep} />;
};

export default SlideshowForm;
