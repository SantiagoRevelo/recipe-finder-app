<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="transform opacity-100 translate-y-0 sm:translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform opacity-100 translate-y-0 sm:translate-x-0"
    leave-to-class="transform opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-4 right-4 w-auto p-4 rounded-md shadow-lg text-white z-50"
      :class="notificationClasses"
      role="alert"
      aria-live="assertive"
    >
      <div class="flex items-center justify-between">
        <span>{{ message }}</span>
        <button
          @click="hideNotification"
          class="ml-4 p-1 rounded-full hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Cerrar notificación"
        >
          <close-icon />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import CloseIcon from '@/assets/images/close.svg'
const store = useNotificationStore()

const isVisible = computed(() => store.isVisible)
const message = computed(() => store.message)
const type = computed(() => store.type)
const hideNotification = store.hideNotification

const notificationClasses = computed(() => {
  switch (type.value) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-600'
    case 'warning':
      return 'bg-yellow-600'
    case 'info':
    default:
      return 'bg-blue-600'
  }
})
</script>
