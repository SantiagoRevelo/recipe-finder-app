<template>
  <form @submit.prevent="submitSearch" class="mb-6">
    <div class="flex flex-col sm:flex-row gap-2">
      <div class="relative flex-grow w-full sm:w-auto">
        <input
          ref="searchInput"
          type="text"
          v-model="modelValue"
          @input="updateSearchQuery"
          placeholder="Search for recipes..."
          class="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          aria-label="Search for recipes"
        />
        <button
          v-if="modelValue"
          @click="clearSearch"
          type="button"
          class="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400 rounded-r-md"
          aria-label="Clear the search"
          title="Clear the search"
        >
          <closeButton />
        </button>
      </div>
      <button
        type="submit"
        :disabled="!modelValue"
        class="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import closeButton from '@/assets/images/close.svg'

const searchInputRef = useTemplateRef('searchInput')

const modelValue = defineModel<string>()

const emit = defineEmits<{
  (e: 'search', query: string): void
  (e: 'update-search-query', query: string): void
}>()

const submitSearch = () => {
  const currentQuery = modelValue.value ?? ''
  if (currentQuery) {
    emit('search', currentQuery.trim())
  }
}

const updateSearchQuery = () => {
  const currentQuery = modelValue.value ?? ''
  emit('update-search-query', currentQuery.trim())
}

const clearSearch = () => {
  if (modelValue.value !== undefined) {
    modelValue.value = ''
  }
  emit('search', '')
  searchInputRef.value?.focus()
}
</script>
<style lang="scss"></style>
