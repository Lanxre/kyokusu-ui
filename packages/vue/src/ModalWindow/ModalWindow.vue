<script lang="ts" setup>
import { toRef } from "vue";
import { PhX } from "@phosphor-icons/vue";
import { useModalLogic } from "./useModal";

interface Props {
	modelValue: boolean;
	title?: string;
	width?: string;
	height?: string;
	centerTitle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	width: "max-w-lg",
	centerTitle: false,
});

const emit = defineEmits(["update:modelValue", "close"]);

const close = () => {
	emit("update:modelValue", false);
	emit("close");
};

useModalLogic(toRef(props, "modelValue"), close);
</script>

<template>
    <Teleport to="body">
        <Transition name="k-modal">
            <div v-if="modelValue" class="k-modal-overlay" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                
                <div class="k-modal-backdrop" @click="close"></div>

                <div class="k-modal-scroll-container">
                    <div class="k-modal-centering">
                        <div 
                            class="k-modal-content"
                            :class="[width]"
                            @click.stop
                        >
                            <div 
                                class="k-modal-header"
                                :class="centerTitle ? 'k-modal-header--center' : 'k-modal-header--between'"
                            >
                                <h3 class="k-modal-title" id="modal-title">
                                    {{ title }}
                                </h3>
                                <button 
                                    @click="close"
                                    class="k-modal-close"
                                    :class="[centerTitle ? 'k-modal-close--absolute' : 'k-modal-close--relative']"
                                >
                                    <PhX :size="20" weight="bold" />
                                </button>
                            </div>

                            <div class="k-modal-body" :class="height">
                                <slot></slot>
                            </div>

                            <div v-if="$slots.footer" class="k-modal-footer">
                                <slot name="footer"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.k-modal-overlay {
    position: relative;
    z-index: 100;
}

.k-modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    transition: opacity 0.3s ease;
}

.k-modal-scroll-container {
    position: fixed;
    inset: 0;
    z-index: 10;
    width: 100vw;
    overflow-y: auto;
}

.k-modal-centering {
    display: flex;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    padding: 16px;
    text-align: center;
}

@media (max-width: 639px) {
    .k-modal-centering {
        padding: 0;
    }
}

.k-modal-content {
    position: relative;
    transform: translate(0, 0);
    overflow: hidden;
    border-radius: 12px;
    background-color: var(--k-modal-bg, #ffffff);
    text-align: left;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease-out;
    border: 1px solid var(--k-modal-border, #e4e4e7);
    width: 100%;
}

@media (min-width: 640px) {
    .k-modal-content {
        margin: 32px 0;
    }
}

:global(.dark) .k-modal-content {
    --k-modal-bg: #18181b;
    --k-modal-border: #27272a;
}

.max-w-xs { max-width: 20rem; }
.max-w-sm { max-width: 24rem; }
.max-w-md { max-width: 28rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-3xl { max-width: 48rem; }
.max-w-4xl { max-width: 56rem; }
.max-w-5xl { max-width: 64rem; }
.max-w-6xl { max-width: 72rem; }
.max-w-7xl { max-width: 80rem; }
.max-w-full { max-width: 100%; }

.k-modal-header {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid var(--k-modal-border, #e4e4e7);
}

.k-modal-header--between {
    justify-content: space-between;
}

.k-modal-header--center {
    justify-content: center;
}

.k-modal-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--k-modal-title, #18181b);
    cursor: default;
    margin: 0;
}

:global(.dark) .k-modal-title {
    --k-modal-title: #ffffff;
}

.k-modal-close {
    color: var(--k-modal-close, #a1a1aa);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;
    outline: none;
    z-index: 10;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.k-modal-close:hover {
    color: var(--k-modal-close-hover, #71717a);
}

:global(.dark) .k-modal-close {
    --k-modal-close-hover: #d4d4d8;
}

.k-modal-close--absolute {
    position: absolute;
    right: 24px;
}

.k-modal-close--relative {
    margin-left: 16px;
}

.k-modal-body {
    padding: 16px 24px;
}

.k-modal-footer {
    background-color: var(--k-modal-footer-bg, #f4f4f5);
    padding: 12px 24px;
    border-top: 1px solid var(--k-modal-border, #e4e4e7);
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

:global(.dark) .k-modal-footer {
    --k-modal-footer-bg: rgba(39, 39, 42, 0.5);
}

/* Transitions */
.k-modal-enter-active,
.k-modal-leave-active {
    transition: opacity 0.3s ease;
}

.k-modal-enter-from,
.k-modal-leave-to {
    opacity: 0;
}

.k-modal-enter-active .k-modal-content,
.k-modal-leave-active .k-modal-content {
    transition: all 0.3s ease-out;
}

.k-modal-enter-from .k-modal-content,
.k-modal-leave-to .k-modal-content {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
}
</style>