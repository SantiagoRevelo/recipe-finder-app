# Recipe Finder

A frontend application built with **Vue 3 + Vite**, following **SOLID** principles and clean architecture best practices. Users can search recipes by ingredients or keywords, view details, and save favorites locally.

## Technologies Used

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/)
- Spoonacular API (for recipe data)

## Project Structure

```
src/
├── assets/        # Global styles and assets
├── components/   # Reusable UI components
├── views/        # Main views/pages
├── services/    # Decoupled business logic (API, helpers)
├── store/         # State management with Pinia
├── router/       # Routing configuration
├── App.vue    # Root component
├── main.js      # Entry point
```

#

## Features

- Search recipes by ingredients or keywords
- View recipe results with name, image, and short description
- View detailed recipe info: ingredients, steps, time
- Save favorite recipes to `localStorage`
- Responsive and accessible UI

## Installation

```bash
npm install   // To rhe initial setup adn the required packages
nē pm run dev   // TO run the project in local env (DEV)
npm build       // TO deploy the app
```
