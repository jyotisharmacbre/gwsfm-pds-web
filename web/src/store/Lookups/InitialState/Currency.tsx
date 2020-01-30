import {ICurrency} from '../Types/ICurrency';

export default class Currency implements ICurrency {
  currencyId: number;
  currencyName: string;
  currencySymbol: string;
  isActive: boolean;

  constructor(currencyId: number = 0,currencyName: string = '',currencySymbol: string = '', isActive: boolean = true){
    this.currencyId = currencyId;
    this.currencyName = currencyName;
    this.currencySymbol = currencySymbol;
    this.isActive = isActive;
  }
}