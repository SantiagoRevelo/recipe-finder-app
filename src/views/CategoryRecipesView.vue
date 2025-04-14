<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
      Recipes of the category: <span class="text-green-700">{{ category }}</span>
    </h1>

    <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md">
      <p><strong>Error:</strong> {{ error }}</p>
    </div>

    <RecipeList
      :recipes="recipes"
      :is-loading="isLoading"
      @view-details="handleViewDetails"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RecipeSummary } from '@/models/recipe'
import { filterRecipesByCategory } from '@/services/recipesService'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useNotificationStore } from '@/stores/notificationStore'
import RecipeList from '@/components/RecipeList.vue'

const props = defineProps<{
  category: string
}>()

const router = useRouter()
const route = useRoute()
const favoritesStore = useFavoritesStore()
const notificationStore = useNotificationStore()

const recipes = ref<RecipeSummary[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const category = computed(() => props.category || (route.params.category as string))

const fetchRecipes = async () => {
  const name = category.value
  if (!name) {
    error.value = 'Nombre de categoría no especificado.'
    recipes.value = []
    return
  }

  isLoading.value = true
  error.value = null
  try {
    recipes.value = await filterRecipesByCategory(name)
    if (recipes.value.length === 0) {
      console.log(`No categories found named "${name}".`)
    }
  } catch (err) {
    console.error(`Error loading recipes of category ${name}:`, err)
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Unexpected error occurred while loading recipes.'
    }
    recipes.value = []
  } finally {
    isLoading.value = false
  }
}

const handleViewDetails = (recipeId: string) => {
  router.push({ name: 'recipe-detail', params: { id: recipeId } })
}

const handleToggleFavorite = (recipe: RecipeSummary) => {
  if (favoritesStore.isFavorite(recipe.id)) {
    favoritesStore.removeFavorite(recipe.id)
    notificationStore.showNotification(`"${recipe.name}" eliminada de favoritos.`, 'warning')
  } else {
    favoritesStore.addFavorite(recipe)
    notificationStore.showNotification(`"${recipe.name}" añadida a favoritos.`, 'success')
  }
}

onMounted(() => {
  fetchRecipes()
})

watch(category, (newName, oldName) => {
  if (newName && newName !== oldName) {
    fetchRecipes()
  }
})
</script>
