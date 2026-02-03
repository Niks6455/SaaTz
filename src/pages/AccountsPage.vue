<script setup lang="ts">
import AccountsHeader from "@/components/organisms/AccountsHeader.vue";
import AccountsList from "@/components/organisms/AccountsList.vue";
</script>

<template>
  <div
    class="min-h-screen bg-[var(--bg-page)] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
  >
    <div class="mx-auto w-full max-w-7xl min-w-0">
      <AccountsHeader />
      <AccountsList />
    </div>
  </div>
</template>
