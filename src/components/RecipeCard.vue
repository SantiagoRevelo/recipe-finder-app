<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer group"
  >
    <div @click="emitViewDetails">
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
    <div class="p-4 border-t border-gray-100 flex justify-end">
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

import Heart from '@/assets/images/heart.svg'

const props = defineProps<{
  recipe: RecipeSummary
}>()

const emit = defineEmits<{
  (e: 'view-details', id: string): void
  (e: 'toggle-favorite', recipe: RecipeSummary): void
}>()

const favoritesStore = useFavoritesStore()
const isFav = computed(() => favoritesStore.isFavorite(props.recipe.id))

const toggleFavoriteHandler = () => {
  emit('toggle-favorite', props.recipe)
}

const emitViewDetails = () => {
  emit('view-details', props.recipe.id)
}
</script>
<style lang="scss"></style>
