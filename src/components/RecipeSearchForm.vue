<template>
  <form @submit.prevent="submitSearch" class="mb-6">
    <div class="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        v-model.trim="searchQuery"
        placeholder="Search for recipes..."
        class="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        aria-label="Search for recipes"
        @input="updateSearchQuery"
      />
      <button
        type="submit"
        :disabled="!searchQuery"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'search', query: string): void
  (e: 'update-search-query', query: string): void
}>()

const submitSearch = () => {
  if (searchQuery.value) {
    emit('search', searchQuery.value.trim())
  }
  searchQuery.value = ''
}

const updateSearchQuery = () => {
  emit('update-search-query', searchQuery.value.trim())
}
</script>
<style lang="scss"></style>
