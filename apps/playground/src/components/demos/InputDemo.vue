<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@kyokusu-ui/vue'

const basicVal = ref('')
const emailVal = ref('')
const passVal = ref('test')
const errorVal = ref('wrong_input')

const propsDescription = [
  { name: 'v-model', type: 'string', default: "''", desc: 'Значение инпута.' },
  { name: 'type', type: 'text | email | password | number | tel | url | search', default: "'text'", desc: 'Тип поля. Меняет иконки и поведение.' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Текст подписи над полем.' },
  { name: 'placeholder', type: 'string', default: 'undefined', desc: 'Плейсхолдер.' },
  { name: 'description', type: 'string', default: 'undefined', desc: 'Вспомогательный текст под инпутом.' },
  { name: 'error', type: 'string', default: 'undefined', desc: 'Текст ошибки. Перекрывает description.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Блокировка поля.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Text</h3>
      <Input 
        v-model="basicVal" 
        label="Username"
        placeholder="Enter your username"
        description="This will be displayed publicly."
      />
      <div class="status">
        <span> Value: </span>
        <strong>{{ basicVal || 'empty' }}</strong>
      </div>
    </div>

    <div class="card">
      <h3>Email Type</h3>
      <Input 
        v-model="emailVal" 
        type="email"
        label="Email Address"
        placeholder="you@example.com"
      />
      <div class="status">
        <span> Value: </span>
        <strong>{{ emailVal || 'empty' }}</strong>
      </div>
    </div>

    <div class="card">
      <h3>Password Type (Toggleable)</h3>
      <Input 
        v-model="passVal" 
        type="password"
        label="Secret Password"
        placeholder="Enter password"
      />
      <div class="status">
        <span> Value: </span> 
        <strong>{{ passVal || 'empty' }}</strong>
      </div>
    </div>

    <div class="card">
      <h3>Error & Disabled</h3>
      <div class="flex-col-gap">
        <Input 
          v-model="errorVal" 
          label="Validation Failed"
          error="This value is incorrect."
        />
        <Input 
          modelValue="System Locked" 
          label="Disabled Field"
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
  margin-top: 10px;
  margin-left: 4px;
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