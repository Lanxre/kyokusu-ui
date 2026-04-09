<script setup lang="ts">
import { ref } from 'vue'
import { SearchSelect } from '@kyokusu-ui/vue'

const selectedCity = ref<string | null>(null)
const selectedFramework = ref<string | null>('vue')
const selectedEmpty = ref<string | null>(null)

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
  'Пермь',
  'Волгоград'
]

const frameworks = [
  { id: 'vue', label: 'Vue.js' },
  { id: 'react', label: 'React' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'solid', label: 'Solid.js' },
  { id: 'qwik', label: 'Qwik' },
  { id: 'preact', label: 'Preact' },
  { id: 'alpine', label: 'Alpine.js' },
  { id: 'lit', label: 'Lit' },
  { id: 'ember', label: 'Ember.js' }
]

const propsDescription = [
  { name: 'modelValue', type: 'string | number | null', default: 'null', desc: 'Выбранное значение.' },
  { name: 'options', type: '(string | object)[]', default: '[]', desc: 'Список опций. Может быть массивом строк или объектов { id, label }.' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Текст лейбла (метки) над полем.' },
  { name: 'placeholder', type: 'string', default: "'Выберите из списка'", desc: 'Текст-плейсхолдер когда ничего не выбрано.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Блокирует поле для взаимодействия.' },
  { name: 'error', type: 'string', default: 'undefined', desc: 'Отображает красную обводку и текст ошибки под полем.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Search Select (String Array)</h3>
      <p class="demo-text">Selected value: <strong>{{ selectedCity || 'null' }}</strong></p>
      
      <div class="demo-container">
        <SearchSelect 
          v-model="selectedCity" 
          :options="cities" 
          label="Выберите город"
          placeholder="Поиск города..."
        />
      </div>
    </div>

    <div class="card">
      <h3>Object Array with Initial Value</h3>
      <p class="demo-text">Selected value: <strong>{{ selectedFramework || 'null' }}</strong></p>
      
      <div class="demo-container">
        <SearchSelect 
          v-model="selectedFramework" 
          :options="frameworks" 
          label="Favorite Framework"
          placeholder="Select framework..."
        />
      </div>
    </div>

    <div class="card">
      <h3>States</h3>
      <div class="demo-grid">
        <div>
          <p class="demo-text">Disabled</p>
          <SearchSelect 
            v-model="selectedEmpty" 
            :options="cities" 
            label="Disabled Select"
            disabled
          />
        </div>
        <div>
          <p class="demo-text">Error</p>
          <SearchSelect 
            v-model="selectedEmpty" 
            :options="cities" 
            label="Invalid Select"
            error="Это поле обязательно для заполнения"
          />
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
.demo-text {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 16px;
  margin-top: 8px;
  margin-left: 4px;
}

.demo-container {
  max-width: 320px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  max-width: 320px;
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