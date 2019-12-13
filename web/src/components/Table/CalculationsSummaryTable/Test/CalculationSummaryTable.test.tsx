import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import CalculationsSummaryTable from '../index';
import CalculationsSummaryType from '../../../../enums/CalculationsSummaryType'; 
import {initialState as subContractorInitialState,newActivity} from '../../../../store/SubContractor/InitialState';
import {initialState as preliminariesInitialState} from '../../../../store/Preliminaries/InitialState';
import {findByTestAtrr,checkProps} from '../../../../helpers/test-helper';


describe('calculation summary component tests', () => {
  let wrapper: any;
  const mockStore = configureStore([]);
  let store;
  let subContractorState = {...subContractorInitialState};
  subContractorState.form.activities[0].totalCost = 100;
  subContractorState.form.activities[0].grossMargin = 20;
  beforeEach(() => {
    store = mockStore({
      subContractor:{...subContractorState},
      preliminary:{...preliminariesInitialState}
    }
    );
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

  it('renders the total cost with correct value', () => {
    expect(findByTestAtrr(wrapper,'total-cost-summary').text()).toEqual('100');
  });

  it('renders the average margin with correct value', () => {
    expect(findByTestAtrr(wrapper,'total-margin-summary').text()).toEqual('20.00');
  });

  it('renders the gross margin with correct value', () => {
    expect(findByTestAtrr(wrapper,'gross-margin-summary').text()).toEqual('25.00');
  });

  it('renders the total sell with correct value', () => {
    expect(findByTestAtrr(wrapper,'total-sell-summary').text()).toEqual('125.00');
  });
  
});
