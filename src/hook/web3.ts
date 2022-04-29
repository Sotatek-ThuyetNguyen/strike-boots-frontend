import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useActiveWeb3React() {
  const context = useWeb3React<Web3Provider>();
  return context;
}
