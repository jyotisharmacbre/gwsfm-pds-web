import {IDynamicCompanyData} from '../Types/IDynamicData';

export default class Company implements IDynamicCompanyData {
  companyId: string;
  name: string;

  constructor(companyId: string = '',name: string = ''){
    this.companyId = companyId;
    this.name = name;
   }
}