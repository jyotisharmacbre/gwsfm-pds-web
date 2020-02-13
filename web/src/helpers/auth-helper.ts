import JwtDecode from 'jwt-decode';
import { DecodedToken } from '../models/decodedToken';
import { authProvider } from '../authProvider';

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
  return decoded.email ?
    decoded.email :
    decoded.emails && decoded.emails.length > 0 ?
      decoded.emails[0] :
      '';
};

export const logOut = () => {
  authProvider.logout();
}

function decodeToken() {
  const accessToken: any = getAccessToken();
  const decoded: DecodedToken = JwtDecode(accessToken);
  return decoded;
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem("msal.idtoken");
}