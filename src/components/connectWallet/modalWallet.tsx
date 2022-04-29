/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import { Box, BoxProps, Button, styled } from '@mui/material';
import metamask from 'assets/images/metamask.svg';
import closeIcon from 'assets/images/close-icon.svg';
import walletConnect from 'assets/images/walletconnect.svg';
import useAuth from 'hook/useAuth';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import Cookies from 'js-cookie';
import styleds from 'styled-components';
import { t } from 'i18next';
import { ConnectorNames } from 'const/connectors';
interface Props {
  name?: string;
  open: boolean;
  onClickClose: () => void;
  children?: any;
}

const SDialog = styleds.div`
  border-radius: 20px;
  position: relative;
  background: #fff;
  fontweight: 500;
  fontsize: 14px;
  lineheight: 18px;
  color: rgba(255, 255, 255, 0.6);
`;
const STitle = styleds.div`
  padding: 36px 32px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.75px;
  color: #333;

`;
const SClose = styleds.div`
  cursor:pointer;
  padding: 36px 32px;

`;
const SWarning = styleds.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #FA2E30;
    margin-bottom: 0; 
`;
const DialogWallet = styled(Dialog)<any>(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '484px',
    backgroundColor: theme.palette.primary['200'],
    boxShadow: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)',
    borderRadius: '20px',
  },
}));
const SBtnImg = styleds.img`
  cursor: pointer;
`;
const SBtnImgLight = styleds.img`
  cursor: pointer;
`;
const SBtnWallet = styleds.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  alignItems: center;
  width: 100%;
  padding: 17px 20px;
  border: 1px solid #333;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 30px;

  img: {
    width: 36px;
    height: 36px;
    objectFit: contain;
  }

  p{
    margin-bottom: 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.5px;
    text-transform: capitalize;
    color:#333;

  }
`;

const BlockButtonWalletWrapper = styled(Box)<BoxProps>(({}) => ({
  padding: '0 32px',
}));

const ModalWallet: React.FC<Props> = ({ children, open, onClickClose }: Props) => {
  const { login } = useAuth();
  const { account } = useWeb3React<Web3>();
  // set address login wallet call get balance of token
  useEffect(() => {
    if (account) {
      Cookies.set('address', account);
    }
  }, [account]);

  return (
    <DialogWallet open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <SDialog>
        {children}
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <STitle> {t(`Connect to a wallet`)}</STitle>
          <SClose onClick={onClickClose}>
            <img src={closeIcon} alt="" />
          </SClose>
        </Box>
        <BlockButtonWalletWrapper>
          <SBtnWallet
            onClick={() => {
              login(ConnectorNames.Injected);
              onClickClose();
            }}
          >
            <img src={metamask} alt="metamask icon" />
            <p>{t(`Metamask`)}</p>
          </SBtnWallet>

          <SBtnWallet
            onClick={() => {
              login(ConnectorNames.WalletConnect);
              onClickClose();
            }}
          >
            <img src={walletConnect} alt="WalletConnect icon" />
            <p>WalletConnect</p>
          </SBtnWallet>
        </BlockButtonWalletWrapper>
      </SDialog>
    </DialogWallet>
  );
};

export default ModalWallet;
