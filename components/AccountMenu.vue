<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const props = defineProps<{
  horizontal?: boolean;
}>();

const { address } = useAccount();
const { disconnect } = useDisconnect();
</script>

<template>
  <div class="group inline-flex items-center justify-center text-right">
    <Menu as="div" class="relative h-10 w-10 text-left">
      <MenuButton as="template">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-primary-500 group-hover:ring-offset-4 dark:ring-offset-muted-800"
        >
          <div class="relative inline-flex h-10 w-10 items-center justify-center rounded-full">
            <UserAvatar
              v-if="address"
              :address="address"
              class="!h-10 !w-10 max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
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
          class="absolute mt-2 w-60 origin-bottom-right rounded-md border border-muted-200 bg-white text-left shadow-lg focus:outline-none dark:border-muted-700 dark:bg-muted-800"
          :class="props.horizontal ? 'end-0 top-10' : '-end-64 bottom-0'"
        >
          <div class="bg-muted-50 p-6 dark:bg-muted-700/40">
            <div class="flex items-center">
              <div class="relative inline-flex h-14 w-14 items-center justify-center rounded-full">
                <UserAvatar
                  v-if="address"
                  :address="address"
                  class="!h-14 !w-14 max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                />
              </div>
              <div class="ms-3">
                <h6 class="font-heading text-sm font-medium text-muted-800 dark:text-white">Account</h6>
                <!-- <p class="truncate font-sans text-xs text-muted-400">{{ address }}</p>-->
              </div>
            </div>
          </div>
          <div class="p-2">
            <MenuItem as="div">
              <BaseButton class="w-full" @click="disconnect">Disconnect</BaseButton>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>
