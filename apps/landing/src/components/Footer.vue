<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { PhGithubLogo, PhSquaresFour } from '@phosphor-icons/vue';
import { GITHUB_URL } from '../const';

</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-left">
          <span class="logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/>
            </svg>
            Kyokusu UI
          </span>
          <p class="copyright">© 2026 Kyokusu UI. All rights reserved.</p>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h4>Resources</h4>
            <RouterLink to="/playground" class="link">
                <PhSquaresFour size="16" weight="bold" />
                Playground
            </RouterLink>
          </div>
          <div class="link-group">
            <h4>Community</h4>
            <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">
                <PhGithubLogo size="16" weight="bold" />
                GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border-default);
  background-color: var(--bg-base);
  padding: 64px 0 48px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.copyright {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.footer-links {
  display: flex;
  gap: 64px;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link-group h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.link-group a {
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.link-group a:hover {
  color: var(--text-primary);
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.link:hover {
  color: var(--text-primary);
}

.link svg {
  width: 16px;
  height: 16px;
}
</style>