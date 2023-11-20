<template>
  <div
    class="group/nav fixed inset-x-0 top-0 z-10 mx-auto max-w-[350px] group-[&.scrolled]/landing:mt-2 group-[&:not(.scrolled)]/landing:mt-4 motion-safe:transition-all motion-safe:duration-200 lg:max-w-7xl ptablet:max-w-[47rem] ltablet:max-w-[1000px]"
  >
    <div
      class="flex items-center justify-between rounded-2xl border p-4 group-[&.scrolled]/landing:border-muted-200 group-[&:not(.scrolled)]/landing:border-transparent group-[&.scrolled]/landing:bg-white/95 motion-safe:transition-all motion-safe:duration-200 group-[&.scrolled]/landing:motion-safe:shadow-xl group-[&.scrolled]/landing:motion-safe:shadow-muted-300/30 group-[&.scrolled]/landing:dark:border-muted-700 group-[&.scrolled]/landing:dark:bg-muted-950/95 group-[&.scrolled]/landing:motion-safe:dark:shadow-muted-800/20"
    >
      <div class="flex w-1/2 items-center gap-2 md:w-1/5">
        <NuxtLink to="/" class="ms-2 inline-flex" aria-label="Go to homepage">
          <LogoIcon
            class="text-primary-500 group-[&.scrolled]/landing:h-6 group-[&:not(.scrolled)]/landing:h-7 motion-safe:transition-all motion-safe:duration-200"
          />
        </NuxtLink>
      </div>
      <div class="flex w-1/2 items-center justify-end gap-4 md:w-1/5">
        <BaseThemeToggle aria-label="Toggle darkmode" />
      </div>
    </div>
  </div>
</template>
