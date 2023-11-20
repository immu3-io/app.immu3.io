<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
const { address } = useAccount();
const { disconnect } = useDisconnect();
</script>

<template>
  <div class="group inline-flex items-center justify-center text-right">
    <Menu as="div" class="relative h-9 w-9 text-left">
      <MenuButton as="template">
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-primary-500 group-hover:ring-offset-4 dark:ring-offset-muted-900"
        >
          <div class="relative inline-flex h-9 w-9 items-center justify-center rounded-full">
            <UserAvatar
              v-if="address"
              :address="address"
              class="!h-9 !w-9 max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
            />
          </div>
        </button>
      </MenuButton>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute end-0 mt-2 w-64 origin-top-right divide-y divide-muted-100 rounded-md border border-muted-200 bg-white shadow-lg focus:outline-none dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800"
        >
          <div class="p-6 text-center">
            <div class="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full">
              <UserAvatar
                v-if="address"
                :address="address"
                class="!h-20 !w-20 max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
              />
            </div>
            <div class="mt-3">
              <h6 class="font-heading text-sm font-medium text-muted-800 dark:text-white">Account</h6>
              <p class="mb-4 truncate font-sans text-xs text-muted-400">{{ address }}</p>
              <BaseButton class="w-full" @click="disconnect">Disconnect</BaseButton>
            </div>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>
