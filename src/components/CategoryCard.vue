<template>
  <div
    @click="emitBrowserCategory"
    class="div bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer group text-center"
    :title="category.strCategoryDescription"
  >
    <img
      :src="category.strCategoryThumb"
      :alt="`Image of category ${category.strCategory}`"
      class="w-full h-40 object-contain mx-auto p-4 group-hover:opacity-85"
      loading="lazy"
    />
    <div class="p-4 border-t border-gray-100">
      <h3 class="font-semibold text-lg truncate">{{ category.strCategory }}</h3>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RecipeCategory } from '@/models/recipe'

const props = defineProps<{
  category: RecipeCategory
}>()

const emit = defineEmits<{
  (e: 'browse', categoryName: string): void
}>()

const emitBrowserCategory = () => {
  emit('browse', props.category.strCategory)
}
</script>
