<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 group"
  >
    <div @click="emitViewDetails" class="cursor-pointer">
      <img
        :src="recipe.thumbnail"
        :alt="`Image of ${recipe.name}`"
        class="w-full h-48 object-cover"
        loading="lazy"
      />
      <div class="p-4">
        <h3 class="font-semibold text-lg truncate" :title="recipe.name">
          {{ recipe.name }}
        </h3>
      </div>
    </div>
    <div class="p-4 border-t border-gray-100 flex justify-between items-center">
      <router-link
        v-if="shouldShowCategoryLink"
        :to="{ name: 'category-recipes', params: { category: recipe.category } }"
        @click.stop
        class="text-green-500 italic text-xs cursor-pointer hover:text-green-300"
        :title="`Go to category ${recipe.category}`"
      >
        {{ recipe.category }}
      </router-link>
      <span v-else></span>
      <button
        @click="toggleFavoriteHandler"
        :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
        class="p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
        :aria-pressed="isFav"
      >
        <Heart
          alt="Favorite icon"
          class="w-6 h-6 cursor-pointer"
          :class="isFav ? 'text-red-500' : 'text-gray-400'"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipeSummary } from '@/models/recipe'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Heart from '@/assets/images/heart.svg'

const route = useRoute()

const props = defineProps<{
  recipe: RecipeSummary
}>()

const emit = defineEmits<{
  (e: 'view-details', id: string): void
  (e: 'toggle-favorite', recipe: RecipeSummary): void
}>()

const favoritesStore = useFavoritesStore()
const isFav = computed(() => favoritesStore.isFavorite(props.recipe.id))
const shouldShowCategoryLink = computed(() => {
  const hasCategoryProp = !!props.recipe.category
  const isCategoryRoute = route.name === 'category-recipes'
  const isSameCategoryOnRoute = isCategoryRoute && route.params.category === props.recipe.category

  // Show category only if has the prop and we're NOT in the category browse view
  return hasCategoryProp && !isSameCategoryOnRoute
})

const toggleFavoriteHandler = () => {
  emit('toggle-favorite', props.recipe)
}

const emitViewDetails = () => {
  emit('view-details', props.recipe.id)
}
</script>
<style lang="scss"></style>
