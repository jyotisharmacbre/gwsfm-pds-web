// @ts-ignore
import authentication from '@kdpw/msal-b2c-react';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../models/decodedToken';

export const getDisplayName = () => {
  const decoded: DecodedToken = decodeToken();
  return decoded.name;
};

export const getFirstName = () => {
  const decoded: DecodedToken = decodeToken();
  return decoded.given_name;
};

export const getDisplayEmail = () => {
  const decoded: DecodedToken = decodeToken();
  return "rishav.mittal@cbre.com";
};

export const logOut = () => {
  authentication.signOut();
}

function decodeToken() {
  const token = authentication.getAccessToken();
  const decoded: DecodedToken = jwtDecode(token);
  return decoded;
}

