import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { RecipeSummary } from '@/models/recipe'

const FAVORITES_STORAGE_KEY = 'recipeFinderApp.Favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  // --- State ---
  const favoriteRecipes = ref<RecipeSummary[]>(loadFavoritesFromLocalStorage())

  const isFavorite = computed(() => {
    return (recipeId: string): boolean =>
      favoriteRecipes.value.some((recipe) => recipe.id === recipeId)
  })

  const favoritesCount = computed(() => favoriteRecipes.value.length)

  // --- Actions ---
  function addFavorite(recipe: RecipeSummary) {
    if (!isFavorite.value(recipe.id)) {
      favoriteRecipes.value = [...favoriteRecipes.value, recipe]
    } else {
      console.warn(`[FavoritesStore] The recipe ${recipe.id} is already faved`)
    }
  }

  function removeFavorite(recipeId: string) {
    favoriteRecipes.value = favoriteRecipes.value.filter(
      (recipe: RecipeSummary) => recipe.id !== recipeId,
    )
  }

  function loadFavoritesFromLocalStorage() {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (storedFavorites) {
      try {
        return JSON.parse(storedFavorites)
      } catch (err) {
        console.error(`[FavoritesStore] Error parsing favorites from localStorage: ${err}`)
        localStorage.removeItem(FAVORITES_STORAGE_KEY)
        return []
      }
    }
    return []
  }

  watch(favoriteRecipes, (newFavorites) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites))
    } catch (err) {
      console.error(`[FavoritesStore] Error saving favorites to localStorage: ${err}`)
    }
  })

  return {
    favoriteRecipes,
    isFavorite,
    favoritesCount,
    addFavorite,
    removeFavorite,
  }
})
