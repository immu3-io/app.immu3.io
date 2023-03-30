import { getAccount, GetAccountResult, GetNetworkResult, getNetwork } from '@wagmi/core';
export const useSidebarOpen = () => useState<boolean>('sidebarOpen', () => false);
export const useAccount = () => useState<GetAccountResult>('account', () => getAccount());
export const useNetwork = () => useState<GetNetworkResult>('network', () => getNetwork());

