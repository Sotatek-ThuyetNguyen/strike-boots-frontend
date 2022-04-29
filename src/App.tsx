import 'styles/app.scss';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import routers from './router/index';

import Layout from './components/layout/index';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

const App: React.FC = () => {
  function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <React.Suspense fallback={<div>Loading....</div>}>
        <Layout>
          <Switch>
            {Object.keys(routers).map((key) => {
              //@ts-ignore
              const route = routers[key];
              return <route.route key={route.path} {...route} />;
            })}
            <Route path="*" />
          </Switch>
        </Layout>
      </React.Suspense>
    </Web3ReactProvider>
  );
};

export default App;
