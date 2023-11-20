import { EncryptorAesEncryption } from '@4thtech-sdk/encryption';

export function useEncryption() {
  const { encryptorClient } = useEncryptor();

  const encryptorAesEncryption = new EncryptorAesEncryption(encryptorClient);

  return {
    encryptorAesEncryption,
  };
}
