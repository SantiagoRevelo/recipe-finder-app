<template>
  <main>
    <h1 class="text-2xl font-semibold mb-4">Recipe Search</h1>

    <RecipeSearchForm @search="onSearch" @UpdateSearchQuery="onUpdateSearchQuery" />
    <hr class="text-gray-200 mb-4" />
    <div class="text-center">
      <div
        v-if="error"
        class="inline-flex mb-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md"
      >
        <p class="whitespace-pre-line">{{ error }}</p>
      </div>
    </div>

    <h2 v-if="searchTerm && !error" class="text-xl font-medium mb-4">
      Search results for "{{ searchTerm }}"
    </h2>

    <RecipeList
      :recipes="recipes"
      :is-loading="isLoading"
      @view-details="onViewDetails"
      @toggle-favorite="onToggleFavorite"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import RecipeSearchForm from '@/components/RecipeSearchForm.vue'
import RecipeList from '@/components/RecipeList.vue'
import type { RecipeSummary } from '@/models/recipe'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { searchRecipesByName } from '@/services/recipesService'

const router = useRouter()

const favoritesStore = useFavoritesStore()
const notificationStore = useNotificationStore()

const error = ref<string | null>(null)
const searchTerm = ref('')
const isLoading = ref(false)
const recipes = ref<RecipeSummary[]>([])

const debounceTimer = ref<number | null>(null)
const DEBOUNCE_DEALY = 500

const onSearch = async (query: string) => {
  console.debug('[HomeView] New search term:', query)
  if (!query || query.trim() === '') {
    recipes.value = []
    searchTerm.value = ''
    error.value = null

    return
  }

  isLoading.value = true
  error.value = null
  recipes.value = []
  searchTerm.value = query

  try {
    const results = await searchRecipesByName(query)
    recipes.value = results
    if (results.length === 0) {
      error.value = `No results were found for the term "${query}".\nPlease try another term.`
    }
  } catch (err) {
    console.error('[HomeView] Error searching recipes:', err)
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'An error occurred while searching for recipes'
    }
    recipes.value = []
  } finally {
    isLoading.value = false
  }
}

const onUpdateSearchQuery = (query: string) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  debounceTimer.value = window.setTimeout(() => {
    onSearch(query)
  }, DEBOUNCE_DEALY)
}

const onViewDetails = (recipeId: string) => {
  console.debug(`showing recipe ${recipeId}`)
  router.push({ name: 'recipe-detail', params: { id: recipeId } })
}

const onToggleFavorite = (recipe: RecipeSummary) => {
  console.debug('[HomeView] Toggling favorite for recipe:', recipe)
  if (favoritesStore.isFavorite(recipe.id)) {
    favoritesStore.removeFavorite(recipe.id)
    notificationStore.showNotification(`Removed ${recipe.name} from favorites`)
  } else {
    favoritesStore.addFavorite(recipe)
    notificationStore.showNotification(`Added ${recipe.name} to favorites`)
  }
}
</script>
<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
</style>
