<script setup lang="ts">
import { ref } from 'vue'
import { PhCopy, PhCheck } from '@phosphor-icons/vue'

const copied = ref(false)
const code = 'bun add @kyokusu-ui/vue @kyokusu-ui/core'

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <section class="cta section-py">
    <div class="container">
      <div class="cta-inner">
        <h2 class="cta-title">Ready to elevate your UI?</h2>
        <p class="cta-desc">Start building faster with beautifully crafted components today.</p>
        
        <div class="code-block">
          <span class="prompt">$</span>
          <code class="code-text">{{ code }}</code>
          <button @click="copyCode" class="copy-btn" :aria-label="copied ? 'Copied' : 'Copy code'">
            <component :is="copied ? PhCheck : PhCopy" :size="18" weight="bold" />
          </button>
        </div>

        <p class="docs-link">
          Or read the <a href="/docs">installation documentation →</a>
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

.code-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-base);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  max-width: 480px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
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