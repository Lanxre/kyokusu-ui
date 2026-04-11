<script setup lang="ts">
import { Card } from '@kyokusu-ui/vue'
import { useFeatures } from '../composables/useFeatures'

const { features } = useFeatures()
</script>

<template>
  <section id="features" class="features section-py">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Designed for modern engineering</h2>
        <p class="section-desc">Everything you need to build high-end web applications, packaged into a single, cohesive library.</p>
      </div>

      <div class="features-grid">
        <Card 
          v-for="(feature, index) in features" 
          :key="index" 
          class="feature-card"
          variant="default"
          padding="lg"
        >
          <div class="feature-icon-wrapper">
            <component :is="feature.icon" :size="24" weight="duotone" class="feature-icon" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-default);
  border-bottom: 1px solid var(--border-default);
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 64px auto;
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.feature-card {
  transition: all var(--transition-normal);
  align-items: flex-start;
  height: 100%;
}

.feature-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
  cursor: default;
}

.feature-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-default);
  margin-bottom: 24px;
  color: var(--text-primary);
  transition: all var(--transition-normal);
}

.feature-card:hover .feature-icon-wrapper {
  background-color: var(--accent-muted);
  border-color: rgba(var(--accent-base-rgb), 0.2);
  color: var(--accent-base);
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.feature-desc {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>
