<template>
  <TransitionRoot as="template"
                  :show="open"
  >
    <Dialog as="div"
            class="relative z-10"
            @close="emit('close')"
    >
      <TransitionChild as="template"
                       enter="ease-out duration-300"
                       enter-from="opacity-0"
                       enter-to="opacity-100"
                       leave="ease-in duration-200"
                       leave-from="opacity-100"
                       leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template"
                           enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100"
                           leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div class="">
                  <DialogTitle as="h3"
                               class="text-lg font-medium leading-6 text-neutral-900"
                  >
                    Connect to a wallet
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-neutral-500">
                      Accept <a href="https://github.com/4thtech/static-assets/raw/main/pdf/privacy-policy.pdf"
                                class="underline text-primary-600 hover:text-primary-800"
                                target="_blank"
                      >Privacy Policy</a>
                      and
                      <a href="https://github.com/4thtech/static-assets/raw/main/pdf/2023-02-20-Block_Labs_Software_Terms.pdf"
                         target="_blank"
                         class="underline text-primary-600 hover:text-primary-800"
                      >Software Terms of use</a>
                    </p>
                  </div>
                  <div class="mt-5 flex items-center">
                    <FormCheckbox v-model="termsAccepted"
                                  class="mr-2 mb-1"
                    /> <FormLabel class="cursor-pointer"
                                  @click="termsAccepted = !termsAccepted"
                    >
                      I read and accepted
                    </FormLabel>
                  </div>
                </div>
              </div>
              <div class="mt-4 flex justify-center flex-col space-y-2">
                <ButtonRegular v-for="connector in $wagmiClient.connectors"
                               :key="connector.id"
                               :disabled="!termsAccepted || !connector.ready"
                               class="w-full tet-center flex justify-center sm:mx-auto sm:w-full"
                               @click="connectWallet(connector)"
                >
                  <span class="flex">
                    <span class="flex items-center">
                      <component :is="icons[`Svg${connector.name}`]"
                                 class="mr-2"
                      />{{ connector.name }}</span>
                  </span>
                </ButtonRegular>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from '#imports';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { connect, Connector } from '@wagmi/core';
import { SvgMetaMask, SvgWalletConnect } from '#components';
import { useToast } from 'vue-toastification';

const icons = {
  SvgMetaMask,
  SvgWalletConnect
};

const emit = defineEmits(['close']);
const termsAccepted = ref<boolean>(false);
defineProps<{open: boolean}>();

const connectWallet = (connector:Connector) => {
  connect({ connector }).catch(e => {
    useToast().error(e.message);
  });
};
</script>
