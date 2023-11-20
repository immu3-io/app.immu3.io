import Toast from 'vue-toastification';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    timeout: 10000,
  });
});
