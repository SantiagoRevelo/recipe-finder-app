<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <TheHeader />
    <div class="water-mark-wrapper">
      <RecipeLogo class="water-mark text-gray-100" />
    </div>
    <main class="flex-grow v mx-auto p-4">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import RecipeLogo from './assets/images/recipe.svg'
</script>

<style scoped lang="scss">
/* Estilos globales o de transición */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
main,
footer,
header {
  z-index: 1;
}
.water-mark-wrapper {
  position: absolute;
  inset: 30%;
  top: 45%;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  .water-mark {
    width: 100%;
    height: 100%;
  }
}
</style>
