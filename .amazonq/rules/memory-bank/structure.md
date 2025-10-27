# Project Structure

## Directory Organization

### `/src/app/` - Next.js App Router
- **Route-based pages**: Each subdirectory represents a route
  - `admin-login/` - Administrative authentication
  - `controller/` - Transport controller dashboard
  - `driver/` - Driver interface and management
  - `listing/` - Data listing views
  - `locations/` - Location management
  - `pooling/` - Trip pooling functionality
  - `reports/` - Analytics and reporting
  - `staff/` - Staff management interface
- **Global styles**: CSS files for theming and layout
- **Core files**: `layout.tsx`, `page.tsx`, `loading.tsx`

### `/src/components/` - Reusable React Components
- **Management Components**: Driver, Staff, Location management
- **Form Components**: ToWorkForm, ToHomeForm for transport requests
- **Table Components**: Data display for drivers, staff, locations
- **Dialog Components**: Modal interfaces for assignments and pooling
- **Navigation**: Navbar, Header, Footer components
- **Authentication**: AuthenticatorWrapper with AWS Amplify

### `/amplify/` - AWS Amplify Backend
- `auth/resource.ts` - Authentication configuration
- `data/resource.ts` - Data layer and API definitions
- `backend.ts` - Main backend configuration

### `/ui-components/` - Generated Amplify UI Components
- **GraphQL**: Auto-generated mutations, queries, subscriptions
- **Forms**: Transport form components (Create/Update)
- **Utils**: Helper functions and utilities

### `/public/` - Static Assets
- Logo files and SVG icons
- Favicon resources

## Core Architecture Patterns

### Component Architecture
- **Wrapper Pattern**: AuthenticatorWrapper encapsulates authentication
- **Controller Pattern**: Separate controller components for different user roles
- **Form Pattern**: Dedicated form components for data entry
- **Table Pattern**: Consistent table components for data display

### Data Flow
- **AWS Amplify**: Backend services and authentication
- **GraphQL**: API layer for data operations
- **React State**: Component-level state management
- **Next.js**: Server-side rendering and routing

### Authentication Flow
- AWS Amplify Authenticator with custom theming
- Role-based access control for different user types
- Protected routes for authenticated users