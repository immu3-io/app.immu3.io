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
        <FormError v-if="!!!envelope.content.subject">
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
    </div>

    <!-- Actions-->
    <MailComposeActions next="Next"
                        :disabled="!!!envelope.content.subject"
                        @next="currentStep = MailComposeSteps.Recipient"
    />
  </div>
</template>

<script setup lang="ts">
import { useState } from '#imports';
import { MailComposeSteps } from '~/types/mail';
import { Envelope } from '@4thtech-sdk/types';

const envelope = useState<Envelope>('envelope');
const currentStep = useState<MailComposeSteps>('currentStep');
</script>
