<script setup lang="ts">
import { ref } from 'vue'
import { ModalWindow } from '@kyokusu-ui/vue'

const isBasicOpen = ref(false)
const isCustomOpen = ref(false)

const propsDescription = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'Управляет видимостью модального окна.' },
  { name: 'title', type: 'string', default: 'undefined', desc: 'Заголовок модального окна.' },
  { name: 'width', type: 'string', default: "'max-w-lg'", desc: 'Максимальная ширина окна (классы Tailwind/Core CSS).' },
  { name: 'height', type: 'string', default: 'undefined', desc: 'Высота или классы для контейнера контента.' },
  { name: 'centerTitle', type: 'boolean', default: 'false', desc: 'Выравнивает заголовок по центру.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Modal</h3>
      <div class="demo-container">
        <button class="demo-btn" @click="isBasicOpen = true">Open Basic Modal</button>
        
        <ModalWindow v-model="isBasicOpen" title="Basic Modal Title">
          <p class="demo-text">
            This is the content of the basic modal. You can place any elements here.
            Press Escape or click outside to close.
          </p>
        </ModalWindow>
      </div>
    </div>

    <div class="card">
      <h3>Customized Modal</h3>
      <div class="demo-container">
        <button class="demo-btn" @click="isCustomOpen = true">Open Custom Modal</button>
        
        <ModalWindow 
          v-model="isCustomOpen" 
          title="Delete Confirmation" 
          width="max-w-sm" 
          centerTitle
        >
          <div class="text-center">
            <p class="demo-text mb-4">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
          <template #footer>
            <button class="demo-btn secondary" @click="isCustomOpen = false">Cancel</button>
            <button class="demo-btn danger" @click="isCustomOpen = false">Delete</button>
          </template>
        </ModalWindow>
      </div>
    </div>

    <div class="card props-table-card">
      <h3>Props Reference</h3>
      <div class="table-wrapper">
        <table class="props-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in propsDescription" :key="prop.name">
              <td class="prop-name"><code>{{ prop.name }}</code></td>
              <td class="prop-type"><code>{{ prop.type }}</code></td>
              <td class="prop-default"><code>{{ prop.default }}</code></td>
              <td class="prop-desc">{{ prop.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  margin-top: 16px;
}

.demo-text {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
}

.demo-btn {
  background-color: var(--bg-hover-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-btn:hover {
  background-color: var(--border-color);
}

.demo-btn.secondary {
  background-color: transparent;
  border-color: var(--border-color);
}
.demo-btn.secondary:hover {
  background-color: var(--bg-hover-secondary);
}

.demo-btn.danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: #ef4444;
}
.demo-btn.danger:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.text-center {
  text-align: center;
}
.mb-4 {
  margin-bottom: 16px;
}

.props-table-card { overflow: hidden; padding: 0; }
.props-table-card h3 { padding: 24px 24px 0 24px; }
.table-wrapper { overflow-x: auto; margin-top: 12px; }
.props-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.props-table th { background: var(--bg-hover-secondary); padding: 12px 24px; color: var(--text-main); font-weight: 600; border-bottom: 1px solid var(--border-color); }
.props-table td { padding: 16px 24px; border-bottom: 1px solid var(--border-color); color: var(--text-main); vertical-align: top; }
.props-table tr:last-child td { border-bottom: none; }
.prop-name code { color: #ec4899; font-weight: 600; }
.prop-type code { color: #3b82f6; }
.prop-default code { color: var(--text-muted); }
.prop-desc { line-height: 1.5; color: var(--text-muted); }
code { font-family: 'JetBrains Mono', 'Fira Code', monospace; background: var(--bg-hover-secondary); padding: 2px 6px; border-radius: 4px; font-size: 12px; }
</style>
