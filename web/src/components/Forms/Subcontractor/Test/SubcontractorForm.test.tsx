import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import   * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import SubcontractorForm from '../SubcontractorForm';

  
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
          <SubcontractorForm {...props} />
        </IntlProvider>
      </Provider>
    );
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Next button', () => {
    let  field;
    beforeEach(() => {
       field = wrapper.find('button[name="next"]').first();
    });
    it('Should renders next button', () => {
        expect(field.prop('type')).toBe('button');
    });
    it('Should focus on mainContractor name field on click of next button when field is empty and required', () => {
        field.simulate('click');
        const errElm = wrapper.find('.rbt-input-hint-container');       
        let mainContractor = errElm.find('input').first(); 
        const focusedElement = document.activeElement;

        expect(mainContractor.matchesElement(focusedElement)).toBeTruthy;
      });
});
});