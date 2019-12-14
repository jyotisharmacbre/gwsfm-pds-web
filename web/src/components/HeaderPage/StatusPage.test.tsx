
 
import React from 'react';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import {findByTestAtrr} from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';
import configureStore from 'redux-mock-store';
import StatusPage from './StatusPage';
import { findDOMNode } from 'react-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const props: any = {
    status : 4,
    onReactivate:jest.fn(),
    handleBidLost:jest.fn(),
    handleOnHold:jest.fn()
  };
  describe('PdsFormButton Renders', () => {
    const mockStore = configureStore([]);
    let store;
    let wrapper;  
    beforeEach(() => {
        store = mockStore({
            
          });
    
      wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <StatusPage {...props}/>
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
  it('should not display reactivate button on click of status edit icon, if status is not bid lost or on hold', () => {
    const testProps: any = {
        status : 7,
        onReactivate:jest.fn(),
        handleBidLost:jest.fn(),
        handleOnHold:jest.fn()
      };
    wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <StatusPage {...testProps}/>
        </IntlProvider>
        </Provider>
      );
    let container=findByTestAtrr(wrapper,"toggleStatusTab").first();
    container.simulate("click");
    let button=findByTestAtrr(wrapper,"activateButton").first();
    expect(button.length).toBe(0);
});
it('should display status tab on click of status edit icon', () => {
    let container=findByTestAtrr(wrapper,"toggleStatusTab").first();
    container.simulate("click");
    let button=findByTestAtrr(wrapper,"statusTab").first();
    expect(button.length).toBe(1);
    expect(button.hasClass('hide')).toBe(true);
});
  it('should display reactivate button on click of status edit icon', () => {
      let container=findByTestAtrr(wrapper,"toggleStatusTab").first();
      container.simulate("click");
      let button=findByTestAtrr(wrapper,"activateButton").first();
      expect(button.length).toBe(1);
      expect(button.text()).toBe("ACTIVATE");

  });
  it('should trigger confirmation popup click event on click of bid lost', () => {
    let container=findByTestAtrr(wrapper,"bidlost").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
});
it('should trigger confirmation popup click event on click of on hold', () => {
    let container=findByTestAtrr(wrapper,"onhold").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
});
it('should trigger confirmation popup click event on click of active button', () => {
    let container=findByTestAtrr(wrapper,"toggleStatusTab").first();
      container.simulate("click");
      expect(container.invoke.call.length).toBe(1);
});
});




