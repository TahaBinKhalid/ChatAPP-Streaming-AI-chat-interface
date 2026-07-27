# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## PROMPTS USED IN BUILDING THIS WEBSITE

Prompt 1: Complete Project Setup & Architecture
text
I want to build a professional React movie exploration web application using TypeScript. Please help me set up the complete project architecture including:

1. Project structure with proper folder organization (components, pages, services, hooks, types, utils)
2. TypeScript configuration (tsconfig.json) with strict mode
3. Vite or Create React App setup with all necessary dependencies
4. ESLint and Prettier configuration for code quality
5. Environment variables setup for API keys
6. Routing setup using React Router v6 with lazy loading
7. State management approach (Context API or Redux Toolkit)

The app should fetch movie data from OMDb API (http://www.omdbapi.com/) and include features like movie search, favorites management, and user authentication simulation. Provide complete code with all configurations and explain the architecture decisions.

Prompt 2: Authentication & User Management
text
Build a complete authentication system for my React movie app with the following features:

1. Login/Register pages with form validation (using react-hook-form and yup)
2. JWT token-based authentication simulation (mock API)
3. Protected routes with authentication guards
4. User context/provider for managing auth state
5. Persistent login using localStorage/sessionStorage
6. Profile page showing user information and saved favorites
7. Logout functionality
8. Role-based access control (admin vs regular user)

The authentication should integrate with the favorites feature where each user has their own favorites list. Provide complete TypeScript components, hooks, and context implementation with proper error handling and loading states.

Prompt 3: Advanced Movie Features & API Integration
text
Create comprehensive movie management features for my React app including:

1. OMDb API integration with proper error handling and rate limiting
2. Advanced search with filters (year, type, genre)
3. Pagination or infinite scroll for movie listings
4. Movie details page with full information (poster, plot, cast, ratings, runtime)
5. Similar movie recommendations based on genre/actors
6. Movie sorting options (newest, oldest, highest rated)
7. Debounced search input to prevent excessive API calls
8. Caching strategy using React Query or SWR
9. Loading skeletons for better UX
10. Error boundaries and fallback UI

Use TypeScript with proper interfaces for all movie data structures. Implement custom hooks for data fetching and state management. Include responsive design and accessibility features.

Prompt 4: Favorites System with Local Storage & Sync
text
Design and implement a robust favorites management system for my movie app with:

1. Add/remove favorites functionality with visual feedback (animations)
2. Persistent storage using localStorage with fallback to IndexedDB
3. Synchronize favorites between components using Context API
4. Favorites page with grid/list view toggle
5. Export/import favorites as JSON
6. Favorites counter badge in navigation
7. Batch operations (select multiple, remove all)
8. Drag-and-drop reordering of favorites
9. Filter favorites by genre/year/rating
10. Statistics dashboard (total favorites, genres distribution, average rating)

Include smooth animations using Framer Motion, complete TypeScript types, and proper state management. Ensure data persistence across browser sessions and handle edge cases like storage limits.

Prompt 5: UI/UX Enhancements & Performance Optimization
text
Transform the movie app into a highly polished, production-ready application with:

1. Professional design system with dark mode support using CSS-in-JS or Tailwind
2. Responsive layouts for all screen sizes (mobile-first approach)
3. Animations and transitions (page transitions, card hover effects, loading states)
4. Accessibility compliance (WCAG 2.1 AA standards with proper ARIA labels)
5. Performance optimizations: code splitting, lazy loading, image optimization
6. Progressive Web App (PWA) support with service workers
7. SEO optimization with react-helmet-async
8. Error tracking and logging (Sentry integration)
9. Analytics integration (Google Analytics or Plausible)
10. Docker configuration for easy deployment
11. CI/CD pipeline setup (GitHub Actions or GitLab CI)
12. Unit and integration tests using React Testing Library and Jest

Provide comprehensive implementation with focus on performance, accessibility, and maintainability. Include performance metrics and optimization strategies.

Final Prompt: Complete Feature Integration

Create a fully functional, production-ready React movie app that combines ALL these features:

1. User authentication system (login/register/profile)
2. Movie search with filters and pagination
3. Movie details page with recommendations
4. Favorites management with local storage
5. Responsive dark theme UI with animations
6. Performance optimizations (lazy loading, code splitting)
7. TypeScript with strict type checking
8. Error handling and loading states
9. Unit tests and integration tests
10. Docker and CI/CD setup

The app should be built with React 18, TypeScript, and Vite. Use React Router for navigation, Context API/Redux for state management, and Tailwind CSS or Material-UI for styling. Include complete documentation, deployment instructions, and a demo video script. Structure the code with clean architecture principles and SOLID design patterns. All components should be reusable and well-tested.

How to Use These Prompts Effectively:
Start with Prompt 1 - Get the foundation set up

Move to Prompt 3 - Build the core movie features

Add Prompt 4 - Implement favorites functionality

Then Prompt 2 - Add authentication

Finish with Prompt 5 - Polish and optimize

Each prompt is designed to build on the previous one, creating a complete, professional application.

Additional Prompt Template for Specific Features:
text
Build a [specific feature] for my React movie app with the following requirements:

Feature: [feature name]
Tech Stack: React + TypeScript + [Vite/CRA] + [styling]
Requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]

Deliverables:
1. Complete component code with TypeScript
2. CSS/SCSS/Tailwind styles
3. Custom hooks (if needed)
4. Type definitions
5. Implementation explanation

Considerations:
- Accessibility (ARIA labels, keyboard navigation)
- Performance (memoization, lazy loading)
- Error handling
- Loading states
- Mobile responsiveness
- Dark/Light theme support