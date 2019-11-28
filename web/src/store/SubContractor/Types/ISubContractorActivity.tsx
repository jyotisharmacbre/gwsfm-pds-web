import {IQuote} from './IQuote';

export interface ISubContractorActivity {
  activityName: string;
  existingSubcontractor: boolean;
  subcontractor: string;
  preferredSupplier: boolean;
  totalCost: number;
  grossMargin: number;
  totalSell: number;
  comments: string;
  quote1:IQuote;
  quote2:IQuote;
  quote3:IQuote;
}
