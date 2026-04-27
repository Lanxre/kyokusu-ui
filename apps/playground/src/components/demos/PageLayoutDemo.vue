<script setup lang="ts">
import { PageLayout, Card, Button } from '@kyokusu-ui/vue'
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>PageLayout</h3>
      <p class="demo-desc">
        A main layout component for pages with a centered content area and background.
      </p>
      
      <div class="demo-preview">
        <PageLayout class="demo-layout">
          <div class="demo-content">
            <div class="demo-header">
              <h2>Dashboard</h2>
              <Button>Settings</Button>
            </div>
            
            <div class="demo-grid">
              <Card>
                <h4>Revenue</h4>
                <div class="stat">$45,231</div>
              </Card>
              <Card>
                <h4>Users</h4>
                <div class="stat">2,345</div>
              </Card>
            </div>
            
            <Card class="mt-4">
              <h4>Recent Activity</h4>
              <p>Everything is running smoothly.</p>
            </Card>
          </div>
        </PageLayout>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-preview {
  margin-top: 24px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  height: 500px;
}

.demo-layout {
  min-height: 100% !important;
  transform: scale(0.9);
  transform-origin: top center;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat {
  font-size: 24px;
  font-weight: 700;
  margin-top: 8px;
}

.mt-4 {
  margin-top: 16px;
}

@media (max-width: 640px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
