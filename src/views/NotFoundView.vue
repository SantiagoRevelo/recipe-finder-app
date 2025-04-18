<template>
  <main class="flex flex-col h-full">
    <div class="flex-shrink-0 px-4 md:px-10">
      <h1 class="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">This is the 404 page</h1>

      <div class="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-lg text-gray-600 mb-4">
          There is nothing to see here. <br />
          Go back home please.
        </p>
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
        >
          <RecipeLogo class="w-6 h-6 me-2 cursor-pointer" /> Search Recipes
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import RecipeLogo from '@/assets/images/recipe.svg'
</script>
