# Global State Management

This directory contains the implementation of the global state management system using Redux Toolkit and RTK Query.

## Overview

The state management system is built with the following components:

- **Store Configuration**: Centralized Redux store with middleware for error handling, persistence, and analytics
- **API Integration**: RTK Query for handling API requests and caching
- **State Slices**: Separate slices for different domains (auth, projects, files, UI, settings)
- **Custom Hooks**: React hooks for accessing and modifying state
- **Middleware**: Error handling, persistence, and analytics middleware

## Directory Structure

```
lib/store/
├── api.ts                 # RTK Query API configuration
├── index.ts              # Store configuration
├── middleware/           # Custom middleware
│   ├── errorMiddleware.ts
│   ├── persistenceMiddleware.ts
│   └── analyticsMiddleware.ts
├── slices/              # Redux slices
│   ├── authSlice.ts
│   ├── projectSlice.ts
│   ├── fileSlice.ts
│   ├── uiSlice.ts
│   └── settingsSlice.ts
├── types/               # TypeScript types and interfaces
│   └── index.ts
└── hooks/              # Custom hooks
    ├── useAppState.ts
    ├── useAuth.ts
    ├── useProjects.ts
    ├── useFiles.ts
    ├── useUI.ts
    └── useSettings.ts
```

## Usage

### Store Setup

```typescript
import { store } from "./lib/store";
import { Provider } from "react-redux";

function App({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```

### Using Custom Hooks

```typescript
// Authentication
const { user, isAuthenticated, login, logout } = useAuth();

// Projects
const { projects, currentProject, createProject } = useProjects();

// Files
const { files, currentFile, uploadFile } = useFiles();

// UI
const { theme, showModal, showNotification } = useUI();

// Settings
const { settings, updateTranscriptionSettings } = useSettings();
```

### API Integration

```typescript
// Using RTK Query hooks
const { data: projects, isLoading } = api.useGetProjectsQuery();
const [createProject] = api.useCreateProjectMutation();
```

## State Structure

### Auth State

- User information
- Authentication status
- Tokens
- Loading and error states

### Project State

- List of projects
- Current project
- Filters and pagination
- Loading and error states

### File State

- List of files
- Current file
- Upload progress
- Metadata
- Filters and pagination
- Loading and error states

### UI State

- Theme configuration
- Language settings
- Modal state
- Notifications
- Sidebar state

### Settings State

- Transcription settings
- Playback settings
- Editor settings
- Keyboard shortcuts
- Notification preferences
- Privacy settings

## Best Practices

1. **Use Custom Hooks**: Always use the provided custom hooks instead of directly accessing the store
2. **Type Safety**: Leverage TypeScript types for better type safety and developer experience
3. **Error Handling**: Use the error middleware for consistent error handling
4. **State Persistence**: Use the persistence middleware for saving state to localStorage
5. **Analytics**: The analytics middleware automatically tracks important actions

## Migration Guide

1. Replace Context API usage with Redux store
2. Update components to use custom hooks
3. Migrate API calls to RTK Query
4. Update type definitions
5. Test thoroughly

## Contributing

1. Follow the established patterns
2. Add proper TypeScript types
3. Include tests for new functionality
4. Update documentation as needed

## Troubleshooting

### Common Issues

1. **State Not Updating**

   - Check if you're using the correct hook
   - Verify the action is being dispatched
   - Check the Redux DevTools for state changes

2. **API Errors**

   - Check the error middleware logs
   - Verify API endpoint configuration
   - Check network requests in browser dev tools

3. **Performance Issues**
   - Use React DevTools to check for unnecessary re-renders
   - Verify selector memoization
   - Check for large state updates
