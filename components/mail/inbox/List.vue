<template>
  <!-- Message list-->
  <aside class="hidden xl:order-first xl:block xl:flex-shrink-0">
    <div class="relative flex h-full w-96 flex-col border-r border-neutral-200 bg-neutral-100">
      <div class="flex-shrink-0">
        <div class="flex h-16 flex-col justify-center bg-white px-6">
          <div class="flex items-baseline space-x-3">
            <h2 class="text-lg font-medium text-neutral-900">
              Inbox
            </h2>
            <p class="text-sm font-medium text-neutral-500">
              {{ receivedEnvelopes.length }} messages
            </p>
          </div>
        </div>
        <div class="border-t border-b border-neutral-200 bg-neutral-50 px-6 py-2 text-sm font-medium text-neutral-500">
          Sorted by date
        </div>
      </div>
      <nav aria-label="Message list"
           class="min-h-0 flex-1 overflow-y-auto bg-white"
      >
        <ul role="list"
            class="divide-y divide-neutral-200 border-b border-neutral-200"
        >
          <li v-for="(item, key) in receivedEnvelopes"
              :key="key"
              class="relative bg-white py-5 px-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-neutral-50"
              :class="[{'ring-2 ring-inset ring-primary-500 bg-neutral-50': item === selectedEnvelope}]"
          >
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <div @click="selectedEnvelope = item"
                     class="block cursor-pointer"
                >
                  <span class="absolute inset-0"
                        aria-hidden="true"
                  />
                  <p class="truncate text-sm font-medium text-neutral-900">
                    {{ item.sender }}
                  </p>
                  <p class="truncate text-sm text-neutral-500">
                    {{ item.content.subject }}
                  </p>
                </div>
              </div>
              <UseTimeAgo v-slot="{ timeAgo }"
                          :time="new Date(item.sentAt*1000)"
              >
                <span class="flex-shrink-0 whitespace-nowrap text-sm text-neutral-500">{{ timeAgo }}</span>
              </UseTimeAgo>
            </div>
            <div class="mt-1">
              <p class="text-sm text-neutral-600 line-clamp-2">
                {{ item.content.body }}
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ReceivedEnvelope
} from '@4thtech-sdk/types';
import { useState, watch } from '#imports';
import { Ref } from 'vue';
import useMail from '~/composables/mail';
import { UseTimeAgo } from '@vueuse/components';

const selectedEnvelope = useState<ReceivedEnvelope | undefined>('selectedEnvelope');
const receivedEnvelopes: Ref<ReceivedEnvelope[]> = useMail().mailData;

watch(receivedEnvelopes, envelopes => {
  if(envelopes.length === 0) {
    selectedEnvelope.value = undefined;
  }
});
</script>
