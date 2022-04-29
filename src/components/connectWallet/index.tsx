/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalWallet from './modalWallet';
import { useActiveWeb3React } from 'hook/web3';
import { ellipseAddress } from 'helper/ellipseAddress';
import { web3Modal } from 'helper/providers';
const SDiv = styled.div`
  background: #fff;
  padding: 20px;
`;
const ButtonConnectWallet = styled.div`
  background: #fff;
  border-radius: 15px;
  display: flex;
  justify-content: flex-end;
`;
const SBtn = styled.div`
  background: #72bf65;
  width: 180px;
  color: #fff;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
`;
const ConnectWallet: React.FC = (): ReactElement => {
  const { account } = useActiveWeb3React();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };
  useEffect(() => {
    web3Modal.clearCachedProvider();
  }, [account]);

  return (
    <>
      <SDiv>
        {!account && (
          <ButtonConnectWallet onClick={handleToggleModal}>
            <SBtn>Connect</SBtn>
          </ButtonConnectWallet>
        )}

        {account && <div>{ellipseAddress(account, 5)}</div>}

        <ModalWallet open={openModal} onClickClose={handleToggleModal} />
      </SDiv>
    </>
  );
};
export default ConnectWallet;
