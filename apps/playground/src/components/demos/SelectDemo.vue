<script setup lang="ts">
import { ref, computed } from 'vue'
import { Select } from '@kyokusu-ui/vue'

const selectedFruit = ref('')
const selectedFramework = ref('vue')
const selectedDisabled = ref('locked')
const selectedUserId = ref('')

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit' }
]

const frameworkOptions = [
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' }
]

const rawUsers = [
  { id: 'usr-101', name: 'Alexey', role: 'DevOps', status: 'Active' },
  { id: 'usr-102', name: 'Eugene', role: 'Backend', status: 'Offline' },
  { id: 'usr-103', name: 'Maria', role: 'Design', status: 'Active' }
]

const userOptions = rawUsers.map(user => ({
  value: user.id,
  label: `${user.name} (${user.role})`
}))

const fullSelectedUser = computed(() => {
  return rawUsers.find(u => u.id === selectedUserId.value) || null
})

const propsDescription = [
  { name: 'v-model (modelValue)', type: 'string', default: "''", desc: 'Текущее выбранное значение.' },
  { name: 'options', type: 'Option[]', default: '[]', desc: 'Массив объектов { value, label } для списка.' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Текст подписи над селектом.' },
  { name: 'placeholder', type: 'string', default: 'undefined', desc: 'Текст, отображаемый, когда ничего не выбрано.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Блокирует выбор.' },
  { name: 'id', type: 'string', default: 'useId()', desc: 'Автоматический ID для связки label и select.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Usage</h3>
      <Select 
        v-model="selectedFruit" 
        label="Select a fruit"
        placeholder="Choose something tasty..."
        :options="fruitOptions"
      />
      <div class="status">
          <span> Selected: </span> 
          <span :style="{ color: selectedFruit ? '#10b981' : '#ef4444' }" style="font-weight: bold;">
            {{ selectedFruit || 'Nothing' }}
          </span>
      </div>
    </div>

    <div class="card">
      <h3>Preselected Value</h3>
      <Select 
        v-model="selectedFramework" 
        label="Favorite Framework"
        :options="frameworkOptions"
      />
      <div class="status">
          <span> Current: </span> 
          <span :style="{ color: selectedFramework ? '#10b981' : '#ef4444' }" style="font-weight: bold;">
            {{ selectedFramework || 'Nothing' }}
          </span>
      </div>
    </div>

    <div class="card">
      <h3>Complex Data Mapping</h3>
      <Select 
        v-model="selectedUserId" 
        label="Assign to team member"
        placeholder="Select user..."
        :options="userOptions"
      />

      <div class="status">
          <span> Selected ID: </span> 
          <span :style="{ color: selectedUserId ? '#10b981' : '#ef4444' }" style="font-weight: bold;">
            {{ selectedUserId || 'Nothing' }}
          </span>
          <p>Full Object Data:</p>
          <pre class="json-preview">{{ fullSelectedUser || 'null' }}</pre>
      </div>
    </div>

    <div class="card">
      <h3>Disabled State</h3>
      <Select 
        v-model="selectedDisabled" 
        :disabled="true"
        label="System Setting (Locked)"
        :options="[{ value: 'locked', label: 'Encryption Enabled' }]"
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
  display: flex;
  align-items: center;
  justify-items: center;
  margin-top: 16px;
  margin-left: 3px;
  font-size: 14px;
  color: var(--text-muted);
}

.mt-2 {
  margin-top: 8px;
}

.json-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  padding: 5px;
  background: var(--bg-hover-secondary);
  border-radius: 6px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: #3b82f6;
  white-space: pre-wrap;
  word-break: break-all;
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