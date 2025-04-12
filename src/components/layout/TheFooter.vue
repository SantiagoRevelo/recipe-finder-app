<template>
  <footer class="bg-gray-200 text-gray-600 p-4 mt-8">
    <div class="container mx-auto text-center text-sm">
      &copy;{{ currentYear }} Recipe Finder by
      <a href="https://www.linkedin.com/in/santiago-revelo/" target="_blank">Santiago Revelo</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
