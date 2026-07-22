<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { PhMoon, PhSun, PhMagnifyingGlass } from '@phosphor-icons/vue'
import { useAppStore } from '../../stores/app'
import { navigationGroups } from '../../config/navigation'

const appStore = useAppStore()
const { currentComponent, isDark } = storeToRefs(appStore)
const { toggleTheme, setCurrentComponent } = appStore

const menuRef = ref<HTMLElement | null>(null)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)
const showResults = ref(false)
const searchWrapperRef = ref<HTMLElement | null>(null)

const allItems = computed(() => {
    return navigationGroups.flatMap(group => group.items)
})

const filteredItems = computed(() => {
    if (!searchQuery.value.trim()) return []
    const query = searchQuery.value.toLowerCase()
    return allItems.value.filter(item =>
        item.label.toLowerCase().includes(query)
    )
})

const selectComponent = (id: string) => {
    setCurrentComponent(id)
    searchQuery.value = ''
    showResults.value = false
    searchInputRef.value?.blur()
}

const onSearchFocus = () => {
    if (searchQuery.value.trim()) {
        showResults.value = true
    }
}

const onSearchInput = () => {
    showResults.value = searchQuery.value.trim().length > 0
}

const onClickOutside = (event: MouseEvent) => {
    if (searchWrapperRef.value && !searchWrapperRef.value.contains(event.target as Node)) {
        showResults.value = false
    }
}

const onWheel = (event: WheelEvent) => {
    if (!menuRef.value) return
    menuRef.value.scrollTop += event.deltaY
}

const searchFocus = () => {
  searchInputRef.value?.focus();
}


const handleGlobalKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInputRef.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true);
  document.addEventListener('keydown', handleGlobalKeyDown);
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside, true);
  document.removeEventListener('keydown', handleGlobalKeyDown);
})
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="row-container">
                <a href="/" class="logo">Kyokusu UI</a>
                <div class="theme-switcher">
                    <span class="theme-label" @click="toggleTheme">
                        <component :is="isDark ? PhMoon : PhSun" :size="16" weight="bold" />
                        Theme
                    </span>
                </div>
            </div>

            <div class="component-search" ref="searchWrapperRef">
                <div class="search-input-wrapper" @keydown.ctrl.k.prevent="searchFocus">
                    <PhMagnifyingGlass :size="16" class="search-icon" />
                    <input
                        ref="searchInputRef"
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search components..."
                        class="search-input"
                        @focus="onSearchFocus"
                        @input="onSearchInput"
                    />
                </div>
                <div class="flex flex-row justify-center gap-6 mt-6">
                    <span class="sm">Copmponents count:</span>
                    <span class="sm underline"> {{ allItems.length }} </span>
                </div>
                <div v-if="showResults && filteredItems.length > 0" class="search-results">
                    <button
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="search-result-item"
                        @click="selectComponent(item.id)"
                    >
                        <component :is="item.icon" :size="16" weight="duotone" />
                        {{ item.label }}
                    </button>
                </div>
            </div>
        </div>

        <nav class="menu" ref="menuRef" @wheel="onWheel">
            <div
                v-for="group in navigationGroups"
                :key="group.label"
                class="menu-group"
            >
                <div class="menu-group-label">
                    {{ group.label }}
                </div>
                <button
                    v-for="item in group.items"
                    :key="item.id"
                    :class="{ active: currentComponent === item.id }"
                    :disabled="item.disabled"
                    :title="item.disabled ? 'Soon...' : ''"
                    @click="setCurrentComponent(item.id)"
                >
                    <component :is="item.icon" :size="20" weight="duotone" />
                    {{ item.label }}
                </button>
            </div>
        </nav>
    </aside>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.sidebar-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 12px;
    padding-bottom: 12px;
}

.logo {
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    color: var(--text-primary);
    transition: opacity 0.2s;
}

.logo:hover {
    opacity: 0.8;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: scroll;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
    padding-right: 4px;
    flex: 1;
    min-height: 0;
}

.menu-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.menu-group-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    padding: 4px 6px;
    text-transform: uppercase;
}

.menu button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    transition: 0.2s;
}

.menu button:hover:not(:disabled) {
    background: var(--k-bg-soft);
    color: var(--text-primary);
}

.menu button.active {
    background: var(--k-bg-soft);
    color: var(--text-primary);
    font-weight: 500;
}

.menu button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.theme-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    color: var(--text-muted);
    transition: 0.2s;
}

.theme-label:hover {
    color: var(--text-primary);
}

.theme-switcher {
    display: flex;
    align-items: flex-start;
}

/* Search */
.component-search {
    position: relative;
    width: 100%;
}

.search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-icon {
    position: absolute;
    left: 10px;
    color: var(--text-muted);
    pointer-events: none;
}

.search-input {
    width: 100%;
    padding: 8px 12px 8px 32px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: var(--k-bg-soft);
    color: var(--text-primary);
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
}

.search-input::placeholder {
    color: var(--text-muted);
}

.search-input:focus {
    border-color: var(--text-primary);
    background: var(--bg-primary);
}

.search-results {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
}

.search-result-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: var(--bg-base);
    cursor: pointer;
    color: var(--text-primary);
    font-size: 13px;
    text-align: left;
    transition: background 0.15s;
}

.search-result-item:hover {
    background: var(--bg-hover-secondary);
}

.search-result-item:first-child {
    border-radius: 6px 6px 0 0;
}

.search-result-item:last-child {
    border-radius: 0 0 6px 6px;
}
</style>
