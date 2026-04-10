<script setup lang="ts">
import { Label } from '@kyokusu-ui/vue'

const propsDescription = [
  { name: 'label', type: 'string', default: 'undefined', desc: 'Текст для отображения.' },
  { name: 'for', type: 'string', default: 'undefined', desc: 'Привязка метки к ID инпута.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Usage</h3>
      <div class="demo-container">
        <Label label="First Name" />
      </div>
    </div>

    <div class="card">
      <h3>With Input Association (for)</h3>
      <div class="demo-container">
        <Label label="Email Address" for="email-input" />
        <input 
            id="email-input" 
            type="email" 
            placeholder="john@example.com"
            class="demo-input mt-2" 
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
.demo-container {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 320px;
}

.demo-input {
  width: 100%;
  background-color: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px 14px;
  font-family: inherit;
  font-size: 14px;
  color: var(--text-main);
  outline: none;
  transition: border-color 0.2s ease;
}

.demo-input:focus {
  border-color: #18181b;
}

.dark .demo-input:focus {
  border-color: #ffffff;
}

.mt-2 {
    margin-top: 8px;
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