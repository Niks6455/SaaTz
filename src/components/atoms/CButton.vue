<script setup lang="ts">
import Button from "primevue/button";

defineProps<{
  label?: string;
  icon?: string;
  severity?: "primary" | "secondary" | "danger";
  outlined?: boolean;
  text?: boolean;
}>();
</script>

<template>
  <Button
    :label="label"
    :icon="icon"
    :severity="severity"
    :outlined="outlined"
    :text="text"
    v-bind="$attrs"
  />
</template>
