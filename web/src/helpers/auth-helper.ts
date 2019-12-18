// @ts-ignore
import authentication from '@kdpw/msal-b2c-react';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../models/decodedToken';

export const getDisplayName = () => {
  const decoded: DecodedToken = decodeName();
  return decoded.name;
};

export const getDisplayEmail = () => {
  const decoded: DecodedToken = decodeName();
  return decoded.emails[0];
};

export const logOut = () =>{
  authentication.signOut();
}

function decodeName() {
  const token = authentication.getAccessToken();
  const decoded: DecodedToken = jwtDecode(token);
  return decoded;
}

