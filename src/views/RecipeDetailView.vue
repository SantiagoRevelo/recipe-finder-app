<template>
  <div>
    <div v-if="isLoading" class="text-center py-20">
      <p class="text-xl text-gray-500">Loading recipe details...</p>
    </div>

    <div
      v-if="error"
      class="py10 px-4 text-center bg-red-100 text-red-700 border border-red-200 rouded-md"
    >
      <h2 class="text-xl dont-semibold mb-2">Error</h2>
      <p>{{ error }}</p>
      <router-link
        to="/"
        class="mt4 inline-block px4 py2 bg-red600 text-white rounded hover:bg-red-700"
      >
        Back to Home
      </router-link>
    </div>

    <div v-else-if="recipe" class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb4 gap-4">
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="md:col-span-1">
          <img
            :src="recipe.thumbnail"
            :alt="`Image of a ${recipe.name} recipe`"
            class="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div class="md:col-span-2 space-y-2 text-gray-700">
          <p v-if="recipe.category"><strong>Category:</strong> {{ recipe.category }}</p>
          <p v-if="recipe.origin"><strong>Origin:</strong> {{ recipe.origin }}</p>
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

          <div v-if="recipe.ytUrl">
            <a
              :href="recipe.ytUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-green-500 hover:text-green-200"
            >
              <Video class="text-red-400" />
              <span>Watch on Youtube</span>
            </a>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-3 text-gray-800">Ingredientes</h2>
        <ul class="list-disc list-inside space-y-1 text-gray-700">
          <li v-for="(item, index) in recipe.ingredients" :key="index">
            {{ item.measure }} {{ item.ingredient }}
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-3 text-gray-800">Instrucciones</h2>
        <template v-for="{ step, content } in recipe.instructions" :key="step">
          <h3 class="text-lg font-bold text-gray-700">{{ step }}</h3>
          <p class="mb-6 text-gray-700">{{ content }}</p>
        </template>
      </div>
      <div>
        <i class="text-sm mb-3 text-gray-500"><sub>source: https://www.themealdb.com</sub></i>
      </div>
    </div>

    <div
      v-if="notification"
      class="fixed bottom-5 right-4 p-4 bg-green-500 text-white rounded-md shadow-lg transition-opacity duration-300"
      :class="{ 'opacity-0': !showNotification }"
    >
      {{ notification }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RecipeDetail, RecipeSummary } from '@/models/recipe'
import { getRecipeDetailsById } from '@/services/recipesService'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Heart from '@/assets/images/heart.svg'
import Video from '@/assets/images/video.svg'

const NOTIFICATION_DURATION = 3000
const TRANSITION_DURATION = 300

const route = useRoute()
const router = useRouter()

const favoritesStore = useFavoritesStore()

const recipe = ref<RecipeDetail | null>(null)
const isLoading = ref(true)

const error = ref<string | null>(null)

const notification = ref<string | null>(null)
const showNotification = ref(false)
let notificationTimeout: number | null = null

// Computed properties
const recipeId = computed(() => route.params.id as string)

const isFav = computed(() => {
  // Asegurarse que recipe y recipe.id existen antes de chequear
  return recipe.value ? favoritesStore.isFavorite(recipe.value.id) : false
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
    error.value = ' Unexpected error occurred while fetching recipe details.'
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
  }

  if (isFav.value) {
    favoritesStore.removeFavorite(recipe.value.id)
    showTempNotification(`Removed "${recipe.value.name}" from favorites`)
  } else {
    favoritesStore.addFavorite(recipeSummary)
    showTempNotification(`Added ${recipe.value.name} to favorites`)
  }
}

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
