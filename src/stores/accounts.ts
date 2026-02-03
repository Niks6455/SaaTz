import { defineStore } from "pinia";
import { ref } from "vue";
import type { Account, LabelItem } from "@/types/account";

function parseLabel(str: string): LabelItem[] {
  if (!str.trim()) return [];
  return str
    .split(";")
    .map((s) => ({ text: s.trim() }))
    .filter(({ text }) => text);
}

function createEmptyAccount(id: string): Account {
  return {
    id,
    label: "",
    labelItems: [],
    recordType: "Локальная",
    login: "",
    password: "",
  };
}

type AccountUpdate = Partial<Omit<Account, "id" | "labelItems">>;

export const useAccountsStore = defineStore(
  "accounts",
  () => {
    const list = ref<Account[]>([]);

    function add() {
      list.value = [...list.value, createEmptyAccount(crypto.randomUUID())];
    }

    function remove(id: string) {
      list.value = list.value.filter((a) => a.id !== id);
    }

    function update(id: string, payload: AccountUpdate) {
      const idx = list.value.findIndex((a) => a.id === id);
      if (idx === -1) return;
      const prev = list.value[idx];
      const next: Account = {
        ...prev,
        ...payload,
        ...(payload.label !== undefined && {
          labelItems: parseLabel(payload.label),
        }),
      };
      list.value = list.value.map((a, i) => (i === idx ? next : a));
    }

    return { list, add, remove, update };
  },
  { persist: true }
);
