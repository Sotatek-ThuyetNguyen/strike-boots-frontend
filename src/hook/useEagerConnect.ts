import { injected } from 'const/connectors';
import { useActiveWeb3React } from 'hook/web3';
import { useEffect, useState } from 'react';

export function useEagerConnect() {
  const { activate, active } = useActiveWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!active) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once ::)

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}
