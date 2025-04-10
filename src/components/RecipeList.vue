<template>
  <div>
    <div v-if="isLoading" class="text-center py10">
      <p class="text-gray-500">Searching for recipes...</p>
    </div>
    <div v-else-if="!recipes" class="text-center py-10">
      <p class="text-gray-500">No recipes found. Try with another term</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @view-details="onViewDetails"
        @toggle-favorite="onToggleFavorite"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RecipeSummary } from '@/models/recipe'
import RecipeCard from './RecipeCard.vue'

// Props que espera este componente
defineProps<{
  recipes: RecipeSummary[]
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'view-details', id: string): void
  (e: 'toggle-favorite', recipe: RecipeSummary): void
}>()

const onViewDetails = (id: string) => {
  emit('view-details', id)
}

const onToggleFavorite = (recipe: RecipeSummary) => {
  emit('toggle-favorite', recipe)
}
</script>
<style lang="scss"></style>
