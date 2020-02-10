import { Action } from 'redux';

export interface IListItem {
  name: string;
  value: string;
}

export interface IGetLocalesBeginAction extends Action<'GetLocalesBegin'> {}

export interface IGetLocalesSuccessAction extends Action<'GetLocalesSuccess'> {
  data: IListItem[];
}

export interface IGetLocalesFailureAction extends Action<'GetLocalesFailure'> {
  data: IListItem[];
  error: any;
}

export interface IGetCustomerContractBeginAction
  extends Action<'GetCustomerContractBegin'> {}

export interface IGetCustomerContractSuccessAction
  extends Action<'GetCustomerContractSuccess'> {
  data: IListItem[];
}

export interface IGetCustomerContractFailureAction
  extends Action<'GetCustomerContractFailure'> {
  data: IListItem[];
  error: any;
}

export type ListItemActions =
  | IGetLocalesBeginAction
  | IGetLocalesSuccessAction
  | IGetLocalesFailureAction
  | IGetCustomerContractBeginAction
  | IGetCustomerContractSuccessAction
  | IGetCustomerContractFailureAction;
