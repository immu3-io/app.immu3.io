import {
  EthereumTransactionRequest,
  MailReadyChain,
  ReceivedEnvelope,
  Signer
} from '@4thtech-sdk/types';
import {
  fetchSigner,
  getAccount,
  prepareSendTransaction,
  sendTransaction
} from '@wagmi/core';
import { Mail, sepolia } from '@4thtech-sdk/ethereum';
import { PollinationX } from '@4thtech-sdk/storage';
import { useToast } from 'vue-toastification';
const useMail = () => {
  const mailData = useState<ReceivedEnvelope[]>('envelopes', () => []);
  const mailClient = useState<Mail>('mailClient');
  const runtimeConfig = useRuntimeConfig();

  const initMailClient = async () => {
    const remoteStorageProvider = new PollinationX(
      runtimeConfig.public.pollinationX.url,
      runtimeConfig.public.pollinationX.token
    );

    const wagmiSigner = await fetchSigner();

    if(!wagmiSigner) {
      return;
    }

    const signer: Signer = wagmiSigner;

    signer.sendTransaction = async (request: EthereumTransactionRequest) => {
      const config = await prepareSendTransaction({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request
      });

      return sendTransaction({
        ...config,
        request: config.request
      });
    };

    const mail = await new Mail({
      signer,
      chain: sepolia as MailReadyChain,
      remoteStorageProvider
    });

    mailData.value = (await mail.fetchAll(getAccount().address ?? '')).reverse();
    mail.onNew(null, getAccount().address ?? '', (envelope:ReceivedEnvelope) => {
      mailData.value.unshift(envelope);
      useToast().info('New mail in inbox.', { timeout: 15000 });
    });
    mailClient.value = mail;
  };

  return {
    mailData,
    mailClient,
    initMailClient
  };
};
export default useMail;
