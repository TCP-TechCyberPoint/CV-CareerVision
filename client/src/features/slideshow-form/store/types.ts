export interface Slide {
    id: number;
    imageUrl: string;
    name: string;
    age: number;
    skills: string[];
    caption?: string;
  }

  export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
  }
  

  export interface SlideshowFormData {
    name: string;
    age?: number;
    gender?: Gender;
    email?: string;
    skills?: string[];
    description?: string;
    slides?: Slide[];
    softSkills?: string[];
    hardSkills?: string[];
  }

  export interface SlideshowState {
    slides: Slide[];
    currentIndex: number;
    isPlaying: boolean;
    meta: SlideshowFormData;
  }
  
  export interface SlideshowActions {
    nextSlide: () => void;
    prevSlide: () => void;
    setSlides: (slides: Slide[]) => void;
    togglePlay: () => void;
    setMeta: (meta: SlideshowFormData) => void;
  }
  
export type StepVitalsFields = Pick<SlideshowFormData, 'name' | 'age' | 'gender' | 'email'>;
export type StepSkillsFields = Pick<SlideshowFormData, 'skills'>;
