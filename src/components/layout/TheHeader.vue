<template>
  <header class="bg-white text-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="logo flex items-center py-3">
        <AppLogo class="inline-block w-8 h-8 mr-2" />
        <span class="text-2xl font-bold">Recipe Finder</span>
      </router-link>
      <nav class="space-x-4">
        <ul class="space-x-4">
          <router-link to="/" class="text-green-500 hover:text-green-200 py-3">Search</router-link>
          <router-link to="/Browse" class="text-green-500 hover:text-green-200 p-3"
            >Browse</router-link
          ><router-link to="/favorites" class="text-green-500 hover:text-green-200 p-3"
            >Favorites</router-link
          >
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppLogo from '@/assets/images/recipe.svg'
</script>

<style scoped lang="scss">
.logo {
  color: hsla(160, 100%, 35%, 1);
}

@media (hover: hover) {
  a:hover:not(.logo) {
    color: hsl(160, 74%, 54%);
  }
}
.router-link-exact-active:not(.logo) {
  font-weight: 600;
}
</style>
