<script setup lang="ts">
const { open } = usePanels();
const { chain } = useWagmiNetwork();
</script>

<template>
  <button
    v-if="chain"
    type="button"
    class="flex h-9 w-9 items-center justify-center rounded-full border border-muted-200 bg-white ring-1 ring-transparent transition-all duration-300 hover:ring-muted-200 hover:ring-offset-4 dark:border-muted-700 dark:bg-muted-800 dark:ring-offset-muted-900 dark:hover:ring-muted-700"
    @click="open('network')"
  >
    <img class="h-7 w-7 rounded-full" :src="`/img/icons/chains/${chain.id}.svg`" alt="chain icon" />
  </button>
</template>
