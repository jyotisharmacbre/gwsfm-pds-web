import { Action } from 'redux';

export type FILTER_ADD = 'FILTER_ADD';

export interface IFilter {
  projectname: string;
  customer_client: string;
  owner: string;
  contracttype: string;
  probofwinning?: number;
  status: string;
  cdmnotifiable: boolean;
  soldmargin?: number;
  expectedstartdate?: number;
  approximatevalue?: number;
  weightedtcv?: number;
  validForm: boolean;
}

export interface IGetFilterAction extends Action<'GetFilterAction'> {}

export interface IFilterAddAction extends Action<'FilterAddAction'> {
  form: IFilter;
}

export type FilterActions = IGetFilterAction | IFilterAddAction;
