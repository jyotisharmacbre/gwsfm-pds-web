import { ILookup } from './ILookup';
import { ICurrency } from './ICurrency';

export interface ILookupState {
  projectstatus: Array<ILookup>;
  currencies: Array<ICurrency> | null;
  error: string | null;
}
