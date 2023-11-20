<script setup lang="ts">
const { chain: currentChain } = useWagmiNetwork();
const { chains, switchNetwork } = useSwitchNetwork();
</script>

<template>
  <ModalDialog :open="!!currentChain?.unsupported" size="2xl">
    <template #header>
      <!-- Header -->
      <div class="flex w-full items-center justify-between p-4 md:p-6">
        <h3 class="font-heading text-lg font-medium leading-6 text-muted-900 dark:text-white">
          Select supported network
        </h3>
      </div>
    </template>

    <!-- Body -->
    <div class="nui-slimscroll max-h-[550px] overflow-y-auto px-4 py-4 md:px-6 md:py-6">
      <div class="col-span-12 flex flex-col gap-4 sm:col-span-5">
        <div class="space-y-1">
          <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-6">
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
    </div>
  </ModalDialog>
</template>
