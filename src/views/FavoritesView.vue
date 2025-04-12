<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">My favorite recipes</h1>

    <div
      v-if="favoritesCount === 0"
      class="text-center py-10 px-4 bg-yellow-50 border border-yellow-200 rounded-md"
    >
      <p class="text-lg text-gray-600 mb-4">There is no favorite recipes saved yet.</p>
      <router-link to="/" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Search Recipes
      </router-link>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RecipeCard
        v-for="favRecipe in favoriteRecipes"
        :key="favRecipe.id"
        :recipe="favRecipe"
        @viewDetails="onViewDetails"
        @toggle-favorite="onToggleFavorite"
      />
    </div>

    <div
      v-if="notification"
      class="fixed bottom-4 right-4 p-4 bg-orange-500 text-white rounded-md shadow-lg transition-opacity duration-300"
      :class="{ 'opacity-0': !showNotification }"
    >
      {{ notification }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favoritesStore'
import type { RecipeSummary } from '@/models/recipe'
import RecipeCard from '@/components/RecipeCard.vue'

const NOTIFICATION_DURATION = 3000
const TRANSITION_DURATION = 300

const router = useRouter()
const favoritesStore = useFavoritesStore()

const notification = ref<string | null>(null)
const showNotification = ref(false)
let notificationTimeout: number | null = null

const favoriteRecipes = computed(() => favoritesStore.favoriteRecipes)
const favoritesCount = computed(() => favoritesStore.favoritesCount)

const showTempNotification = (message: string) => {
  notification.value = message
  showNotification.value = true
  if (notificationTimeout) clearTimeout(notificationTimeout)
  notificationTimeout = window.setTimeout(() => {
    showNotification.value = false
    setTimeout(() => {
      notification.value = null
    }, TRANSITION_DURATION)
  }, NOTIFICATION_DURATION)
}

const onViewDetails = (recipeId: string) => {
  router.push({ name: 'recipe-detail', params: { id: recipeId } })
}

const onToggleFavorite = (recipe: RecipeSummary) => {
  if (confirm(`¿Seguro que quieres eliminar "${recipe.name}" de tus favoritos?`)) {
    favoritesStore.removeFavorite(recipe.id)
    showTempNotification(`"${recipe.name}" eliminada de favoritos.`)
  }
}
</script>

<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
</style>
