<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Toggle, SearchSelect } from '@kyokusu-ui/vue'

const toggleVal = ref(true)
const searchVal = ref<string | null>(null)
const searchOpts = ['Inter', 'SF Pro', 'Geist', 'JetBrains Mono', 'Fira Code']
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
          
          <!-- Card 1: Buttons -->
          <div class="component-card">
            <div class="card-header">Buttons</div>
            <div class="card-body flex-row">
              <Button variant="primary">Deploy</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </div>

          <!-- Card 2: Input -->
          <div class="component-card">
            <div class="card-header">Inputs & Forms</div>
            <div class="card-body">
              <Input id="demo-input" label="Project Name" placeholder="acme-corp" />
            </div>
          </div>

          <!-- Card 3: Toggle -->
          <div class="component-card">
            <div class="card-header">Interactive Controls</div>
            <div class="card-body flex-row justify-between">
              <span class="text-sm font-medium text-secondary">Enable Analytics</span>
              <Toggle v-model="toggleVal" />
            </div>
          </div>

          <!-- Card 4: Search Select -->
          <div class="component-card">
            <div class="card-header">Complex Selectors</div>
            <div class="card-body">
              <SearchSelect 
                v-model="searchVal" 
                :options="searchOpts" 
                label="Font Family" 
                placeholder="Search fonts..." 
              />
            </div>
          </div>

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
  border: 1px solid var(--border-default);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.card-header {
  padding: 12px 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  border-bottom: 1px solid var(--border-default);
  background-color: var(--bg-surface-elevated);
}

.card-body {
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