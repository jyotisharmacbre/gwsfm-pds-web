import axios from 'axios';
import appConfig from '../helpers/config-helper';
import { getAccessToken } from '../helpers/auth-helper';
import { isIE } from '../helpers/utility-helper';
import { msalAuthProvider } from '../contexts/AuthProvider/AuthService';

const config = appConfig();
const authProvider = msalAuthProvider;
export const baseURL = config.REACT_APP_MIDDLETIER_URL;
export const baseAPI = axios.create({ baseURL });
export const userServiceURL = config.REACT_APP_GATEWAY_URL;
export const userServiceAPI = axios.create({ baseURL: userServiceURL });

const isTokenHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('tokenHandlerEnabled') &&
        !config['tokenHandlerEnabled']
        ? false
        : true;
};

const isErrorHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('errorHandlerEnabled') &&
        !config['errorHandlerEnabled']
        ? false
        : true;
};

const isSuccessHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('successHandlerEnabled') &&
        !config['successHandlerEnabled']
        ? false
        : true;
};

const requestHandler = request => {
/* istanbul ignore next */
   if (isIE)
        request.headers['Pragma'] = 'no-cache';
    if (isTokenHandlerEnabled(request)) {
        // Add request token here
        const token = getAccessToken();
        request.headers['authorization'] = 'Bearer ' + token;
    }
    return request;
};

baseAPI.interceptors.request.use(request => requestHandler(request));
userServiceAPI.interceptors.request.use(request => requestHandler(request));

const errorHandler = error => {
    if (isErrorHandlerEnabled(error.config)) {
        // Handle errors
        if (error.response.status == 401) {
        /* istanbul ignore next */
            authProvider.logout();
        }
    }
    return Promise.reject({ ...error });
};

const successHandler = response => {
    if (isSuccessHandlerEnabled(response.config)) {
        // Handle responses
    }
    return response;
};

baseAPI.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);

userServiceAPI.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);
