<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '@kyokusu-ui/vue'

const toggleValue = ref(false)
const toggleDisabled = ref(false)

const propsDescription = [
  { name: 'v-model (modelValue)', type: 'boolean', default: 'false', desc: 'Управляет состоянием переключателя (вкл/выкл).' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Текст подписи рядом с компонентом.' },
  { name: 'id', type: 'string', default: 'useId()', desc: 'Уникальный идентификатор для связки label и button. Генерируется автоматически, если не передан.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Блокирует взаимодействие с компонентом.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Usage</h3>
      <Toggle 
        v-model="toggleValue" 
        label="Label: Enable / Disable"
        id="system-toggle"
      />
      <div class="status">
          Value: 
          <span class="toggle-value" :style="{ color: toggleValue ? '#10b981' : '#ef4444' }">
            {{ toggleValue }}
          </span>
      </div>
    </div>

    <div class="card">
      <h3>Disabled State</h3>
      <Toggle 
        v-model="toggleDisabled" 
        :disabled="true"
        label="Locked Setting"
      />
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
.status {
  margin-top: 16px;
  font-size: 14px;
  color: var(--text-muted);
}

.toggle-value {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  margin-left: 4px;
}

.props-table-card {
  overflow: hidden;
  padding: 0;
}

.props-table-card h3 {
  padding: 24px 24px 0 24px;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 12px;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

.props-table th {
  background: var(--bg-hover-secondary);
  padding: 12px 24px;
  color: var(--text-main);
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}

.props-table td {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-main);
  vertical-align: top;
}

.props-table tr:last-child td {
  border-bottom: none;
}

.prop-name code {
  color: #ec4899;
  font-weight: 600;
}

.prop-type code {
  color: #3b82f6;  
}

.prop-default code {
  color: var(--text-muted);
}

.prop-desc {
  line-height: 1.5;
  color: var(--text-muted);
}

code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  background: var(--bg-hover-secondary);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}
</style>