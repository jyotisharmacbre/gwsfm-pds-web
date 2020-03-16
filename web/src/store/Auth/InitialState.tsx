import { IAuth } from "./Types/IAuth";
import { IToken } from "./Types/IToken";
import { IClaims } from "./Types/IClaims";

export const initialStateToken: IToken = {
    idToken: null,
    expiration: null
}

export const initialStateClaims: IClaims = {
    name: null,
    firstName: null,
    email: null
}

export const initialState: IAuth= {
    token: initialStateToken,
    claims: initialStateClaims
};
