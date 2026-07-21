<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from './types'

interface Props {
    variant?: BadgeProps['variant']
    size?: BadgeProps['size']
    text?: string
    bg?: string
    icon?: BadgeProps['icon']
    iconStart?: BadgeProps['iconStart']
    iconEnd?: BadgeProps['iconEnd']
    link?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'md',
    text: '',
    bg: undefined,
    icon: undefined,
    iconStart: undefined,
    iconEnd: undefined,
    link: undefined
})

const badgeClasses = computed(() => {
    const classes = ['k-badge']
    
    if (props.variant !== 'default') classes.push(`k-badge--${props.variant}`)
    if (props.size) classes.push(`k-badge--${props.size}`)
    if (props.link) classes.push('k-badge--link')
    
    return classes.join(' ')
})

const badgeStyle = computed(() => {
    if (props.bg) {
        return { backgroundColor: props.bg }
    }
    return {}
})
</script>

<template>
    <component
        :is="link ? 'a' : 'span'"
        :class="badgeClasses"
        :style="badgeStyle"
        :href="link"
        :target="link ? '_blank' : undefined"
        :rel="link ? 'noopener noreferrer' : undefined"
    >
        <component v-if="iconStart" :is="iconStart" class="k-badge-icon k-badge-icon--start" />
        <component v-else-if="icon" :is="icon" class="k-badge-icon k-badge-icon--start" />
        <slot>{{ text }}</slot>
        <component v-if="iconEnd" :is="iconEnd" class="k-badge-icon k-badge-icon--end" />
    </component>
</template>

<style scoped>
.k-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-weight: 500;
    white-space: nowrap;
    border-radius: 9999px;
    border: 1px solid transparent;
    text-decoration: none;
    
    --k-badge-bg: #f4f4f5;
    --k-badge-text: #18181b;
    --k-badge-border: transparent;
    
    background-color: var(--k-badge-bg);
    color: var(--k-badge-text);
    border-color: var(--k-badge-border);
}

.dark .k-badge {
    --k-badge-bg: #27272a;
    --k-badge-text: #f4f4f5;
    --k-badge-border: transparent;
}

/* Link variant */
.k-badge--link {
    cursor: pointer;
    transition: opacity 0.15s ease;
}

.k-badge--link:hover {
    opacity: 0.8;
}

/* Sizes */
.k-badge--sm {
    height: 20px;
    padding: 0 8px;
    font-size: 11px;
}

.k-badge--md {
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
}

.k-badge--lg {
    height: 28px;
    padding: 0 12px;
    font-size: 14px;
}

/* Icon sizing */
.k-badge-icon {
    display: inline-flex;
    flex-shrink: 0;
}

.k-badge--sm .k-badge-icon {
    width: 12px;
    height: 12px;
}

.k-badge--md .k-badge-icon {
    width: 14px;
    height: 14px;
}

.k-badge--lg .k-badge-icon {
    width: 16px;
    height: 16px;
}

.k-badge-icon--start {
    margin-right: 4px;
}

.k-badge-icon--end {
    margin-left: 4px;
}

/* Variants */
.k-badge--secondary {
    --k-badge-bg: #e4e4e7;
    --k-badge-text: #18181b;
}
.dark .k-badge--secondary {
    --k-badge-bg: #3f3f46;
    --k-badge-text: #f4f4f5;
}

.k-badge--destructive {
    --k-badge-bg: #ef4444;
    --k-badge-text: #ffffff;
}
.dark .k-badge--destructive {
    --k-badge-bg: #ef4444;
    --k-badge-text: #ffffff;
}

.k-badge--outline {
    --k-badge-bg: transparent;
    --k-badge-text: #18181b;
    --k-badge-border: #e4e4e7;
}
.dark .k-badge--outline {
    --k-badge-bg: transparent;
    --k-badge-text: #f4f4f5;
    --k-badge-border: #3f3f46;
}

.k-badge--ghost {
    --k-badge-bg: transparent;
    --k-badge-text: #18181b;
}
.dark .k-badge--ghost {
    --k-badge-bg: transparent;
    --k-badge-text: #f4f4f5;
}
</style>
