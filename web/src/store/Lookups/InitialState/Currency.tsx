import {ICurrency} from '../Types/ICurrency';

export default class Currency implements ICurrency {
  currencyId: number;
  currencyName: string;
  currencySymbol: string;

  constructor(currencyId: number = 0,currencyName: string = '',currencySymbol: string = ''){
    this.currencyId = currencyId;
    this.currencyName = currencyName;
    this.currencySymbol = currencySymbol;
  }
}