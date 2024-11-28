import { UseWagmiPlugin, configureChains, createConfig } from 'use-wagmi';
import {
  gnosisChiado,
  minato,
  citrea,
} from '@4thtech-sdk/ethereum';

import { CoinbaseWalletConnector } from 'use-wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'use-wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'use-wagmi/connectors/metaMask';

import { publicProvider } from 'use-wagmi/providers/public';

export default defineNuxtPlugin((nuxtApp) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
      minato,
      gnosisChiado,
      citrea,
    ],
    [publicProvider()],
  );

  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({
        chains,
        options: {
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: '4thTech',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: useRuntimeConfig().public.walletConnectId,
          showQrModal: true,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  });

  nuxtApp.vueApp.use(UseWagmiPlugin, config);
});
