import { store } from '../store';
import moment from 'moment';
import { msalAuthProvider } from '../contexts/AuthProvider/AuthService';
const authProvider = msalAuthProvider;
export const getDisplayName = () => {
    return store.getState().auth.claims.name;
};

export const getFirstName = () => {
    return store.getState().auth.claims.firstName;
};

export const getDisplayEmail = () => {
    let email = store.getState().auth.claims.email;
    return email ? email : '';
};

const refreshToken = async function () {
    await authProvider.getAccessToken();
};

export function getAccessToken(): string | null {
    let tokenExpiration = store.getState().auth.token.expiration;
    if (tokenExpiration && moment(tokenExpiration * 1000).diff(moment(Date.now()), 'seconds') < 5)
        refreshToken();
    return store.getState().auth.token.idToken;
}

