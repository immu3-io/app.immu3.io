<template>
  <div class="absolute top-0 h-full w-full bg-gray-100/90 flex items-center justify-center">
    <div class="bg-white p-20 shadow-2xl rounded-xl">
      <h3 class="uppercase text-xl">
        Available chains:
      </h3>
      <ul class="mt-4 text-center">
        <li v-for="chain in network.chains"
            :key="chain.id"
            class="cursor-pointer"
            @click="switchNetwork({chainId: chain.id})"
        >
          {{ chain.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, useState } from '#imports';
import { GetNetworkResult, switchNetwork } from '@wagmi/core';

const loading = ref<boolean>(true);
const network = useState<GetNetworkResult>('network');

onMounted(() => {
  loading.value = false;
});
</script>
