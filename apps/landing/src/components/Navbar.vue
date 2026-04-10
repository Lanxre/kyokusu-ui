<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhMoon, PhSun, PhGithubLogo } from '@phosphor-icons/vue'
import { GITHUB_URL } from '../const'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <div class="navbar-left">
        <a href="/" class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/>
          </svg>
          <span>Kyokusu</span>
        </a>
      </div>
      
      <nav class="navbar-center hidden-mobile">
        <a href="#components" class="nav-link">Components</a>
        <a href="#features" class="nav-link">Features</a>
        <a href="/docs" class="nav-link">Documentation</a>
      </nav>

      <div class="navbar-right">
        <button @click="toggleTheme" class="icon-btn" aria-label="Toggle Theme">
          <component :is="isDark ? PhMoon : PhSun" :size="20" weight="fill" />
        </button>
        <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer" class="icon-btn hidden-mobile" aria-label="GitHub">
          <PhGithubLogo :size="20" weight="fill" />
        </a>
        <a href="/docs" class="get-started-btn">Get Started</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(var(--bg-base-rgb), 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-default);
  z-index: 100;
  transition: border-color var(--transition-normal), background-color var(--transition-normal);
}

.dark .navbar {
  background-color: rgba(9, 9, 11, 0.8); /* Manual fallback if CSS vars don't split rgb */
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  transition: opacity var(--transition-fast);
}

.logo:hover {
  opacity: 0.8;
}

.navbar-center {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--text-primary);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.icon-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-surface-elevated);
}

.get-started-btn {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--bg-base);
  background-color: var(--text-primary);
  padding: 8px 16px;
  border-radius: 9999px;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.get-started-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.get-started-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .hidden-mobile {
    display: none;
  }
}
</style>