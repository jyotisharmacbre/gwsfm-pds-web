import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import SubContractorForm from '../SubContractorForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import   * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';


describe('Sub Contractor Form', () => {
  let wrapper: any;
  const props: any = {
    fields: []
  }; 
  beforeEach(() => {
    const formatMessage = jest.mock('./../../../../Translations/connectedIntlProvider');  
   
    jest.spyOn(connectedIntlProvider, 'formatMessage').mockImplementationOnce(() => {
      return 'intlmessage';
    });

    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <SubContractorForm {...props} />
        </IntlProvider>
      </Provider>
    );
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });
});
