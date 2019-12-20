import React from 'react';
import { mount,shallow } from 'enzyme';
import { applyMiddleware, createStore} from 'redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import CalculationsSummaryTable from '../index';
import CalculationsSummaryType from '../../../../enums/CalculationsSummaryType'; 
import {initialState as subContractorInitialState,newActivity} from '../../../../store/SubContractor/InitialState';
import {initialState as preliminariesInitialState} from '../../../../store/Preliminaries/InitialState';
import {findByTestAtrr,checkProps} from '../../../../helpers/test-helper';
import {initialState as discountInitialState} from '../../../../store/DiscountForm/InitialState';
import {initialState as summaryCalculationState} from '../../../../store/SummaryCalculation/InitialState';
import summaryCalculationReducer from '../../../../store/SummaryCalculation/Reducer';

describe('calculation summary component tests', () => {
  let wrapper: any;
  const mockStore = configureStore([thunk]);
  let store;
  let subContractorState = {...subContractorInitialState};
  subContractorState.form.activities[0].totalCost = 100;
  subContractorState.form.activities[0].grossMargin = 20;
  let discountState = {...discountInitialState};
  discountState.form.clientDiscount = 10;
  discountState.form.supplierTotalDiscount = 10;
  let summaryCalculationStateObj = {...summaryCalculationState};
  const dispatch = jest.fn();
  beforeEach(() => {
    store = mockStore({
      summaryCalculation:summaryCalculationStateObj,
      subContractor:{...subContractorState},
      preliminary:{...preliminariesInitialState},
      discount:{...discountState}
    }
    );
    store.dispatch = dispatch;
    
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <CalculationsSummaryTable name={CalculationsSummaryType.preliminary} preliminary={[]} currencySymbol='$'/>
        </IntlProvider>
      </Provider>
    );
    
  });
  
  it('defines the component', () => { 
      expect(wrapper).toBeDefined();
  });
    
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });  

  it('should Not throw a warning for proptypes', () => {
      const expectedProps = {
        name: [],
       preliminary: [],
        currencySymbol: ''
      };
      const propsError = checkProps(CalculationsSummaryTable, expectedProps);
      expect(propsError).toBeUndefined();
    });
 
});
