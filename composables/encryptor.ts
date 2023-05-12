import { Encryptor } from '@4thtech-sdk/ethereum';
import { EncryptorState, Signer, UserReadyChain } from '@4thtech-sdk/types';

type EncryptorInfo = {
  isInstalled?: boolean;
  isInitialized?: boolean;
  isLocked?: boolean;
  isUnlocked?: boolean;
  getState?: EncryptorState;
  publicKey?: string;
  publicKeyType?: string;
};

const useEncryptor = (signer?: Signer, chain?: UserReadyChain) => {
  const encryptor = useState<Encryptor | undefined>('encryptor');
  const encryptorInfo = useState<EncryptorInfo>('encryptorInfo', () => ({
    isInstalled: undefined,
    isInitialized: undefined,
    isLocked: undefined,
    isUnlocked: undefined,
    getState: undefined,
    publicKey: undefined,
    publicKeyType: undefined
  }));

  let timerId: NodeJS.Timeout;

  const fetchEncryptorState = async () => {
    if (!encryptor.value) {
      return;
    }

    try {
      const isInstalled = await encryptor.value.isInstalled();
      encryptorInfo.value = {
        isInstalled
      };

      if (!isInstalled) {
        return;
      }

      const [isInitialized, isLocked, isUnlocked, getState, publicKey, publicKeyType] = await Promise.all([
        encryptor.value.isInitialized(),
        encryptor.value.isLocked(),
        encryptor.value.isUnlocked(),
        encryptor.value.getState(),
        encryptor.value.getPublicKey(),
        encryptor.value.getPublicKeyType()
      ]);

      encryptorInfo.value = {
        isInstalled,
        isInitialized,
        isLocked,
        isUnlocked,
        getState,
        publicKey,
        publicKeyType
      };
    } catch (e) {
      console.error('Error while getting encryptor info', e);
    }
  };

  const initializeEncryptor = (signer: Signer, chain: UserReadyChain) => {
    encryptor.value = new Encryptor({
      userContractConfig: {
        signer,
        chain
      }
    });

    fetchEncryptorState().then(() => {
      timerId = setInterval(fetchEncryptorState, 5000);
    });
  };

  if (signer && chain) {
    initializeEncryptor(signer, chain);
  }

  onUnmounted(() => {
    if (timerId) {
      clearInterval(timerId);
    }
  });

  return {
    encryptor,
    encryptorInfo,
    initializeEncryptor
  };
};

export default useEncryptor;
