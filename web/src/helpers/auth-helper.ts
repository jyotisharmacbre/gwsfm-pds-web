import { store } from '../store';

export const getDisplayName = () => {
    return store.getState().auth.name;
};

export const getFirstName = () => {
   return store.getState().auth.firstName;
};

export const getDisplayEmail = () => {
    let email = store.getState().auth.email;
    return email ? email : '';
};

export function getAccessToken(): string | null {
    return store.getState().auth.token;
} 