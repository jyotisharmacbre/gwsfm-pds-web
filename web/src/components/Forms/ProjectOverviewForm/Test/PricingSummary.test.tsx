import React from 'react';
import { mount } from 'enzyme';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import PricingSumary from '../PricingSummary';

import {initialState as subContractorInitialState,newActivity} from '../../../../store/SubContractor/InitialState';
import {initialState as preliminariesInitialState} from '../../../../store/Preliminaries/InitialState';
import {findByTestAtrr,checkProps} from '../../../../helpers/test-helper';
import {initialState as discountInitialState} from '../../../../store/DiscountForm/InitialState';
import {initialState as summaryCalculationState} from '../../../../store/SummaryCalculation/InitialState';

import subContractorReducer from '../../../../store/SubContractor/Reducer';
import discountFormReducer from '../../../../store/DiscountForm/Reducer';
import preliminaryReducer from '../../../../store/Preliminaries/Reducer';
import summaryCalculationReducer from '../../../../store/SummaryCalculation/Reducer';

let wrapper: any;
let store;
const middlewares: any[] = [];
middlewares.push(thunk);
const setUpStore=()=>{
    store = applyMiddleware(...middlewares)(createStore)(
      combineReducers({
      subContractor: subContractorReducer,
      discount: discountFormReducer,
      preliminary: preliminaryReducer,
      summaryCalculation:summaryCalculationReducer
    }));
};

const mountCalculationSummaryTable=(props)=>{
    wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <PricingSumary {...props}/>
        </IntlProvider>
      </Provider>
    );
}


describe('should calculation summary component renders without error', () => {
  let Props = {
    currencySymbol:'$',
    showPreliminary:true,
    showSubContractor:true,
    showDiscount:true
  }
  beforeEach(() => {
    setUpStore();
    mountCalculationSummaryTable(Props);
  });
  it('defines the component', () => { 
      expect(wrapper).toBeDefined();
  });
    
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });  

  it('should calculate the pricing summary correctly for sub contractor row', () => {
      let subContractorState = {...subContractorInitialState};
      subContractorState.form.activities.push({...newActivity});
      subContractorState.form.activities[0].totalCost = 100;
      subContractorState.form.activities[0].grossMargin = 20;
      subContractorState.form.activities[1].totalCost = 100;
      subContractorState.form.activities[1].grossMargin = 20;
      setUpStore();
      mountCalculationSummaryTable(Props);
      expect(findByTestAtrr(wrapper,'sub-contractor-cost').text()).toEqual('200');
      expect(findByTestAtrr(wrapper,'sub-contractor-margin').text()).toEqual('40');
      expect(findByTestAtrr(wrapper,'sub-contractor-sell').text()).toEqual('250');
  });

 it('should render the preliminary row', () => {
      expect(findByTestAtrr(wrapper,'preliminary-data')).toHaveLength(1);
    });

    it('should not render the preliminary row', () => {
      Props.showPreliminary = false;
      mountCalculationSummaryTable(Props);
      expect(findByTestAtrr(wrapper,'preliminary-data')).toHaveLength(0);
    });

    it('should render the sub contractor row', () => {
      expect(findByTestAtrr(wrapper,'sub-contractor-data')).toHaveLength(1);
    });

    it('should not render the contractor row', () => {
      Props.showSubContractor = false;
      mountCalculationSummaryTable(Props);
      expect(findByTestAtrr(wrapper,'sub-contractor-data')).toHaveLength(0);
    });

    it('should render the discount row', () => {
      expect(findByTestAtrr(wrapper,'discount-data')).toHaveLength(1);
    });

    it('should not render the discount row', () => {
      Props.showDiscount = false;
      mountCalculationSummaryTable(Props);
      expect(findByTestAtrr(wrapper,'discount-data')).toHaveLength(0);
    });
    
});

