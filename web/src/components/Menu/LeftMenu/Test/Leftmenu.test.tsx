
 
import React from 'react';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import {findByTestAtrr} from "../../../../helpers/test-helper"
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import configureStore from 'redux-mock-store';
import LeftMenu from '../index';
import { leftMenuProjectData } from './LeftMenuTestData';
import {BrowserRouter} from 'react-router-dom';

let props: any = {
    projectId : ""
  };
  describe('Left Menu Renders', () => {
    const mockStore = configureStore([]);
    let store;
    let wrapper;  
    beforeEach(() => {
        store = mockStore({
            project:leftMenuProjectData
          });
          jest.mock('react-router-dom', () => ({
            useHistory: jest.fn().mockReturnValue({  length: 13,
              push: jest.fn(),
              block: jest.fn(),
              createHref: jest.fn(),
              go: jest.fn(),
              goBack: jest.fn(),
              goForward: jest.fn(),
              liten: jest.fn(),
              replace: jest.fn(),
              action: "REPLACE",
              location: null }),
          }));
          props.projectId="";
          leftMenuProjectData.form.projectId="";
                wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <BrowserRouter>
        <LeftMenu {...props}/>
        </BrowserRouter>
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
  it('should disable the link if project id is not found', () => {
    const container = findByTestAtrr(wrapper,'ProjectOverviewLink').first();
    expect(container.hasClass("link_disabled")).toBe(true);
  });
  it('should enable and pass project id with url,if project id is there', () => {
    leftMenuProjectData.form.projectId="309ccd02-38ab-4643-1165-08d77e00a6ce";
    wrapper = mount(
  <Provider store={store}>
  <IntlProvider locale="en" messages={translations['en'].messages}>
  <BrowserRouter>
  <LeftMenu {...props}/>
  </BrowserRouter>
  </IntlProvider>
  </Provider>
          )
    const container = findByTestAtrr(wrapper,'ProjectOverviewLink').first();
    const link = findByTestAtrr(wrapper,'ProjectOverviewPath').first();
    expect(container.hasClass("link_disabled")).toBe(false);
   expect(link.getDOMNode().href).toContain("309ccd02-38ab-4643-1165-08d77e00a6ce");
  });
  it('should disable the link if project is not in GUID format inside url', () => {
    window.location.href="http://localhost/projectOverview/309ccd02-38ab-4643-1165-08d7";
    const container = findByTestAtrr(wrapper,'ProjectOverviewLink').first();
    const link = findByTestAtrr(wrapper,'ProjectOverviewPath').first();
    expect(link.getDOMNode().href).not.toContain("309ccd02-38ab-4643-1165-08d7");
    expect(container.hasClass("link_disabled")).toBe(true);
  });
});