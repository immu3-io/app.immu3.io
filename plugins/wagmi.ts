import {
  createClient,
  configureChains,
  watchAccount,
  GetAccountResult,
  getAccount,
  GetNetworkResult,
  watchNetwork,
  getNetwork
} from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
import { sepolia } from '@wagmi/core/chains';
import { useAccount, useNetwork, useRoute } from '#imports';
import useMail from '~/composables/mail';
import { useDebounceFn } from '@vueuse/core';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();
  const { chains, provider, webSocketProvider } = configureChains(
    [sepolia],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
      new MetaMaskConnector({ chains }),
      // new CoinbaseWalletConnector({
      //   chains,
      //   options: {
      //     appName: 'wagmi.sh',
      //     jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
      //   },
      // }),
      new WalletConnectConnector({
        options: {
          qrcode: true,
          version: '2',
          projectId: runtimeConfig.public.walletConnectId
        }
      }),
      new InjectedConnector({
        chains, options: {
          name: detectedName =>
            `Injected (${
              typeof detectedName === 'string'
                ? detectedName
                : detectedName.join(', ')
            })`
        }
      })
    ]
  });

  const initMailClient = useDebounceFn(() => {
    useMail().initMailClient();
  }, 500);

  useAccount().value = getAccount();
  watchAccount(async (account: GetAccountResult) => {
    if (useRoute().name !== 'login' && account.isDisconnected) {
      window.open('/login', '_self');
    } else if (useRoute().name === 'login' && account.isConnected) {
      navigateTo('/');
    } else if(account.isConnected) {
      initMailClient();
    }
    useAccount().value = account;
  });

  useNetwork().value = getNetwork();
  watchNetwork((network: GetNetworkResult) => {
    useNetwork().value = network;
    initMailClient();
  });

  return {
    provide: {
      wagmiClient: client
    }
  };
});
