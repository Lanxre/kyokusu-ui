<script setup lang="ts">
import { Spinner } from '@kyokusu-ui/vue'

const propsDescription = [
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'", desc: 'Размер спиннера. Можно указать строку (sm, md, lg, xl) или число в пикселях.' },
    { name: 'variant', type: "'default' | 'primary' | 'secondary'", default: "'default'", desc: 'Цветовая схема спиннера.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Sizes</h3>
      <div class="demo-flex items-center">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
    </div>

    <div class="card">
      <h3>Custom Sizes (px)</h3>
      <div class="demo-flex items-center">
        <Spinner :size="12" />
        <Spinner :size="20" />
        <Spinner :size="32" />
        <Spinner :size="48" />
        <Spinner :size="64" />
      </div>
    </div>

    <div class="card">
      <h3>Variants</h3>
      <div class="demo-flex items-center">
        <Spinner variant="default" />
        <Spinner variant="primary" />
        <Spinner variant="secondary" />
      </div>
    </div>

    <div class="card">
      <h3>Custom Size with Variant</h3>
      <div class="demo-flex items-center">
        <Spinner :size="40" variant="primary" />
        <Spinner :size="56" variant="secondary" />
        <Spinner :size="72" variant="primary" />
      </div>
    </div>

    <div class="card">
      <h3>On Different Backgrounds</h3>
      <div class="demo-flex">
        <div class="bg-white p-4 rounded">
          <Spinner variant="default" />
        </div>
        <div class="bg-dark p-4 rounded">
          <Spinner variant="default" />
        </div>
        <div class="bg-primary p-4 rounded">
          <Spinner variant="primary" />
        </div>
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
.demo-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 16px;
  align-items: center;
}
.items-center {
    align-items: center;
}

.bg-white {
    background-color: #ffffff;
}

.bg-dark {
    background-color: #18181b;
}

.bg-primary {
    background-color: #3b82f6;
}

.p-4 {
    padding: 16px;
}

.rounded {
    border-radius: 8px;
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
