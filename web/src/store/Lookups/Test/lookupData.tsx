import { ILookup } from '../Types/ILookup';
import { ICurrency } from '../Types/ICurrency';
import { ILanguage } from '../Types/ILanguage';
import { ICountry } from '../Types/ICountry';
export const projectstatus: Array<ILookup> = [{
  lookupId: 1,
  lookupItem: "Project_Status",
  lookupKey: 1,
  description: "Initial Customer Inquiry"
}];
export const currencies: Array<ICurrency> = [
  {
    currencyId: 4,
    currencyName: "AED",
    currencySymbol: ""
  }
];
export const languages: Array<ILanguage> = [{
  languageID: 1,
  name: "English",
  shortName: "en"
}];
export const countries: Array<ICountry> = [{
  countryId: 1,
  name: "fghanistan",
  code: "AFG",
  isoAlpha2Code: "AF"
}];
