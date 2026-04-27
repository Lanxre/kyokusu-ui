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
import MultiSelectDemo from '../components/demos/MultiSelectDemo.vue'
import LabelDemo from '../components/demos/LabelDemo.vue'
import CarouselDemo from '../components/demos/CarouselDemo.vue'
import ModalWindowDemo from '../components/demos/ModalWindowDemo.vue'
import ButtonDemo from '../components/demos/ButtonDemo.vue'
import TableDemo from '../components/demos/TableDemo.vue'
import CardDemo from '../components/demos/CardDemo.vue'
import PageLayoutDemo from '../components/demos/PageLayoutDemo.vue'

export const componentDemos: Record<string, Component> = {
  Toggle: ToggleDemo,
  Select: SelectDemo,
  MultiSelect: MultiSelectDemo,
  RichText: RichTextDemo,
  Input: InputDemo,
  DatePicker: DatePickerDemo,
  Separator: SeparatorDemo,
  Tooltip: TooltipDemo,
  Notification: NotificationDemo,
  SearchSelect: SearchSelectDemo,
  Label: LabelDemo,
  Carousel: CarouselDemo,
  ModalWindow: ModalWindowDemo,
  Button: ButtonDemo,
  Table: TableDemo,
  Card: CardDemo,
  PageLayout: PageLayoutDemo
}