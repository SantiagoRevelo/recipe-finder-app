<template>
  <header class="bg-white text-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-green-500 text-2xl flex items-center py-3 font-bold">
        <AppLogo class="inline-block w-8 h-8 mr-2" />
        <span class="text-2xl font-bold">Recipe Finder</span>
      </router-link>
      <nav class="space-x-4">
        <router-link
          to="/"
          class="text-green-500 hover:text-green-400"
          active-class="text-green-300 font-semibold"
          >Search</router-link
        >
        <router-link
          to="/Browse"
          class="text-green-500 hover:text-green-400"
          active-class="text-green-300 font-semibold"
        >
          Browse
        </router-link>
        <router-link
          to="/favorites"
          class="text-green-500 hover:text-green-400"
          active-class="text-green-300 font-semibold"
        >
          Favorites
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppLogo from '@/assets/images/recipe.svg'
</script>
