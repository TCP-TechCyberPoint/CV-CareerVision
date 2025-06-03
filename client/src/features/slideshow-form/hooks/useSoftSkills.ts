import { useState } from "react";
import { SOFT_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useSlideshowFormStore } from "../store";
import type { SoftSkill, SoftSkillCategory, SkillColor } from "../types/skills";

export const useSoftSkills = () => {
  const { formData, updateFormData } = useSlideshowFormStore();
  const [selectedSkills, setSelectedSkills] = useState<SoftSkill[]>(
    formData.softSkills || []
  );
  const [expandedSkills, setExpandedSkills] = useState<SoftSkillCategory[]>([]);

  const handleSkillClick = (skill: SoftSkill | SoftSkillCategory) => {
    const isMainCategory =
      SOFT_SKILLS_HIERARCHY[skill as SoftSkillCategory] !== undefined;

    if (isMainCategory) {
      const category = skill as SoftSkillCategory;
      if (!expandedSkills.includes(category)) {
        setExpandedSkills((prev) => [...prev, category]);
      } else {
        setExpandedSkills((prev) => prev.filter((s) => s !== category));
      }
    } else {
      const individualSkill = skill as SoftSkill;
      if (!selectedSkills.includes(individualSkill)) {
        const newSelectedSkills = [...selectedSkills, individualSkill];
        setSelectedSkills(newSelectedSkills);
        updateFormData({ softSkills: newSelectedSkills });
      } else {
        const newSelectedSkills = selectedSkills.filter(
          (s) => s !== individualSkill
        );
        setSelectedSkills(newSelectedSkills);
        updateFormData({ softSkills: newSelectedSkills });
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: SoftSkill) => {
    const newSelectedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(newSelectedSkills);
    updateFormData({ softSkills: newSelectedSkills });
  };

  const getNextSkills = (): SoftSkill[] => {
    const next: SoftSkill[] = [];
    expandedSkills.forEach((skill) => {
      const category = SOFT_SKILLS_HIERARCHY[skill];
      if (category) {
        next.push(
          ...(category.skills.filter(
            (child) => !selectedSkills.includes(child as SoftSkill)
          ) as SoftSkill[])
        );
      }
    });
    return next;
  };

  const getColorScheme = (skill: SoftSkill | SoftSkillCategory): SkillColor => {
    const category = SOFT_SKILLS_HIERARCHY[skill as SoftSkillCategory];
    if (category) {
      return category.color;
    }

    for (const [_, categoryData] of Object.entries(SOFT_SKILLS_HIERARCHY)) {
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
