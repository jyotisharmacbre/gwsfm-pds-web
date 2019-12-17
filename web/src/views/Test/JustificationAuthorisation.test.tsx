import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import JustificationAuthorisation from '../JustificationAuthorisation';
import {findByTestAtrr,checkProps} from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';

describe('justification authorisation component', () => {
  let wrapper: any;
  const history = { push: jest.fn() };
  beforeEach(() => {
    wrapper = mount(
        <IntlProvider locale="en" messages={translations['en'].messages}>
            <MemoryRouter>
                <JustificationAuthorisation history={history} match={{params: {projectId: 1}}}/>
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

  it('should redirect to projectoverview component on previous button click', () => {
    const button =findByTestAtrr(wrapper,'previous-button');
    button.simulate('click'); 
    expect( history.push ).toHaveBeenLastCalledWith( '/projectoverview/1' );
  });

  it('should redirect to preliminaries component on next button click', () => {
    const button =findByTestAtrr(wrapper,'next-button');
    button.simulate('click'); 
    expect( history.push ).toHaveBeenLastCalledWith( '/preliminaries/1' );
  });

  it('should redirect to preliminaries component on preliminaries tile click', () => {
    const button =findByTestAtrr(wrapper,'preliminaries-tile').first();
    button.simulate('click'); 
    expect( history.push ).toHaveBeenLastCalledWith( '/preliminaries/1' );
  });

  it('should redirect to subcontractor component on subcontractor tile click', () => {
    const button =findByTestAtrr(wrapper,'subcontractor-tile').first();
    button.simulate('click'); 
    expect( history.push ).toHaveBeenLastCalledWith( '/Subcontractor/1' );
  });

  it('should redirect to discounts component on discounts tile click', () => {
    const button =findByTestAtrr(wrapper,'discounts-tile').first();
    button.simulate('click'); 
    expect( history.push ).toHaveBeenLastCalledWith( '/Discounts/1' );
  });

}); 
