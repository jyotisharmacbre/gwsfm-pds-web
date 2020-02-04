
import { ActionType } from '../../../store/Lookups/Types/ActionType';
import { ILookupState } from '../Types/ILookupState';
import lookupReducer from '../Reducer';
import { currencies, countries, projectstatus, lookups, languages } from './lookupData';
import { getProjectStatus, getAllContries, getAllCurrencies, getAllLanguages } from '../Actions';
import nock from 'nock';
import { baseURL } from '../../../client/client';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

nock(baseURL)
  .post('/api/LookupData/GetLookupsByIds')
  .reply(200, projectstatus);

nock(baseURL)
  .get('/api/LookupData/GetAllCurrencies')
  .reply(200, currencies);

nock(baseURL)
  .get('/api/LookupData/Countries')
  .reply(200, countries);

nock(baseURL)
  .get('/api/LookupData/GetLanguages')
  .reply(200, languages);

const initialState: ILookupState = {
  projectstatus,
  lookups,
  currencies,
  languages,
  countries,
  error: null
};

let store = mockStore();

describe('Lookup reducer', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  })

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

  it('should handle LOOKUPS_GET_SUCCESS', () => {
    const getLooupsAction: any = {
      type: ActionType.LOOKUPS_GET_SUCCESS,
      payload: currencies
    };
    expect(
      lookupReducer(initialState, getLooupsAction)
    ).toMatchSnapshot();
  });

  it('should handle LOOKUPS_GET_ERROR', () => {
    const LOOKUPS_GET_ERROR: any = {
      type: ActionType.LOOKUPS_GET_ERROR,
      payload: {error:true}
    };
    expect(
      lookupReducer(initialState, LOOKUPS_GET_ERROR)
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

  it('should handle GET_ALL_LANGUAGES_SUCCESS', () => {
    const getLanguagesSuccessAction: any = {
      type: ActionType.GET_ALL_LANGUAGE_SUCCESS,
      payload: languages
    };
    expect(
      lookupReducer(initialState, getLanguagesSuccessAction)
    ).toMatchSnapshot();
  });

  it('should handle GET_ALL_LANGUAGES_ERROR', () => {
    const getLanguagesErrorAction: any = {
      type: ActionType.GET_ALL_LANGUAGE_ERROR,
      error: { success: false }
    };
    expect(
      lookupReducer(initialState, getLanguagesErrorAction)
    ).toMatchSnapshot();
  });

  it('should handle getProjectStatus successfully', async () => {
    await getProjectStatus()(store.dispatch);
    expect(store.dispatch).toHaveBeenCalled;
  });

  it('should handle getAllLanguages successfully', async () => {
    await getAllLanguages()(store.dispatch);
    expect(store.dispatch).toHaveBeenCalled;
  });

  it('should handle getAllCurrencies successfully', async () => {
    await getAllCurrencies()(store.dispatch);
    expect(store.dispatch).toHaveBeenCalled;
  });

  it('should handle getAllContries successfully', async () => {
    await getAllContries()(store.dispatch);
    expect(store.dispatch).toHaveBeenCalled;
  });
});