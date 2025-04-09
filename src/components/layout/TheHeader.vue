<template>
  <header class="bg-green-6t00 text-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="logo text-2xl font-bold hover:text-green-200">
        Recipe Finder
      </router-link>
      <nav class="space-x-4">
        <ul class="space-x-4">
          <router-link to="/" class="hover:text-green-200">Search</router-link>
          <router-link to="/favorites" class="hover:text-green-200">Favorites</router-link>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.router-link-exact-active:not(.logo) {
  color: #c144e0;
  font-weight: semibold;
}
</style>
