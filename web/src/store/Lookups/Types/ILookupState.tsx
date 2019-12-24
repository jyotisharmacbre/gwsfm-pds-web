import { ILookup } from './ILookup';
import { ICurrency } from './ICurrency';
import { ILanguage } from './ILanguage';
import { ICountry } from './ICountry';

export interface ILookupState {
  projectstatus: Array<ILookup>;
  currencies: Array<ICurrency> | null;
  languages: Array<ILanguage> | null;
  countries: Array<ICountry> | null;
  error: string | null;
}
