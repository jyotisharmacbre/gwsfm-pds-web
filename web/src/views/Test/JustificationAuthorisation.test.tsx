import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import JustificationAuthorisation from '../JustificationAuthorisation';
import {findByTestAtrr,checkProps} from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';

describe('justification authorisation component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(
        <IntlProvider locale="en" messages={translations['en'].messages}>
            <MemoryRouter>
                <JustificationAuthorisation match={{params: {projectId: 1}}}/>
            </MemoryRouter>
        </IntlProvider>
    );
  });
  
  it('defines the component', () => {
    expect(wrapper).toBeDefined();
  }); 

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  }); 
  it('should renders the component', () => {
    expect(findByTestAtrr(wrapper,'j-a-component')).toBeDefined();
  });

}); 
