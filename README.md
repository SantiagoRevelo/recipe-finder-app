# Recipe Finder App

A modern, responsive, progressive web application (PWA) designed for discovering, viewing, and saving cooking recipes.

Built with Vite, Vue 3, Pinia, TypeScript, and Tailwind CSS, following SOLID principles.

This is a PWA you can install on your device.

## Demo:

Try it here: https://unrivaled-gelato-3c7bc6.netlify.app/

## Purpose:

- Allow users to easily find recipes by name, category.
- Provide a clean and intuitive interface for viewing details (ingredients, instructions).
- Manage (locally) a persistent personal list of favorite recipes.
- Serve as a practical demonstration of advanced front-end development skills, applying current best practices and technologies.

## Key features:

- **Recipe Search:** Search recipes using the free [TheMealDB API](https://www.themealdb.com/api.php).

- **Browse Categories:** See the recipes sorted by categories.

- **Favorites View:** Dedicated page to view all your saved recipes.

- **Favorites Management:** Save and remove favorite recipes. Favorites are stored locally in the browser (`localStorage`).

- **Responsive Design:** Interface adaptable to different screen sizes (mobile, tablet, desktop).

- **Enhanced User Experience:**

  - Loading skeletons for improved perceived performance (recipe cards and recipe details).
  - Debounced search input for optimized API calls while typing.
  - Global notification system for user feedback. You can see notifications at the bottom-right when fav/unfav recipes.

- **PWA Ready:** The site can be installed as an standalone application from the browser

- **SOLID Principles:** Developed applying SOLID design principles for better maintainability and scalability.

## Technology Stack:

- **Frontend Framework:** [Vue.js 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/)
- **SASS Compiler:** [sass-embedded](https://www.npmjs.com/package/sass-embedded)
- **Data API:** [TheMealDB API](https://www.themealdb.com/api.php)
- **Code Quality:** ESLint, Prettier
- **SVG Handling:** `vite-svg-loader`

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended, e.g., v18.x, v20.x)
- `npm` (comes with Node.js) or `yarn` (optional)

## Setup and Installation

Follow these steps to get the project running on your local environment:

1.  **Clone the repository:**

    ```bash
    git clone 'https://github.com/SantiagoRevelo/recipe-finder-app'
    cd recipe-finder-app
    ```

    If you don't have a repository, just make sure you are in the project's root folder that we created.

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or if you use `yarn`:
    ```bash
    yarn install
    ```

## Usage

To start the development server:

```bash
npm run dev
```

Then open browser and go to the url provided in the console i.e.:

```bash
http://localhost:5173/
```
