# Recipe Finder App

This is a web application to search for recipes and keep a list with your favorite ones.

Built with Vite, Vue 3, Pinia, TypeScript, and Tailwind CSS, following SOLID principles.

## Key Features

- **Recipe Search:** Search recipes by name using the free [TheMealDB API](https://www.themealdb.com/api.php). Start typing and the app will start showing results

- **Results Display:** Shows search results in cards with images and names. Click on them to see the recipe details

- **Recipe Details:** View complete recipe information:

  - Name
  - Faved state
  - Recipe Picture
  - Recipe video (if available).
  - category, origin (area) and tags.
  - List of ingredients and measurements.
  - Step-by-step instructions.

- **Favorite Management:** Save and remove favorite recipes. Favorites are stored locally in the browser (`localStorage`).

- **Favorites View:** Dedicated page to view all your saved recipes.

- **Responsive Design:** Interface adaptable to different screen sizes (mobile, tablet, desktop).

- **Enhanced User Experience:**

  - Loading skeletons for improved perceived performance (recipe cards and recipe details).
  - Debounced search input for optimized API calls while typing.
  - Global notification system for user feedback. You can see notifications at the bottom-right when fav/unfav recipes.

- **SOLID Principles:** Developed applying SOLID design principles for better maintainability and scalability.

## Technologies Used

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
