<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Select from "primevue/select";
import { useAccountsStore } from "@/stores/accounts";
import {
  getFirstError,
  parseLabel,
  parseLogin,
  parsePassword,
  LABEL_MAX,
  PASSWORD_MAX,
} from "@/schemas/account";
import CInput from "@/components/atoms/CInput.vue";
import CInputPassword from "@/components/atoms/CInputPassword.vue";
import CButton from "@/components/atoms/CButton.vue";
import CError from "@/components/atoms/CError.vue";
import type { Account, RecordType } from "@/types/account";

const props = defineProps<{ account: Account }>();

const store = useAccountsStore();

const recordTypeOptions: { label: string; value: RecordType }[] = [
  { label: "LDAP", value: "LDAP" },
  { label: "Локальная", value: "Локальная" },
];

const label = ref(props.account.label);
const recordType = ref<RecordType>(props.account.recordType);
const login = ref(props.account.login);
const password = ref(props.account.password ?? "");

const labelError = ref<string | null>(null);
const loginError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

watch(
  () => props.account,
  (a) => {
    label.value = a.label;
    recordType.value = a.recordType;
    login.value = a.login;
    password.value = a.password ?? "";
  },
  { deep: true }
);

const showPassword = computed(() => recordType.value === "Локальная");

function validateAll() {
  labelError.value = getFirstError(parseLabel(label.value));
  loginError.value = getFirstError(parseLogin(login.value));
  passwordError.value = showPassword.value
    ? getFirstError(parsePassword(password.value))
    : null;
}

function isValid() {
  return (
    parseLabel(label.value).success &&
    parseLogin(login.value).success &&
    (!showPassword.value || parsePassword(password.value).success)
  );
}

function trySave() {
  if (!isValid()) return;
  store.update(props.account.id, {
    label: label.value,
    recordType: recordType.value,
    login: login.value.trim(),
    password: showPassword.value ? password.value : null,
  });
}

watch(recordType, () => {
  if (recordType.value === "LDAP") {
    password.value = "";
    passwordError.value = null;
  }
  validateAll();
  trySave();
});

function onBlur(field: "label" | "login" | "password") {
  if (field === "label")
    labelError.value = getFirstError(parseLabel(label.value));
  else if (field === "login")
    loginError.value = getFirstError(parseLogin(login.value));
  else if (showPassword.value)
    passwordError.value = getFirstError(parsePassword(password.value));
  validateAll();
  trySave();
}

function remove() {
  store.remove(props.account.id);
}
</script>

<template>
  <tr class="border-b border-zinc-800 last:border-b-0">
    <td class="align-top px-2 py-2 sm:px-4 sm:py-3">
      <CInput
        v-model="label"
        :maxlength="LABEL_MAX"
        placeholder="метка1; метка2"
        class="w-full min-w-0"
        :invalid="!!labelError"
        @blur="onBlur('label')"
      />
      <CError :message="labelError" />
    </td>
    <td class="align-top px-2 py-2 sm:px-4 sm:py-3">
      <Select
        v-model="recordType"
        :options="recordTypeOptions"
        option-label="label"
        option-value="value"
        class="w-full min-w-[100px] sm:min-w-[120px]"
      />
    </td>
    <td class="align-top px-2 py-2 sm:px-4 sm:py-3">
      <CInput
        v-model="login"
        placeholder="Обязательное поле"
        class="w-full min-w-0"
        :invalid="!!loginError"
        @blur="onBlur('login')"
      />
      <CError :message="loginError" />
    </td>
    <td class="align-top px-2 py-2 sm:px-4 sm:py-3">
      <template v-if="showPassword">
        <CInputPassword
          v-model="password"
          :maxlength="PASSWORD_MAX"
          placeholder="Обязательное поле"
          class="w-full min-w-0"
          :invalid="!!passwordError"
          @blur="onBlur('password')"
        />
        <CError :message="passwordError" />
      </template>
      <span v-else class="text-zinc-500">—</span>
    </td>
    <td class="align-top px-1.5 py-2 sm:px-2 sm:py-3">
      <CButton
        icon="pi pi-trash"
        severity="danger"
        text
        class="!p-1.5 sm:!p-2"
        aria-label="Удалить"
        @click="remove"
      />
    </td>
  </tr>
</template>
