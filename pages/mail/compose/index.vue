<template>
  <LayoutPageContainer title="New dMail">
    <div class="max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3 mt-8">
      <component :is="componentToShow"
                 class="space-y-6 lg:col-start-1 lg:col-span-2"
                 @reset-form="resetForm"
                 @transaction-response="setTransactionResponse"
                 :transaction-response="transactionResponse"
      />
      <MailComposeFormSteps class="hidden lg:block" />
    </div>
  </LayoutPageContainer>
</template>
<script setup lang="ts">
import { MailComposeSteps } from '~/types/mail';
import {
  computed,
  onMounted,
  onUnmounted,
  resolveComponent,
  useAccount,
  useRoute,
  useState
} from '#imports';
import {
  Envelope,
  EthereumTransactionResponse,
  ReceivedEnvelope
} from '@4thtech-sdk/types';
import { Ref, ref } from 'vue';
import { useDateFormat } from '@vueuse/core';

const envelope: Envelope = {
  content: {
    subject: '',
    body: '',
    attachments: []
  },
  sender: useAccount().value.address ?? '',
  receiver: ''
};

const transactionResponse: Ref<EthereumTransactionResponse|undefined> = ref();

const setTransactionResponse = (response:EthereumTransactionResponse) => {
  transactionResponse.value = response;
};

const useFormData = useState<Envelope>('envelope', () => envelope);
const currentStep = useState<MailComposeSteps>('currentStep', () => MailComposeSteps.Metadata);

const resetForm = () => {
  useFormData.value = envelope;
};

onMounted(() => {
  const selectedEnvelope = useState<ReceivedEnvelope | undefined>('selectedEnvelope' );

  if(useRoute().query.reply && selectedEnvelope.value) {
    useFormData.value.content.subject = `Re: ${
      selectedEnvelope.value?.content.subject
    }`;
    useFormData.value.receiver = selectedEnvelope.value?.sender;
    useFormData.value.content.body = `\n\nOn ${useDateFormat(selectedEnvelope.value?.sentAt * 1000, 'D MMM YYYY, h:mm:ss').value} ${selectedEnvelope.value?.sender} wrote:\n\n${selectedEnvelope.value?.content.body}`;
  } else if(useRoute().query.forward && selectedEnvelope.value) {
    useFormData.value.content.subject = `Fwd: ${
      selectedEnvelope.value?.content.subject
    }`;
    useFormData.value.content.body = `\n\nOn ${useDateFormat(selectedEnvelope.value?.sentAt * 1000, 'D MMM YYYY, h:mm:ss').value} ${selectedEnvelope.value?.sender} wrote:\n\n${selectedEnvelope.value?.content.body}`;
  }
});

onUnmounted(() => {
  resetForm();
  currentStep.value = MailComposeSteps.Metadata;
});

const componentToShow = computed(() => {
  if(currentStep.value === MailComposeSteps.Metadata) {
    return resolveComponent('MailComposeMetaDataForm');
  } else if(currentStep.value === MailComposeSteps.Recipient) {
    return resolveComponent('MailComposeRecipientForm');
  }

  return resolveComponent('MailComposeTransactionDetails');
});
</script>
