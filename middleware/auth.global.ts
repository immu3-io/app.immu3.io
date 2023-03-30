import { getAccount, GetAccountResult } from '@wagmi/core';

export default defineNuxtRouteMiddleware(to => {
  if(process.client) {
    const account: GetAccountResult = getAccount();

    if (account.isConnected && to.name === 'login') {
      return navigateTo('/');
    } else if (!account.isConnected && to.name !== 'login') {
      return navigateTo('/login');
    }
  }
});
