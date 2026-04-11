<script setup lang="ts">
import { Card } from '@kyokusu-ui/vue'

const propsDescription = [
  { name: 'variant', type: "'default' | 'outline' | 'ghost'", default: "'default'", desc: 'Визуальный стиль карточки.' },
  { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", desc: 'Внутренние отступы контента.' },
  { name: 'shadow', type: 'boolean', default: 'false', desc: 'Добавить тень карточке.' },
  { name: 'tag', type: 'string', default: "'div'", desc: 'HTML тег компонента (например: article, li).' }
]

const slotsDescription = [
  { name: 'header', desc: 'Слот для шапки карточки.' },
  { name: 'default', desc: 'Основной контент карточки.' },
  { name: 'footer', desc: 'Слот для подвала карточки.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Card</h3>
      <div class="demo-container">
        <Card>
          <p>This is a basic card component with default styling.</p>
        </Card>
      </div>
    </div>

    <div class="card">
      <h3>Card with Header and Footer</h3>
      <div class="demo-container">
        <Card>
          <template #header>Card Header</template>
          <p>Main content area of the card. The card automatically distributes space perfectly.</p>
          <template #footer>Card Footer</template>
        </Card>
      </div>
    </div>

    <div class="card">
      <h3>Card Variants</h3>
      <div class="demo-container">
        <div class="variant-grid">
          <Card variant="default">Default Card</Card>
          <Card variant="outline">Outline Card</Card>
          <Card variant="ghost">Ghost Card</Card>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Card with Shadow</h3>
      <div class="demo-container">
        <div class="variant-grid">
          <Card>Without Shadow</Card>
          <Card shadow>With Shadow</Card>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Padding Variants</h3>
      <div class="demo-container">
        <div class="padding-grid">
          <Card padding="none">No padding</Card>
          <Card padding="sm">Small padding</Card>
          <Card padding="md">Medium padding</Card>
          <Card padding="lg">Large padding</Card>
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

    <div class="card props-table-card">
      <h3>Slots Reference</h3>
      <div class="table-wrapper">
        <table class="props-table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slot in slotsDescription" :key="slot.name">
              <td class="prop-name"><code>{{ slot.name }}</code></td>
              <td class="prop-desc">{{ slot.desc }}</td>
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

.variant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.padding-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
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
