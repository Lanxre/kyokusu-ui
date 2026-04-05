<script setup lang="ts">
import { ref } from 'vue';
import { ToggleMachine } from '@kyokusu-ui/core';

const props = defineProps<{
  initial?: boolean
}>();

const machine = new ToggleMachine(props.initial ?? false);
const isActive = ref(machine.state);

const onToggle = () => {
  isActive.value = machine.toggle();
};
</script>

<template>
  <button 
    class="kyokusu-toggle"
    :data-active="isActive"
    @click="onToggle"
  >
    <slot :active="isActive">
      {{ isActive ? 'ВКЛ' : 'ВЫКЛ' }}
    </slot>
  </button>
</template>

<style scoped>
.kyokusu-toggle {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: all 0.2s;
}
.kyokusu-toggle[data-active="true"] {
  background: #42b883;
  color: white;
}
</style>