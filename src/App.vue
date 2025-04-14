<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <TheHeader />
    <div class="water-mark-wrapper">
      <RecipeLogo class="water-mark text-gray-100" />
    </div>
    <main class="flex-grow container mx-auto p-4">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter />
    <AppNotification />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import RecipeLogo from '@/assets/images/recipe.svg'
import AppNotification from '@/components/AppNotification.vue'

import { useCategoryStore } from './stores/categoryStore'

const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.fetchCategories()
})
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

  top: 30%;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  .water-mark {
    width: 100%;
    height: 100%;
  }
}
</style>
