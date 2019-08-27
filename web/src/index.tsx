import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'

// @ts-ignore
import b2cauth from '@kdpw/msal-b2c-react';
import appConfig from "./helpers/config-helper";
import { Doughnut, Pie, Polar } from 'react-chartjs-2';

// @ts-ignore
import b2cauth from '@kdpw/msal-b2c-react';

const data = {
    datasets: [{
      data: [
        11,
        16,
        
      ],
      backgroundColor: [
        '#4cbd7f',
        '#f3ca55'
       
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Preferred',
      'Not prefrerred',
      
    ]
  };

  const config = appConfig();
b2cauth.initialize({
  instance: config.REACT_APP_AUTH_INSTANCE, 
  tenant: config.REACT_APP_AUTH_TENANT,
  signInPolicy: config.REACT_APP_AUTH_SIGNINPOLICY,
  applicationId: config.REACT_APP_AUTH_APPID,
  cacheLocation: 'sessionStorage',
  scopes: ["openid"],
  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  validateAuthority: false
});

b2cauth.run(() => {
  ReactDOM.render(<App/>, document.getElementById("root") as HTMLElement);
  serviceWorker.register();
});