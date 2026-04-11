<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '@kyokusu-ui/vue'
import type { TableHeader } from '@kyokusu-ui/vue'

interface User {
    id: number;
    name: string;
    role: string;
    status: string;
    lastActive: string;
}

const headers: TableHeader<keyof User>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'lastActive', label: 'Last Active', sortable: true }
]

const users = ref<User[]>([
    { id: 1, name: 'Alice Smith', role: 'Admin', status: 'Active', lastActive: '2023-10-01' },
    { id: 2, name: 'Bob Jones', role: 'Editor', status: 'Inactive', lastActive: '2023-09-15' },
    { id: 3, name: 'Charlie Brown', role: 'Viewer', status: 'Active', lastActive: '2023-10-05' },
    { id: 4, name: 'Diana Prince', role: 'Admin', status: 'Active', lastActive: '2023-10-10' },
    { id: 5, name: 'Evan Wright', role: 'Editor', status: 'Active', lastActive: '2023-10-08' }
])

const handleEdit = (item: User) => {
    alert(`Editing ${item.name}`)
}

const handleDelete = (item: User) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        users.value = users.value.filter(u => u.id !== item.id)
    }
}

const propsDescription = [
  { name: 'headers', type: 'TableHeader[]', default: '[]', desc: 'Массив конфигураций колонок таблицы.' },
  { name: 'items', type: 'T[]', default: '[]', desc: 'Массив данных для отображения.' },
  { name: 'searchable', type: 'boolean', default: 'true', desc: 'Включить или отключить встроенный поиск.' },
  { name: 'searchPlaceholder', type: 'string', default: "'Search...'", desc: 'Текст плейсхолдера для инпута поиска.' },
  { name: 'showActions', type: 'boolean', default: 'true', desc: 'Отображать колонку с действиями (Редактировать / Удалить).' },
  { name: 'emptyText', type: 'string', default: "'No data found'", desc: 'Текст, который отображается, если таблица пуста.' },
  { name: 'loading', type: 'boolean', default: 'false', desc: 'Отображать индикатор загрузки вместо данных.' }
]

const eventsDescription = [
  { name: '@edit', payload: 'item: T', desc: 'Срабатывает при клике на иконку редактирования.' },
  { name: '@delete', payload: 'item: T', desc: 'Срабатывает при клике на иконку удаления.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Usage</h3>
      <div class="demo-container">
        <Table 
            :headers="headers" 
            :items="users" 
            @edit="handleEdit" 
            @delete="handleDelete" 
        >
            <template #cell-status="{ value }">
                <span :class="['status-badge', value === 'Active' ? 'status-active' : 'status-inactive']">
                    {{ value }}
                </span>
            </template>
        </Table>
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
      <h3>Events Reference</h3>
      <div class="table-wrapper">
        <table class="props-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in eventsDescription" :key="event.name">
              <td class="prop-name"><code>{{ event.name }}</code></td>
              <td class="prop-type"><code>{{ event.payload }}</code></td>
              <td class="prop-desc">{{ event.desc }}</td>
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
  width: 100%;
}

.status-badge {
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
}

.status-active {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.status-inactive {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
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
