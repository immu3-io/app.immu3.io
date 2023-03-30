<template>
  <div class="space-y-8 mt-8">
    <div class="bg-white border border-neutral-200 sm:rounded-lg space-y-8">
      <!-- Subject -->
      <div class="p-4">
        <span>Transaction:
          <span class="inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium"
                :class="transactionResult?.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
          >{{ transactionResult?.status ? 'Success': 'Pending' }}</span>
        </span>
        <div class="mt-4">
          Open explorer: <br>
          <a class="cursor-pointer underline "
             target="_blank"
             :href="`${network.chain.blockExplorers.default.url}/tx/${transactionResponse.hash}`"
          >{{ transactionResponse.hash }}</a>
        </div>

        <div class="px-4 py-5 sm:pt-4 mt-4 border-t-2"
             v-if="transactionResult"
        >
          <dl class="sm:divide-y sm:divide-gray-500"
              v-for="(value, name, index) in reactiveOmit(transactionResult, ['logs', 'contractAddress', 'status'])"
              :key="index"
          >
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-1 sm: overflow-hidden">
              <dt class="text-sm font-medium text-gray-500">
                {{ toText(name) }}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 line-clamp-1 text-ellipsis">
                {{ value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState, onUnmounted } from '#imports';
import { MailComposeSteps } from '~/types/mail';
import { ref } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
  EthereumTransactionResponse
} from '@4thtech-sdk/types';
import {
  GetNetworkResult,
  WaitForTransactionResult
} from '@wagmi/core';

const currentStep = useState<MailComposeSteps>('currentStep');
const emit = defineEmits(['resetForm']);
const props = defineProps<{ transactionResponse: EthereumTransactionResponse }>();
const network = useState<GetNetworkResult>('network');
const transactionResult = ref();

props.transactionResponse.wait().then((result:WaitForTransactionResult) => {
  transactionResult.value = result;
}
);

const toText = ((text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return  result.charAt(0).toUpperCase() + result.slice(1);
});

onUnmounted(() => {
  currentStep.value = MailComposeSteps.Metadata;
  emit('resetForm');
});
</script>
