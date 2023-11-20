import type {
  Address,
  EthereumTransactionRequest,
  EthereumTransactionResponse,
  WalletClient,
} from '@4thtech-sdk/types';
import { prepareSendTransaction, sendTransaction } from 'use-wagmi/actions';

export function useWallet() {
  const { chain: activeChain } = useWagmiNetwork();
  const { address } = useAccount();

  const walletClient: WalletClient = {
    chain: activeChain.value,
    getAddress(): Promise<Address> {
      return address.value;
    },
    async sendTransaction(transactionRequest: EthereumTransactionRequest): Promise<EthereumTransactionResponse> {
      const preparedRequest = await prepareSendTransaction(transactionRequest);
      const { hash } = await sendTransaction(preparedRequest);

      return hash;
    },
  };

  return {
    walletClient,
  };
}
