// src/stores/notificationStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Tipos para las notificaciones
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export const useNotificationStore = defineStore('notification', () => {
  // --- State ---
  const message = ref<string | null>(null)
  const type = ref<NotificationType>('info')
  const isVisible = ref(false)
  const timeoutId = ref<number | null>(null)

  // --- Actions ---
  function showNotification(
    newMessage: string,
    newType: NotificationType = 'info',
    duration: number = 3000,
  ) {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }

    message.value = newMessage
    type.value = newType
    isVisible.value = true

    timeoutId.value = window.setTimeout(() => {
      hideNotification()
    }, duration)
  }

  function hideNotification() {
    isVisible.value = false
    // Opcional: resetear mensaje y tipo después de la transición de ocultado
    // setTimeout(() => {
    //   if (!isVisible.value) { // Comprobar por si se mostró otra mientras tanto
    //      message.value = null;
    //      type.value = 'info';
    //   }
    // }, 300); // Ajustar a la duración de tu transición CSS
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
  }

  return {
    message,
    type,
    isVisible,
    showNotification,
    hideNotification,
  }
})
