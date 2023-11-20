<script setup lang="ts">
const { close } = usePanels();
const { chain: currentChain } = useWagmiNetwork();
const { chains, switchNetwork } = useSwitchNetwork();
</script>

<template>
  <div class="border border-muted-200 bg-white dark:border-muted-700 dark:bg-muted-800">
    <div class="flex h-16 w-full items-center justify-between px-10">
      <h2 class="font-heading text-lg font-semibold text-muted-700 dark:text-white">Select network</h2>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full text-muted-400 transition-colors duration-300 hover:bg-muted-100 hover:text-muted-600 dark:hover:bg-muted-700 dark:hover:text-white"
        @click="close"
      >
        <Icon name="feather:chevron-right" class="h-6 w-6" />
      </button>
    </div>

    <div class="relative h-[calc(100%_-_64px)] w-full px-10">
      <div class="grid grid-cols-3 py-6">
        <!-- Radio box -->
        <div v-for="chain in chains" :key="chain.id" class="relative my-4 flex items-center justify-center">
          <div class="relative" :data-nui-tooltip="chain.name">
            <input
              type="radio"
              name="language_selection"
              class="peer absolute start-0 top-0 z-20 h-full w-full cursor-pointer opacity-0"
              :checked="chain.id === currentChain?.id"
              @click="switchNetwork(chain.id)"
            />
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-muted-200 shadow-lg transition-all duration-300 peer-checked:border-primary-500 dark:border-muted-600"
            >
              <img
                class="h-10 w-10 rounded-full"
                :src="`/img/icons/chains/${chain.id}.svg`"
                :alt="`${chain.name} icon`"
              />
            </div>
            <div
              class="absolute -end-1 -top-1 hidden h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-primary-500 text-white peer-checked:flex dark:border-muted-800"
            >
              <Icon name="feather:check" class="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
