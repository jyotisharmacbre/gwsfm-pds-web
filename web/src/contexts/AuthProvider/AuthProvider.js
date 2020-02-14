import React, { Component } from 'react';
import AuthContext from './AuthContext';
import appConfig from '../../helpers/config-helper';
import AzureAD, { LoginType, MsalAuthProvider } from 'react-aad-msal';
import { store } from '../../store';

class AuthProvider extends Component {

    aadConfig = appConfig();

    // Msal Configurations
    config = {
        auth: {
            authority: this.aadConfig.REACT_APP_AUTHORITY,
            clientId: this.aadConfig.REACT_APP_CLIENT_ID,
            redirectUri: window.location.origin
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false
        }
    };

    // Authentication Parameters
    authenticationParameters = {
        scopes: ["user.read"]
    }

    // Options
    options = {
        loginType: LoginType.Popup,
        tokenRefreshUri: window.location.origin + '/auth.html'
    }

    authProvider = {};

    constructor(props) {
        super(props);
        this.authProvider = new MsalAuthProvider(this.config, this.authenticationParameters, this.options);
    }

    render() {
        const { children } = this.props;
        return (
            <AuthContext.Provider value={this.authProvider}>
                <AzureAD provider={this.authProvider} forceLogin={true} reduxStore={store}>
                    {children}
                </AzureAD>
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;
