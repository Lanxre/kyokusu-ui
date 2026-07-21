<script setup lang="ts">
import { Badge } from '@kyokusu-ui/vue'
import { PhStar, PhArrowRight, PhCheck, PhWarning, PhInfo } from '@phosphor-icons/vue'

const propsDescription = [
    { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'", default: "'default'", desc: 'Визуальный стиль бейджа.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Размер бейджа.' },
    { name: 'text', type: 'string', default: "''", desc: 'Текст бейджа (также поддерживается через slot).' },
    { name: 'bg', type: 'string', default: 'undefined', desc: 'Кастомный цвет фона.' },
    { name: 'icon', type: 'Component', default: 'undefined', desc: 'Иконка в начале бейджа.' },
    { name: 'iconStart', type: 'Component', default: 'undefined', desc: 'Иконка в начале (приоритет над icon).' },
    { name: 'iconEnd', type: 'Component', default: 'undefined', desc: 'Иконка в конце.' },
    { name: 'link', type: 'string', default: 'undefined', desc: 'Ссылка. Делает бейдж кликабельным, открывает в новой вкладке.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Variants</h3>
      <div class="demo-flex">
        <Badge variant="default" text="Default" />
        <Badge variant="secondary" text="Secondary" />
        <Badge variant="destructive" text="Destructive" />
        <Badge variant="outline" text="Outline" />
        <Badge variant="ghost" text="Ghost" />
      </div>
    </div>

    <div class="card">
      <h3>Sizes</h3>
      <div class="demo-flex items-center">
        <Badge size="sm" text="Small" />
        <Badge size="md" text="Medium" />
        <Badge size="lg" text="Large" />
      </div>
    </div>

    <div class="card">
      <h3>With Icons</h3>
      <div class="demo-flex">
        <Badge :icon="PhStar" text="Featured" />
        <Badge :icon="PhCheck" variant="secondary" text="Verified" />
        <Badge :icon="PhWarning" variant="destructive" text="Warning" />
        <Badge :iconEnd="PhArrowRight" text="Learn more" />
        <Badge :icon="PhInfo" :iconEnd="PhArrowRight" text="Info link" />
      </div>
    </div>

    <div class="card">
      <h3>Custom Background</h3>
      <div class="demo-flex">
        <Badge bg="#10b981" text="Success" />
        <Badge bg="#8b5cf6" text="Purple" />
        <Badge bg="#f59e0b" text="Warning" />
        <Badge bg="#ec4899" text="Pink" />
      </div>
    </div>

    <div class="card">
      <h3>With Link</h3>
      <div class="demo-flex">
        <Badge link="https://vuejs.org" text="Vue.js" />
        <Badge link="https://github.com" variant="secondary" text="GitHub" />
        <Badge link="https://phosphoricons.com" :icon="PhStar" text="Phosphor Icons" />
      </div>
    </div>

    <div class="card">
      <h3>Slot Content</h3>
      <div class="demo-flex">
        <Badge variant="secondary">
          <span>Custom <strong>HTML</strong></span>
        </Badge>
        <Badge variant="outline">
          <span style="color: #3b82f6">Blue text</span>
        </Badge>
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
  gap: 12px;
  margin-top: 16px;
  align-items: center;
}
.items-center {
    align-items: center;
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
