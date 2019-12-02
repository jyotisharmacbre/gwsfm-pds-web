import { IQuote } from './IQuote';

export interface ISubContractorActivity {
  activityName: string;
  existingSubcontractor: boolean | null;
  subcontractor: string;
  preferredSupplier: boolean | null;
  totalCost: number | null;
  grossMargin: number | null;
  totalSell: number | null;
  comments: string;
  quote1: IQuote;
  quote2: IQuote;
  quote3: IQuote;
}
