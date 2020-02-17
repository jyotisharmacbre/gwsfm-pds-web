import './polyfills';
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
import AuthProvider from './contexts/AuthProvider/AuthProvider';


const config = appConfig();

ReactDOM.render(
    <AuthProvider>
    <Provider store={store}>
      <ConnectedIntlProvider>
        <Router>
          <TelemetryProvider instrumentationKey={config.REACT_APP_INSIGHTS_KEY}>
            <App />
          </TelemetryProvider>
        </Router>
      </ConnectedIntlProvider>
    </Provider>
    </AuthProvider>,
  document.getElementById('root') as HTMLElement
);
serviceWorker.unregister();
