<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PhMoon, PhSun, PhGithubLogo, PhList, PhX, PhSquaresFour, PhStar } from '@phosphor-icons/vue'
import { GITHUB_URL } from '../const'
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <div class="navbar-left">
        <RouterLink to="/" class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/>
          </svg>
          <span>Kyokusu UI</span>
        </RouterLink>
      </div>
      
      <nav class="navbar-center hidden-mobile">
        <router-link :to="{ path: '/', hash: '#features' }" class="nav-link">
          <PhStar :size="16" weight="duotone" />
          Features
        </router-link>
        <router-link to="/playground" class="nav-link">
          <PhSquaresFour :size="16" weight="duotone" />
          Playground
        </router-link>
      </nav>

      <div class="navbar-right">
        <button @click="toggleTheme" class="icon-btn" aria-label="Toggle Theme">
          <component :is="isDark ? PhMoon : PhSun" :size="20" weight="fill" />
        </button>
        <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer" class="icon-btn hidden-mobile" aria-label="GitHub">
          <PhGithubLogo :size="20" weight="fill" />
        </a>
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <component :is="mobileMenuOpen ? PhX : PhList" :size="24" weight="bold" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'is-open': mobileMenuOpen }">
      <div class="mobile-nav">
        <router-link :to="{ path: '/', hash: '#features' }" class="mobile-nav-link" @click="mobileMenuOpen = false">
          <PhStar :size="20" weight="duotone" />
          Features
        </router-link>
        <router-link to="/playground" class="mobile-nav-link" @click="mobileMenuOpen = false">
          <PhSquaresFour :size="20" weight="duotone" />
          Playground
        </router-link>
        <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer" class="mobile-nav-link" @click="mobileMenuOpen = false">
          <PhGithubLogo :size="20" weight="duotone" />
          GitHub
        </a>
        <RouterLink to="/playground" class="mobile-get-started" @click="mobileMenuOpen = false">
          GET STARTED
        </RouterLink>
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
  background-color: rgba(9, 9, 11, 0.8);
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
  margin-left: 4rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
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
  padding: 8px 8px;
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

.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: var(--nav-height);
  left: 0;
  width: 100%;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-default);
  padding: 16px 24px;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow-md);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.mobile-menu.is-open {
  display: flex;
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  padding: 12px 0;
  border-bottom: 1px solid var(--border-subtle);
  transition: color 0.2s;
}

.mobile-nav-link:hover {
  color: var(--accent-base);
}

.mobile-get-started {
  display: block;
  text-align: center;
  margin-top: 16px;
  padding: 12px;
  background-color: var(--text-primary);
  color: var(--bg-base);
  font-weight: 600;
  border-radius: 8px;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.mobile-get-started:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hidden-mobile {
    display: none !important;
  }
  .mobile-menu-btn {
    display: flex;
  }
}
</style>