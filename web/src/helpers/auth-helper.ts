// @ts-ignore
import authentication from "react-azure-adb2c";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../models/decodedToken";

export const getDisplayName = () => {
  const token = authentication.getAccessToken();
  const decoded: DecodedToken = jwtDecode(token);
  return decoded.name;
}