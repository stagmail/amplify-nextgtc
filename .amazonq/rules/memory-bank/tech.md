# Technology Stack

## Core Technologies
- **Framework**: Next.js 15.5.3 with App Router
- **Runtime**: React 19.1.0 with React DOM 19.1.0
- **Language**: TypeScript 5.9.2
- **Backend**: AWS Amplify 6.15.5
- **UI Library**: AWS Amplify UI React 6.12.0

## Styling & UI
- **CSS Framework**: Tailwind CSS 4.0
- **Component Library**: Headless UI 2.2.8
- **Icons**: Heroicons 2.2.0
- **Date Picker**: React DatePicker 8.7.0

## Development Tools
- **Build Tool**: Next.js with esbuild 0.25.9
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm (package-lock.json present)
- **TypeScript**: Strict type checking enabled

## AWS Services
- **Authentication**: AWS Amplify Auth
- **Backend**: AWS Amplify Backend 1.16.1
- **CLI**: AWS Amplify Backend CLI 1.8.0
- **Infrastructure**: AWS CDK 2.x with CDK Lib 2.204.0

## Development Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Build Configuration
- **Next.js Config**: TypeScript configuration in `next.config.ts`
- **TypeScript**: Configured in `tsconfig.json`
- **PostCSS**: Tailwind CSS processing in `postcss.config.mjs`
- **ESLint**: Modern configuration in `eslint.config.mjs`

## Environment Setup
- Node.js environment with TypeScript support
- AWS Amplify CLI for backend deployment
- Next.js development server on default port 3000