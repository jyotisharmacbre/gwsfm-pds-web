// @ts-ignore
import authentication from '@kdpw/msal-b2c-react';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../models/decodedToken';

export const getDisplayName = () => {
  const token = authentication.getAccessToken();
  const decoded: DecodedToken = jwtDecode(token);
  return decoded.name;
};
