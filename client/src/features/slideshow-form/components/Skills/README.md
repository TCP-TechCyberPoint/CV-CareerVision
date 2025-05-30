# Skills Components

This folder contains reusable components for handling skills selection in the slideshow form. The components have been modularized to promote reusability and maintainability.

## Components Overview

### Core Components

#### `SkillsStep`
The main component that combines all other skills components. This is the primary component you should use for creating skills selection steps.

**Props:**
- `title`: The main heading text
- `subtitle`: The subtitle text below the heading
- `gradientColors`: CSS gradient string for the title
- `cardTitle`: Title for the selection card
- `categories`: Array of skill categories
- `selectedSkills`: Array of currently selected skills
- `expandedSkills`: Array of expanded skill categories
- `nextSkills`: Array of subcategory skills to display
- `onSkillClick`: Function to handle skill selection
- `onRemoveSkill`: Function to handle skill removal
- `getColorScheme`: Function to get color scheme for skills
- `nextStep`: Function to navigate to next step
- `prevStep`: Function to navigate to previous step
- `useHardSkillsAnimation`: Boolean to control animation style

#### `SkillsContainer`
Provides the main layout and structure for skills steps.

#### `SkillsSelectionCard`
A card wrapper for the skills selection interface.

#### `SkillTag`
Individual skill tag component with animations and interactions.

#### `SkillCategoriesSection`
Displays the main skill categories.

#### `SkillSubcategoriesSection`
Displays subcategory skills when categories are expanded.

#### `SelectedSkillsSection`
Shows the summary of selected skills with removal functionality.

## Usage Example

```tsx
import { SkillsStep } from "../components";

const MySkillsStep = ({ nextStep, prevStep }) => {
  const {
    selectedSkills,
    expandedSkills,
    handleSkillClick,
    handleRemoveSkill,
    getNextSkills,
    getColorScheme,
  } = useMySkillsHook();

  return (
    <SkillsStep
      title="My Skills"
      subtitle="Select your skills"
      gradientColors="linear(to-r, teal.400, blue.500)"
      cardTitle="Choose your competencies"
      categories={Object.keys(MY_SKILLS_HIERARCHY)}
      selectedSkills={selectedSkills}
      expandedSkills={expandedSkills}
      nextSkills={getNextSkills()}
      onSkillClick={handleSkillClick}
      onRemoveSkill={handleRemoveSkill}
      getColorScheme={getColorScheme}
      nextStep={nextStep}
      prevStep={prevStep}
      useHardSkillsAnimation={true}
    />
  );
};
```

## Animation Differences

- **Hard Skills**: Uses framer-motion animations (set `useHardSkillsAnimation={true}`)
- **Soft Skills**: Uses Chakra UI transitions (set `useHardSkillsAnimation={false}`)

## Benefits

1. **Reusability**: Components can be used for different types of skills
2. **Maintainability**: Changes to UI/UX can be made in one place
3. **Consistency**: Ensures consistent behavior across different skill types
4. **Modularity**: Each component has a single responsibility
5. **Type Safety**: Proper TypeScript interfaces for all components 