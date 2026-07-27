<script setup lang="ts">
import { ref, provide, watch, onUnmounted } from 'vue'
import { useDropdownMenu } from './composables/useDropdownMenu'
import DropdownMenuItem from './DropdownMenuItem.vue'
import type { DropdownMenuProps, MenuItem, SelectionType } from './types'

interface Props {
    items: DropdownMenuProps['items']
    trigger?: DropdownMenuProps['trigger']
    placement?: DropdownMenuProps['placement']
    width?: DropdownMenuProps['width']
    offset?: DropdownMenuProps['offset']
    selectionType?: SelectionType
    modelValue?: string | string[] | null
}

const props = withDefaults(defineProps<Props>(), {
    trigger: 'click',
    placement: 'bottom-start',
    width: 200,
    offset: 8,
    selectionType: 'none',
    modelValue: null
})

const emit = defineEmits<{
    (e: 'select', item: MenuItem): void
    (e: 'update:modelValue', value: string | string[]): void
    (e: 'open'): void
    (e: 'close'): void
}>()

const openSubmenuCount = ref(0)
provide('dropdown-open-submenu-count', openSubmenuCount)

const {
    isOpen,
    triggerRef,
    menuRef,
    menuStyle,
    onTriggerClick,
    onTriggerMouseEnter,
    onTriggerMouseLeave,
    onMenuMouseEnter,
    onMenuMouseLeave
} = useDropdownMenu({
    placement: props.placement,
    offset: props.offset,
    width: props.width,
    trigger: props.trigger,
    onOpen: () => emit('open'),
    onClose: () => emit('close')
})

const handleMenuMouseLeave = () => {
    if (openSubmenuCount.value > 0) return
    onMenuMouseLeave()
}

const isItemSelected = (item: MenuItem): boolean => {
    if (props.selectionType === 'checkbox' && Array.isArray(props.modelValue)) {
        return props.modelValue.includes(item.id)
    }
    return props.modelValue === item.id
}

const onSelect = (item: MenuItem) => {
    emit('select', item)

    if (props.selectionType === 'none') return

    if (props.selectionType === 'radio') {
        emit('update:modelValue', item.id)
    } else if (props.selectionType === 'checkbox') {
        const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
        const index = current.indexOf(item.id)
        if (index >= 0) {
            current.splice(index, 1)
        } else {
            current.push(item.id)
        }
        emit('update:modelValue', current)
    }
}

// Prevent page scroll while menu is open
const preventScroll = (e: Event) => {
    // Allow scrolling inside the dropdown menu itself
    const target = e.target as HTMLElement
    if (target.closest?.('.k-dropdown-menu')) return
    e.preventDefault()
}

watch(isOpen, (open) => {
    if (open) {
        document.addEventListener('wheel', preventScroll, { passive: false })
        document.addEventListener('touchmove', preventScroll, { passive: false })
    } else {
        document.removeEventListener('wheel', preventScroll)
        document.removeEventListener('touchmove', preventScroll)
    }
})

onUnmounted(() => {
    document.removeEventListener('wheel', preventScroll)
    document.removeEventListener('touchmove', preventScroll)
})
</script>

<template>
    <div class="k-dropdown-wrapper" ref="triggerRef">
        <div
            class="k-dropdown-trigger"
            @click="onTriggerClick"
            @mouseenter="onTriggerMouseEnter"
            @mouseleave="onTriggerMouseLeave"
        >
            <slot />
        </div>

        <Teleport to="body">
            <Transition name="k-dropdown">
                <ul
                    v-if="isOpen"
                    ref="menuRef"
                    class="k-dropdown-menu"
                    :style="menuStyle"
                    @mouseenter="onMenuMouseEnter"
                    @mouseleave="handleMenuMouseLeave"
                    role="menu"
                >
                    <DropdownMenuItem
                        v-for="item in items"
                        :key="item.id"
                        :item="item"
                        :trigger="trigger"
                        :selection-type="selectionType"
                        :is-selected="isItemSelected(item)"
                        @select="onSelect"
                    />
                </ul>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.k-dropdown-wrapper {
    position: relative;
    display: inline-block;
}

.k-dropdown-trigger {
    display: inline-block;
}

.k-dropdown-menu {
    z-index: 9999;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05);
    padding: 4px;
    list-style: none;
    margin: 0;
    border : 1px solid #161616;
}

.dark .k-dropdown-menu {
    background-color: #27272a;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
    border-color: rgba(211, 211, 211, 0.4);
}

/* Transitions */
.k-dropdown-enter-active,
.k-dropdown-leave-active {
    transition: opacity 0.12s ease, transform 0.12s ease;
}

.k-dropdown-enter-from,
.k-dropdown-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
