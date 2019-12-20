import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../../Translations/connectedIntlProvider';
import nock from 'nock';
import { baseURL } from '../../../../../client/client';
import configureStore from 'redux-mock-store';
import {
  intialDashboardState,
  intialLookupvalues
} from './DashboardActionApprovalFormTestData';
import { reducer as formReducer } from 'redux-form';
import DashboardActionApprovalForm from '../DashboardActionApprovalForm';
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard Form testCases', () => {
  let wrapper: any;
  const props = {
    actionApprovalValues: intialDashboardState,
    showValues: 5,
    lookupValues: intialLookupvalues
  };
  beforeEach(() => {
    const formatMessage = jest.mock(
      './../../../../../Translations/connectedIntlProvider'
    );

    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <MemoryRouter>
            <DashboardActionApprovalForm {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
  });

  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
