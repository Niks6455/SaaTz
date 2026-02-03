<script setup lang="ts">
import { unref } from "vue";
import type { MaybeRef } from "vue";
import InputText from "primevue/inputtext";

const props = defineProps<{
  modelValue: MaybeRef<string>;
  maxlength?: number;
  placeholder?: string;
  invalid?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  blur: [];
}>();

function onInput(value: string | undefined) {
  emit("update:modelValue", value ?? "");
}
</script>

<template>
  <InputText
    :model-value="unref(props.modelValue)"
    :maxlength="props.maxlength"
    :placeholder="props.placeholder"
    :class="['w-full rounded-lg', props.invalid && 'input-invalid']"
    @update:model-value="onInput"
    @blur="emit('blur')"
  />
</template>
