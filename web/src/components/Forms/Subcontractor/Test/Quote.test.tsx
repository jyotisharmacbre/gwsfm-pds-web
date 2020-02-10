import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import Quote from '../Quote';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import   * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import {newQuote,initialState} from '../../../../store/SubContractor/InitialState';
import {findByTestAtrr} from '../../../../helpers/test-helper';

describe('Sub Contractor Quote Form component tests', () => {
  let wrapper: any;
  let quotes =[{...newQuote},{...newQuote},{...newQuote}]
  beforeEach(() => {
    wrapper = shallow(
      <Quote fields={initialState.form.activities[0].quotes}/>
    );
  });

it('should match the snapshot', () => { 
    expect(wrapper).toMatchSnapshot();
  });
  it('should defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('renders the SubContractorActivityForm component with no errors', () => {
    
    expect(findByTestAtrr(wrapper,'sub-contractor-quote-form').length).toEqual(1);
    expect(findByTestAtrr(wrapper,'sub-contractor-quote-member').length).toEqual(3);
  });

  
});
