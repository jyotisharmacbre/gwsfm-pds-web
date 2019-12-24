import React from 'react';
import { mount } from 'enzyme';
import Subcontractor from '../../Subcontractor';
import {findByTestAtrr} from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../store/Preliminaries/InitialState';
import { initialState as subcontractorInitialState} from '../../../store/SubContractor/InitialState';
import { lookUpInitialState, customerEnquiryInitialState } from '../Preliminaries/PreliminariesTestData';
import Notify from '../../../enums/Notify';
import {initialState as discountInitialState} from '../../../store/DiscountForm/InitialState';
import {initialState as summaryCalculationState} from '../../../store/SummaryCalculation/InitialState';
const mockStore = configureStore([]);
let store;
let wrapper;
const setUpStore=(initialState,lookUpInitialState,customerEnquiryInitialState,subcontractorInitialState)=>{
    store= mockStore({
    preliminary: initialState,
    lookup: lookUpInitialState,
    project: customerEnquiryInitialState,
    subContractor:subcontractorInitialState,
    discount:discountInitialState,
    summaryCalculation:summaryCalculationState,
});
store.dispatch=jest.fn();
}
const mountPreliminaryComponent=(Props)=>{
    wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <Subcontractor {...Props} />
        </IntlProvider>
        </Provider>
      );
    }
describe('Subcontractor component test cases', () => {
  const Props:any ={
    form:subcontractorInitialState.form,
    notify: Notify.none,
    event: EventType.none,
    currencyId:1,
    currencies:[] ,
    status:1,
    history:{ push: jest.fn() },
    match: {params: {projectId: 1}},
    subContractorFormAdd:jest.fn(),
    subContractorFormEdit:jest.fn(),
    getSubContractor:jest.fn(),
    getProjectDetail:jest.fn(),
    resetSubContractorState:jest.fn(),
    getAllCurrencies:jest.fn(),
    
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
  it('should not make subcontractor element into readonly if project status is not bidlost or onhold', () => {
    let container=findByTestAtrr(wrapper,"sub_row_status").first();
    expect(container.hasClass("row")).toBe(true);
  });
  it('should make subcontractor element into readonly if project status is not bidlost or onhold', () => {
    customerEnquiryInitialState.form.status=4;
    setUpStore(initialState,lookUpInitialState,customerEnquiryInitialState,subcontractorInitialState);
    mountPreliminaryComponent(Props);
    let container=findByTestAtrr(wrapper,"sub_row_status").first();
    expect(container.hasClass("link_disabled")).toBe(true);
  });

}); 
