import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import type { RootState, AppDispatch } from './store';

// import { isConnectedByWalletConnect } from "src/helper/connectWallet";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): any => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAddress = (): string => {
  return useAppSelector((state) => state.user.account ?? '');
};

export const useBoolean = (initValue = false): [boolean, () => void, () => void] => {
  const [value, setValue] = useState(initValue);

  const { setTrue, setFalse } = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
    }),
    [],
  );
  return [value, setTrue, setFalse];
};

export const useWindowResizeMobile = (inerWidth: number): any => {
  const widthMobile = inerWidth || 575;
  const [isMobile, setIsMobile] = useState(window?.innerWidth < widthMobile);

  useEffect((): any => {
    const windowResizeListener = window.addEventListener('resize', () => {
      setIsMobile(window?.innerWidth < widthMobile);
    });

    return () => window.removeEventListener('resize', windowResizeListener as any);
  }, [widthMobile]);

  return [isMobile];
};
