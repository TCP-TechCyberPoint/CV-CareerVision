# Slideshow Form Routes

This directory contains all routing configuration for the slideshow form feature, organized using feature-based routing architecture.

## Structure

```
routes/
├── slideshowRoutes.tsx    # Main route definitions
├── index.ts              # Route exports
└── README.md            # This documentation
```

## Route Organization

### Dashboard Route
- **Path**: `/dashboard`
- **Component**: `Dashboard`
- **Purpose**: Main landing page with section cards overview, progress bar, and sidebar navigation

### Create CV Routes
- **Base Path**: `/create-cv`
- **Step Paths**: `/create-cv/{step}` (dynamically generated)
- **Component**: `SlideshowForm`
- **Purpose**: Step-by-step form completion

### Available Steps
Generated dynamically from `slideMap`:
- `/create-cv/intro`
- `/create-cv/vitals` 
- `/create-cv/hardSkills`
- `/create-cv/softSkills`
- `/create-cv/education`
- `/create-cv/experience`
- `/create-cv/projects`
- `/create-cv/preferences`
- `/create-cv/end`

## Utility Functions

### `getStepPath(step)`
Returns the full path for a given step.
```tsx
getStepPath('vitals') // Returns: '/create-cv/vitals'
```

### `getSectionStepPath(section)`
Maps dashboard section names to their corresponding step paths.
```tsx
getSectionStepPath('vitals') // Returns: '/create-cv/vitals'
```

### `SLIDESHOW_PATHS`
Constant object containing all route paths:
```tsx
SLIDESHOW_PATHS.DASHBOARD      // '/dashboard'
SLIDESHOW_PATHS.CREATE_CV      // '/create-cv'
SLIDESHOW_PATHS.STEPS.VITALS   // '/create-cv/vitals'
```

## Navigation Flow

1. **Dashboard**: User sees overview of all sections with completion status
2. **Section Cards**: Clicking any card navigates to its corresponding step
3. **Sidebar Navigation**: Shows all sections with completion badges
4. **Step Navigation**: Next/Previous buttons within forms
5. **Route Guards**: Can be added for completion requirements

## Integration Points

### Section Cards
Each dashboard section card uses `getSectionStepPath()` for navigation:
```tsx
const handleClick = () => {
  navigate(getSectionStepPath("vitals"));
};
```

### Sidebar Navigation
Uses route constants for consistent navigation:
```tsx
path: getSectionStepPath("vitals"),
```

### SlideshowForm
Handles step parameters and component rendering:
```tsx
const { step = "intro" } = useParams();
const Component = slideComponents[step];
```

## Benefits

1. **Centralized**: All routes defined in one feature directory
2. **Type Safe**: TypeScript integration with slideMap
3. **Dynamic**: Routes generated automatically from step definitions
4. **Maintainable**: Easy to add/remove steps
5. **Consistent**: Single source of truth for all paths
6. **Scalable**: Easy to extend with additional route groups

## Adding New Steps

1. Add to `slideMap` in `constants/slides-map.ts`
2. Create step component in `steps/`
3. Add to `slideComponents` in `SlideshowForm.tsx`
4. Routes are generated automatically!

## Future Enhancements

- Route guards for step completion requirements
- Dynamic route parameters for edit modes
- Nested routes for sub-sections
- Route-based state management integration 