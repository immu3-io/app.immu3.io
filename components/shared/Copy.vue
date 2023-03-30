<template>
  <component :is="icon"
             class="h-4 ml-1 cursor-pointer"
             @click="copy"
  />
</template>

<script setup lang="ts">
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/vue/24/outline';
import { ref } from '#imports';

const icon = ref(DocumentDuplicateIcon);
const props =  defineProps<{ value: string }>();

const copy = () => {
  icon.value = CheckIcon;
  navigator.clipboard.writeText(props.value);
  setTimeout(() => {
    icon.value = DocumentDuplicateIcon;
  }, 2000);
};
</script>
