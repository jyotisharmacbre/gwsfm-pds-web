import nock from 'nock';
import thunk from 'redux-thunk';
import * as actions from './Actions';
import localeReducer from './Reducer';
import { baseURL } from '../client/client';
import { ILocaleState } from '../session/state';
import configureMockStore from 'redux-mock-store';
import ConnectedIntlProvider from './connectedIntlProvider';
import {
  IGetLocalesSuccessAction,
  IGetLocalesBeginAction,
  IGetLocalesFailureAction
} from './Type';
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userPreferencesMockData = {
  languageName: 'en'
};

nock(baseURL)
  .get('/api/Users/getUserPreferences')
  .reply(200, userPreferencesMockData);

describe('ConnectedIntlProvider', () => {
  it('should exist', async () => {
    // Shallow render the container passing in the mock store
    const intlProvider = shallow(
      <Provider store={mockStore()}>
        <ConnectedIntlProvider></ConnectedIntlProvider>
      </Provider>
    );
    expect(intlProvider.exists()).toBe(true);
  });

  it('should return ConnectedIntlProvider', () => {
    expect(ConnectedIntlProvider.displayName).toMatchSnapshot();
  });
});

describe('locale reducer', () => {
  let initialState: ILocaleState;
  beforeEach(() => {
    initialState = {
      locale: 'en'
    };
  });

  it('should handle GET_Locale_Begin', () => {
    const getLocalesBeginAction: IGetLocalesBeginAction = {
      type: 'GetLocalesBegin'
    };
    expect(localeReducer(undefined, getLocalesBeginAction)).toMatchSnapshot();
  });

  it('should handle GET_Locale_Success', () => {
    const getLocalesSuccessAction: IGetLocalesSuccessAction = {
      type: 'GetLocalesSuccess',
      locale: 'fr'
    };
    expect(
      localeReducer(initialState, getLocalesSuccessAction)
    ).toMatchSnapshot();
  });

  it('should handle GET_Locale_Failure', () => {
    const getLocalesFailureAction: IGetLocalesFailureAction = {
      type: 'GetLocalesFailure',
      error: { success: false }
    };
    expect(
      localeReducer(initialState, getLocalesFailureAction)
    ).toMatchSnapshot();
  });
});

describe('actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it('should create an action to get locale', async () => {
    await store.dispatch(actions.getLocaleActionCreator());
    expect(store.getActions()).toMatchSnapshot();
  });
});