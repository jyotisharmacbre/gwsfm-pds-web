import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// @ts-ignore
import b2cauth from '@kdpw/msal-b2c-react';
import appConfig from "./helpers/config-helper";

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
  ReactDOM.render(App(), document.getElementById("root") as HTMLElement);
  serviceWorker.register();
});