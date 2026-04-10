<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@kyokusu-ui/vue'
import { PhPaperPlaneTilt, PhTrash, PhArrowRight } from '@phosphor-icons/vue'

const isLoading = ref(false)

const startLoading = () => {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 2000)
}

const propsDescription = [
    { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent'", default: "'primary'", desc: 'Визуальный стиль кнопки.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", desc: 'Размер кнопки.' },
    { name: 'glow', type: 'boolean', default: 'false', desc: 'Включает неоновое свечение (box-shadow) цвета фона кнопки.' },
    { name: 'block', type: 'boolean', default: 'false', desc: 'Кнопка занимает 100% ширины родителя.' },
    { name: 'disabled', type: 'boolean', default: 'false', desc: 'Отключает взаимодействие с кнопкой.' },
    { name: 'loading', type: 'boolean', default: 'false', desc: 'Показывает спиннер загрузки и блокирует клики.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Variants</h3>
      <div class="demo-flex">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="accent">Accent</Button>
      </div>
    </div>

    <div class="card">
      <h3>Glowing Buttons</h3>
      <div class="demo-flex">
        <Button variant="primary" glow>Primary Glow</Button>
        <Button variant="danger" glow>Danger Glow</Button>
        <Button variant="accent" glow>Accent Glow</Button>
      </div>
    </div>

    <div class="card">
      <h3>Sizes & Icons</h3>
      <div class="demo-flex items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="secondary" aria-label="Delete">
            <PhTrash weight="fill" :size="20" />
        </Button>
        
        <Button variant="accent">
            Send Message
            <template #icon-right>
                <PhPaperPlaneTilt weight="fill" :size="16" />
            </template>
        </Button>

        <Button variant="outline">
            <template #icon-left>
                <PhArrowRight :size="16" />
            </template>
            Continue
        </Button>
      </div>
    </div>

    <div class="card">
      <h3>States</h3>
      <div class="demo-flex">
        <Button disabled>Disabled</Button>
        <Button variant="danger" disabled>Disabled Danger</Button>
        <Button variant="accent" :loading="isLoading" @click="startLoading">
            Click to Load
        </Button>
      </div>
    </div>

    <div class="card">
      <h3>Block Button</h3>
      <div class="demo-block">
        <Button variant="primary" block>100% Width Button</Button>
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
  gap: 16px;
  margin-top: 16px;
}
.items-center {
    align-items: center;
}
.demo-block {
  margin-top: 16px;
  width: 100%;
  max-width: 400px;
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