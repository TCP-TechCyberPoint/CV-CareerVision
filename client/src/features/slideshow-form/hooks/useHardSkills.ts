import { useState } from "react";
import { HARD_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useSlideshowFormStore } from "../store";
import type { HardSkill, HardSkillCategory, SkillColor } from "../types/skills";

type HardSkillsState = { [key: string]: HardSkill[] };

// Helper functions
const findCategoryForSkill = (skill: string): HardSkillCategory | undefined => {
  return Object.entries(HARD_SKILLS_HIERARCHY).find(([, data]) => 
    (data.skills as readonly string[]).includes(skill)
  )?.[0] as HardSkillCategory;
};

const updateSkillsState = (
  currentSkills: HardSkillsState,
  category: HardSkillCategory,
  skill: HardSkill,
  shouldAdd: boolean
): HardSkillsState => {
  const currentCategorySkills = currentSkills[category] || [];
  let newCategorySkills: HardSkill[];

  if (shouldAdd) {
    newCategorySkills = [...currentCategorySkills, skill];
  } else {
    // * Remove skill from current category
    newCategorySkills = currentCategorySkills.filter(s => s !== skill);
  }

  const newSkills = { ...currentSkills };
  // * If no skills in category, delete the category
  if (newCategorySkills.length === 0) {
    delete newSkills[category];
  } else {
    newSkills[category] = newCategorySkills;
  }

  return newSkills;
};

export const useHardSkills = () => {
  // Initialize state from store
  const storeHardSkills = useSlideshowFormStore(
    (state) => state.formData.hardSkills
  ) as unknown as HardSkillsState;

  const [selectedSkills, setSelectedSkills] = useState<HardSkillsState>(
    Object.entries(storeHardSkills || {}).reduce((acc, [category, skills]) => {
      if (Array.isArray(skills) && skills.length > 0) {
        acc[category] = skills;
      }
      return acc;
    }, {} as HardSkillsState)
  );

  const [expandedSkills, setExpandedSkills] = useState<HardSkillCategory[]>([]);
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  // Toggle category expansion
  const toggleCategory = (category: HardSkillCategory) => {
    setExpandedSkills(prev => 
      prev.includes(category)
        ? prev.filter(s => s !== category)
        : [...prev, category]
    );
  };

  // Handle skill selection/deselection
  const handleSkillClick = (skill: string) => {
    const isMainCategory = Object.keys(HARD_SKILLS_HIERARCHY).includes(skill.toLowerCase());

    if (isMainCategory) {
      toggleCategory(skill.toLowerCase() as HardSkillCategory);
      return;
    }

    const category = findCategoryForSkill(skill);
    if (!category) return;

    const isSkillSelected = selectedSkills[category]?.includes(skill as HardSkill);
    const newSkills = updateSkillsState(
      selectedSkills,
      category,
      skill as HardSkill,
      !isSkillSelected
    );

    setSelectedSkills(newSkills);
    updateFormData({ hardSkills: newSkills });
  };

  // Handle skill removal
  const handleRemoveSkill = (skillToRemove: string) => {
    const category = findCategoryForSkill(skillToRemove);
    if (!category) return;

    const newSkills = updateSkillsState(
      selectedSkills,
      category,
      skillToRemove as HardSkill,
      false
    );

    setSelectedSkills(newSkills);
    updateFormData({ hardSkills: newSkills });
  };

  // Get available skills for expanded categories
  const getNextSkills = (): HardSkill[] => {
    return expandedSkills.flatMap(category => {
      const categoryData = HARD_SKILLS_HIERARCHY[category.toLowerCase() as keyof typeof HARD_SKILLS_HIERARCHY];
      if (!categoryData) return [];
      
      const selectedCategorySkills = selectedSkills[category] || [];
      return categoryData.skills.filter(
        (skill: string) => !selectedCategorySkills.includes(skill as HardSkill)
      ) as HardSkill[];
    });
  };

  // Get color scheme for a skill
  const getColorScheme = (skill: string): SkillColor => {
    // Check if it's a category
    const categoryData = HARD_SKILLS_HIERARCHY[skill.toLowerCase() as keyof typeof HARD_SKILLS_HIERARCHY];
    if (categoryData) return categoryData.color;

    // Find category for skill
    const category = findCategoryForSkill(skill);
    return category ? HARD_SKILLS_HIERARCHY[category.toLowerCase() as keyof typeof HARD_SKILLS_HIERARCHY].color : "gray";
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
