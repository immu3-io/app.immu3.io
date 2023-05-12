<template>
  <div class="bg-white border border-neutral-200 sm:rounded-lg">
    <div class="px-4 pt-4 space-y-4">
      <!-- Subject -->
      <div>
        <FormLabel for="subject">
          Subject
        </FormLabel>
        <FormInput type="text"
                   name="subject"
                   v-model="envelope.content.subject"
                   placeholder="Enter subject"
        />
        <FormError v-if="!envelope.content.subject">
          Please enter the subject of the message.
        </FormError>
      </div>

      <!-- Content -->
      <div>
        <FormLabel for="content">
          Content
        </FormLabel>
        <FormInput type="textarea"
                   name="content"
                   v-model="envelope.content.body"
                   placeholder="Enter content"
                   rows="6"
        />
      </div>

      <!-- Attachments-->
      <div>
        <FormLabel>Attachments</FormLabel>
        <FormInputFile v-model="envelope.content.attachments" />
        <div v-if="envelope.content.attachments.length"
             class="sm:col-span-2 mt-1"
        >
          <dt class="text-sm font-medium text-neutral-500">
            Selected files
          </dt>
          <dd class="mt-1 text-sm text-neutral-900">
            <ul>
              <li v-for="(file, index) in envelope.content.attachments"
                  :key="index"
              >
                {{ file.name }}
              </li>
            </ul>
          </dd>
        </div>
      </div>

      <!-- Encryption info TODO: move to a new component -->
      <div>
        <WarningAlert
          v-if="!encryptorInfo.isInstalled"
          title="Encryption"
          content="In order to be able to send or receive encrypted content you should install Encryptor browser extension."
          :link="{
            href: 'https://chrome.google.com/webstore/detail/encryptor/feolajpinjjfikmmeknkdjbllbppojij',
            text: 'Install Encryptor',
          }"
        />
        <WarningAlert
          v-else-if="!encryptorInfo.isInitialized"
          title="Encryption"
          content="Please initialize Encryptor extension in order to be able to send or receive encrypted content."
        />
        <WarningAlert
          v-else-if="encryptorInfo.isLocked"
          title="Encryption"
          content="Please unlock Encryptor extension."
        />
        <WarningAlert
          v-else-if="!isUserAddressInitialized"
          title="Encryption"
          content="Please register Encryptor extension. There will be created a transaction to a smart contract."
        >
          <template #actions>
            <button @click="registerExtension" class="rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-700 hover:bg-yellow-100 focus:outline-none">
              Register Extension
            </button>
          </template>
        </WarningAlert>
      </div>
    </div>

    <!-- Actions-->
    <MailComposeActions next="Next"
                        :disabled="!envelope.content.subject"
                        @next="currentStep = MailComposeSteps.Recipient"
    />
  </div>
</template>

<script setup lang="ts">
import { toRaw, useAccount, useState, watchEffect } from '#imports';
import { MailComposeSteps } from '~/types/mail';
import { Envelope } from '@4thtech-sdk/types';
import useEncryptor from '~/composables/encryptor';
import WarningAlert from '~/components/shared/WarningAlert.vue';

const envelope = useState<Envelope>('envelope');
const currentStep = useState<MailComposeSteps>('currentStep');

// TODO: move to a new component
const { encryptor, encryptorInfo } = useEncryptor();

const userAddress = useState<string | undefined>();
const isUserAddressInitialized = useState<boolean>();

watchEffect(async () => {
  userAddress.value = useAccount().value.address;
  if (userAddress.value && encryptor.value) {
    try {
      isUserAddressInitialized.value = await encryptor.value?.isUserAddressInitialized(userAddress.value);
    } catch (e) {
      isUserAddressInitialized.value = false;
    }
  }
});

const registerExtension = () => {
  const encryptorRaw = toRaw(encryptor.value);
  encryptorRaw?.storePublicKey();
};
</script>
