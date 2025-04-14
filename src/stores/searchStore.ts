import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RecipeSummary } from '@/models/recipe'
import { searchRecipesByName } from '@/services/recipesService'

export const useSearchStore = defineStore('search', () => {
  // --- State ---
  const recipes = ref<RecipeSummary[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchTerm = ref('')

  // --- Actions ---
  async function executeSearch(query: string) {
    searchTerm.value = query

    if (!query || query.trim() === '') {
      recipes.value = []
      error.value = null
      isLoading.value = false
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const results = await searchRecipesByName(query)
      recipes.value = results
    } catch (err) {
      console.error(`[SearchStore] Error searching for "${query}":`, err)
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Unexpected error occurred while searching for recipes'
      }
      recipes.value = []
    } finally {
      isLoading.value = false
    }
  }

  function clearSearchState() {
    recipes.value = []
    isLoading.value = false
    error.value = null
    searchTerm.value = ''
  }

  return {
    recipes,
    isLoading,
    error,
    searchTerm,
    executeSearch,
    clearSearchState,
  }
})
