<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@kyokusu-ui/vue'

const basicVal = ref('')
const prefilledVal = ref('2026-04-08')
const errorVal = ref('')
const enVal = ref('')

const propsDescription = [
  { name: 'v-model', type: 'string', default: "''", desc: 'Выбранная дата в формате YYYY-MM-DD или DD.MM.YYYY.' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Подпись над полем ввода.' },
  { name: 'placeholder', type: 'string', default: "зависит от locale", desc: 'Текст-заглушка.' },
  { name: 'locale', type: 'string', default: "'ru-RU'", desc: 'Локаль для форматирования дат (например, en-US, de-DE).' },
  { name: 'error', type: 'string', default: 'undefined', desc: 'Текст ошибки и красная обводка.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Блокировка компонента.' },
  { name: 'id', type: 'string', default: 'useId()', desc: 'Автоматический ID.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Datepicker</h3>
      <DatePicker 
        v-model="basicVal" 
        label="Select Date"
      />
      <div class="status">
        Value (ISO): <strong>{{ basicVal || 'empty' }}</strong>
      </div>
    </div>

    <div class="card">
      <h3>Prefilled & Custom Locale (en-US)</h3>
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <DatePicker 
          v-model="prefilledVal" 
          label="Event Date"
        />
        <DatePicker 
          v-model="enVal" 
          label="US Format"
          locale="en-US"
        />
      </div>
    </div>

    <div class="card">
      <h3>Error & Disabled States</h3>
      <div class="flex-col-gap">
        <DatePicker 
          v-model="errorVal" 
          label="Required Date"
          error="Please select a valid date."
        />
        <DatePicker 
          modelValue="2024-01-01" 
          label="Archived Date"
          :disabled="true"
        />
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
.flex-col-gap {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.status {
  margin-top: 16px;
  font-size: 14px;
  color: var(--text-muted);
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