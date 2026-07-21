<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NotificationContainer, useNotificationProvider } from '@kyokusu-ui/vue'
import { useAppStore } from './stores/app'
import { useTheme } from './composables/useTheme'
import Sidebar from './components/layout/Sidebar.vue'
import { componentDemos } from './config/demos'
import { onMounted, onUnmounted } from 'vue'

const { initTheme } = useTheme()
initTheme()

const appStore = useAppStore()
const { currentComponent } = storeToRefs(appStore)

const { notifications, remove } = useNotificationProvider()

function handleSwitchThemeKey(event: KeyboardEvent) {
  if (event.key === 'd') {
      event.preventDefault()
      appStore.toggleTheme();
    }
}

onMounted(() => window.addEventListener('keydown', handleSwitchThemeKey))
onUnmounted(() => window.removeEventListener('keydown', handleSwitchThemeKey))
</script>

<template>
  <div class="playground-layout">
    <Sidebar />

    <main class="content">
      <header class="content-header">
        <h1>{{ currentComponent }} Component</h1>
      </header>

      <section class="preview-area">
        <component 
          v-if="componentDemos[currentComponent]" 
          :is="componentDemos[currentComponent]" 
        />
        
        <div v-else class="empty-state">
          Выберите компонент из меню слева
        </div>
      </section>
    </main>

    <NotificationContainer :notifications="notifications" @remove="remove" position="top-right" />
  </div>
</template>
