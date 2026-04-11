<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PhMoon, PhSun } from '@phosphor-icons/vue'
import { useAppStore } from '../../stores/app'
import { navigationGroups } from '../../config/navigation'

const appStore = useAppStore()
const { currentComponent, isDark } = storeToRefs(appStore)
const { toggleTheme, setCurrentComponent } = appStore
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <a href="/" class="logo">Kyokusu UI</a>

      <div class="theme-switcher">
        <span class="theme-label" @click="toggleTheme">
          <component :is="isDark ? PhMoon : PhSun" :size="16" weight="bold" />
          Theme
        </span>
      </div>
    </div>

    <nav class="menu">
      <div v-for="group in navigationGroups" :key="group.label" class="menu-group">
        <div class="menu-group-label">
          {{ group.label }}
        </div>

        <button
          v-for="item in group.items"
          :key="item.id"
          :class="{ active: currentComponent === item.id }"
          :disabled="item.disabled"
          :title="item.disabled ? 'Soon...' : ''"
          @click="setCurrentComponent(item.id)"
        >
          <component :is="item.icon" :size="20" weight="duotone" />
          {{ item.label }}
        </button>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
}

.logo {
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  color: var(--text-primary);
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 4px;
}

.menu-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-group-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 4px 6px;
  text-transform: uppercase;
}

.menu button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  transition: 0.2s;
}

.menu button:hover:not(:disabled) {
  background: var(--k-bg-soft);
  color: var(--text-primary);
}

.menu button.active {
  background: var(--k-bg-soft);
  color: var(--text-primary);
  font-weight: 500;
}

.menu button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.theme-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-muted);
  transition: 0.2s;
}

.theme-label:hover {
  color: var(--text-primary);
}

.theme-switcher {
  display: flex;
  align-items: flex-start;
}
</style>
