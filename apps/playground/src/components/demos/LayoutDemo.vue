<script setup lang="ts">
import { Layout, Card, Button } from '@kyokusu-ui/vue'
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Layout Component</h3>
      <p class="demo-desc">
        A wrapper component that provides a consistent background and centered content area.
      </p>
      
      <div class="layout-preview-container">
        <Layout maxWidth="4xl" class="layout-preview">
          <div class="flex-col-gap">
            <header class="flex-between">
              <h2>Dashboard</h2>
              <Button size="sm">New Project</Button>
            </header>
            
            <div class="grid-cols-2">
              <Card>
                <h4>Total Revenue</h4>
                <p class="text-2xl font-bold">$45,231.89</p>
                <p class="text-xs text-muted">+20.1% from last month</p>
              </Card>
              <Card>
                <h4>Subscriptions</h4>
                <p class="text-2xl font-bold">+2350</p>
                <p class="text-xs text-muted">+180.1% from last month</p>
              </Card>
            </div>
            
            <Card class="flex-grow">
              <h4>Recent Activity</h4>
              <p class="text-muted">No recent activity found.</p>
            </Card>
          </div>
        </Layout>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-preview-container {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  margin-top: 24px;
}

.layout-preview {
  height: 100%;
  min-height: auto;
  transform: scale(0.9);
  transform-origin: top center;
}

.flex-col-gap {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.text-2xl { font-size: 1.5rem; }
.font-bold { font-weight: 700; }
.text-xs { font-size: 0.75rem; }
.text-muted { color: var(--text-muted); }
.flex-grow { flex-grow: 1; }

@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>
