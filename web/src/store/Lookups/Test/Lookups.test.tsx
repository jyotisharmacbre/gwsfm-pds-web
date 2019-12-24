
import { ActionType } from '../../../store/Lookups/Types/ActionType';
import { ILookupState } from '../Types/ILookupState';
import lookupReducer from '../Reducer';
import { currencies, countries, projectstatus, languages } from './lookupData';

const initialState: ILookupState = {
  projectstatus,
  currencies,
  languages,
  countries,
  error: null
};

describe('Lookup reducer', () => {
  it('should handle default action', () => {
    const defaultAction: any = {
      type: ActionType.DEFAULT
    };
    expect(
      lookupReducer(initialState, defaultAction)
    ).toMatchSnapshot();
  });

  it('should handle LOOKUP_PROJECT_STATUS_GET_SUCCESS successfully', () => {
    const getProjectStatusAction: any = {
      type: ActionType.LOOKUP_PROJECT_STATUS_GET_SUCCESS,
      payload: [{
        lookupId: 1,
        lookupItem: 'Project_Status',
        lookupKey: 1,
        description: 'Initial Customer Inquiry'
      }]
    };
    expect(
      lookupReducer(initialState, getProjectStatusAction)
    ).toMatchSnapshot();
  });

  it('should handle getProjectStatus error', () => {
    const getProjectStatusErrorAction: any = {
      type: ActionType.LOOKUP_PROJECT_STATUS_GET_ERROR,
      error: { success: false }
    };
    expect(
      lookupReducer(initialState, getProjectStatusErrorAction)
    ).toMatchSnapshot();
  });

  it('should handle GET_ALL_CURRENCIES_SUCCESS', () => {
    const getCurrenciesSuccessAction: any = {
      type: ActionType.GET_ALL_CURRENCIES_SUCCESS,
      payload: currencies
    };
    expect(
      lookupReducer(initialState, getCurrenciesSuccessAction)
    ).toMatchSnapshot();
  });

  it('should handle GET_ALL_CURRENCIES_ERROR', () => {
    const getCurrenciesErrorAction: any = {
      type: ActionType.GET_ALL_CURRENCIES_ERROR,
      error: { success: false }
    };
    expect(
      lookupReducer(initialState, getCurrenciesErrorAction)
    ).toMatchSnapshot();
  });

  it('should handle GET_ALL_COUNTRIES_SUCCESS', () => {
    const getCountriesSuccessAction: any = {
      type: ActionType.GET_ALL_COUNTRIES_SUCCESS,
      payload: countries
    };
    expect(
      lookupReducer(initialState, getCountriesSuccessAction)
    ).toMatchSnapshot();
  });

  it('should handle GET_ALL_COUNTRIES_ERROR', () => {
    const getCountriesErrorAction: any = {
      type: ActionType.GET_ALL_COUNTRIES_ERROR,
      error: { success: false }
    };
    expect(
      lookupReducer(initialState, getCountriesErrorAction)
    ).toMatchSnapshot();
  });
});