import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import appConfig from '../../helpers/config-helper';

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
const authenticationParameters = {}


// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}
function getMsalAuthProvider() {
    if (aadConfig.REACT_APP_TEST != undefined)
        return {};
    return new MsalAuthProvider(config, authenticationParameters, options);
}
export const msalAuthProvider = getMsalAuthProvider();