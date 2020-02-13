import appConfig from './helpers/config-helper';
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

const aadConfig = appConfig();

// Msal Configurations
const config = {
  auth: {
    authority: aadConfig.REACT_APP_AUTHORITY,
    clientId: aadConfig.REACT_APP_CLIENT_ID,
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: ["user.read"]
}
 
// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)