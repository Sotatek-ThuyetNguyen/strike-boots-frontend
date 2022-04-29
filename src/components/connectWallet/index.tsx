/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalWallet from './modalWallet';
import { useActiveWeb3React } from 'hook/web3';
import { ellipseAddress } from 'helper/ellipseAddress';
import { web3Modal } from 'helper/providers';

const ButtonConnectWallet = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #ffffff;
  border-radius: 15px;
`;
const SBtn = styled.div``;
const ConnectWallet: React.FC = (): ReactElement => {
  const { account } = useActiveWeb3React();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };
  useEffect(() => {
    web3Modal.clearCachedProvider();
  }, [account]);
  console.log(account, 'account');

  return (
    <>
      {!account && (
        <ButtonConnectWallet onClick={handleToggleModal}>
          <SBtn>Connect</SBtn>
        </ButtonConnectWallet>
      )}

      {account && <div>{ellipseAddress(account, 5)}</div>}

      <ModalWallet open={openModal} onClickClose={handleToggleModal} />
    </>
  );
};
export default ConnectWallet;
