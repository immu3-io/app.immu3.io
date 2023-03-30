<template>
  <component :is="componentToShow"
             :href="href"
             :target="href && href.toLowerCase().startsWith('http') ? '_blank' : ''"
             class="inline-flex items-center rounded-md border transition-colors duration-300"
             :disabled="disabled"
             :class="[
               {'border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2': type === 'primary' },
               {'border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2': type === 'secondary'},
               {'border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2': type === 'white'},
               {'bg-primary-200 hover:bg-primary-200 cursor-not-allowed': disabled},
               {'bg-gray-100': disabled && type === 'white'}
             ]"
  >
    <span><slot /></span>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from '#imports';
import { computed } from 'vue';

type ButtonRegularProps = {
  href?: string,
  type?: 'primary' | 'secondary' |'white',
  reload?: boolean,
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonRegularProps>(), {
  href: '',
  type: 'primary',
  reload: false,
  disabled:false
});

const componentToShow = computed(() => {
  if(props.reload && props.href) {
    return 'a';
  } else if (props.href && props.href.length > 0) {
    return resolveComponent('NuxtLink');
  }
  return 'button';
});
</script>
