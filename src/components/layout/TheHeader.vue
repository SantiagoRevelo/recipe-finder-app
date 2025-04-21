<template>
  <header class="bg-white text-white shadow-md py-4 relative">
    <div class="mx-auto flex justify-between items-center">
      <router-link
        to="/"
        class="text-green-500 text-2xl flex items-center py-3 font-bold hover:text-green-400"
        @click="handleHomeLinkClick"
      >
        <AppLogo class="inline-block w-8 h-8 mr-2" />
        <span class="text-2xl font-bold">Recipe Finder</span>
      </router-link>

      <nav class="hidden md:flex space-x-4">
        <router-link
          to="/"
          class="text-green-500 hover:text-green-400"
          active-class="text-green-500 font-semibold"
          @click="handleHomeLinkClick"
          >Search</router-link
        >
        <router-link
          to="/Browse"
          class="text-green-500 hover:text-green-400"
          active-class="text-green-500 font-semibold"
        >
          Browse
        </router-link>
        <router-link
          to="/favorites"
          class="text-green-500 hover:text-green-400"
          active-class="text-green-500 font-semibold"
        >
          Favorites
        </router-link>
      </nav>
      <div class="md:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-green-500 hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">Open main menu</span>
          <BurgerMenuIcon v-if="!isMobileMenuOpen" aria-hidden="true" />
          <CloseMenuIcon v-else aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isMobileMenuOpen"
        id="mobile-menu"
        class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium text-green-500 hover:text-white hover:bg-green-400"
            active-class="text-white bg-green-500"
            @click="handleHomeLinkClick(true)"
            >Buscar</router-link
          >
          <router-link
            to="/browse"
            class="block px-3 py-2 rounded-md text-base font-medium text-green-500 hover:text-white hover:bg-green-400"
            active-class="text-white bg-green-500"
            @click="closeMobileMenu"
            >Categorías</router-link
          >
          <router-link
            to="/favorites"
            class="block px-3 py-2 rounded-md text-base font-medium text-green-500 hover:text-white hover:bg-green-400"
            active-class="text-white bg-green-400"
            @click="closeMobileMenu"
            >Favoritos</router-link
          >
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSearchStore } from '@/stores/searchStore'

import AppLogo from '@/assets/images/recipe.svg'
import BurgerMenuIcon from '@/assets/images/burgerMenuIcon.svg'
import CloseMenuIcon from '@/assets/images/closeMenuIcon.svg'

const searchStore = useSearchStore()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const checkResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

const handleHomeLinkClick = (closeTheMobileMenu: boolean = false) => {
  searchStore.clearSearchState()
  if (closeTheMobileMenu) {
    closeMobileMenu()
  }
}

onMounted(() => window.addEventListener('resize', checkResize))

onUnmounted(() => window.removeEventListener('resize', checkResize))
</script>
