import { IPreliminariesItemDetails } from './IPreliminariesItemDetails';
export interface IPreliminariesItems {
  itemId: string;
  itemName: string;
  preliminaryId:string;
  nameOfSupplier: string;
  noOfHours: number;
  hourRate: number;
  totalCost: number;
  grossMargin: number;
  comments: string;
}
