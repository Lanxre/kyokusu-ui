<script setup lang="ts">
import { ref } from "vue";
import { useAutoDragCarousel } from "./useAutoDragCarousel";

interface Props {
	items: any[];
    interval?: number;
}
const props = withDefaults(defineProps<Props>(), {
    interval: 5
});

const containerRef = ref<HTMLElement | null>(null);

const { onMouseDown, onMouseLeaveOrUp, onMouseMove, stopAutoPlay } =
	useAutoDragCarousel(containerRef, props.interval);
</script>

<template>
  <div class="k-carousel-wrapper">
    <div
      ref="containerRef"
      class="k-carousel-container"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeaveOrUp"
      @mouseup="onMouseLeaveOrUp"
      @mousemove="onMouseMove"
      @mouseenter="stopAutoPlay" 
      @touchstart="stopAutoPlay"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="k-carousel-item"
      >
        <slot name="card" :item="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.k-carousel-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.k-carousel-container {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    cursor: grab;
    user-select: none;
    height: 100%;
    padding: 16px;
    
    /* Hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.k-carousel-container::-webkit-scrollbar {
    display: none;
}

@media (min-width: 768px) {
    .k-carousel-container {
        gap: 24px;
        padding: 24px;
    }
}

.k-carousel-item {
    flex-shrink: 0;
    scroll-snap-align: start;
}
</style>
