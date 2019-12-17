
 
import React from 'react';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import {findByTestAtrr} from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';
import configureStore from 'redux-mock-store';
import ProjectOverviewStatusTab from './ProjectOverviewStatusTab';
const props: any = {
    status : 1,
    statusName:"test",
    onReactivate:jest.fn(),
    handleBidLost:jest.fn(),
    handleOnHold:jest.fn()
  };
  describe('PdsFormButton Renders', () => {
    const mockStore = configureStore([]);
    let store;
    let wrapper;  
    beforeEach(() => {
        store = mockStore({ });
    
      wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <ProjectOverviewStatusTab {...props}/>
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
  it('should not display reactivate button if status is not bid lost or on hold', () => {

    let button=findByTestAtrr(wrapper,"activateButton").first();
    expect(button.length).toBe(0);
});
it('should  display reactivate button if status is bid lost or on hold', () => {
  const testProps: any = {
    status : 4,
    statusName:"test",
    onReactivate:jest.fn(),
    handleBidLost:jest.fn(),
    handleOnHold:jest.fn()
  };
wrapper = mount(
    <Provider store={store}>
    <IntlProvider locale="en" messages={translations['en'].messages}>
    <ProjectOverviewStatusTab {...testProps}/>
    </IntlProvider>
    </Provider>
  );
  let button=findByTestAtrr(wrapper,"activateButton").first();
  expect(button.length).toBe(1);
});
it('should display status tab on click of status edit icon', () => {
  let container=findByTestAtrr(wrapper,"toggleStatusTab").first();
  container.simulate("click");
  let button=findByTestAtrr(wrapper,"statusTab").first();
  expect(button.length).toBe(1);
  expect(button.hasClass('hide')).toBe(true);
});
it('should trigger bid lost action handler on click of bid lost', () => {
  let container=findByTestAtrr(wrapper,"bidlost").first();
  container.simulate("click");
  expect(container.invoke.call.length).toBe(1);
});
it('should trigger on hold action handler on click of on hold', () => {
  let container=findByTestAtrr(wrapper,"onhold").first();
  container.simulate("click");
  expect(container.invoke.call.length).toBe(1);
});
it('should trigger reactivate action handler on click of active button', () => {
  let container=findByTestAtrr(wrapper,"toggleStatusTab").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
});
});




