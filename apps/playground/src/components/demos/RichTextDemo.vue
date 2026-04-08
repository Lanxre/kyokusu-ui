<script setup lang="ts">
import { ref } from 'vue'
import { RichText } from '@kyokusu-ui/vue'

const basicContent = ref('')
const limitedContent = ref('<b>Text</b> for example.')
const errorContent = ref('')

const propsDescription = [
  { name: 'v-model', type: 'string', default: "''", desc: 'HTML контент редактора.' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Текст подписи.' },
  { name: 'maxLength', type: 'number', default: 'undefined', desc: 'Лимит символов (чистого текста).' },
  { name: 'error', type: 'string', default: 'undefined', desc: 'Текст ошибки и красная рамка.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Блокировка редактора.' },
  { name: 'placeholder', type: 'string', default: 'undefined', desc: 'Текст-заглушка.' },
  { name: 'id', type: 'string', default: 'useId()', desc: 'Автоматический ID.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Usage</h3>
      <RichText 
        v-model="basicContent" 
        label="Description"
        placeholder="Type something amazing..."
      />
      <div class="status">
        <span> Output: </span>
        <span class="preview"> {{ basicContent || 'Empty' }} </span>
      </div>
    </div>

    <div class="card">
      <h3>With Character Limit & Prefilled</h3>
      <RichText 
        v-model="limitedContent" 
        label="Short Bio"
        :maxLength="100"
      />
    </div>

    <div class="card">
      <h3>Error & Disabled States</h3>
      <div class="flex-col-gap">
        <RichText 
          v-model="errorContent" 
          label="Required Field"
          error="This field cannot be empty"
        />
        <RichText 
          modelValue="<i>You cannot edit this text.</i>" 
          label="Locked Content"
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
  margin-left: 4px;
  font-size: 14px;
  color: var(--text-muted);
}

.preview {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;  
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