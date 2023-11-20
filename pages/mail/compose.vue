<script setup lang="ts">
import type { TransactionHash } from '@4thtech-sdk/types';

definePageMeta({
  title: 'Compose new mail',
});

const transactionHash = ref<TransactionHash | undefined>();

const composeNew = () => {
  transactionHash.value = undefined;
};
</script>

<template>
  <div class="mx-auto w-full max-w-3xl">
    <MailComposeForm v-if="!transactionHash" v-model="transactionHash" />
    <MailComposeTransactionDetails v-else :transaction-hash="transactionHash" :compose-new="composeNew" />
  </div>
</template>
