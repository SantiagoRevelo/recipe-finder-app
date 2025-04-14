import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RecipeCategory } from '@/models/recipe'
import { getRecipeCategories } from '@/services/recipesService'

export const useCategoryStore = defineStore('categories', () => {
  // --- State ---
  const categories = ref<RecipeCategory[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)

  // --- Actions ---
  async function fetchCategories() {
    if (hasLoaded.value || isLoading.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      categories.value = await getRecipeCategories()
      hasLoaded.value = true
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Unexpected error occur loading the categories'
      }

      hasLoaded.value = false
    } finally {
      isLoading.value = false
    }
  }

  return {
    categories,
    isLoading,
    error,
    hasLoaded,
    fetchCategories,
  }
})
