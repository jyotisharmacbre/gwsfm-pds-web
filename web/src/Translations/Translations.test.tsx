import nock from 'nock';
import thunk from 'redux-thunk';
import { baseURL } from '../client/client';
import configureMockStore from 'redux-mock-store';
import ConnectedIntlProvider, { formatMessage } from './connectedIntlProvider';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { IntlProvider } from 'react-intl';
import translations from './translation';
import Translate from './translate';

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


describe('Translation', () => {
  it('should return formatted message when passing key as FIELD_VALIDATION_KEY', () => {
    mount(<Provider store={store}>
      <ConnectedIntlProvider>
      </ConnectedIntlProvider>
    </Provider>);
    expect(formatMessage('FIELD_VALIDATION_KEY', { 0: 552 })).toMatchSnapshot();
  });

  it('should return formatted message when passing a key', () => {

    const locale = 'en';
    const messages = translations[locale].messages
    const intlProvider = new IntlProvider({ locale, messages });

    expect(Translate.getLabel({ intl: intlProvider.state.intl }, 'VALIDATION_IS_REQUIRED', { 0: 'Name' })).toMatchSnapshot();
  })
})

