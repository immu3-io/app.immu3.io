import {
  EncryptionType,
  EthereumTransactionRequest,
  MailReadyChain,
  ReceivedEnvelope,
  Signer, UserReadyChain
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
import useEncryptor from '~/composables/encryptor';
import { toRaw } from '#build/imports';
import { EncryptionHandler, EncryptorAesEncryption } from '@4thtech-sdk/encryption';
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

    const chain = sepolia as MailReadyChain;  // TODO: change back to sepolia

    // TODO: On complete code refactor: move initialization outside of mail composable; also signer and chain should be defined somewhere globally
    const { encryptor, encryptorInfo } = useEncryptor(signer, chain as UserReadyChain);
    const encryptorRaw = toRaw(encryptor.value);

    if (!encryptorRaw) {
      return;
    }

    const encryptorEncryption = new EncryptorAesEncryption(encryptorRaw);
    const encryptionHandler = new EncryptionHandler({
      customEncryptionImplementations: new Map([
        [EncryptionType.ENCRYPTOR_AES, encryptorEncryption],
      ]),
    });

    console.log(encryptorInfo.value.isInstalled);

    const mail = new Mail({
      signer,
      chain,
      remoteStorageProvider,
      encryptionHandler,
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
