<script setup lang="ts">
import { ModalWindow } from '../ModalWindow';
import { Button } from '../Button';

import '../../../core/src/styles/modal-confirm.css';

defineOptions({
	inheritAttrs: false
});

interface Props {
	modelValue: boolean;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
}

withDefaults(defineProps<Props>(), {
	title: "Подтверждение",
	description: "Вы уверены, что хотите выполнить это действие?",
	confirmText: "Да",
	cancelText: "Отмена"
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);

const onConfirm = () => {
	emit("confirm");
	emit("update:modelValue", false);
};

const onCancel = () => {
	emit("cancel");
	emit("update:modelValue", false);
};
</script>

<template>
  <div class="k-modal-confirm">
    <ModalWindow 
      :model-value="modelValue" 
      @update:model-value="$emit('update:modelValue', $event)"
      :title="title" 
      :center-title="true"
      width="w-full max-w-sm"
    >
      <div class="k-modal-confirm-body">
        <p class="k-modal-confirm-description">
          {{ description }}
        </p>
        
        <div class="k-modal-confirm-actions">
          <Button variant="outline" @click="onCancel">
            {{ cancelText }}
          </Button>
          <Button variant="primary" @click="onConfirm">
            {{ confirmText }}
          </Button>
        </div>
      </div>
    </ModalWindow>
  </div>
</template>
