import React, { Component } from 'react';
import AuthContext from './AuthContext';
import { AzureAD } from 'react-aad-msal';
import { store } from '../../store';
import { msalAuthProvider } from './AuthService';


class AuthProvider extends Component {
    authProvider = {};
    constructor(props) {
        super(props);
        this.authProvider = msalAuthProvider;
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
