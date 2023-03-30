<template>
  <nav aria-label="Progress">
    <ol role="list"
        class="overflow-hidden"
    >
      <li v-for="(step, stepIdx) in steps"
          :key="step.name"
          :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']"
      >
        <template v-if="currentStep > stepIdx">
          <div v-if="stepIdx !== steps.length - 1"
               class="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-600"
               aria-hidden="true"
          />
          <div class="group relative flex items-start">
            <span class="flex h-9 items-center">
              <span class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 group-hover:bg-primary-800">
                <CheckIcon class="h-5 w-5 text-white"
                           aria-hidden="true"
                />
              </span>
            </span>
            <span class="ml-4 flex min-w-0 flex-col">
              <span class="text-sm font-medium">{{ step.name }}</span>
              <span class="text-sm text-neutral-500">{{ step.description }}</span>
            </span>
          </div>
        </template>
        <template v-else-if="currentStep === stepIdx">
          <div v-if="stepIdx !== steps.length - 1"
               class="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-neutral-300"
               aria-hidden="true"
          />
          <div class="group relative flex items-start"
               aria-current="step"
          >
            <span class="flex h-9 items-center"
                  aria-hidden="true"
            >
              <span class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-white">
                <span class="h-2.5 w-2.5 rounded-full bg-primary-600" />
              </span>
            </span>
            <span class="ml-4 flex min-w-0 flex-col">
              <span class="text-sm font-medium text-primary-600">{{ step.name }}</span>
              <span class="text-sm text-neutral-500">{{ step.description }}</span>
            </span>
          </div>
        </template>
        <template v-else>
          <div v-if="stepIdx !== steps.length - 1"
               class="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-neutral-300"
               aria-hidden="true"
          />
          <div class="group relative flex items-start">
            <span class="flex h-9 items-center"
                  aria-hidden="true"
            >
              <span class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-300 bg-white group-hover:border-neutral-400">
                <span class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-neutral-300" />
              </span>
            </span>
            <span class="ml-4 flex min-w-0 flex-col">
              <span class="text-sm font-medium text-neutral-500">{{ step.name }}</span>
              <span class="text-sm text-neutral-500">{{ step.description }}</span>
            </span>
          </div>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid';
import { useState } from '#imports';
import { MailComposeSteps } from '~/types/mail';

const steps = [
  { name: 'Fill in metadata', description: 'Enter Subject, Content and Attachments.' },
  { name: 'Select recipient', description: 'Enter user wallet address and confirm transaction.' },
  { name: 'Transaction details', description: 'Transaction hash.' }
];

const currentStep = useState<MailComposeSteps>('currentStep');
</script>
