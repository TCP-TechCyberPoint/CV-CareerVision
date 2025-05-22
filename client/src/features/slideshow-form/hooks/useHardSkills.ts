import { useState } from "react";
import { HARD_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useSlideshowFormStore } from "../store/store";

export const useHardSkills = () => {
    const { formData, updateFormData } = useSlideshowFormStore();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(formData.hardSkills || []);
  const [expandedSkills, setExpandedSkills] = useState<string[]>([]);

  const handleSkillClick = (skill: string) => {
    const isMainCategory = HARD_SKILLS_HIERARCHY[skill as keyof typeof HARD_SKILLS_HIERARCHY] !== undefined;
    
    if (isMainCategory) {
      if (!expandedSkills.includes(skill)) {
        setExpandedSkills((prev) => [...prev, skill]);
      } else {
        setExpandedSkills((prev) => prev.filter((s) => s !== skill));
      }
    } else {
      if (!selectedSkills.includes(skill)) {
        const newSelectedSkills = [...selectedSkills, skill];
        setSelectedSkills(newSelectedSkills);
        updateFormData({ hardSkills: newSelectedSkills });
      } else {
        const newSelectedSkills = selectedSkills.filter((s) => s !== skill);
        setSelectedSkills(newSelectedSkills);
        updateFormData({ hardSkills: newSelectedSkills });
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSelectedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    setSelectedSkills(newSelectedSkills);
    updateFormData({ hardSkills: newSelectedSkills });
  };

  const getNextSkills = () => {
    const next: string[] = [];
    expandedSkills.forEach((skill) => {
      const category = HARD_SKILLS_HIERARCHY[skill as keyof typeof HARD_SKILLS_HIERARCHY];
      if (category) {
        next.push(...category.skills.filter((child: string) => !selectedSkills.includes(child)));
      }
    });
    return next;
  };

  const getColorScheme = (skill: string) => {
    const category = HARD_SKILLS_HIERARCHY[skill as keyof typeof HARD_SKILLS_HIERARCHY];
    if (category) {
      return category.color;
    }
    
    for (const [_, categoryData] of Object.entries(HARD_SKILLS_HIERARCHY)) {
      if (categoryData.skills.some((s: string) => s === skill)) {
        return categoryData.color;
      }
    }
    
    return "gray";
  };

  return {
    selectedSkills,
    expandedSkills,
    handleSkillClick,
    handleRemoveSkill,
    getNextSkills,
    getColorScheme,
  };
}; 