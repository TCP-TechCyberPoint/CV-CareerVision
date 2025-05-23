import { useNavigate, useParams } from "react-router-dom";
import { slideMap } from "./constants/slides-map";
import { StepIntro, StepVitals, StepHardSkills, StepSoftSkills, StepEducation, StepEnd } from "./steps";

const slideComponents = {
  intro: StepIntro,
  vitals: StepVitals,
  hardSkills: StepHardSkills,
  softSkills: StepSoftSkills,
  education: StepEducation,
  end: StepEnd,
 
};

const SlideshowForm = () => {
  const { step = "intro" } = useParams<{ step: keyof typeof slideMap }>();
  const navigate = useNavigate();

  const currentIndex = slideMap[step];
  const entries = Object.entries(slideMap);

  const nextStep = () => {
    const nextEntry = entries.find(([, i]) => i === currentIndex + 1);
    if (nextEntry) navigate(`/create-cv/${nextEntry[0]}`);
  };

  const prevStep = () => {
    const prevEntry = entries.find(([, i]) => i === currentIndex - 1);
    if (prevEntry) navigate(`/create-cv/${prevEntry[0]}`);
  };

  const Component = slideComponents[step] || (() => <div>Step not found</div>);

  return <Component nextStep={nextStep} prevStep={prevStep} />;
};

export default SlideshowForm;
