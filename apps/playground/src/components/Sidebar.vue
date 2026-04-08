<script setup lang="ts">
import { 
  PhMoon, 
  PhSun, 
  PhToggleLeft, 
  PhCursorClick, 
  PhTextT, 
  PhListDashes,
  PhTextAa,
  PhTimer,
  PhSelectionAll,
  PhLineSegment
} from '@phosphor-icons/vue'

const current = defineModel<string>('current', { required: true })
const theme = defineModel<boolean>('theme', { required: true })

const groups = [
  {
    label: 'Form',
    items: [
      { id: 'Input', label: 'Input', icon: PhTextT },
      { id: 'Select', label: 'Select', icon: PhListDashes },
      { id: 'MultiSelect', label: 'MultiSelect', icon: PhSelectionAll, disabled: true },
      { id: 'SearchSelect', label: 'SearchSelect', icon: PhCursorClick, disabled: true },
      { id: 'DatePicker', label: 'DatePicker', icon: PhTimer }
    ]
  },
  {
    label: 'Content',
    items: [
      { id: 'RichText', label: 'Rich Text', icon: PhTextAa },
      { id: 'Label', label: 'Label', icon: PhCursorClick, disabled: true },
      { id: 'Separator', label: 'Separator', icon: PhLineSegment }
    ]
  },
  {
    label: 'Controls',
    items: [
      { id: 'Toggle', label: 'Toggle', icon: PhToggleLeft },
      { id: 'Button', label: 'Button', icon: PhCursorClick, disabled: true },
      { id: 'ToolTip', label: 'ToolTip', icon: PhCursorClick, disabled: true },
      { id: 'Notification', label: 'Notification', icon: PhCursorClick, disabled: true }
    ]
  }
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <span class="logo">Kyokusu UI</span>

      <div class="theme-switcher">
        <span class="theme-label" @click="theme = !theme">
          <component :is="theme ? PhMoon : PhSun" :size="16" weight="bold" />
          Theme
        </span>
      </div>
    </div>

    <nav class="menu">
      <div v-for="group in groups" :key="group.label" class="menu-group">
        <div class="menu-group-label">
          {{ group.label }}
        </div>

        <button
          v-for="item in group.items"
          :key="item.id"
          :class="{ active: current === item.id }"
          :disabled="item.disabled"
          :title="item.disabled ? 'Soon...' : ''"
          @click="current = item.id"
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