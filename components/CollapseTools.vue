<script setup lang="ts">
const app = useAppConfig();
</script>

<template>
  <div class="flex items-center gap-2">
    <template v-for="tool of app.layout.collapse?.toolbar?.tools">
      <component :is="resolveComponentOrNative(tool.component)" v-if="tool.component" :key="tool.component" />
    </template>
  </div>
</template>
