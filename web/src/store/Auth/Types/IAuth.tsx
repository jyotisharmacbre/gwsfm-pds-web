import { IToken } from './IToken';
import { IClaims } from './IClaims';

export interface IAuth {
    token: IToken;
    claims: IClaims;
}
