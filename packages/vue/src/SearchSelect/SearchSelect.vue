<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick, useId, useAttrs } from "vue";
import { PhCaretDown, PhMagnifyingGlass } from "@phosphor-icons/vue";

defineOptions({ inheritAttrs: false });

export interface SearchSelectOption {
    id: string | number;
    label: string;
}

interface Props {
    modelValue?: string | number | null;
    id?: string;
    label?: string;
    options: (string | SearchSelectOption)[];
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const searchQuery = ref("");
const wrapperRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const selectId = props.id || useId();
const attrs = useAttrs();

const normalizedOptions = computed<SearchSelectOption[]>(() => {
    return props.options.map((item) =>
        typeof item === "string" ? { id: item, label: item } : item,
    );
});

const currentLabel = computed(() => {
    const found = normalizedOptions.value.find(
        (opt) => opt.id === props.modelValue,
    );
    return found ? found.label : "";
});

const filteredSearchItems = computed(() => {
    if (!searchQuery.value) return normalizedOptions.value;
    return normalizedOptions.value.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
});

const toggleDropdown = () => {
    if (props.disabled) return;
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        searchQuery.value = "";
        nextTick(() => searchInputRef.value?.focus());
    }
};

const selectItem = (item: SearchSelectOption) => {
    emit("update:modelValue", item.id);
    isOpen.value = false;
    searchQuery.value = "";
};

const handleOutsideClick = (event: MouseEvent) => {
    if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("mousedown", handleOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener("mousedown", handleOutsideClick);
});
</script>

<template>
    <div class="k-searchselect-wrapper" :class="attrs.class" :style="attrs.style" ref="wrapperRef">
        <label v-if="label" :for="selectId" class="k-searchselect-label">
            {{ label }} 
        </label>
        
        <div class="k-searchselect-trigger-container">
            <div 
                @click="toggleDropdown"
                class="k-searchselect-trigger"
                :class="{
                    'k-searchselect-trigger--error': error,
                    'k-searchselect-trigger--open': isOpen,
                    'k-searchselect-trigger--disabled': disabled
                }"
            >
                <span class="k-searchselect-value" :class="{ 'k-searchselect-value--selected': currentLabel }">
                    {{ currentLabel || placeholder || 'Выберите из списка' }}
                </span>
                <div class="k-searchselect-icon">
                    <PhCaretDown :size="16" weight="bold" />
                </div>
            </div>

            <Transition name="k-searchselect-fade">
                <div v-if="isOpen" class="k-searchselect-popup">
                    <div class="k-searchselect-search-header">
                        <div class="k-searchselect-search-container">
                            <input 
                                ref="searchInputRef"
                                v-model="searchQuery"
                                type="text"
                                class="k-searchselect-search-input"
                                placeholder="Поиск..."
                                @click.stop
                            />
                            <div class="k-searchselect-search-icon">
                                <PhMagnifyingGlass :size="16" />
                            </div>
                        </div>
                    </div>
                    
                    <ul class="k-searchselect-list">
                        <li 
                            v-for="item in filteredSearchItems" 
                            :key="item.id"
                            @click.stop="selectItem(item)"
                            class="k-searchselect-item"
                            :class="{ 'k-searchselect-item--selected': modelValue === item.id }"
                        >
                            {{ item.label }}
                            <div v-if="modelValue === item.id" class="k-searchselect-item-dot"></div>
                        </li>
                        <li v-if="filteredSearchItems.length === 0" class="k-searchselect-empty">
                            Ничего не найдено
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>

        <p v-if="error" class="k-searchselect-error-text">{{ error }}</p>
    </div>
</template>

<style scoped>
.k-searchselect-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: inherit;

    --k-searchselect-bg: #ffffff;
    --k-searchselect-border: #e4e4e7;
    --k-searchselect-border-hover: #d4d4d8;
    --k-searchselect-border-focus: #eab308;
    --k-searchselect-ring: rgba(234, 179, 8, 0.1);
    --k-searchselect-text: #18181b;
    --k-searchselect-placeholder: #a1a1aa;
    --k-searchselect-label: #71717a;
    --k-searchselect-icon: #a1a1aa;
    --k-searchselect-disabled-bg: #f4f4f5;
    --k-searchselect-error: #ef4444;
    
    --k-searchselect-popup-bg: #ffffff;
    --k-searchselect-popup-border: #e4e4e7;
    --k-searchselect-popup-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    
    --k-searchselect-input-bg: #f4f4f5;
    
    --k-searchselect-item-text: #52525b;
    --k-searchselect-item-hover-bg: #f4f4f5;
    --k-searchselect-item-hover-text: #18181b;
    
    --k-searchselect-selected-bg: #fefce8;
    --k-searchselect-selected-text: #ca8a04;
    --k-searchselect-selected-dot: #eab308;
}

.dark .k-searchselect-wrapper {
    --k-searchselect-bg: rgba(24, 24, 27, 0.5);
    --k-searchselect-border: #27272a;
    --k-searchselect-border-hover: #3f3f46;
    --k-searchselect-border-focus: rgba(234, 179, 8, 0.5);
    --k-searchselect-ring: rgba(234, 179, 8, 0.05);
    --k-searchselect-text: #e4e4e7;
    --k-searchselect-placeholder: #71717a;
    --k-searchselect-label: #71717a;
    --k-searchselect-icon: #71717a;
    --k-searchselect-disabled-bg: #18181b;
    
    --k-searchselect-popup-bg: #18181b;
    --k-searchselect-popup-border: #27272a;
    --k-searchselect-popup-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    
    --k-searchselect-input-bg: rgba(39, 39, 42, 0.5);
    
    --k-searchselect-item-text: #a1a1aa;
    --k-searchselect-item-hover-bg: #27272a;
    --k-searchselect-item-hover-text: #e4e4e7;
    
    --k-searchselect-selected-bg: rgba(234, 179, 8, 0.1);
    --k-searchselect-selected-text: #eab308;
}

.k-searchselect-label {
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--k-searchselect-label);
    margin-left: 4px;
}

.k-searchselect-trigger-container {
    position: relative;
}

.k-searchselect-trigger {
    min-height: 35px;
    width: 100%;
    background-color: var(--k-searchselect-bg);
    border: 1px solid var(--k-searchselect-border);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
}

.k-searchselect-trigger:hover:not(.k-searchselect-trigger--disabled) {
    border-color: var(--k-searchselect-border-hover);
}

.k-searchselect-trigger--open {
    border-color: var(--k-searchselect-border-focus) !important;
    box-shadow: 0 0 0 4px var(--k-searchselect-ring);
}

.k-searchselect-trigger--error {
    border-color: var(--k-searchselect-error) !important;
}

.k-searchselect-trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--k-searchselect-disabled-bg);
}

.k-searchselect-value {
    color: var(--k-searchselect-placeholder);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 8px;
}

.k-searchselect-value--selected {
    color: var(--k-searchselect-text);
}

.k-searchselect-icon {
    flex-shrink: 0;
    color: var(--k-searchselect-icon);
    transition: transform 0.3s ease, color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.k-searchselect-trigger--open .k-searchselect-icon {
    transform: rotate(180deg);
    color: var(--k-searchselect-selected-dot);
}

.k-searchselect-popup {
    position: absolute;
    z-index: 100;
    width: 100%;
    min-width: max-content;
    background-color: var(--k-searchselect-popup-bg);
    border: 1px solid var(--k-searchselect-popup-border);
    border-radius: 16px;
    box-shadow: var(--k-searchselect-popup-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.k-searchselect-search-header {
    padding: 8px;
    border-bottom: 1px solid var(--k-searchselect-popup-border);
}

.k-searchselect-search-container {
    position: relative;
    display: flex;
    align-items: center;
}

.k-searchselect-search-input {
    width: 100%;
    background-color: var(--k-searchselect-input-bg);
    border: none;
    border-radius: 12px;
    padding: 8px 16px 8px 36px;
    font-size: 14px;
    color: var(--k-searchselect-text);
    outline: none;
    transition: box-shadow 0.2s ease;
}

.k-searchselect-search-input::placeholder {
    color: var(--k-searchselect-placeholder);
}

.k-searchselect-search-input:focus {
    box-shadow: 0 0 0 2px var(--k-searchselect-ring);
}

.k-searchselect-search-icon {
    position: absolute;
    left: 12px;
    color: var(--k-searchselect-icon);
    pointer-events: none;
}

.k-searchselect-list {
    max-height: 256px;
    overflow-y: auto;
    padding: 6px;
    list-style: none;
    margin: 0;
}

.k-searchselect-list::-webkit-scrollbar {
    width: 4px;
}
.k-searchselect-list::-webkit-scrollbar-track {
    background: transparent;
}
.k-searchselect-list::-webkit-scrollbar-thumb {
    background: var(--k-searchselect-border-hover);
    border-radius: 10px;
}

.k-searchselect-item {
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--k-searchselect-item-text);
}

.k-searchselect-item:hover {
    background-color: var(--k-searchselect-item-hover-bg);
    color: var(--k-searchselect-item-hover-text);
}

.k-searchselect-item--selected {
    background-color: var(--k-searchselect-selected-bg) !important;
    color: var(--k-searchselect-selected-text) !important;
    font-weight: 700;
}

.k-searchselect-item-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--k-searchselect-selected-dot);
}

.k-searchselect-empty {
    padding: 32px 16px;
    font-size: 14px;
    color: var(--k-searchselect-placeholder);
    text-align: center;
    font-style: italic;
}

.k-searchselect-error-text {
    font-size: 12px;
    font-weight: 500;
    color: var(--k-searchselect-error);
    margin-left: 4px;
    margin-top: 4px;
    margin-bottom: 0;
}

/* Transitions */
.k-searchselect-fade-enter-active,
.k-searchselect-fade-leave-active {
    transition: all 0.2s ease;
}

.k-searchselect-fade-enter-from,
.k-searchselect-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>