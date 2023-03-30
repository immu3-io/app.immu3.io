<template>
  <ul role="list"
      class="divide-y divide-gray-200"
  >
    <li class="py-2 flex items-center"
        v-for="(fact, key) in facts"
        :key="key"
    >
      <component v-if="fact.icon"
                 :is="fact.icon"
                 class="h-6 w-6 mr-4"
      />
      <span v-html="fact.text" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { WalletIcon, ArrowsRightLeftIcon, CircleStackIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import { FunctionalComponent } from 'vue';

const facts: {text: string, icon?: FunctionalComponent}[] = [
  { text: 'Immutable on-chain communication <br> 1 email/message = 1 L1 or L2 TX', icon: ArrowsRightLeftIcon },
  { text: 'Wallet-to-wallet end-to-end encryption', icon: WalletIcon },
  { text: 'PollinationX decentralized storage', icon: CircleStackIcon },
  { text: 'Audited smart contracts (coming)', icon: PencilSquareIcon  }
];
</script>
