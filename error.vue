<script setup lang="ts">
import { useError } from '#app';

const error = useError();
</script>

<template>
  <div class="min-h-full bg-white px-6 py-16 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="mx-auto max-w-max">
      <main class="sm:flex">
        <p class="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">
          {{ error?.statusCode ?? '404' }}
        </p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-neutral-200 sm:pl-6">
            <h1 class="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              {{ error?.statusMessage ?? 'Page not found' }}
            </h1>
            <p class="mt-1 text-base text-neutral-500">
              {{ error?.message ?? 'Please check the URL in the address bar and try again.' }}
            </p>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <a
              href="/"
              class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Go back home
            </a>
            <a
              href="#"
              class="inline-flex items-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Contact support
            </a>
          </div>
        </div>
      </main>
    </div>
    <div>
      {{ error }}
    </div>
  </div>
</template>
