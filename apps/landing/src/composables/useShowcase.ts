import { ref } from 'vue'

export function useShowcase() {
  const toggleVal = ref(true)
  const searchVal = ref<string | null>(null)
  const searchOpts = ['Inter', 'SF Pro', 'Geist', 'JetBrains Mono', 'Fira Code']

  return {
    toggleVal,
    searchVal,
    searchOpts
  }
}
