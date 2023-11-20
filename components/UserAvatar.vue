<script setup lang="ts">
import type { Address } from '@4thtech-sdk/types';

const props = defineProps<{
  address: Address;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  shape?: 'straight' | 'rounded' | 'curved' | 'full';
  mask?: 'hex' | 'hexed' | 'deca' | 'blob' | 'diamond';
}>();

function getGradientColors(address: string) {
  const seedArr = address.match(/.{1,7}/g)?.splice(0, 5) || [];
  return seedArr.map((seed) => {
    const hash = Array.from(seed).reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `rgb(${[0, 8, 16].map((shift) => (hash >> shift) & 255).join(', ')})`;
  });
}

const colors = computed(() => getGradientColors(props.address));
</script>

<template>
  <BaseAvatar :size="size" :shape="shape" :mask="mask" :alt="address">
    <div class="web3-avatar nui-avatar-img"></div>
  </BaseAvatar>
</template>

<style lang="css" scoped>
.web3-avatar {
  --color-gradient: radial-gradient(at 66% 77%, v-bind('colors[1]') 0px, transparent 50%),
    radial-gradient(at 29% 97%, v-bind('colors[2]') 0px, transparent 50%),
    radial-gradient(at 99% 86%, v-bind('colors[3]') 0px, transparent 50%),
    radial-gradient(at 29% 88%, v-bind('colors[4]') 0px, transparent 50%);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  background-color: v-bind('colors[0]');
  background-image: var(--color-gradient);
}
</style>
