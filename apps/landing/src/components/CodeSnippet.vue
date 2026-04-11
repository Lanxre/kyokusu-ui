<script setup lang="ts">
import { PhCopy, PhCheck, PhArrowUpRight } from '@phosphor-icons/vue'
import { useClipboard } from '../composables/useClipboard'

const { copied: copiedVue, copy: copyVue } = useClipboard()
const { copied: copiedCore, copy: copyCore } = useClipboard()

const codeVue = 'bun add @kyokusu-ui/vue'
const codeCore = 'bun add @kyokusu-ui/core'
</script>

<template>
  <section class="cta section-py">
    <div class="container">
      <div class="cta-inner">
        <h2 class="cta-title">Ready to elevate your UI?</h2>
        <p class="cta-desc">Start building faster with beautifully crafted components today.</p>
        
        <div class="code-block-wrapper">
          <p class="code-label">For Vue 3 projects</p>
          <div class="code-block">
            <span class="prompt">$</span>
            <code class="code-text">{{ codeVue }}</code>
            <button @click="copyVue(codeVue)" class="copy-btn" :aria-label="copiedVue ? 'Copied' : 'Copy code'">
              <component :is="copiedVue ? PhCheck : PhCopy" :size="18" weight="bold" />
            </button>
          </div>
        </div>
        
        <div class="code-block-wrapper">
          <p class="code-label">For pure CSS / Vanilla JS</p>
          <div class="code-block">
            <span class="prompt">$</span>
            <code class="code-text">{{ codeCore }}</code>
            <button @click="copyCore(codeCore)" class="copy-btn" :aria-label="copiedCore ? 'Copied' : 'Copy code'">
              <component :is="copiedCore ? PhCheck : PhCopy" :size="18" weight="bold" />
            </button>
          </div>
        </div>

        <p class="docs-link">
          Or view the 
          <router-link to="/playground" class="playground-link">
              components playground
              <PhArrowUpRight :size="18" weight="bold" />
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-default);
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.cta-desc {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 40px;
  line-height: 1.6;
}

.code-block-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  margin-bottom: 24px;
}

.code-label {
  align-self: flex-start;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.code-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-base);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  gap: 12px;
  padding: 12px 16px;
  box-shadow: var(--shadow-sm);
}

.prompt {
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  margin-right: 12px;
  user-select: none;
}

.code-text {
  flex: 1;
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-primary);
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.code-text::-webkit-scrollbar {
  display: none;
}

.playground-link {
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.playground-link a {
  color: var(--text-primary);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.playground-link a:hover {
  color: var(--accent-base);
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-surface-elevated);
}

.docs-link {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.docs-link a {
  color: var(--text-primary);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.docs-link a:hover {
  color: var(--accent-base);
}
</style>