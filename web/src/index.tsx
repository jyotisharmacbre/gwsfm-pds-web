import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import ConnectedIntlProvider from './Translations/connectedIntlProvider';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import TelemetryProvider from './contexts/Telemetry/TelemetryProvider';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import './css/style.css';
import ConfigProvider from './contexts/Config/ConfigProvider';

ReactDOM.render(
    <ConfigProvider>
        <AuthProvider>
            <Provider store={store}>
                <ConnectedIntlProvider>
                    <Router>
                        <TelemetryProvider>
                            <App />
                        </TelemetryProvider>
                    </Router>
                </ConnectedIntlProvider>
            </Provider>
        </AuthProvider>
    </ConfigProvider>,
    document.getElementById('root') as HTMLElement
);
serviceWorker.unregister();
