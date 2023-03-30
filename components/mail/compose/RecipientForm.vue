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
import { useState, computed, toRaw, ref } from '#imports';
import { MailComposeSteps } from '~/types/mail';
import { Envelope } from '@4thtech-sdk/types';
import { isAddress } from 'ethers/src.ts/utils';
import useMail from '~/composables/mail';
import {
  EthereumTransactionResponse
} from '@4thtech-sdk/types';
import { useToast } from 'vue-toastification';

const envelope = useState<Envelope>('envelope');
const currentStep = useState<MailComposeSteps>('currentStep');

const isValid = computed(() => {
  return isAddress(envelope.value.receiver);
});
const emit = defineEmits(['transactionResponse']);

const { mailClient } = useMail();
const sending = ref(false);
const send = () => {
  sending.value = true;
  const mail = toRaw(mailClient.value);
  mail.send(toRaw(envelope.value)).then((response: EthereumTransactionResponse) => {
    emit('transactionResponse', response);
    currentStep.value = MailComposeSteps.Details;
    sending.value = false;
  }).catch(e => {
    sending.value = false;
    useToast().error(e.message);
  });
};
</script>
