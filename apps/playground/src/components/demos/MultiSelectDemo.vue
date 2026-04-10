<script setup lang="ts">
import { ref } from 'vue'
import { MultiSelect } from '@kyokusu-ui/vue'

const selectedFrameworks = ref<string[]>([])
const selectedCities = ref([{ id: 'msk', label: 'Москва' }])
const selectedEmpty = ref<string[]>([])

const cities = [
  { id: 'msk', label: 'Москва' },
  { id: 'spb', label: 'Санкт-Петербург' },
  { id: 'nsk', label: 'Новосибирск' },
  { id: 'ekb', label: 'Екатеринбург' },
  { id: 'kaz', label: 'Казань' }
]

const frameworks = [
  'Vue.js',
  'React',
  'Angular',
  'Svelte',
  'Solid.js',
  'Qwik'
]

const propsDescription = [
  { name: 'modelValue', type: '(string | number | Option)[]', default: '[]', desc: 'Массив выбранных значений.' },
  { name: 'options', type: '(string | Option)[]', default: '[]', desc: 'Список доступных опций.' },
  { name: 'label', type: 'string', default: 'undefined', desc: 'Лейбл над селектом.' },
  { name: 'placeholder', type: 'string', default: "''", desc: 'Текст когда ничего не выбрано.' },
  { name: 'loading', type: 'boolean', default: 'false', desc: 'Показывает спиннер загрузки.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Блокирует поле для взаимодействия.' },
  { name: 'error', type: 'string', default: 'undefined', desc: 'Текст ошибки под полем.' }
]

const isSearching = ref(false)
const remoteOptions = ref<{id: string, label: string}[]>([])

const handleSearch = (query: string) => {
  if (!query) {
    remoteOptions.value = []
    return
  }
  isSearching.value = true
  setTimeout(() => {
    remoteOptions.value = [
      { id: `res1-${query}`, label: `Результат 1: ${query}` },
      { id: `res2-${query}`, label: `Результат 2: ${query}` }
    ]
    isSearching.value = false
  }, 1000)
}
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic MultiSelect (String Array)</h3>
      <p class="demo-text">Selected count: <strong>{{ selectedFrameworks.length }}</strong></p>
      
      <div class="demo-container">
        <MultiSelect 
          v-model="selectedFrameworks" 
          :options="frameworks" 
          label="Выберите фреймворки"
          placeholder="Начните вводить..."
        />
      </div>
    </div>

    <div class="card">
      <h3>Object Array & Preselected</h3>
      <div class="demo-container">
        <MultiSelect 
          v-model="selectedCities" 
          :options="cities" 
          label="Города доставки"
          placeholder="Выберите города..."
        />
      </div>
    </div>

    <div class="card">
      <h3>Async Search Simulation</h3>
      <div class="demo-container">
        <MultiSelect 
          v-model="selectedEmpty" 
          :options="remoteOptions" 
          :loading="isSearching"
          label="Поиск по API"
          placeholder="Введите запрос..."
          @search="handleSearch"
        />
      </div>
    </div>

    <div class="card">
      <h3>States</h3>
      <div class="demo-grid">
        <div>
          <p class="demo-text">Disabled</p>
          <MultiSelect 
            v-model="selectedCities" 
            :options="cities" 
            label="Disabled Select"
            disabled
          />
        </div>
        <div>
          <p class="demo-text">Error</p>
          <MultiSelect 
            v-model="selectedEmpty" 
            :options="cities" 
            label="Invalid Select"
            error="Выберите хотя бы один вариант"
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
}

.demo-container {
  max-width: 420px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
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