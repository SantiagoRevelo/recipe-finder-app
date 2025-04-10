<template>
  <main>
    <h1 class="text-2xl font-semibold mb-4">Recipe Search</h1>

    <RecipeSearchForm @search="onSearch" />

    <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 border border-red-200 rouded-md">
      <p><strong>Error: </strong> {{ error }}</p>
    </div>

    <h2 v-if="searchTerm" class="text-xl font-medium mb-4">
      Search results for "{{ searchTerm }}"
    </h2>

    <RecipeList
      :recipes="recipes"
      :is-loading="isLoading"
      @view-details="onViewDetails"
      @toggle-favorite="onToggleFavorite"
    />

    <div
      v-if="notification"
      class="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-md shadow-lg transition-opacity duration-300"
      :class="{ 'opacity-0': !showNotification }"
    >
      {{ notification }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import RecipeSearchForm from '@/components/RecipeSearchForm.vue'
import RecipeList from '@/components/RecipeList.vue'
import type { RecipeSummary } from '@/models/recipe'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { searchRecipesByName } from '@/services/recipesService'

const NOTIFICATION_DURATION = 3000
const TRANSITION_DURATION = 300

const router = useRouter()
const favoritesStore = useFavoritesStore()

const error = ref<string | null>(null)
const searchTerm = ref('')
const isLoading = ref(false)
const recipes = ref<RecipeSummary[]>([])

const notification = ref<string | null>(null)
const showNotification = ref(false)
let notificationTimeout: number | null = null

const showTempNotification = (message: string) => {
  notification.value = message
  showNotification.value = true

  if (notificationTimeout) {
    clearTimeout(notificationTimeout)
  }

  notificationTimeout = setTimeout(() => {
    showNotification.value = false

    // wait for transtion to finish
    setTimeout(() => {
      notification.value = null
    }, TRANSITION_DURATION)
  }, NOTIFICATION_DURATION)
}

const onSearch = async (query: string) => {
  console.debug('Search term:', query)
  isLoading.value = true
  error.value = null
  recipes.value = []
  searchTerm.value = query

  try {
    const results = await searchRecipesByName(query)
    recipes.value = results
    if (results.length === 0) {
      error.value = 'No recipes found. Try with another term'
    }
  } catch (err) {
    console.error('Error searching recipes:', err)
    error.value = 'An error occurred while searching for recipes'
  } finally {
    isLoading.value = false
  }
}
const onViewDetails = (recipeId: string) => {
  console.debug(`showing recipe ${recipeId}`)
  router.push({ name: 'recipe-detail', params: { id: recipeId } })
}

const onToggleFavorite = (recipe: RecipeSummary) => {
  console.debug('Toggling favorite for recipe:', recipe)
  if (favoritesStore.isFavorite(recipe.id)) {
    favoritesStore.removeFavorite(recipe.id)
    showTempNotification(`Removed ${recipe.name} from favorites`)
  } else {
    favoritesStore.addFavorite(recipe)
    showTempNotification(`Added ${recipe.name} to favorites`)
  }
}
</script>
<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
</style>
