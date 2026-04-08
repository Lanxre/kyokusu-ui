<script setup lang="ts">
import { ref, watch } from 'vue'
import Sidebar from './components/Sidebar.vue'
import ToggleDemo from './components/demos/ToggleDemo.vue'
import SelectDemo from './components/demos/SelectDemo.vue'
import RichTextDemo from './components/demos/RichTextDemo.vue'
import InputDemo from './components/demos/InputDemo.vue'
import DatePickerDemo from './components/demos/DatePickerDemo.vue'
import SeparatorDemo from './components/demos/SeparatorDemo.vue'

const currentComponent = ref('Toggle')
const isDark = ref(true)

watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true }) 
</script>

<template>
  <div class="playground-layout">
    <Sidebar v-model:current="currentComponent" v-model:theme="isDark" />

    <main class="content">
      <header class="content-header">
        <h1>{{ currentComponent }} Component</h1>
      </header>

      <section class="preview-area">
        <ToggleDemo v-if="currentComponent === 'Toggle'" />
        <SelectDemo v-else-if="currentComponent === 'Select'" />
        <RichTextDemo v-else-if="currentComponent === 'RichText'" />
        <InputDemo v-else-if="currentComponent === 'Input'" />
        <DatePickerDemo v-else-if="currentComponent === 'DatePicker'" />
        <SeparatorDemo v-else-if="currentComponent === 'Separator'" />
        
        <div v-else class="empty-state">
          Выберите компонент из меню слева
        </div>
      </section>
    </main>
  </div>
</template>