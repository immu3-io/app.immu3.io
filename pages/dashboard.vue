<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
});
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-3 ptablet:grid-cols-2">
    <!-- Account widget -->
    <div class="relative">
      <AccountDataWidget />
    </div>
    <!-- Encryptor widget -->
    <div class="relative">
      <EncryptorWidget />
    </div>
  </div>
</template>
