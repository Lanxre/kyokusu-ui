import type { Component } from 'vue'

export type DropdownTrigger = 'click' | 'hover'
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
export type SelectionType = 'none' | 'radio' | 'checkbox'

export interface MenuItem {
    id: string
    label: string
    icon?: Component
    action?: () => void
    disabled?: boolean
    separator?: boolean
    submenu?: MenuItem[]
    checked?: boolean
}

export interface DropdownMenuProps {
    items: MenuItem[]
    trigger?: DropdownTrigger
    placement?: DropdownPlacement
    width?: number | string
    offset?: number
    selectionType?: SelectionType
    modelValue?: string | string[] | null
}

export interface DropdownMenuEmits {
    (e: 'select', item: MenuItem): void
    (e: 'update:modelValue', value: string | string[]): void
    (e: 'open'): void
    (e: 'close'): void
}
