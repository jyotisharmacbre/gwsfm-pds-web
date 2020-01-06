import axios from 'axios';
import authentication from '@kdpw/msal-b2c-react';

export const baseURL = 'https://qat-pds-middletier.azurewebsites.net';
export const baseAPI = axios.create({ baseURL });
export const userServiceURL = 'https://qat-foundation-gateway.azurewebsites.net';
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
  if (isTokenHandlerEnabled(request)) {
    // Add request token here
    const token = authentication.getAccessToken();
    request.headers['accessToken'] = token;
  }
  return request;
};

baseAPI.interceptors.request.use(request => requestHandler(request));
userServiceAPI.interceptors.request.use(request => requestHandler(request));

const errorHandler = error => {
  if (isErrorHandlerEnabled(error.config)) {
    // Handle errors
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
