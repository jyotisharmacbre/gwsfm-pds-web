import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
<<<<<<< HEAD

ReactDOM.render(<App />, document.getElementById('root'));
import { Provider } from 'react-redux'
=======
import { Doughnut, Pie, Polar } from 'react-chartjs-2';
import { Provider } from 'react-redux';
>>>>>>> 3bb3b811ce330fe93d94f6eb57e6ceba12faa169

// @ts-ignore
import b2cauth from '@kdpw/msal-b2c-react';
import appConfig from "./helpers/config-helper";
<<<<<<< HEAD
=======

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
>>>>>>> 3bb3b811ce330fe93d94f6eb57e6ceba12faa169

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