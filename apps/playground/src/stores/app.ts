import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const currentComponent = ref('Toggle')
  const isDark = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const setCurrentComponent = (componentId: string) => {
    currentComponent.value = componentId
  }

  return {
    currentComponent,
    isDark,
    toggleTheme,
    setCurrentComponent
  }
})