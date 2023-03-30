<template>
  <div class="absolute z-10 -left-40 inline-block text-sm font-light transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm">
    <div class="p-4 space-y-2">
      <div v-for="item in data"
           :key="item"
           class="flex space-x-2 items-center "
      >
        <div class="w-20 text-right text-gray-500">
          {{ item.name }}:
        </div>
        <div v-html="item.value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useState } from '#imports';
import { ReceivedEnvelope } from '@4thtech-sdk/types';
import { useDateFormat } from '@vueuse/core';
import { GetNetworkResult } from '@wagmi/core';
const selectedEnvelope = useState<ReceivedEnvelope | undefined>('selectedEnvelope' );
const network = useState<GetNetworkResult>('network');

const exporerUrl = computed(() => `${network.value.chain?.blockExplorers?.default.url}/tx/${selectedEnvelope.value?.metadata.transactionHash}`);

const data = computed(() => {
  if(selectedEnvelope.value) {
    return [
      { name: 'from', value: selectedEnvelope.value.sender },
      { name: 'to',  value: selectedEnvelope.value.receiver },
      { name: 'date', value: useDateFormat(selectedEnvelope.value.sentAt * 1000, 'D MMM YYYY, h:mm:ss').value },
      { name: 'subject', value: selectedEnvelope.value.content.subject },
      { name: 'chain', value: network.value.chain?.name },
      { name: 'transaction', value: `${selectedEnvelope.value?.metadata.transactionHash} <br> <a href="${exporerUrl.value}" target="_blank" class="hover:underline text-primary-700">view in explorer</a>` },
      { name: 'checksum', value: selectedEnvelope.value?.metadata.checksum }
    ];
  }
});
</script>
