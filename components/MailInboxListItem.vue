<script setup lang="ts">
import type { ReceivedEnvelope } from '@4thtech-sdk/types';
import { UseTimeAgo } from '@vueuse/components';

defineProps<{
  envelope: ReceivedEnvelope;
}>();
</script>

<template>
  <div class="mb-3 flex items-center gap-2">
    <UserAvatar :address="envelope.sender" size="xs" shape="straight" mask="blob" class="pointer-events-none" />
    <div class="pointer-events-none">
      <BaseHeading size="sm" weight="semibold" lead="tight">
        <span>{{ envelope.content.subject }}</span>
      </BaseHeading>
      <BaseParagraph size="xs" lead="none">
        <span class="text-muted-500 dark:text-muted-400">{{ envelope.sender }}</span>
      </BaseParagraph>
    </div>
    <div class="pointer-events-none ms-auto">
      <UseTimeAgo v-slot="{ timeAgo }" :time="envelope.sentAt">
        <span class="font-sans text-xs text-muted-400">{{ timeAgo }}</span>
      </UseTimeAgo>
    </div>
  </div>
  <div
    class="pointer-events-none truncate whitespace-nowrap font-sans text-sm leading-tight text-muted-500 dark:text-muted-400"
  >
    {{ envelope.content.body }}
  </div>
</template>
