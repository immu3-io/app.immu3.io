<template>
  <LayoutPageContainer title="Account">
    <div class="overflow-hidden bg-white shadow sm:rounded-md mt-4">
      <div class="block hover:bg-neutral-50">
        <div class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <p class="truncate text-sm font-medium text-primary-600">
              {{ network.chain.name }}
            </p>
            <div class="ml-2 flex flex-shrink-0">
              <p class="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 "
                 :class="!network.chain.unsupported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' "
              >
                {{ !network.chain.unsupported ? 'Active' : 'Unsupported' }}
              </p>
            </div>
          </div>
          <div class="mt-2 sm:flex sm:justify-between">
            <div class="sm:flex">
              <p class="flex items-center text-sm text-neutral-500 flex items-center">
                <span>{{ account.address }}</span> <SharedCopy :value="account.address" />
              </p>
            </div>
          </div>
          <div class="mt-2 sm:flex sm:justify-between"
               v-if="balance"
          >
            <div class="sm:flex">
              <p class="flex items-center text-sm text-neutral-500">
                {{ balance.formatted }} {{ balance.symbol }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutPageContainer>
</template>

<script setup lang="ts">
import { useState, ref, watch } from '#imports';
import { DocumentDuplicateIcon } from '@heroicons/vue/24/outline';
import {
  GetAccountResult,
  GetNetworkResult,
  fetchBalance,
  FetchBalanceResult
} from '@wagmi/core';
const account = useState<GetAccountResult>('account');
const network = useState<GetNetworkResult>('network');
const balance = ref<FetchBalanceResult>();

const updateBalance =  () => {
  fetchBalance({ address: account.value.address ?? '0x$' })
    .then(result => balance.value = result);
};

updateBalance();

watch(network, () => {
  updateBalance();
});

watch(account, () => {
  updateBalance();
});
</script>
