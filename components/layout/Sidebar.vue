<template>
  <div>
    <TransitionRoot as="template"
                    :show="sidebarOpen"
    >
      <Dialog as="div"
              class="relative z-40 md:hidden"
              @close="sidebarOpen = false"
      >
        <TransitionChild as="template"
                         enter="transition-opacity ease-linear duration-300"
                         enter-from="opacity-0"
                         enter-to="opacity-100"
                         leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100"
                         leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-menu-background-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template"
                           enter="transition ease-in-out duration-300 transform"
                           enter-from="-translate-x-full"
                           enter-to="translate-x-0"
                           leave="transition ease-in-out duration-300 transform"
                           leave-from="translate-x-0"
                           leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-menu-background-50">
              <TransitionChild as="template"
                               enter="ease-in-out duration-300"
                               enter-from="opacity-0"
                               enter-to="opacity-100"
                               leave="ease-in-out duration-300"
                               leave-from="opacity-100"
                               leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button"
                          class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white"
                               aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                  <SvgLogo class="h-8 w-auto" />
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <NuxtLink v-for="item in navigation"
                            :key="item.name"
                            :to="item.to"
                            :class="[item.current ? 'bg-menu-background-100 text-menu-text-900' : 'text-menu-background-600 hover:bg-menu-background-50 hover:text-menu-text-900', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']"
                  >
                    <component :is="item.icon"
                               :class="[item.current ? 'text-menu-text-500' : 'text-menu-background-400 group-hover:text-menu-text-500', 'mr-4 flex-shrink-0 h-6 w-6']"
                               aria-hidden="true"
                    />
                    {{ item.name }}
                  </NuxtLink>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 lg:flex md:w-60 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="min-h-full flex-1 flex ">
        <div class="min-w-[3rem] flex items-center flex-col space-y-3 justify-center">
          <div class="flex flex-col items-center cursor-pointer">
            <EnvelopeIcon class="h-10 bg-menu-background-200 rounded-full p-2" />
            <span class="text-[0.65rem]">dMail</span>
          </div>
          <div class="flex flex-col items-center cursor-not-allowed">
            <ChatBubbleBottomCenterIcon class="h-7" />
            <span class="text-[0.65rem]">dChat</span>
          </div>
        </div>
        <div class="flex min-h-0 flex-1 flex-col border-r border-menu-background-200 bg-menu-background-50">
          <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4 w-[13.5rem]">
            <div class="flex justify-center flex-shrink-0 items-center px-4">
              <SvgLogo class="h-12 w-auto" />
            </div>
            <nav class="mt-5 flex-1 space-y-1 bg-menu-background-50 px-2">
              <NuxtLink v-for="item in navigation"
                        :key="item.name"
                        :to="item.to"
                        :class="[$route.path === item.to ? 'bg-white text-menu-text-900' : 'text-menu-text-600 hover:bg-menu-background-50 hover:text-menu-text-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']"
              >
                <component :is="item.icon"
                           :class="[$route.path === item.to ? 'text-menu-text-500' : 'text-menu-text-400 group-hover:text-menu-text-500', 'mr-3 flex-shrink-0 h-6 w-6']"
                           aria-hidden="true"
                />
                {{ item.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';
import {
  InboxIcon,
  WalletIcon,
  XMarkIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterIcon
} from '@heroicons/vue/24/outline';

import { useSidebarOpen } from '#imports';

const navigation = [
  { name: 'Account', to: '/', icon: WalletIcon },
  { name: 'Compose', to: '/mail/compose', icon: PencilSquareIcon },
  { name: 'Inbox', to: '/mail/inbox', icon: InboxIcon }
];

const sidebarOpen = useSidebarOpen();
</script>
