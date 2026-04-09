<script setup lang="ts">
import { Tooltip } from '@kyokusu-ui/vue'

const propsDescription = [
  { name: 'text', type: 'string', default: 'undefined', desc: 'Текст, который отображается в тултипе.' },
  { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", desc: 'Позиция тултипа относительно элемента.' },
  { name: 'delay', type: 'number', default: '200', desc: 'Задержка перед появлением тултипа (в мс).' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Tooltips</h3>
      <div class="tooltip-container">
        <Tooltip text="Tooltip on Top" position="top">
          <button class="demo-btn">Hover Top</button>
        </Tooltip>
        
        <Tooltip text="Tooltip on Bottom" position="bottom">
          <button class="demo-btn">Hover Bottom</button>
        </Tooltip>

        <Tooltip text="Tooltip on Left" position="left">
          <button class="demo-btn">Hover Left</button>
        </Tooltip>

        <Tooltip text="Tooltip on Right" position="right">
          <button class="demo-btn">Hover Right</button>
        </Tooltip>
      </div>
    </div>

    <div class="card">
      <h3>Delay</h3>
      <div class="tooltip-container">
        <Tooltip text="I appear instantly!" :delay="0">
          <button class="demo-btn">No Delay</button>
        </Tooltip>

        <Tooltip text="I am very slow..." :delay="1000">
          <button class="demo-btn">1000ms Delay</button>
        </Tooltip>
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
.tooltip-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
  padding: 32px;
  justify-content: center;
}

.demo-btn {
  background-color: var(--bg-hover-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-btn:hover {
  background-color: var(--border-color);
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