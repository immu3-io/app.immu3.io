<template>
  <component :is="inputType"
             :type="type"
             :value="modelValue"
             @input="(event: Event) => emit('update:modelValue', event.target.value)"
             class="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
  />
</template>

<script setup lang="ts">
import { computed } from '#imports';

type SupportCardFormInputProps = {
  type: 'text' | 'email' | 'textarea'
  modelValue: string;
  keyboard?: 'default' | 'numeric';
}

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<SupportCardFormInputProps>(), {
  keyboard: 'default'
});

const inputType = computed(() => props.type === 'textarea' ? 'textarea' : 'input');
</script>
