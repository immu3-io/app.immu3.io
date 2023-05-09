// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  css: ['~/assets/styles/main.css'],
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css'
  },
  colorMode: {
    classSuffix: ''
  },
  app: {
    head: {
      title: ''
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  build: {
    transpile: ['@heroicons/vue']
  },
  plugins: [
    { src:'~/plugins/wagmi.ts', mode: 'client' },
    { src:'~/plugins/notifications.ts', mode: 'client' }
  ],
  runtimeConfig: {
    public: {
      walletConnectId: process.env.WALLET_CONNECT_ID ?? '',
      pollinationX: {
        url: process.env.POLLINATIONX_URL ?? '',
        token: process.env.POLLINATIONX_TOKEN ?? ''
      },
    }
  },
  ssr: false
});
