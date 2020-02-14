import { updateObject } from '../../helpers/utility-helper';
import { initialState } from './InitialState';
import { AuthenticationActions } from 'react-aad-msal';

const initializing = (oldState, action) => {
    return oldState;
};

const initialized = (oldState, action) => {
    return oldState;
};

const loginSuccess = (oldState, action) => {
    return updateObject(oldState, {
        token: action.payload.jwtIdToken,
        name: action.payload.account.idToken.name,
        firstName: action.payload.account.idToken.given_name,
        email: action.payload.account.idToken.email,
    });
};

const loginFailed = (oldState, action) => {
    return oldState;
};
const loginError = (oldState, action) => {
    return oldState;
};
const clearError = (oldState, action) => {
    return oldState;
};
const logoutSuccess = (oldState, action) => {
    return updateObject(oldState, {
        token: null,
        name: null,
        firstName: null,
        email: null
    });
};
const acquiredIdTokenSuccess = (oldState, action) => {
    return oldState;
};
const acquiredIdTokenError = (oldState, action) => {
    return oldState;
};
const acquiredAccessTokenSuccess = (oldState, action) => {
    return oldState;
};
const acquiredAccessTokenError = (oldState, action) => {
    return oldState;
};
const authenticatedStateChanged = (oldState, action) => {
    return oldState;
};
const authReducer = (oldState = initialState, action) => {
    switch (action.type) {
        case AuthenticationActions.Initializing:
            return initializing(oldState, action);
        case AuthenticationActions.Initialized:
            return initialized(oldState, action);
        case AuthenticationActions.LoginSuccess:
            return loginSuccess(oldState, action);
        case AuthenticationActions.LoginFailed:
            return loginFailed(oldState, action);
        case AuthenticationActions.LoginError:
            return loginError(oldState, action);
        case AuthenticationActions.ClearError:
            return clearError(oldState, action);
        case AuthenticationActions.LogoutSuccess:
            return logoutSuccess(oldState, action);
        case AuthenticationActions.AcquiredIdTokenSuccess:
            return acquiredIdTokenSuccess(oldState, action);
        case AuthenticationActions.AcquiredIdTokenError:
            return acquiredIdTokenError(oldState, action);
        case AuthenticationActions.AcquiredAccessTokenSuccess:
            return acquiredAccessTokenSuccess(oldState, action);
        case AuthenticationActions.AcquiredAccessTokenError:
            return acquiredAccessTokenError(oldState, action);
        case AuthenticationActions.AuthenticatedStateChanged:
            return authenticatedStateChanged(oldState, action);
        default:
            return oldState;
    }
};
export default authReducer;