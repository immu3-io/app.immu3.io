<template>
  <div class="flex h-[4.5rem] flex-shrink-0 shadow bg-menu-background-50">
    <button type="button"
            class="border-r border-neutral-200 px-4 text-neutral-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            @click="sidebarOpen = true"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3CenterLeftIcon class="h-6 w-6"
                           aria-hidden="true"
      />
    </button>
    <!-- Search bar -->
    <div class="flex flex-1 justify-between pl-4 sm:pl-6 lg:mx-auto lg:pl-8">
      <div class="flex flex-1" />
      <div class="ml-4 flex items-center md:ml-6 sm:px-6 lg:px-8 space-x-4">
        <button @click="disconnect()">
          <span class="flex items-center hover:text-gray-500"><LockClosedIcon class="h-5 mr-1" /> Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { disconnect } from '@wagmi/core';
import { useSidebarOpen } from '#imports';
import { LockClosedIcon } from '@heroicons/vue/24/outline';
import {
  Bars3CenterLeftIcon
} from '@heroicons/vue/24/outline';

const sidebarOpen = useSidebarOpen();
</script>
