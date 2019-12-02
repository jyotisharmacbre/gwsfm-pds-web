import { IQuote } from './IQuote';

export interface ISubContractorActivity {
  subContrActivityId: string;
    projectId: string;
    activityName: string;
    isExistingSubcontractor: boolean;
    subcontractorId: string;
    isPreferredSupplier: boolean;
    totalCost: number;
    grossMargin: number;
    totalSell: number;
    comments: string;
    quotes:Array<IQuote>;
}
