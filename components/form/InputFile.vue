<template>
  <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pt-5 pb-6 "
       ref="dropZoneRef"
  >
    <div class="
       space-y-1
       text-center"
    >
      <svg class="mx-auto h-12 w-12 text-neutral-400"
           stroke="currentColor"
           fill="none"
           viewBox="0 0 48 48"
           aria-hidden="true"
           :class="{'animate-ping': isOverDropZone}"
      >
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
        />
      </svg>
      <div class="flex text-sm text-neutral-600">
        <label for="file-upload"
               class="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
        >
          <span @click="open">Upload a file</span>
        </label>
        <p class="pl-1">
          or drag and drop
        </p>
      </div>
      <p class="text-xs text-neutral-500">
        All file types up to 20 MB
      </p>
    </div>
  </div>
  <FormError v-if="error">
    {{ error }}
  </FormError>
</template>

<script setup lang="ts">
import { ref, watch } from '#imports';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { Attachment } from '@4thtech-sdk/types';

const { files, open } = useFileDialog();
const dropZoneRef = ref<HTMLDivElement>();
const emit = defineEmits(['update:modelValue']);
const props = defineProps<{modelValue: Attachment[]}>();
const error = ref<string>();
const processFile = (file: File)  => {
  if(file.size > 20_000_000) {
    error.value = 'File too large.';
    return;
  }
  const modelFiles = props.modelValue;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    if (!(reader.result instanceof ArrayBuffer)) {
      return;
    }

    const fileData = new Blob([reader.result]);
    modelFiles.push({
      name: file.name,
      content: fileData
    });
  };

  emit('update:modelValue', modelFiles);
};

watch(files, () => {
  error.value = '';
  [...(files.value || [])].forEach((file: File) => {
    processFile(file);
  });
});
const onDrop = (files: File[] | null) =>  {
  error.value = '';
  files?.forEach((file: File) => {
    processFile(file);
  });
};

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>
