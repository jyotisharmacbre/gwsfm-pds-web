import { ILookup } from './ILookup';

export interface ILookupState {
  projectstatus: Array<ILookup>;
  error: string | null;
}
