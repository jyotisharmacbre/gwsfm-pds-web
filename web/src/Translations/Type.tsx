import { Action } from 'redux';

export interface ILocale {
  locale: string;
}

export interface IGetLocalesBeginAction extends Action<'GetLocalesBegin'> {}

export interface IGetLocalesSuccessAction extends Action<'GetLocalesSuccess'> {
  locale: string;
}

export interface IGetLocalesFailureAction extends Action<'GetLocalesFailure'> {
  error: any;
}

export type LocaleActions =
  | IGetLocalesBeginAction
  | IGetLocalesSuccessAction
  | IGetLocalesFailureAction;
