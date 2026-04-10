<script setup lang="ts">
import { PhPaintBrush, PhLightning, PhCode, PhPuzzlePiece, PhEye, PhFeather } from '@phosphor-icons/vue'

const features = [
  {
    title: 'Beautiful by Default',
    desc: 'Carefully crafted components that look stunning out of the box, requiring zero configuration for a premium feel.',
    icon: PhPaintBrush
  },
  {
    title: 'Excellent Developer Experience',
    desc: 'Built ground-up with Vue 3 Composition API and strict TypeScript. Full IDE autocompletion and type safety.',
    icon: PhCode
  },
  {
    title: 'Lightweight & Performant',
    desc: 'Zero heavy dependencies. Highly optimized rendering logic ensuring 60fps animations and instant interactions.',
    icon: PhLightning
  },
  {
    title: 'Highly Customizable',
    desc: 'Powered entirely by CSS variables. Easily adapt the design system to your brand with just a few overrides.',
    icon: PhPuzzlePiece
  },
  {
    title: 'Fully Accessible',
    desc: 'Keyboard navigation, screen reader support, and ARIA attributes built into every interactive component.',
    icon: PhEye
  },
  {
    title: 'Quiet Luxury Design',
    desc: 'Restrained, calm, and sophisticated. No flashy distracting elements—just pure, confident UI.',
    icon: PhFeather
  }
]
</script>

<template>
  <section id="features" class="features section-py">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Designed for modern engineering</h2>
        <p class="section-desc">Everything you need to build high-end web applications, packaged into a single, cohesive library.</p>
      </div>

      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <div class="feature-icon-wrapper">
            <component :is="feature.icon" :size="24" weight="duotone" class="feature-icon" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
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
  background-color: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  padding: 32px;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
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
}
</style>