<template>
  <div class="">
    <div class="bg-white border border-neutral-200 sm:rounded-lg space-y-8">
      <!-- Subject -->
      <div class="px-4 pt-4 ">
        <FormLabel for="address">
          Recipient
        </FormLabel>
        <FormInput type="text"
                   name="address"
                   v-model="envelope.receiver"
                   placeholder="Address"
        />
        <FormError v-if="!isValid">
          Wrong address format
        </FormError>
        <WarningAlert
          v-else-if="!isUserAddressInitialized"
          class="mt-4"
          title="Encryption"
          content="Recipient didn't register his Encryptor extension. So we aren't able to send encrypted content."
        />
      </div>

      <!-- Actions-->
      <MailComposeActions next="Send"
                          prev="Prev"
                          :disabled="!isValid || sending"
                          @next="send"
                          @prev="currentStep = MailComposeSteps.Metadata"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState, computed, toRaw, ref, watchEffect } from '#imports';
import { MailComposeSteps } from '~/types/mail';
import { Envelope } from '@4thtech-sdk/types';
import { isAddress } from 'ethers/src.ts/utils';
import useMail from '~/composables/mail';
import {
  EthereumTransactionResponse
} from '@4thtech-sdk/types';
import { useToast } from 'vue-toastification';
import useEncryptor from '~/composables/encryptor';
import WarningAlert from '~/components/shared/WarningAlert.vue';
import { EncryptorAesEncryption } from '@4thtech-sdk/encryption';
import { Mail } from '@4thtech-sdk/ethereum';

const envelope = useState<Envelope>('envelope');
const currentStep = useState<MailComposeSteps>('currentStep');

const { encryptor } = useEncryptor();
const isUserAddressInitialized = useState<boolean | undefined>();

const isValid = computed(() => {
  return isAddress(envelope.value.receiver);
});
const emit = defineEmits(['transactionResponse']);

const { mailClient } = useMail();
const sending = ref(false);
const send = () => {
  sending.value = true;
  const mail = toRaw(mailClient.value);

  setEncryption(mail).then(() => {
    mail.send(toRaw(envelope.value)).then((response: EthereumTransactionResponse) => {
      emit('transactionResponse', response);
      currentStep.value = MailComposeSteps.Details;
      sending.value = false;
    }).catch(e => {
      sending.value = false;
      useToast().error(e.message);
    });
  });
};

const setEncryption = async (mail: Mail) => {
  let encryption = undefined;

  if (isUserAddressInitialized.value) {
    const encryptorRaw = toRaw(encryptor.value);

    if (!encryptorRaw) {
      return;
    }

    const encryptorEncryption = new EncryptorAesEncryption(encryptorRaw);
    await encryptorEncryption.initialize(envelope.value.receiver);

    encryption = encryptorEncryption;
  }

  mail.setDefaultEncryption(encryption);
};

const checkIfUserAddressInitialized = async () => {
  try {
    isUserAddressInitialized.value = await encryptor.value?.isUserAddressInitialized(envelope.value.receiver);
  } catch (e) {
    isUserAddressInitialized.value = false;
  }
};

watchEffect(() => {
  if (isValid.value) {
    checkIfUserAddressInitialized();
  }
});
</script>
