<template>
  <!-- Top section -->
  <div class="flex-shrink-0 border-b border-neutral-200 bg-white relative"
       v-if="selectedEnvelope"
  >
    <!-- Toolbar-->
    <div class="flex h-16 flex-col justify-center">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between py-3">
          <!-- Left buttons -->
          <div>
            <div class="isolate inline-flex rounded-md shadow-sm sm:space-x-3 sm:shadow-none">
              <span class="inline-flex sm:shadow-sm">
                <NuxtLink to="/mail/compose?reply=true">
                  <button type="button"
                          class="relative inline-flex items-center rounded-l-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus:z-10 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  >
                    <ArrowUturnLeftIcon class="mr-2.5 h-5 w-5 text-neutral-400"
                                        aria-hidden="true"
                    />
                    <span>Reply</span>
                  </button>
                </NuxtLink>
                <NuxtLink to="/mail/compose?forward=true">
                  <button type="button"
                          class="relative -ml-px hidden items-center border rounded-r-md border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus:z-10 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 sm:inline-flex"
                  >
                    <ArrowUturnRightIcon class="mr-2.5 h-5 w-5 text-neutral-400"
                                         aria-hidden="true"
                    />
                    <span>Forward</span>
                  </button>
                </NuxtLink>
              </span>
            </div>
          </div>

          <!-- Right buttons -->
          <nav aria-label="Pagination">
            <span class="isolate inline-flex rounded-md shadow-sm">
              <a @click="prev"
                 class="cursor-pointer relative inline-flex items-center rounded-l-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:z-10 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              >
                <span class="sr-only">Next</span>
                <ChevronUpIcon class="h-5 w-5"
                               aria-hidden="true"
                />
              </a>
              <a @click="next"
                 class="cursor-pointer relative -ml-px inline-flex items-center rounded-r-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:z-10 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              >
                <span class="sr-only">Previous</span>
                <ChevronDownIcon class="h-5 w-5"
                                 aria-hidden="true"
                />
              </a>
            </span>
          </nav>
        </div>
      </div>
    </div>
    <!-- Message header -->
  </div>
</template>

<script setup lang="ts">
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/vue/20/solid';
import { useState } from '#imports';
import {
  ReceivedEnvelope
} from '@4thtech-sdk/types';
import { Ref } from 'vue';
import useMail from '~/composables/mail';
const selectedEnvelope = useState<ReceivedEnvelope | undefined>('selectedEnvelope');
const receivedEnvelopes: Ref<ReceivedEnvelope[]> = useMail().mailData;

const next = () => {
  if(selectedEnvelope.value) {
    const currentIndex = receivedEnvelopes.value.indexOf(selectedEnvelope.value);
    if(currentIndex >=0  && currentIndex < receivedEnvelopes.value.length - 1) {
      selectedEnvelope.value = receivedEnvelopes.value[currentIndex+1];
    }
  }
};
const prev = () => {
  if(selectedEnvelope.value) {
    const currentIndex = receivedEnvelopes.value.indexOf(selectedEnvelope.value);
    if(currentIndex >=0  && currentIndex > 0) {
      selectedEnvelope.value = receivedEnvelopes.value[currentIndex-1];
    }
  }
};
</script>
