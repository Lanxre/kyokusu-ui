<script setup lang="ts">
import { ref } from 'vue';
import { ToggleMachine } from '@kyokusu-ui/core';

const machine = new ToggleMachine(false);
const isActive = ref(machine.state);

const handleClick = () => {
  isActive.value = machine.toggle();
};
</script>

<template>
  <button @click="handleClick" style="padding: 10px; font-weight: bold; cursor: pointer;">
    Headless Status: {{ isActive ? 'ON' : 'OFF' }}
  </button>
</template>