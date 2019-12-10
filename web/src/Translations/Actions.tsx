import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ILocale, IGetLocalesSuccessAction } from './Type';
import { getUserPreferences } from '../services/lookup.service';

export const getLocaleActionCreator: ActionCreator<ThunkAction<
  Promise<IGetLocalesSuccessAction>,
  ILocale,
  null,
  IGetLocalesSuccessAction
>> = () => {
  return async (dispatch: Dispatch) => {
    let res = await getUserPreferences();

    const getLocalesSuccessAction: IGetLocalesSuccessAction = {
      type: 'GetLocalesSuccess',
      locale: res.data.languageName
    };

    return dispatch(getLocalesSuccessAction);
  };
};
