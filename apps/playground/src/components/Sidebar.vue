<script setup lang="ts">
import { PhMoon, PhSun, PhToggleLeft, PhCursorClick, PhTextT } from '@phosphor-icons/vue'

const current = defineModel<string>('current', { required: true })
const theme = defineModel<boolean>('theme', { required: true })

const menuItems = [
  { id: 'Toggle', label: 'Toggle', disabled: false, icon: PhToggleLeft },
  { id: 'Button', label: 'Button (WIP)', disabled: true, icon: PhCursorClick },
  { id: 'Input', label: 'Input (WIP)', disabled: true, icon: PhTextT }
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <span class="logo">Kyokusu UI</span>
      
      <div class="theme-switcher">
        <span 
            class="theme-label"
            @click="theme = !theme"
            >
          <component :is="theme ? PhMoon : PhSun" :size="16" weight="bold" />
          Theme
        </span>
      </div>
    </div>
    
    <nav class="menu">
      <button 
        v-for="item in menuItems"
        :key="item.id"
        :class="{ active: current === item.id }"
        :disabled="item.disabled"
        :title="item.disabled ? 'Soon...' : ''"
        @click="current = item.id"
      >
        <component :is="item.icon" :size="20" weight="duotone" />
        {{ item.label }}
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.theme-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-muted);
  transition: color 0.2s ease-in-out;
}

.theme-label:hover {
  color: var(--text-primary);
}

.menu button {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-switcher {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}
</style>