<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50">
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col">
      <SvgLogo class="h-16" />
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <ButtonRegular class="w-full tet-center flex justify-center sm:mx-auto sm:w-full"
                       @click="walletSelectModalOpen = true"
        >
          <span class="flex">
            <LockOpenIcon class="h-5 w-5 mr-2" />
            Connect Wallet
          </span>
        </ButtonRegular>
        <LoginFacts class="mt-4" />
      </div>
    </div>
    <LoginWalletSelectModal :open="walletSelectModalOpen"
                            @close="walletSelectModalOpen = false"
    />
  </div>
</template>
<script setup lang="ts">
import { definePageMeta, ref } from '#imports';
import { LockOpenIcon } from '@heroicons/vue/24/solid';

definePageMeta({
  layout: false
});

const walletSelectModalOpen = ref<boolean>(false);
</script>
