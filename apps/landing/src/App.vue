<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component" />
        <template #fallback>
          <div class="shell-loading">
            <div class="spinner"></div>
            <span>Loading...</span>
          </div>
        </template>
      </Suspense>
    </template>
  </router-view>
</template>

<style>
.shell-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
  color: var(--text-primary, #000);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-default, #ccc);
  border-top-color: var(--text-primary, #000);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.remote-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
  color: #ef4444;
}
</style>
