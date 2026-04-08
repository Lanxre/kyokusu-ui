<script setup lang="ts">
import { Separator } from '@kyokusu-ui/vue'

const propsDescription = [
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: 'Направление разделителя.' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Текст, который выводится поверх линии (только для horizontal).' },
  { name: 'labelPosition', type: "'left' | 'center' | 'right'", default: "'center'", desc: 'Позиция текста на линии.' },
  { name: 'dashed', type: 'boolean', default: 'false', desc: 'Пунктирная линия вместо сплошной.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Horizontal</h3>
      <p class="demo-text">Content above the separator.</p>
      <Separator />
      <p class="demo-text">Content below the separator.</p>
    </div>

    <div class="card">
      <h3>With Labels</h3>
      <p class="demo-text">Center aligned label (default)</p>
      <Separator label="OR CONTINUE WITH" />
      
      <p class="demo-text">Left aligned label</p>
      <Separator label="Section Title" labelPosition="left" />
      
      <p class="demo-text">Right aligned label</p>
      <Separator label="Scroll Down" labelPosition="right" />
    </div>

    <div class="card">
      <h3>Dashed Variant</h3>
      <Separator dashed />
      <br>
      <Separator label="Dashed with Label" dashed />
    </div>

    <div class="card">
      <h3>Vertical Separator</h3>
      <div class="toolbar-demo">
        <button class="toolbar-btn">Bold</button>
        <button class="toolbar-btn">Italic</button>
        <Separator orientation="vertical" />
        <button class="toolbar-btn">Link</button>
        <button class="toolbar-btn">Quote</button>
        <Separator orientation="vertical" dashed />
        <button class="toolbar-btn">Save</button>
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
.demo-text {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 8px;
  margin-top: 16px;
}

.demo-text:first-of-type {
  margin-top: 8px;
}

.toolbar-demo {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--bg-hover-secondary);
  border-radius: 8px;
  padding: 0 8px;
  gap: 4px;
}

.toolbar-btn {
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-main);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.toolbar-btn:hover {
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