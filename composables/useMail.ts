import type { ReceivedEnvelope } from '@4thtech-sdk/types';
import { Mail } from '@4thtech-sdk/ethereum';
import { EncryptionHandler } from '@4thtech-sdk/encryption';
import { useToast } from 'vue-toastification';

export function useMail() {
  const { address } = useAccount();
  const { pollinationXClient } = usePollinationX();
  const toast = useToast();

  const mailClient = useState<Mail>('mail-client');
  const isLoading = useState<boolean>('fetch-all-loading', () => false);
  const receivedEnvelopes = useState<ReceivedEnvelope[]>('received-envelopes', () => []);
  const selectedEnvelope = useState<ReceivedEnvelope | undefined>('selected-envelope');
  const unwatchOnNew = useState<Function>('unwatch-on-new');
  const currentPage = useState<bigint>('current-page');

  const PAGE_SIZE = 10n;

  const canLoadMore = computed(() => currentPage.value > 0);

  const initializeRemoteStorageProvider = () => {
    return pollinationXClient.value;
  };

  const initializeEncryptionHandler = () => {
    const { encryptorAesEncryption } = useEncryption();

    return new EncryptionHandler({
      encryptionImplementations: [encryptorAesEncryption],
    });
  };

  const initializeMailClient = async () => {
    cleanState();

    const { walletClient } = useWallet();

    if (!walletClient.chain?.contracts?.mail) {
      return;
    }

    const remoteStorageProvider = initializeRemoteStorageProvider();

    if (!remoteStorageProvider) {
      return;
    }

    const encryptionHandler = initializeEncryptionHandler();

    mailClient.value = new Mail({
      walletClient,
      remoteStorageProvider,
      encryptionHandler,
    });

    await fetchTotalPages();
    await fetchPage();
    listenForMailEvents();
  };

  const cleanState = () => {
    receivedEnvelopes.value = [];
    selectedEnvelope.value = undefined;
    currentPage.value = 1n;
  };

  const fetchTotalPages = async () => {
    if (!address.value) {
      return;
    }

    const mailsCount = await mailClient.value.count(address.value);
    currentPage.value = (mailsCount + PAGE_SIZE - 1n) / PAGE_SIZE;
  };

  const fetchPage = async () => {
    if (!address.value || !currentPage.value || isLoading.value) {
      return;
    }

    isLoading.value = true;

    try {
      const envelopes = await mailClient.value.fetchPaginated(address.value, currentPage.value, PAGE_SIZE);

      receivedEnvelopes.value = [...receivedEnvelopes.value, ...envelopes.reverse()];
      currentPage.value -= 1n;
    } catch (e) {
      toast.error('Failed to fetch mails.');
    } finally {
      isLoading.value = false;
    }
  };

  const listenForNewEnvelopes = () => {
    if (address.value) {
      unwatchOnNew.value = mailClient.value?.onNew(null, address.value, (envelope) => {
        receivedEnvelopes.value.unshift(envelope);
        toast.info('New mail in inbox.', { timeout: 15000 });
      });
    }
  };

  const listenForMailEvents = () => {
    // First remove previous listeners
    stopListeningForMailEvents();

    // Then add new listeners
    listenForNewEnvelopes();
  };

  const stopListeningForMailEvents = () => {
    unwatchOnNew.value?.();
  };

  return {
    mailClient,
    isLoading,
    receivedEnvelopes,
    selectedEnvelope,
    initializeMailClient,
    fetchPage,
    canLoadMore: () => canLoadMore.value,
  };
}
