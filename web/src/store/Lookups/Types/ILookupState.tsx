import { ILookup } from './ILookup';
import { ICurrency } from './ICurrency';
import { ILanguage } from './ILanguage';

export interface ILookupState {
  projectstatus: Array<ILookup>;
  currencies: Array<ICurrency> | null;
  languages: Array<ILanguage> | null;
  error: string | null;
}
