<template>
  <div class="flex  bg-neutral-50 p-4"
       :class="[prev ? 'justify-between' : 'justify-end']"
  >
    <ButtonRegular type="white"
                   @click="$emit('prev')"
                   v-if="prev"
    >
      {{ prev }}
    </ButtonRegular>
    <ButtonRegular :disabled="disabled"
                   @click="$emit('next')"
    >
      {{ next }}
    </ButtonRegular>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{next: string, prev?: string , disabled?: boolean}>(),
  { disabled: false, prev: undefined }
);

defineEmits(['prev', 'next']);
</script>
