<template>
  <main class="flex flex-col h-full">
    <div class="flex-shrink-0 px-4 md:px-10">
      <h1 class="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">My favorite recipes</h1>
      <div
        v-if="favoritesCount === 0"
        class="text-center py-10 px-4 bg-yellow-50 border border-yellow-200 rounded-md"
      >
        <p class="text-lg text-gray-600 mb-4">There is no favorite recipes saved yet.</p>
        <router-link to="/" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">
          Search Recipes
        </router-link>
      </div>
    </div>
    <div class="flex-grow overflow-y-auto px-4 md:px-10 pb-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RecipeCard
          v-for="favRecipe in favoriteRecipes"
          :key="favRecipe.id"
          :recipe="favRecipe"
          @viewDetails="onViewDetails"
          @toggle-favorite="onToggleFavorite"
        />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useNotificationStore } from '@/stores/notificationStore'
import type { RecipeSummary } from '@/models/recipe'
import RecipeCard from '@/components/RecipeCard.vue'

const router = useRouter()

const favoritesStore = useFavoritesStore()
const notificationStore = useNotificationStore()

const favoriteRecipes = computed(() => favoritesStore.favoriteRecipes)
const favoritesCount = computed(() => favoritesStore.favoritesCount)

const onViewDetails = (recipeId: string) => {
  router.push({ name: 'recipe-detail', params: { id: recipeId } })
}

const onToggleFavorite = (recipe: RecipeSummary) => {
  if (confirm(`¿Seguro que quieres eliminar "${recipe.name}" de tus favoritos?`)) {
    favoritesStore.removeFavorite(recipe.id)
    notificationStore.showNotification(`"${recipe.name}" eliminada de favoritos.`)
  }
}
</script>

<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
</style>
