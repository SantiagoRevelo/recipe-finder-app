<template>
  <main class="flex flex-col h-full">
    <div class="flex-shrink-0 px-4 md:px-10">
      <h1 class="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Browse Categories</h1>

      <div v-if="isLoading" class="text-center py-10">
        <p class="text-gray-500">Loading categories...</p>
      </div>

      <div
        v-else-if="error"
        class="py-10 px-4 text-center bg-red-100 text-red-700 border border-red-200 rounded-md"
      >
        <h2 class="text-xl font-semibold mb-2">Error</h2>
        <p>{{ error }}</p>
      </div>
    </div>
    <div class="flex-grow overflow-y-auto px-4 md:px-10 pb-4">
      <div
        v-if="categories.length"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 bg-scroll"
      >
        <CategoryCard
          v-for="category in categories"
          :key="category.idCategory"
          :category="category"
          @browse="navigateToCategory"
        />
      </div>

      <div v-else class="text-center py-10">
        <p class="text-gray-500">No categories found.</p>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'
import CategoryCard from '@/components/CategoryCard.vue'

const router = useRouter()
const categoryStore = useCategoryStore()

const categories = computed(() => categoryStore.categories)
const isLoading = computed(() => categoryStore.isLoading)
const error = computed(() => categoryStore.error)

const navigateToCategory = (categoryName: string) => {
  router.push({ name: 'category-recipes', params: { category: categoryName } })
}
</script>
