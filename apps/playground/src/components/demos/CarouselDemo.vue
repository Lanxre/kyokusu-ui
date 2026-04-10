<script setup lang="ts">
import { Carousel } from '@kyokusu-ui/vue'

const demoItems = [
  'Slide 1: Welcome to Kyokusu UI',
  'Slide 2: Building fast interfaces',
  'Slide 3: Accessible and themeable',
  'Slide 4: Vue 3 Composition API',
  'Slide 5: Vanilla Core architecture',
  'Slide 6: Draggable & Snapping',
  'Slide 7: Ready for production!'
]

const propsDescription = [
  { name: 'items', type: 'any[]', default: '[]', desc: 'Массив элементов для карусели.' },
  { name: 'interval', type: 'number', default: '5', desc: 'Интервал автопрокрутки в секундах (0 для отключения).' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Draggable Carousel (Autoplay: 5s)</h3>
      <div class="demo-container">
        <Carousel :items="demoItems">
          <template #card="{ item }">
            <div class="demo-slide">
              {{ item }}
            </div>
          </template>
        </Carousel>
      </div>
    </div>

    <div class="card">
      <h3>Manual Only (interval: 0)</h3>
      <div class="demo-container">
        <Carousel :items="demoItems" :interval="0">
          <template #card="{ item }">
            <div class="demo-slide variant">
              {{ item }}
            </div>
          </template>
        </Carousel>
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
  margin-top: 16px;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: var(--bg-hover-secondary);
  overflow: hidden;
  padding-left: 14px;
}

.demo-slide {
  width: 240px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, #18181b, #3f3f46);
  color: white;
  border-radius: 16px;
  font-weight: 600;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.1);
}

.demo-slide.variant {
  background: linear-gradient(135deg, #eab308, #ca8a04);
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.2);
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