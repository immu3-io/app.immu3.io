<template>
  <div>
    <NetworkSwitcher />

    <NuxtLayout>
      <NuxtLoadingIndicator color="rgb(var(--color-primary-500))" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Buffer } from 'buffer/';
window.Buffer = Buffer;
</script>
