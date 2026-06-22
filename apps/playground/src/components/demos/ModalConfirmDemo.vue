<script setup lang="ts">
import { ref } from 'vue'
import { ModalConfirm } from '@kyokusu-ui/vue'

const isConfirmOpen = ref(false)
const isCustomOpen = ref(false)
const lastAction = ref('')

const handleConfirm = () => {
	lastAction.value = 'Confirmed'
	isConfirmOpen.value = false
}

const handleCancel = () => {
	lastAction.value = 'Cancelled'
	isConfirmOpen.value = false
}

let lastCustomAction = ref('')

const handleCustomConfirm = () => {
	lastCustomAction.value = 'Item deleted'
	isCustomOpen.value = false
}

const handleCustomCancel = () => {
	lastCustomAction.value = 'Deletion cancelled'
	isCustomOpen.value = false
}

const propsDescription = [
	{ name: 'modelValue', type: 'boolean', default: 'false', desc: 'Управляет видимостью модального окна подтверждения.' },
	{ name: 'title', type: 'string', default: "'Confirmation'", desc: 'Заголовок диалога.' },
	{ name: 'description', type: 'string', default: "'Are you sure?'", desc: 'Текст описания/вопроса.' },
	{ name: 'confirmText', type: 'string', default: "'Yes'", desc: 'Текст на кнопке подтверждения.' },
	{ name: 'cancelText', type: 'string', default: "'Cancel'", desc: 'Текст на кнопке отмены.' },
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Confirmation</h3>
      <div class="demo-container">
        <button class="demo-btn" @click="isConfirmOpen = true">Delete Item</button>

        <p v-if="lastAction" class="demo-result">
          Last action: <strong>{{ lastAction }}</strong>
        </p>

        <ModalConfirm
          v-model="isConfirmOpen"
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </div>
    </div>

    <div class="card">
      <h3>Custom Labels</h3>
      <div class="demo-container">
        <button class="demo-btn" @click="isCustomOpen = true">Archive Project</button>

        <p v-if="lastCustomAction" class="demo-result">
          Last action: <strong>{{ lastCustomAction }}</strong>
        </p>

        <ModalConfirm
          v-model="isCustomOpen"
          title="Archive Project"
          description="This project will be archived and moved to read-only. Team members will lose write access."
          confirm-text="Archive"
          cancel-text="Keep Editing"
          align="left"
          @confirm="handleCustomConfirm"
          @cancel="handleCustomCancel"
        />
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

.demo-result {
  margin-top: 12px;
  font-size: 14px;
  color: var(--text-muted);
}

.demo-result strong {
  color: var(--text-main);
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
