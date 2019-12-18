import React from 'react';
import { mount } from 'enzyme';
import Preliminaries from '../../Preliminaries';
import {findByTestAtrr} from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../store/Preliminaries/InitialState';
import { initialState as subcontractorInitialState} from '../../../store/SubContractor/InitialState';
import { preliminariesData, lookUpInitialState, customerEnquiryInitialState } from './PreliminariesTestData';
const mockStore = configureStore([]);
let store;
let wrapper;
const setUpStore=(initialState,lookUpInitialState,customerEnquiryInitialState,subcontractorInitialState)=>{
    store= mockStore({
    preliminary: initialState,
    lookup: lookUpInitialState,
    project: customerEnquiryInitialState,
    subContractor:subcontractorInitialState
});
store.dispatch=jest.fn();
}
const mountPreliminaryComponent=(Props)=>{
    wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <Preliminaries {...Props} />
        </IntlProvider>
        </Provider>
      );
    }
describe('Preliminaries component test cases', () => {
  const Props:any ={
    preliminary:preliminariesData,
    lookupData: preliminariesData,
    currencies: preliminariesData,
    match: {params: {projectId: 1}},
    notify: initialState.notify,
    event: EventType,
    currencyId: 1,
    status:1,
    preliminaryForm:preliminariesData,
    history:{ push: jest.fn() },
    preliminaryAdd:jest.fn(),
    preliminaryEdit: jest.fn(),
    getPreliminaryDetails: jest.fn(),
    updateInputField: jest.fn(),
    getAllCurrencies: jest.fn(),
    getProjectStatus: jest.fn(),
    getProjectDetail: jest.fn()
  }
  beforeEach(() => {
    setUpStore(initialState,lookUpInitialState,customerEnquiryInitialState,subcontractorInitialState);
    mountPreliminaryComponent(Props);
  });
  
  it('defines the component', () => {
    expect(wrapper).toBeDefined();
  }); 

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should not make preliminaries element into readonly if project status is not bidlost or onhold', () => {
    let container=findByTestAtrr(wrapper,"pre_row_status").first();
    expect(container.hasClass("row")).toBe(true);
  });
  it('should make preliminaries element into readonly if project status is not bidlost or onhold', () => {
    customerEnquiryInitialState.form.status=4;
    setUpStore(initialState,lookUpInitialState,customerEnquiryInitialState,subcontractorInitialState);
    mountPreliminaryComponent(Props);
    let container=findByTestAtrr(wrapper,"pre_row_status").first();
    expect(container.hasClass("link_disabled")).toBe(true);
  });

}); 
