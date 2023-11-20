export default defineNuxtRouteMiddleware((to) => {
  const { isConnected } = useAccount();

  // If the user is connected and trying to access the index page, redirect to dashboard
  if (isConnected.value && to.name === 'index') {
    return navigateTo('/dashboard');
  }

  // If the user is not connected and trying to access any page other than index, redirect to index
  if (!isConnected.value && to.name !== 'index') {
    return navigateTo('/');
  }
});
