import { IQuote } from './IQuote';

export interface ISubContractorActivity {
  subContrActivityId: string;
    projectId: string;
    activityName: string;
    isExistingSubcontractor: boolean | null;
    subcontractorId: string;
    isPreferredSupplier: boolean | null;
    totalCost: number;
    grossMargin: number;
    totalSell: number;
    comments: string;
    quotes:Array<IQuote>;
}
