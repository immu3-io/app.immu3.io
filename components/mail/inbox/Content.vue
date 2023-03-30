<template>
  <div class="min-h-0 flex-1 overflow-y-auto bg-neutral-50">
    <template v-if="selectedEnvelope">
      <div class="bg-white pt-5 pb-6 shadow">
        <div class="px-4 sm:flex sm:items-baseline sm:justify-between sm:px-6 lg:px-8">
          <div class="sm:w-0 sm:flex-1">
            <h1 id="message-heading"
                class="text-lg font-medium text-neutral-900"
            >
              {{ selectedEnvelope.content.subject }}
            </h1>
            <div class="flex items-center mt-1 relative">
              <p class="truncate text-sm text-neutral-500 mr-2">
                {{ selectedEnvelope.sender }}
              </p>
              <div class="relative">
                <PlayIcon class="h-3 rotate-90 text-neutral-500 cursor-pointer"
                          @click="detailsVisible = !detailsVisible"
                />
                <MailInboxDetails v-show="detailsVisible"
                                  ref="details"
                />
              </div>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
            <!--          <span class="inline-flex items-center rounded-full bg-primary-100 px-3 py-0.5 text-sm font-medium text-cyan-800">Send</span>-->
            <Menu as="div"
                  class="relative ml-3 inline-block text-left"
            >
              <div>
                <MenuButton class="-my-2 flex items-center rounded-full bg-white p-2 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-600">
                  <span class="sr-only">Open options</span>
                  <EllipsisVerticalIcon class="h-5 w-5"
                                        aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <button @click="copy()"
                              type="button"
                              :class="[active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700', 'flex w-full justify-between px-4 py-2 text-sm']"
                      >
                        <span>Copy address</span>
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button @click="archive"
                              type="button"
                              :class="[active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700', 'flex w-full justify-between px-4 py-2 text-sm']"
                      >
                        <span>Archive mail</span>
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <!-- Thread section-->
      <ul role="list"
          class="space-y-2 py-4 sm:space-y-4 sm:px-6 lg:px-8"
      >
        <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
          <div class="sm:flex sm:items-baseline sm:justify-between">
            <h3 class="text-base font-medium">
              <span class="text-neutral-900">{{ selectedEnvelope.sender }}</span>
              {{ ' ' }}
              <span class="text-neutral-600">wrote</span>
            </h3>
            <p class="mt-1 whitespace-nowrap text-sm text-neutral-600 sm:mt-0 sm:ml-3">
              <time :datetime="selectedEnvelope.sentAt * 1000">{{ useDateFormat(selectedEnvelope.sentAt * 1000, 'D MMM YYYY, h:mm:ss').value }}</time>
            </p>
          </div>
          <div class="mt-4 space-y-6 text-sm text-neutral-800"
               v-html="selectedEnvelope.content.body"
          />
          <MailInboxContentAttachments :attachments="selectedEnvelope.content.attachments " />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue';
import {
  EllipsisVerticalIcon
} from '@heroicons/vue/20/solid';
import { useDateFormat } from '@vueuse/core';
import { useState, ref } from '#imports';
import {
  ReceivedEnvelope
} from '@4thtech-sdk/types';
import { useClipboard } from '@vueuse/core';
import { saveAs } from 'file-saver';
import { PlayIcon } from '@heroicons/vue/24/solid';
import { onClickOutside } from '@vueuse/core';

const details = ref(null);
const detailsVisible = ref(false);
const selectedEnvelope = useState<ReceivedEnvelope | undefined>('selectedEnvelope');
const { copy } = useClipboard({ source: selectedEnvelope.value?.sender });
const archive = () => {
  const fileToSave = new Blob([JSON.stringify(selectedEnvelope.value, null, 2)], {
    type: 'application/json'
  });

  saveAs(fileToSave, selectedEnvelope.value?.sender);
};

onClickOutside(details, () => detailsVisible.value = false);
</script>
