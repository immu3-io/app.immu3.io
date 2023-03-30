<template>
  <div v-if="attachments?.length"
       class="mt-6 max-w-5xl mx-auto "
  >
    <h2 class="text-sm font-medium text-neutral-500">
      Attachments
    </h2>
    <div class="mt-1 text-sm text-neutral-900">
      <ul class="border border-neutral-200 rounded-md divide-y divide-neutral-200">
        <li v-for="attachment in attachments"
            class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
            :key="attachment"
        >
          <div class="w-0 flex-1 flex items-center">
            <PaperClipIcon class="flex-shrink-0 h-5 w-5 text-neutral-400" />
            <span class="ml-2 flex-1 w-0 truncate">{{ attachment.name }}</span>
          </div>
          <div class="ml-4 flex-shrink-0">
            <div class="font-medium text-primary-600 cursor-pointer hover:text-primary-500"
                 @click="handleAttachmentDownload(attachment)"
            >
              Download
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Attachment, RemoteFileInfo } from '@4thtech-sdk/types';
import { PaperClipIcon } from '@heroicons/vue/24/solid';
import { Mail } from '@4thtech-sdk/ethereum';
import { toRaw, useState } from '#imports';

defineProps<{attachments: Attachment[]}>();
const mailClient = useState<Mail>('mailClient');

const handleAttachmentDownload = async (attachment: RemoteFileInfo) => {
  const mail = toRaw(mailClient.value);
  const fileContent = await mail.downloadAttachment(attachment);

  const blob = new Blob([fileContent], { type: 'application/octet-stream' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = attachment.name;
  link.click();
};
</script>
