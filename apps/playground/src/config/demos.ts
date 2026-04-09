import type { Component } from 'vue'

import ToggleDemo from '../components/demos/ToggleDemo.vue'
import SelectDemo from '../components/demos/SelectDemo.vue'
import RichTextDemo from '../components/demos/RichTextDemo.vue'
import InputDemo from '../components/demos/InputDemo.vue'
import DatePickerDemo from '../components/demos/DatePickerDemo.vue'
import SeparatorDemo from '../components/demos/SeparatorDemo.vue'
import TooltipDemo from '../components/demos/TooltipDemo.vue'
import NotificationDemo from '../components/demos/NotificationDemo.vue'
import SearchSelectDemo from '../components/demos/SearchSelectDemo.vue'

export const componentDemos: Record<string, Component> = {
  Toggle: ToggleDemo,
  Select: SelectDemo,
  RichText: RichTextDemo,
  Input: InputDemo,
  DatePicker: DatePickerDemo,
  Separator: SeparatorDemo,
  Tooltip: TooltipDemo,
  Notification: NotificationDemo,
  SearchSelect: SearchSelectDemo
}