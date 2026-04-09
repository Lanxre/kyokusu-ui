<script setup lang="ts">
import { useNotificationProvider } from '@kyokusu-ui/vue'

const { notify } = useNotificationProvider()

const showSuccess = () => {
  notify({
    title: 'Successfully saved!',
    content: 'Your changes have been saved to the database.',
    type: 'success'
  })
}

const showError = () => {
  notify({
    title: 'Connection failed',
    content: 'Could not connect to the server. Please try again later.',
    type: 'error'
  })
}

const showWarning = () => {
  notify({
    title: 'Storage almost full',
    content: 'You have used 90% of your allocated storage space.',
    type: 'warning'
  })
}

const showInfo = () => {
  notify({
    title: 'New update available',
    content: 'Version 2.0 is out! Refresh to update.',
    type: 'info'
  })
}

const showTitleOnly = () => {
  notify({
    title: 'Action completed successfully',
    type: 'success'
  })
}

const showPersistent = () => {
  notify({
    title: 'Persistent Notification',
    content: 'I will not disappear until you close me or swipe me away.',
    type: 'info',
    duration: 0
  })
}
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Notification Types</h3>
      <div class="button-group">
        <button class="demo-btn success" @click="showSuccess">Success</button>
        <button class="demo-btn error" @click="showError">Error</button>
        <button class="demo-btn warning" @click="showWarning">Warning</button>
        <button class="demo-btn info" @click="showInfo">Info</button>
      </div>
    </div>

    <div class="card">
      <h3>Variations</h3>
      <div class="button-group">
        <button class="demo-btn" @click="showTitleOnly">Title Only</button>
        <button class="demo-btn" @click="showPersistent">Persistent (0ms delay)</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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

.demo-btn.success { border-color: #4ade80; color: #4ade80; background: rgba(74, 222, 128, 0.1); }
.demo-btn.error { border-color: #f87171; color: #f87171; background: rgba(248, 113, 113, 0.1); }
.demo-btn.warning { border-color: #facc15; color: #facc15; background: rgba(250, 204, 21, 0.1); }
.demo-btn.info { border-color: #60a5fa; color: #60a5fa; background: rgba(96, 165, 250, 0.1); }
</style>