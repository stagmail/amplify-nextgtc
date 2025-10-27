# Development Guidelines

## Code Quality Standards

### File Structure and Naming
- **Component Files**: Use PascalCase for React components (e.g., `TableToHomeController.tsx`, `NavbarController.tsx`)
- **Utility Files**: Use camelCase for utility files (e.g., `utils.js`)
- **GraphQL Files**: Use lowercase with descriptive names (e.g., `mutations.ts`, `queries.ts`)
- **File Extensions**: Use `.tsx` for React components with TypeScript, `.ts` for TypeScript utilities, `.js` for JavaScript utilities

### Import Organization
- **Client Directive**: Always use `'use client'` at the top of client-side React components
- **React Imports**: Import React hooks and utilities first
- **Third-party Libraries**: Import external libraries after React imports
- **AWS Amplify**: Import Amplify utilities and types together
- **Local Imports**: Import local components and utilities last
- **CSS Imports**: Import CSS files after component imports

### TypeScript Patterns
- **Type Definitions**: Use Schema types from Amplify data resource: `Schema["ModelName"]["type"]`
- **Generic Types**: Properly type arrays and sets: `Array<Schema["TransportToHome"]["type"]>`, `Set<string>`
- **Function Parameters**: Always type function parameters and return types
- **Props Interface**: Define props interfaces for components with optional properties using `?`

## Component Architecture

### React Component Structure
- **Functional Components**: Use arrow function syntax for component exports
- **State Management**: Use `useState` with proper TypeScript typing
- **Effect Hooks**: Use `useEffect` for data fetching and subscriptions
- **Custom Hooks**: Extract reusable logic into custom hooks when appropriate

### AWS Amplify Integration
- **Client Generation**: Use `generateClient<Schema>()` pattern for type-safe API calls
- **Configuration**: Configure Amplify with `Amplify.configure(outputs)` in components
- **Data Operations**: Use `client.models.ModelName.observeQuery()` for real-time data
- **CRUD Operations**: Use `client.models.ModelName.create/update/delete()` methods

### State Management Patterns
- **Local State**: Use `useState` for component-specific state
- **Derived State**: Calculate derived values in render function or useMemo
- **Selection State**: Use `Set<string>` for multi-selection functionality
- **Loading States**: Implement loading states for async operations

## Styling and UI Patterns

### Tailwind CSS Usage
- **Responsive Design**: Use responsive prefixes (`sm:`, `md:`, `lg:`)
- **Color Scheme**: Use consistent color palette (slate, teal, amber for branding)
- **Spacing**: Use consistent spacing classes (`px-4`, `py-2`, `gap-2`)
- **Typography**: Use consistent text sizing (`text-sm`, `text-[.9rem]`)

### Component Styling
- **Button Styles**: Consistent button styling with hover states and disabled states
- **Table Styling**: Use `divide-y divide-gray-300` for table borders
- **Form Elements**: Consistent form input styling with border and padding
- **Status Indicators**: Use colored badges for status display

### Theme Configuration
- **AWS Amplify Theme**: Define custom themes with tokens for colors and components
- **Brand Colors**: Use consistent brand colors across the application
- **Component Theming**: Override default Amplify component styles through theme tokens

## Data Handling Patterns

### GraphQL Operations
- **Auto-generated Files**: Use generated GraphQL mutations, queries, and subscriptions
- **Type Safety**: Leverage TypeScript types from generated schema
- **Error Handling**: Implement proper error handling for GraphQL operations
- **Real-time Updates**: Use `observeQuery()` for real-time data synchronization

### Form Handling
- **Controlled Components**: Use controlled form inputs with state
- **Validation**: Implement client-side validation before submission
- **User Feedback**: Provide user feedback for form operations (success/error messages)
- **Form Fields**: Use consistent form field configuration patterns

### Data Transformation
- **Date Formatting**: Use consistent date/time formatting across the application
- **Data Mapping**: Transform API data for display purposes
- **Filtering and Sorting**: Implement client-side data manipulation when appropriate

## Security and Best Practices

### Authentication
- **AWS Amplify Auth**: Use Amplify Authenticator component for authentication
- **Protected Routes**: Implement authentication checks for protected pages
- **User Context**: Pass user information through component props
- **Sign Out**: Implement proper sign-out functionality

### Error Handling
- **Try-Catch Blocks**: Wrap async operations in try-catch blocks
- **User Feedback**: Display meaningful error messages to users
- **Console Logging**: Use console.error for debugging purposes
- **Graceful Degradation**: Handle missing or undefined data gracefully

### Performance Optimization
- **React Optimization**: Use useCallback and useMemo for expensive operations
- **Data Fetching**: Implement efficient data fetching patterns
- **Component Optimization**: Avoid unnecessary re-renders through proper state management
- **Bundle Optimization**: Use dynamic imports for code splitting when appropriate

## Code Organization

### Component Responsibilities
- **Single Responsibility**: Each component should have a single, well-defined purpose
- **Reusability**: Create reusable components for common UI patterns
- **Separation of Concerns**: Separate business logic from presentation logic
- **Controller Pattern**: Use controller components for complex business logic

### File Organization
- **Component Directory**: Organize components by feature or functionality
- **Utility Functions**: Extract common utilities into separate files
- **Type Definitions**: Keep type definitions close to their usage
- **Configuration**: Centralize configuration files and constants