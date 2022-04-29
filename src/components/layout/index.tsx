/* eslint-disable @typescript-eslint/no-unused-vars */

import ConnectWallet from 'components/connectWallet';
import { useEagerConnect } from 'hook/useEagerConnect';
import { useInactiveListener } from 'hook/useInactiveListener';
import { useActiveWeb3React } from 'hook/web3';
import React, { ReactElement, useEffect } from 'react';
import { setAccount } from 'redux/user';
import { useAppDispatch } from 'store/hook';
interface Props {
  name?: string;
  children: React.ReactChild;
}

const Layout: React.FC<Props> = () => {
  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const dispatch = useAppDispatch();
  const triedEager = useEagerConnect();

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);
  const { account } = useActiveWeb3React();
  // just only dispatch global state address. But we should use useActiveWeb3React for getting account from now
  useEffect(() => {
    if (account) dispatch(setAccount(account));
  }, [account]);
  return (
    <>
      <ConnectWallet />
    </>
  );
};
export default Layout;
