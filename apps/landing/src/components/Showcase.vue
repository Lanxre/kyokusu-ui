<script setup lang="ts">
import { Button, Input, Toggle, SearchSelect, Card } from '@kyokusu-ui/vue'
import { useShowcase } from '../composables/useShowcase'

const { toggleVal, searchVal, searchOpts } = useShowcase()
</script>

<template>
  <section id="components" class="showcase section-py">
    <div class="container">
      <div class="showcase-layout">
        
        <div class="showcase-text">
          <h2 class="section-title">Precision in every pixel</h2>
          <p class="section-desc">We obsess over the details so you don't have to. Keyboard interactions, spacing, and micro-animations are tuned to perfection.</p>
        </div>

        <div class="showcase-grid">
          
          <Card class="component-card">
            <template #header>Buttons</template>
            <div class="card-body-content flex-row">
              <Button variant="primary">Deploy</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </Card>

          <Card class="component-card">
            <template #header>Inputs & Forms</template>
            <div class="card-body-content">
              <Input id="demo-input" label="Project Name" placeholder="acme-corp" />
            </div>
          </Card>
          
          <Card class="component-card">
            <template #header>Interactive Controls</template>
            <div class="card-body-content flex-row justify-between">
              <span class="text-sm font-medium text-secondary">Enable Analytics</span>
              <Toggle v-model="toggleVal" />
            </div>
          </Card>

          <Card class="component-card">
            <template #header>Complex Selectors</template>
            <div class="card-body-content">
              <SearchSelect 
                v-model="searchVal" 
                :options="searchOpts" 
                label="Font Family" 
                placeholder="Search fonts..." 
              />
            </div>
          </Card>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase {
  background-color: var(--bg-base);
}

.showcase-layout {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

@media (min-width: 1024px) {
  .showcase-layout {
    flex-direction: row;
    align-items: center;
  }
  .showcase-text {
    flex: 1;
    padding-right: 48px;
  }
  .showcase-grid {
    flex: 1.5;
  }
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.section-desc {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.component-card {
  background-color: var(--bg-surface);
  overflow: visible; /* To allow SearchSelect dropdown to overflow */
}

/* Deep targeting Card components inside showcase */
:deep(.k-card-header) {
  padding: 12px 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  border-bottom: 1px solid var(--border-default);
  background-color: var(--bg-surface-elevated);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

:deep(.k-card-body) {
  padding: 0; /* Let the content wrapper handle padding to preserve flex rules */
}

.card-body-content {
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 120px;
  justify-content: center;
}

.flex-row {
  flex-direction: row;
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.text-secondary {
  color: var(--text-secondary);
}
</style>
