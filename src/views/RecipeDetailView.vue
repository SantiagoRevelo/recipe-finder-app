<template>
  <main class="flex flex-col h-full">
    <div v-if="isLoading">
      <RecipeDetailSkeleton />
    </div>

    <div
      v-if="error"
      class="p-6 mx-auto text-center bg-red-100 text-red-600 border border-red-200 rounded-md"
    >
      <h2 class="text-xl font-semibold mb-2">Error</h2>
      <p class="mb-4">{{ error }}</p>
      <router-link
        to="/"
        class="mt4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600 hover:text-white"
      >
        Back to Home
      </router-link>
    </div>

    <div v-else-if="recipe && !isLoading" class="max-w-4xl mx-auto mb-6 flex flex-col h-full">
      <div
        class="flex-shrink-0 p-4 md:px-10 flex flex-row justify-between items-start sm:items-center gap-4"
      >
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 flex-grow">{{ recipe.name }}</h1>
        <button
          class="p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 flex-shrink-0"
          :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
          :aria-pressed="isFav"
          @click="onToggleFavorite"
        >
          <Heart
            alt="Favorite icon"
            class="w-8 h-8 cursor-pointer"
            :class="isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400'"
          />
        </button>
      </div>
      <div class="flex-grow overflow-y-auto px-4 md:px-10 pb-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="md:col-span-1 flex flex-row md:flex-col gap-6 md:gap-1">
            <img
              :src="`${recipe.thumbnail}/medium`"
              :alt="`Image of a ${recipe.name} recipe`"
              class="w-40 md:w-full h-auto object-cover rounded-lg shadow-md mb-2"
            />
            <div class="flex flex-col justify-end">
              <p v-if="recipe.category"><strong>Category:</strong> {{ recipe.category }}</p>
              <p v-if="recipe.origin"><strong>Origin:</strong> {{ recipe.origin }}</p>
            </div>
          </div>
          <div class="md:col-span-2 space-y-2">
            <iframe
              v-if="recipe.ytUrl"
              :src="ytUrl"
              class="w-full aspect-video rounded-lg shadow-md"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>

          <div class="md:col-span-3 text-gray-700">
            <div v-if="recipe.tags && recipe.tags.length">
              <strong>Tags:</strong>
              <span
                v-for="tag in recipe.tags"
                :key="tag"
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-3 text-gray-800">Ingredients</h2>
          <ul class="flex flex-wrap gap-3 list-disc list-inside space-y-1 text-gray-700">
            <li v-for="(item, index) in recipe.ingredients" :key="index">
              {{ item.measure }} {{ item.ingredient }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold mb-3 text-gray-800">Instructions</h2>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ recipe.instructions }}</p>
        </div>

        <div v-if="!error" class="max-w-4xl mx-auto">
          <i class="text-sm mb-3 text-gray-500"><sub>source: https://www.themealdb.com</sub></i>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import type { RecipeDetail, RecipeSummary } from '@/models/recipe'
import { getRecipeDetailsById } from '@/services/recipesService'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RecipeDetailSkeleton from '@/components/skeletons/RecipeDetailSkeleton.vue'

import Heart from '@/assets/images/heart.svg'

const route = useRoute()
const router = useRouter()

const favoritesStore = useFavoritesStore()
const notificationStore = useNotificationStore()

const recipe = ref<RecipeDetail | null>(null)
const isLoading = ref(true)

const error = ref<string | null>(null)

// Computed properties
const recipeId = computed(() => route.params.id as string)

const isFav = computed(() => {
  // Asegurarse que recipe y recipe.id existen antes de chequear
  return recipe.value ? favoritesStore.isFavorite(recipe.value.id) : false
})

const ytUrl = computed(() => {
  if (recipe.value && recipe.value.ytUrl) {
    return recipe.value.ytUrl.replace('watch?v=', 'embed/')
  }
  return ''
})

onMounted(() => {
  fetchRecipeDetails()
})

const fetchRecipeDetails = async () => {
  isLoading.value = true
  error.value = null
  recipe.value = null

  // check if ID is valid and !empty
  if (!recipeId.value) {
    error.value = 'An invalid recipe ID was provided.'
    isLoading.value = false
    // Redirecto to 404 page
    router.push({ name: 'not-found' })
    return
  }

  try {
    const result = await getRecipeDetailsById(recipeId.value)
    if (result) {
      recipe.value = result
    } else {
      error.value = ' Not sure what happened, but we could not find the recipe.'
      // Redirect to 404 page ?? (uncomment the next line)
      // router.push({ name: 'not-found' })
      return
    }
  } catch (err) {
    console.error('[RecipeDetauilView] Error fetching recipe details:', err)
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = ' Unexpected error occurred while fetching recipe details.'
    }
  } finally {
    isLoading.value = false
  }
}

const onToggleFavorite = () => {
  if (!recipe.value) {
    return
  }

  const recipeSummary: RecipeSummary = {
    id: recipe.value.id,
    name: recipe.value.name,
    thumbnail: recipe.value.thumbnail,
    category: recipe.value.category,
  }

  if (isFav.value) {
    favoritesStore.removeFavorite(recipe.value.id)
    notificationStore.showNotification(`Removed "${recipe.value.name}" from favorites`)
  } else {
    favoritesStore.addFavorite(recipeSummary)
    notificationStore.showNotification(`Added ${recipe.value.name} to favorites`)
  }
}
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
@media (hover: hover) {
  a:hover:not(.logo) {
    color: hsl(160, 74%, 54%);
  }
}
</style>
