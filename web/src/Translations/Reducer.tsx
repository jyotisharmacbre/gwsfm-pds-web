import { Reducer } from 'redux';
import { ILocaleState } from '../session/state';
import { LocaleActions } from './Type';

const initialState: ILocaleState = {
  locale: 'en'
};

const localeReducer: Reducer<ILocaleState, LocaleActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'GetLocalesBegin':
      return { ...state };
    case 'GetLocalesSuccess':
      return Object.assign({}, state, {
        locale: action.locale
      });
    case 'GetLocalesFailure':
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default localeReducer;
