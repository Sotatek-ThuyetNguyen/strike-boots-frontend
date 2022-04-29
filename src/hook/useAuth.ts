import { useCallback, useMemo } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { ConnectorNames, connectorsByName } from '../const/connectors';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID];
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          // eslint-disable-next-line no-console
          console.error('Unsupported Chain Id', 'Unsupported Chain Id Error. Check your chain Id.');
        } else if (error instanceof NoEthereumProviderError) {
          // eslint-disable-next-line no-console
          console.error('Provider Error', 'No provider was found');
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector;
            walletConnector.walletConnectProvider = undefined;
          }
          // eslint-disable-next-line no-console
          console.error('Authorization Error', 'Please authorize to access your account');
        } else {
          // eslint-disable-next-line no-console
          console.error(error.name, error.message);
        }
      });
    } else {
      // eslint-disable-next-line no-console
      console.error("Can't find connector", 'The connector config is wrong');
    }
  }, []);

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate]);

  const context = useMemo(() => {
    return {
      login,
      logout,
    };
  }, [login, logout]);

  return context;
};

export default useAuth;
