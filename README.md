# React + TypeScript + Vite

## Table of Contents

- [Start](#start)
- [Routing](#routing)
- [Structure of files](#structure)
- [API](#api)
- [Technology](#technology)
- [Extensions](#extensions)

# Start

# npm run dev // will run in http://localhost:5173/

# npm build // to build your project

# Routing

# Structure Of Files

- **`public/`**: Contains static files like the HTML file and favicon.
- **`src/`**: Holds the core application code:

  - **`components/`**: Contains reusable UI components like `Header` and `Footer`.
  - **`hooks/`**: Contains custom hooks such as `useFetch` for handling data fetching.
  - **`pages/`**: Contains pages of the app like `HomePage` and `AboutPage`.
  - **`services/`**: Contains utility functions or API service files (like `apiService.ts` for Axios).
  - **`styles/`**: Holds global or component-specific stylesheets.
  - **`App.tsx`**: The main React component that ties everything together.
  - **`index.tsx`**: The main entry point for rendering the React application into the DOM.

- **`.env`**: Contains environment-specific configuration like API keys.
- **`.gitignore`**: Defines files or folders that Git should ignore (e.g., `node_modules`).
- **`package.json`**: Lists dependencies, scripts, and project metadata.
- **`tsconfig.json`**: TypeScript configuration for the project.

## API

## Technology

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://www.npmjs.com/package/axios)
- [Jest](https://jestjs.io/)
- [graphqlApi](https://graphql.org/)

## Extensions used

- [Eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [husky](https://typicode.github.io/husky/)
- [styled-components](https://styled-components.com/)
