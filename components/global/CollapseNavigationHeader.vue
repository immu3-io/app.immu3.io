<script setup lang="ts">
const { isMobileOpen } = useCollapse();
</script>

<template>
  <div class="flex h-16 w-full items-center justify-between px-4">
    <div class="flex h-16 w-16 items-center justify-center">
      <slot name="logo">
        <NuxtLink to="/" class="flex items-center justify-center">
          <LogoIcon class="h-10 w-10 text-primary-500" />
        </NuxtLink>
      </slot>
    </div>

    <!--Mobile button-->
    <button
      type="button"
      class="nui-mask nui-mask-blob flex h-10 w-10 cursor-pointer items-center justify-center text-muted-700 transition-colors duration-300 hover:bg-muted-200 dark:text-muted-400 dark:hover:bg-muted-800 lg:hidden"
      @click="isMobileOpen = false"
    >
      <Icon name="lucide:arrow-left" class="h-5 w-5" />
    </button>
  </div>
</template>
