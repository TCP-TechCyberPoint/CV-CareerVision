# Card Components Architecture

This folder contains the shared card components and utilities for consistent styling across the slideshow form application.

## Components

### BaseCard
The foundational card component that provides shared styling and structure for all card types.

**Props:**
- `variant`: 'navigation' | 'form' - Determines the card's purpose and styling
- `themeColor`: string - Color scheme for the card (default: 'gray')
- `onClick`: function - Click handler for navigation cards
- `children`: ReactNode - Card content

**Usage:**
```tsx
import { BaseCard } from './cards';

<BaseCard variant="navigation" themeColor="blue" onClick={handleClick}>
  <YourContent />
</BaseCard>
```

### SectionCard
Enhanced navigation card for dashboard sections with completion tracking and custom content.

**Props:**
- `title`: string - Card title
- `icon`: ReactNode - Icon component
- `description`: string - Card description
- `completion`: number - Completion percentage (0-100)
- `themeColor`: string - Color scheme
- `customContent`: ReactNode - Custom content to display
- `footer`: string - Footer text
- `isBasic`: boolean - Use simple layout

**Usage:**
```tsx
import { SectionCard } from './cards';

<SectionCard
  title="Hard Skills"
  icon={<FiCode />}
  completion={75}
  themeColor="purple"
  customContent={<SkillsList />}
/>
```

## Styling Utilities

### cardStyles.ts
Contains shared styling utilities:

- `cardBaseStyles`: Base styles applied to all cards
- `cardVariantStyles`: Variant-specific styles (navigation vs form)
- `getCardColors()`: Function to get color styles based on variant and theme
- `cardContentStyles`: Content padding styles

## Architecture Benefits

1. **Consistency**: All cards share the same base styling and behavior
2. **Flexibility**: Different variants for different use cases
3. **Maintainability**: Single source of truth for card styling
4. **Reusability**: Easy to create new card types using BaseCard
5. **Theme Support**: Consistent color theming across all cards

## Card Types

### Navigation Cards (variant="navigation")
- Used in dashboard for section navigation
- Hover effects with transform and shadow
- Click handlers for navigation
- Examples: SectionCard, dashboard section cards

### Form Cards (variant="form")
- Used in forms for input grouping
- Subtle background colors
- Less prominent hover effects
- Examples: ProjectStepForm, form field groups

## Creating New Card Types

To create a new card component:

1. Import BaseCard
2. Choose appropriate variant
3. Add your custom content and props
4. Export from index.ts

```tsx
import BaseCard from './BaseCard';

const MyCustomCard = ({ title, content, ...props }) => (
  <BaseCard variant="navigation" themeColor="green" {...props}>
    <h3>{title}</h3>
    <div>{content}</div>
  </BaseCard>
);
``` 