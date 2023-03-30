<template>
  <div v-if="loading"
       class="min-h-screen flex items-center justify-center"
  >
    <div role="status">
      <SvgSpinner />
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="min-h-full relative"
       v-else
  >
    <LayoutSidebar />
    <div class="flex flex-1 flex-col bg-white lg:pl-[16.5rem]">
      <main class="flex-1 min-h-screen flex flex-col">
        <LayoutHeader />
        <slot />
      </main>
    </div>
    <SharedSwitchNetworkModal v-if="network.chain.unsupported" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useState } from '#imports';
import { GetNetworkResult } from '@wagmi/core';

const loading = ref<boolean>(true);
const network = useState<GetNetworkResult>('network');

onMounted(() => {
  loading.value = false;
});
</script>
