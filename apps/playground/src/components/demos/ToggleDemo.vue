<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '@kyokusu-ui/vue'

const toggleValue = ref(false)
const toggleDisabled = ref(false)
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Usage</h3>
      <Toggle 
        v-model="toggleValue" 
        label="Label: Enable / Disable"
        id="system-toggle"
      />
    <div class="status">
        Value: 
        <p class="toggle-value" :style="{ color: toggleValue ? 'green' : 'red' }">{{ toggleValue }}</p>
    </div>
    </div>

    <div class="card">
      <h3>Disabled State</h3>
      <Toggle 
        v-model="toggleDisabled" 
        :disabled="true"
        label="Locked Setting"
      />
    </div>
  </div>
</template>

<style scoped>
.toggle-value {
    font-weight: bold;
}
</style>
