import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from 'store/store';
import i18n from './i18n/i18n';
import { I18nextProvider } from 'react-i18next';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <App />
        </Router>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
