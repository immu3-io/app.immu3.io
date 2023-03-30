<template>
  <div class="flex h-full flex-col flex-1">
    <!-- Bottom section -->
    <div class="flex min-h-0 flex-1 overflow-hidden">
      <!-- Main area -->
      <main class="min-w-0 flex-1 border-t border-neutral-200 xl:flex">
        <section aria-labelledby="message-heading"
                 class="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
        >
          <MailInboxHeader />
          <MailInboxContent />
        </section>
        <MailInboxList />
      </main>
    </div>
  </div>
</template>

