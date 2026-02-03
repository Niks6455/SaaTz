<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountsStore } from "@/stores/accounts";
import { useExportAccounts } from "@/composables/useExportAccounts";
import CButton from "@/components/atoms/CButton.vue";

const store = useAccountsStore();
const { list } = storeToRefs(store);

function onExport() {
  useExportAccounts(list.value).exportToJson();
}
</script>

<template>
  <header
    class="mb-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
  >
    <h1 class="text-xl font-semibold text-zinc-100 sm:text-2xl">
      Учетные записи
    </h1>
    <div class="flex flex-shrink-0 items-center gap-2">
      <CButton
        icon="pi pi-download"
        label="Экспорт"
        severity="secondary"
        outlined
        class="!text-sm sm:!text-base"
        @click="onExport"
      />
      <CButton
        icon="pi pi-plus"
        severity="primary"
        class="!text-sm sm:!text-base"
        @click="store.add"
        label="Добавить"
      />
    </div>
  </header>
</template>
