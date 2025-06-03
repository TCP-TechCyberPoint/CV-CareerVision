import { useState } from "react";
import { HARD_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useSlideshowFormStore } from "../store";
import type { HardSkill, HardSkillCategory, SkillColor } from "../types/skills";

export const useHardSkills = () => {
  const { formData, updateFormData } = useSlideshowFormStore();
  const [selectedSkills, setSelectedSkills] = useState<HardSkill[]>(
    formData.hardSkills || []
  );
  const [expandedSkills, setExpandedSkills] = useState<HardSkillCategory[]>([]);

  const handleSkillClick = (skill: HardSkill | HardSkillCategory) => {
    const isMainCategory =
      HARD_SKILLS_HIERARCHY[skill as HardSkillCategory] !== undefined;

    if (isMainCategory) {
      const category = skill as HardSkillCategory;
      if (!expandedSkills.includes(category)) {
        setExpandedSkills((prev) => [...prev, category]);
      } else {
        setExpandedSkills((prev) => prev.filter((s) => s !== category));
      }
    } else {
      const individualSkill = skill as HardSkill;
      if (!selectedSkills.includes(individualSkill)) {
        const newSelectedSkills = [...selectedSkills, individualSkill];
        setSelectedSkills(newSelectedSkills);
        updateFormData({ hardSkills: newSelectedSkills });
      } else {
        const newSelectedSkills = selectedSkills.filter(
          (s) => s !== individualSkill
        );
        setSelectedSkills(newSelectedSkills);
        updateFormData({ hardSkills: newSelectedSkills });
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: HardSkill) => {
    const newSelectedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(newSelectedSkills);
    updateFormData({ hardSkills: newSelectedSkills });
  };

  const getNextSkills = (): HardSkill[] => {
    const next: HardSkill[] = [];
    expandedSkills.forEach((skill) => {
      const category = HARD_SKILLS_HIERARCHY[skill];
      if (category) {
        next.push(
          ...(category.skills.filter(
            (child) => !selectedSkills.includes(child as HardSkill)
          ) as HardSkill[])
        );
      }
    });
    return next;
  };

  const getColorScheme = (skill: HardSkill | HardSkillCategory): SkillColor => {
    const category = HARD_SKILLS_HIERARCHY[skill as HardSkillCategory];
    if (category) {
      return category.color;
    }

    for (const [_, categoryData] of Object.entries(HARD_SKILLS_HIERARCHY)) {
      if (categoryData.skills.some((s) => s === skill)) {
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
