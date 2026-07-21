<script setup lang="ts">
import { ref } from 'vue'
import { Popover, Button, Input } from '@kyokusu-ui/vue'
import { PhUser, PhGearSix, PhSignOut, PhBell, PhTrash } from '@phosphor-icons/vue'

const propsDescription = [
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", desc: 'Позиция поповера относительно триггера.' },
    { name: 'trigger', type: "'click' | 'hover'", default: "'click'", desc: 'Тип триггера для открытия поповера.' },
    { name: 'title', type: 'string', default: "''", desc: 'Заголовок поповера (опционально).' },
    { name: 'width', type: 'number | string', default: '200', desc: 'Ширина поповера в пикселях.' },
    { name: 'offset', type: 'number', default: '8', desc: 'Отступ от триггера в пикселях.' },
    { name: 'v-model', type: 'boolean', default: 'undefined', desc: 'Управляемый режим открытия/закрытия.' }
]

const deleteOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Placements</h3>
      <div class="demo-grid">
        <div class="demo-cell">
          <Popover title="Top Popover" placement="top" :width="180">
              <Button variant="secondary" size="md">Top</Button>
              <template #content>
                  <p>Positioned above the trigger</p>
              </template>
          </Popover>
        </div>
        <div class="demo-cell">
          <Popover title="Bottom Popover" placement="bottom" :width="180">
              <Button variant="secondary" size="md">Bottom</Button>
              <template #content>
                  <p>Positioned below the trigger</p>
              </template>
          </Popover>
        </div>
        <div class="demo-cell">
          <Popover title="Left Popover" placement="left" :width="180">
              <Button variant="secondary" size="md">Left</Button>
              <template #content>
                  <p>Positioned left of trigger</p>
              </template>
          </Popover>
        </div>
        <div class="demo-cell">
          <Popover title="Right Popover" placement="right" :width="180">
              <Button variant="secondary" size="md">Right</Button>
              <template #content>
                  <p>Positioned right of trigger</p>
              </template>
          </Popover>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>User Menu</h3>
      <p class="card-desc">Классический дропдаун профиля с иконками</p>
      <div class="demo-flex">
          <Popover :width="200">
              <div class="user-trigger">
                  <div class="user-avatar">JD</div>
                  <span>John Doe</span>
              </div>
              <template #content>
                  <div class="menu-list">
                      <button class="menu-item">
                          <PhUser :size="16" />
                          <span>Profile</span>
                      </button>
                      <button class="menu-item">
                          <PhGearSix :size="16" />
                          <span>Settings</span>
                      </button>
                      <button class="menu-item">
                          <PhBell :size="16" />
                          <span>Notifications</span>
                      </button>
                      <div class="menu-divider" />
                      <button class="menu-item menu-item--danger">
                          <PhSignOut :size="16" />
                          <span>Sign out</span>
                      </button>
                  </div>
              </template>
          </Popover>
      </div>
    </div>

    <div class="card">
      <h3>Confirm Action</h3>
      <p class="card-desc">Поповер подтверждения удаления</p>
      <div class="demo-flex">
          <Popover v-model="deleteOpen" placement="top" :width="240">
              <Button variant="danger" size="md">
                  <PhTrash :size="14" />
                  Delete item
              </Button>
              <template #content>
                  <div class="confirm-dialog">
                      <p class="confirm-title">Are you sure?</p>
                      <p class="confirm-desc">This action cannot be undone. The item will be permanently deleted.</p>
                      <div class="confirm-actions">
                          <Button size="md" variant="ghost" @click="deleteOpen = false">Cancel</Button>
                          <Button size="md" variant="danger" @click="deleteOpen = false">Delete</Button>
                      </div>
                  </div>
              </template>
          </Popover>
      </div>
    </div>

    <div class="card">
      <h3>Inline Search</h3>
      <p class="card-desc">Поповер с поиском и фильтрацией</p>
      <div class="demo-flex">
          <Popover v-model="searchOpen" placement="bottom" :width="280">
              <Button variant="outline" size="md">Search...</Button>
              <template #content>
                  <div class="search-popover">
                      <Input 
                          v-model="searchQuery" 
                          placeholder="Type to search..." 
                          size="md"
                      />
                      <div class="search-results">
                          <div class="search-item">Dashboard</div>
                          <div class="search-item">Settings</div>
                          <div class="search-item">Profile</div>
                      </div>
                  </div>
              </template>
          </Popover>
      </div>
    </div>

    <div class="card">
      <h3>Hover Trigger</h3>
      <p class="card-desc">Открывается при наведении мыши</p>
      <div class="demo-flex">
          <Popover trigger="hover" title="Hover Info" placement="right" :width="200">
              <Button variant="ghost" size="md">Hover me</Button>
              <template #content>
                  <p>This popover appears on hover and disappears when you move the mouse away.</p>
              </template>
          </Popover>
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
.demo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.demo-cell {
  display: flex;
  justify-content: center;
}

.demo-flex {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
}

/* User trigger */
.user-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.user-trigger:hover {
  background: var(--k-bg-soft);
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

/* Menu list */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: none;
  background: none;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-main);
  cursor: pointer;
  transition: background 0.12s;
  font-family: inherit;
}

.menu-item:hover {
  background: var(--k-bg-soft);
}

.menu-item--danger {
  color: #ef4444;
}

.menu-item--danger:hover {
  background: #fef2f2;
}

.dark .menu-item--danger:hover {
  background: #451a1a;
}

.menu-divider {
  height: 1px;
  background: var(--border-color);
  margin: 4px 0;
}

/* Confirm dialog */
.confirm-dialog {
  text-align: left;
}

.confirm-title {
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 4px;
  font-size: 14px;
}

.confirm-desc {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 12px;
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* Search popover */
.search-popover {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.search-item {
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-main);
  cursor: pointer;
  transition: background 0.12s;
}

.search-item:hover {
  background: var(--k-bg-soft);
}

/* Props table */
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

@media (max-width: 640px) {
  .demo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
