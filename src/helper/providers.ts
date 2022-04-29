import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '460f40a260564ac4a4f4b3fffb032dad',
    },
  },
};

export const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});
