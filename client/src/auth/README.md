# Authentication Module

This module provides a clean, organized authentication system using Auth0 with optimized performance and better separation of concerns.

## Structure

```
auth/
├── constants.ts           # All authentication constants
├── types.ts              # TypeScript type definitions
├── index.ts              # Main module exports
├── components/           # Authentication components
│   ├── Login.tsx
│   ├── ProtectedRoute.tsx
│   └── index.ts
├── hooks/               # Authentication hooks
│   ├── useAuth0Core.ts
│   ├── useAuth0Integration.ts
│   ├── useAppInit.ts
│   └── index.ts
├── services/            # API services
│   └── api.ts
└── utils/              # Utility functions
    ├── storage.ts
    ├── timeout.ts
    ├── auth-helpers.ts
    └── index.ts
```

## Key Features

### 1. **Constants Management** (`constants.ts`)
- Centralized all authentication constants
- Easy to modify timeouts, cookie settings, and error messages
- Type-safe constants with `as const`

### 2. **Storage Utilities** (`utils/storage.ts`)
- Handles cookies, localStorage, and sessionStorage
- Secure token and user data management
- Automatic cleanup on user changes

### 3. **Timeout Management** (`utils/timeout.ts`)
- Consistent Auth0 loading timeout handling
- Reusable timeout hook and utility functions
- Prevents unnecessary loading states

### 4. **Auth Helpers** (`utils/auth-helpers.ts`)
- User conversion and validation
- Authentication state checks
- Auth0 parameter management

### 5. **Core Auth0 Hook** (`hooks/useAuth0Core.ts`)
- Handles all Auth0 integration logic
- Token management and user synchronization
- Error handling and cleanup

### 6. **Public Auth Hook** (`hooks/useAuth0Integration.ts`)
- Clean public API for components
- Optimized loading state calculations
- Simplified authentication checks

### 7. **App Initialization** (`hooks/useAppInit.ts`)
- Handles application startup
- Form data initialization
- Loading state management

### 8. **API Service** (`services/api.ts`)
- Axios interceptors for authentication
- Automatic token injection
- Error handling and cleanup

## Usage

### Basic Authentication
```typescript
import { useAuth0Integration } from '@/auth';

const MyComponent = () => {
  const { isAuthenticated, user, isLoading, loginWithAuth0, logout } = useAuth0Integration();
  
  // Your component logic
};
```

### Protected Routes
```typescript
import { ProtectedRoute } from '@/auth';

const App = () => (
  <ProtectedRoute>
    <MyProtectedComponent />
  </ProtectedRoute>
);
```

### App Initialization
```typescript
import { useAppInit } from '@/auth';

const App = () => {
  const { isLoading, loadingStep } = useAppInit();
  
  if (isLoading) {
    return <Loading message={loadingStep} />;
  }
  
  return <RouterProvider router={router} />;
};
```

## Benefits

1. **Better Organization**: Clear separation of concerns with dedicated files for each responsibility
2. **Reusability**: Utility functions and hooks can be easily reused
3. **Maintainability**: Constants are centralized and easy to modify
4. **Performance**: Optimized loading states and timeout handling
5. **Type Safety**: Full TypeScript support with proper type definitions
6. **Security**: Proper token cleanup and user change detection
7. **Backward Compatibility**: Legacy exports maintained for existing code

## Migration

The new structure maintains backward compatibility through the main `index.ts` file. Existing imports should continue to work:

```typescript
// These still work:
import { useAuth0Integration } from '@/auth/useAuth0Integration';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import Login from '@/auth/Login';

// But you can also use the new structure:
import { useAuth0Integration, ProtectedRoute, Login } from '@/auth';
``` 