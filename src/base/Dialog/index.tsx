/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dialog, DialogProps, makeStyles } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
const size = {
  md: 900,
};

const device = {
  tablet: `(max-width: ${size.md}px)`,
};

interface Props extends Omit<DialogProps, 'onClose'> {
  onClose: () => void;
  icon?: string;
  action?: string;
  onAction?: () => void;
  isDisable?: boolean;
  width?: string;
  isReceivePU?: boolean;
  isShow?: boolean;
  titleHasIcon?: boolean;
}

const SImg = styled.img`
  margin-left: 10px;
  margin-right: 28px;
`;

const SIconContainer = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #353945;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const STitleWrapper = styled.div`
  display: flex;
`;

const CustomDialog = React.memo((props: Props) => {
  const useStyles = makeStyles({
    root: {
      '& .MuiDialog-paper': {
        padding: '32px',
        position: 'relative',
        width: props.width ? props.width : '600px',
        color: '#ffffff',
        borderRadius: '20px',
        background: '#fff !important',
      },
    },
    title: {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '29.26px',
    },
    content: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '18px',
      color: 'rgba(255, 255, 255, 0.6)',
    },
    btn: {
      textTransform: 'none',
      height: 36,
      color: '#100F24',
      background: '#71CEF3',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    disable: {
      textTransform: 'none',
      height: 36,
      color: '#100F24',
      background: '#333 !important',
      borderRadius: '5px',
    },
  });

  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, children, onClose, icon, className, action, onAction, isDisable, isReceivePU, titleHasIcon, ...rest } =
    props;

  return (
    <>
      <Dialog {...rest} className={className + ' ' + classes.root} onClose={onClose}>
        {action && (
          <Button
            variant="contained"
            onClick={onClose}
            className={isDisable ? classes.disable : classes.btn}
            disabled={isDisable}
          >
            {action}
          </Button>
        )}
      </Dialog>
    </>
  );
});

export default CustomDialog;
