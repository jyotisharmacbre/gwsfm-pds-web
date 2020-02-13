import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import ConnectedIntlProvider from './Translations/connectedIntlProvider';
import appConfig from './helpers/config-helper';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import TelemetryProvider from './contexts/Telemetry/TelemetryProvider';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './authProvider';

const config = appConfig();

ReactDOM.render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <Provider store={store}>
      <ConnectedIntlProvider>
        <Router>
          <TelemetryProvider instrumentationKey={config.REACT_APP_INSIGHTS_KEY}>
            <App />
          </TelemetryProvider>
        </Router>
      </ConnectedIntlProvider>
    </Provider>
  </AzureAD>,
  document.getElementById('root') as HTMLElement
);
serviceWorker.unregister();
