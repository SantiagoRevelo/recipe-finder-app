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

    <h2 v-if="searchTerm && !error" class="text-xl font-medium mb-6">
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
import { storeToRefs } from 'pinia' // <-- Importar storeToRefs
import RecipeSearchForm from '@/components/RecipeSearchForm.vue'
import RecipeList from '@/components/RecipeList.vue'
import type { RecipeSummary } from '@/models/recipe'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useSearchStore } from '@/stores/searchStore' // <-- Importar el nuevo store
// import { searchRecipesByName } from '@/services/recipesService'

const router = useRouter()

const favoritesStore = useFavoritesStore()
const notificationStore = useNotificationStore()
const searchStore = useSearchStore() // <-- Obtener instancia del store

const { recipes, isLoading, error, searchTerm } = storeToRefs(searchStore)

const debounceTimer = ref<number | null>(null)
const DEBOUNCE_DELAY = 500

const onSearch = async (query: string) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = null
  }
  // Llamar a la acción del store
  searchStore.executeSearch(query)
}

const onUpdateSearchQuery = (query: string) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  searchStore.searchTerm = query

  debounceTimer.value = window.setTimeout(() => {
    // Llamar a la acción del store después del delay
    searchStore.executeSearch(query)
  }, DEBOUNCE_DELAY)
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
