<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountsStore } from "@/stores/accounts";
import AccountCard from "@/components/organisms/AccountCard.vue";

const { list } = storeToRefs(useAccountsStore());

const headers = [
  { label: "Метки", isRequired: false },
  { label: "Тип записи", isRequired: true },
  { label: "Логин", isRequired: true },
  { label: "Пароль", isRequired: true },
  { label: "", class: "w-12 px-2 py-3", isRequired: false },
];
</script>

<template>
  <div class="space-y-3 sm:space-y-4">
    <div
      class="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2.5 text-xs text-zinc-400 sm:px-4 sm:py-3 sm:text-sm"
    >
      <i
        class="pi pi-question-circle shrink-0 text-sm sm:text-base"
        aria-hidden="true"
      />
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </span>
    </div>

    <div
      class="max-h-[70vh] min-w-0 overflow-auto rounded-lg border border-zinc-800 bg-[var(--bg-card)] sm:max-h-[78vh] sm:rounded-xl"
    >
      <table class="w-full min-w-[560px] border-collapse sm:min-w-[600px]">
        <thead
          class="sticky top-0 z-10 border-b border-zinc-800 bg-[var(--bg-card)]"
        >
          <tr>
            <th
              v-for="col in headers"
              :key="col.label || 'action'"
              :class="[
                'text-left text-xs font-medium text-zinc-400 sm:text-sm',
                col.class ?? 'px-2 py-2 sm:px-4 sm:py-3',
              ]"
              scope="col"
            >
              {{ col.label }}
              <span v-if="col.isRequired" class="text-red-500">*</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <AccountCard
            v-for="account in list"
            :key="account.id"
            :account="account"
          />
          <tr v-if="!list.length">
            <td
              colspan="5"
              class="px-2 py-6 text-center text-xs text-zinc-500 sm:px-4 sm:py-8 sm:text-sm"
            >
              Записей нет
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
