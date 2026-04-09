import { 
  PhToggleLeft, 
  PhCursorClick, 
  PhTextT, 
  PhListDashes,
  PhTextAa,
  PhTimer,
  PhSelectionAll,
  PhLineSegment,
  PhNotification,
  PhToolbox
} from '@phosphor-icons/vue'
import type { Component } from 'vue'

export interface NavigationItem {
  id: string
  label: string
  icon: Component
  disabled?: boolean
}

export interface NavigationGroup {
  label: string
  items: NavigationItem[]
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Form',
    items: [
      { id: 'Input', label: 'Input', icon: PhTextT },
      { id: 'Select', label: 'Select', icon: PhListDashes },
      { id: 'MultiSelect', label: 'MultiSelect', icon: PhSelectionAll, disabled: true },
      { id: 'SearchSelect', label: 'SearchSelect', icon: PhCursorClick },
      { id: 'DatePicker', label: 'DatePicker', icon: PhTimer }
    ]
  },
  {
    label: 'Content',
    items: [
      { id: 'RichText', label: 'Rich Text', icon: PhTextAa },
      { id: 'Label', label: 'Label', icon: PhCursorClick, disabled: true },
      { id: 'Separator', label: 'Separator', icon: PhLineSegment }
    ]
  },
  {
    label: 'Controls',
    items: [
      { id: 'Toggle', label: 'Toggle', icon: PhToggleLeft },
      { id: 'Button', label: 'Button', icon: PhCursorClick, disabled: true },
      { id: 'Tooltip', label: 'Tooltip', icon: PhToolbox },
      { id: 'Notification', label: 'Notification', icon: PhNotification }
    ]
  }
]