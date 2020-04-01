

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import translations from '../../../../Translations/translation';
import ProjectOverviewStatusTab from '../ProjectOverviewStatusTab';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import ProjectStatus from '../../../../enums/ProjectStatus';
const props: any = {
  status: 1,
  statusName: "test",
  onReactivate: jest.fn(),
  handleBidLost: jest.fn(),
  handleOnHold: jest.fn(),
  handleOrderReceived: jest.fn()
};
let wrapper;
const mockStore = configureStore([]);
const mountComponent = (props) => {
  wrapper = mount(
    <Provider store={mockStore({})}>
      <IntlProvider locale="en" messages={translations['en'].messages}>
        <ProjectOverviewStatusTab {...props} />
      </IntlProvider>
    </Provider>
  );
}
describe('PdsFormButton Renders', () => {

  beforeEach(() => {
    mountComponent(props);
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should not display reactivate button if status is not bid lost or on hold', () => {

    let button = findByTestAtrr(wrapper, "activateButton").first();
    expect(button.length).toBe(0);
  });
  it('should  display reactivate button if status is bid lost or on hold', () => {
    const testProps: any = {
      status: ProjectStatus.BidLost,
      statusName: "test",
      onReactivate: jest.fn(),
      handleBidLost: jest.fn(),
      handleOnHold: jest.fn()
    };
    mountComponent(testProps);
    let button = findByTestAtrr(wrapper, "activateButton").first();
    expect(button.length).toBe(1);
  });
  it('should display status tab on click of status edit icon', () => {
    let container = findByTestAtrr(wrapper, "toggleStatusTab").first();
    container.simulate("click");
    let button = findByTestAtrr(wrapper, "statusTab").first();
    expect(button.length).toBe(1);
    expect(button.hasClass('hide')).toBe(true);
  });
  it('should trigger bid lost action handler on click of bid lost', () => {
    let container = findByTestAtrr(wrapper, "bidlost").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
  });
  it('should trigger on hold action handler on click of on hold', () => {
    let container = findByTestAtrr(wrapper, "onhold").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
  });
  it('should trigger reactivate action handler on click of active button', () => {
    let container = findByTestAtrr(wrapper, "toggleStatusTab").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
  });
  it('should display reactivate action and status bar in disable state if status is bidlost or onhold', () => {
    const testProps: any = {
      status: ProjectStatus.BidLost,
      statusName: "test",
      onReactivate: jest.fn(),
      handleBidLost: jest.fn(),
      handleOnHold: jest.fn()
    };
    mountComponent(testProps);
    let button = findByTestAtrr(wrapper, "activateButton").first();
    let container = findByTestAtrr(wrapper, "toggleStatusTab").first();
    expect(button.length).toBe(1);
    expect(container.hasClass("link_disabled")).toBe(true);
  });
  it('should display orderReceived option in dropdown if status is JAApproved', () => {
    const testProps: any = {
      status: ProjectStatus.JAApproved,
      statusName: "test",
      onReactivate: jest.fn(),
      handleBidLost: jest.fn(),
      handleOnHold: jest.fn()
    };
    mountComponent(testProps);
    let button = findByTestAtrr(wrapper, "orderReceived").first();
    expect(button.length).toBe(1);
  });
  it('should trigger orderReceived  event on click of dropdown action', () => {
    const testProps: any = {
      status: ProjectStatus.JAApproved,
      statusName: "test",
      onReactivate: jest.fn(),
      handleBidLost: jest.fn(),
      handleOnHold: jest.fn()
    };
    mountComponent(testProps);
    let container = findByTestAtrr(wrapper, "orderReceived").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
  });

  it('should not display reactivate action and status bar in disable state if status is InReview', () => {
    const testProps: any = {
      status: ProjectStatus.InReview,
      statusName: "test",
      onReactivate: jest.fn(),
      handleBidLost: jest.fn(),
      handleOnHold: jest.fn()
    };
    mountComponent(testProps);
    let container = findByTestAtrr(wrapper, "toggleStatusTab").first();
    container.simulate("click");
    //toggeling again
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
  });


  it('should  render project live status in dropdown and should hide bid lost and on hold when project status is OrderRecived', () => {
    const testProps: any = {
      status: ProjectStatus.OrderReceived,
      statusName: "test"
    };
    mountComponent(testProps);
    let field = findByTestAtrr(wrapper, "live").first();
    expect(field.length).toBe(1);
  });

  it('should  render project complete status in dropdown and should hide bid lost and on hold when project status is live', () => {
    const testProps: any = {
      status: ProjectStatus.Live,
      statusName: "test"
    };
    mountComponent(testProps);
    let field = findByTestAtrr(wrapper, "completed").first();
    expect(field.length).toBe(1);
  });

  it('should trigger handleProjectLive  event on click of dropdown action', () => {
    const testProps: any = {
      status: ProjectStatus.OrderReceived,
      statusName: "test",
      handleProjectLive: jest.fn()
    };
    mountComponent(testProps);
    const container = findByTestAtrr(wrapper, "live").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
  });

  it('should trigger handleProjectCompleted  event on click of dropdown action', () => {
    const testProps: any = {
      status: ProjectStatus.Live,
      statusName: "test",
      handleProjectLive: jest.fn()
    };
    mountComponent(testProps);
    const container = findByTestAtrr(wrapper, "completed").first();
    container.simulate("click");
    expect(container.invoke.call.length).toBe(1);
  });
  
  it('should hide status tab on click outside of status tab', () => {
    let container = findByTestAtrr(wrapper, "toggleStatusTab").first();
    container.simulate("click");
    let field = findByTestAtrr(wrapper, "bidlost").first();
    field.simulate("click");
    let button = findByTestAtrr(wrapper, "statusTab").first();
    expect(button.hasClass('hide')).toBe(true);
  });

});




