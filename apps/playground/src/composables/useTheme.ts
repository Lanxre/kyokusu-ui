import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../stores/app'

export function useTheme() {
  const appStore = useAppStore()
  const { isDark } = storeToRefs(appStore)

  const initTheme = () => {
    watch(isDark, (val) => {
      if (val) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, { immediate: true })
  }

  return {
    initTheme,
    isDark,
    toggleTheme: appStore.toggleTheme
  }
}