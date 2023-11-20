<script setup lang="ts">
defineProps<{ open: boolean }>();

const emit = defineEmits(['close']);

const app = useAppConfig();
const { connect, connectors } = useConnect();

const termsAccepted = ref<boolean>(false);

const closeModal = () => {
  emit('close');
};

const getConnectorIcon = (connectorId: string) => {
  const connectorIcons: Record<string, string> = {
    coinbaseWallet: '/img/icons/connectors/coinbase.svg',
    metaMask: '/img/icons/connectors/metamask.svg',
    walletConnect: '/img/icons/connectors/wallet-connect.svg',
  };

  return connectorIcons[connectorId] || '';
};
</script>

<template>
  <ModalDialog :open="open" size="sm" @close="closeModal">
    <template #header>
      <!-- Header -->
      <div class="flex w-full items-center justify-between p-4 md:p-6">
        <h3 class="font-heading text-lg font-medium leading-6 text-muted-900 dark:text-white">Connect your wallet</h3>

        <BaseButtonClose @click="closeModal" />
      </div>
    </template>

    <!-- Body -->
    <div class="p-4 pt-0 md:p-6 md:pt-0">
      <div class="mx-auto w-full max-w-xs">
        <p class="text-sm leading-5 text-muted-500 dark:text-muted-400">
          Please accept
          <a
            :href="app.links.privacyPolicy"
            class="font-sans text-sm text-primary-500 underline-offset-4 hover:underline"
            target="_blank"
          >
            Privacy Policy
          </a>
          and
          <a
            :href="app.links.termsOfUse"
            target="_blank"
            class="font-sans text-sm text-primary-500 underline-offset-4 hover:underline"
          >
            Terms of Use
          </a>
        </p>

        <div class="mt-5 flex items-center">
          <BaseCheckbox v-model="termsAccepted" label="I read and accepted" shape="rounded" color="success" />
        </div>

        <div class="mt-4 flex flex-col justify-center space-y-2">
          <BaseButton
            v-for="connector in connectors"
            :key="connector.id"
            :disabled="!termsAccepted || !connector.ready"
            class="tet-center flex w-full justify-center sm:mx-auto sm:w-full"
            @click="connect({ connector })"
          >
            <span class="flex">
              <span class="flex items-center">
                <img class="mr-2 h-5 w-5" :src="getConnectorIcon(connector.id)" :alt="`${connector.name}`" />
              </span>
            </span>
            {{ connector.name }}
          </BaseButton>
        </div>
      </div>
    </div>
  </ModalDialog>
</template>
