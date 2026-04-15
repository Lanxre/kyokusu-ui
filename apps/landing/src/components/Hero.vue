<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import { Button } from '@kyokusu-ui/vue';
</script>

<template>
  <section class="hero section-py">
    <div class="container hero-inner">
      <div class="hero-content">

        <h1 class="hero-title animate-fade-in-up" style="animation-delay: 100ms;">
          Kyokusu for perfection<br/>
          <span class="text-accent-gradient">Built for Vue 3</span>
        </h1>
        
        <p class="hero-desc animate-fade-in-up" style="animation-delay: 200ms;">
          A premium, minimalist, and highly customizable UI component library. 
        Designed with quiet luxury in mind, engineered for high-performance modern web applications.
        </p>
        
        <div class="badge animate-fade-in-up" style="animation-delay: 0ms;">
          <span class="badge-dot"></span>
          Kyokusu UI 0.0.5 is now
        </div>
        
        <div class="hero-actions animate-fade-in-up" style="animation-delay: 300ms;">
          <Button as="router-link" to="/playground" size="lg" variant="primary" class="btn-icon-wrapper" style="font-weight: 600;">
            Start Building
            <PhArrowRight :size="16" weight="bold" class="btn-icon" />
          </Button>
          <Button as="router-link" :to="{ path: '/', hash: '#components' }" size="lg" variant="outline">
            Explore Components
          </Button>
        </div>
      </div>
      
      <div class="hero-visual animate-fade-in-up" style="animation-delay: 400ms;">
        <div class="visual-glow"></div>
        <div class="visual-card visual-card-1">
            <div class="visual-skeleton w-3/4"></div>
            <div class="visual-skeleton w-1/2"></div>
            <div class="visual-btn"></div>
        </div>
        <div class="visual-card visual-card-2">
            <div class="visual-circle"></div>
            <div class="visual-skeleton w-full"></div>
            <div class="visual-skeleton w-5/6"></div>
        </div>
        <div class="visual-card visual-card-3">
            <div class="flex-row">
                <div class="visual-dot"></div>
                <div class="visual-skeleton w-1/2 m-0"></div>
            </div>
            <div class="visual-input"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-top: calc(120px + var(--nav-height));
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, var(--border-default) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border-default) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at center, black, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 9999px;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-default);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 32px;
  opacity: 0;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent-base);
  box-shadow: 0 0 8px var(--accent-base);
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 24px;
  max-width: 800px;
  opacity: 0;
}

.hero-desc {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 800px;
  margin-bottom: 40px;
  line-height: 1.6;
  opacity: 0;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 80px;
  opacity: 0;
}

.btn-icon-wrapper :deep(.btn-icon) {
  transition: transform var(--transition-fast);
}

.btn-icon-wrapper:hover :deep(.btn-icon) {
  transform: translateX(4px);
}

.hero-visual {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}

.visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background: var(--accent-base);
  filter: blur(100px);
  opacity: 0.15;
  border-radius: 50%;
  z-index: 0;
}

.visual-card {
  position: absolute;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-lg);
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  backdrop-filter: blur(8px);
}

.visual-card-1 {
  width: 280px;
  transform: translateX(-40%) translateY(-20px) rotate(-5deg);
  animation: float 6s ease-in-out infinite;
}

.visual-card-2 {
  width: 320px;
  z-index: 2;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: float 8s ease-in-out infinite reverse;
}

.visual-card-3 {
  width: 260px;
  transform: translateX(50%) translateY(30px) rotate(5deg);
  animation: float 7s ease-in-out infinite 1s;
}

.visual-skeleton {
  height: 12px;
  background-color: var(--border-default);
  border-radius: 6px;
}

.w-full { width: 100%; }
.w-3\/4 { width: 75%; }
.w-5\/6 { width: 83%; }
.w-1\/2 { width: 50%; }
.m-0 { margin: 0; }

.visual-btn {
  height: 36px;
  width: 100px;
  background-color: var(--text-primary);
  border-radius: 8px;
  margin-top: 8px;
}

.visual-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--accent-muted);
  border: 1px solid var(--accent-base);
}

.flex-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.visual-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #10b981;
}

.visual-input {
  height: 40px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  background-color: var(--bg-base);
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(var(--tx, 0)) rotate(var(--rot, 0)); }
  50% { transform: translateY(-15px) translateX(var(--tx, 0)) rotate(var(--rot, 0)); }
}

.visual-card-1 { --tx: -40%; --rot: -5deg; }
.visual-card-3 { --tx: 50%; --rot: 5deg; }

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  .hero-actions :deep(.k-button) {
    width: 100%;
  }
  .hero-visual {
    display: none;
  }
}
</style>