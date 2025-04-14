import { defineStore } from 'pinia'
import { ref } from 'vue'

const NOTIFICATION_TIMEOUT = 3000
const NOTIFICATION_FADEOUT_DURATION = 300

/**
 * Type for notifications
 */
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
    duration: number = NOTIFICATION_TIMEOUT,
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

    setTimeout(() => {
      if (!isVisible.value) {
        message.value = null
        type.value = 'info'
      }
    }, NOTIFICATION_FADEOUT_DURATION)

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
