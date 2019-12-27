import React from 'react';
import { mount } from 'enzyme';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import CalculationsSummaryTable from '../index';
import CalculationsSummaryType from '../../../../enums/CalculationsSummaryType';
import { initialState as subContractorInitialState, newActivity } from '../../../../store/SubContractor/InitialState';
import { initialState as preliminariesInitialState } from '../../../../store/Preliminaries/InitialState';
import { findByTestAtrr, checkProps } from '../../../../helpers/test-helper';
import { initialState as discountInitialState } from '../../../../store/DiscountForm/InitialState';
import { initialState as summaryCalculationState } from '../../../../store/SummaryCalculation/InitialState';
import subContractorReducer from '../../../../store/SubContractor/Reducer';
import discountFormReducer from '../../../../store/DiscountForm/Reducer';
import preliminaryReducer from '../../../../store/Preliminaries/Reducer';
import summaryCalculationReducer from '../../../../store/SummaryCalculation/Reducer';
import lookupReducer from '../../../../store/Lookups/Reducer';
import projectDetailReducer from '../../../../store/CustomerEnquiryForm/Reducer';

let wrapper: any;
let store;
const middlewares: any[] = [];
middlewares.push(thunk);
const setUpStore = () => {
	store = applyMiddleware(...middlewares)(createStore)(
		combineReducers({
			subContractor: subContractorReducer,
			discount: discountFormReducer,
			preliminary: preliminaryReducer,
			summaryCalculation: summaryCalculationReducer,
			project: projectDetailReducer,
			lookup: lookupReducer
		})
	);
};

const mountCalculationSummaryTable = (props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<CalculationsSummaryTable {...props} />
			</IntlProvider>
		</Provider>
	);
};

describe('should calculation summary component renders without error', () => {
	let Props = {
		name: CalculationsSummaryType.preliminary,
		preliminary: []
	};
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

	it('should Not throw a warning for proptypes', () => {
		const expectedProps = {
			name: [],
			preliminary: []
		};
		const propsError = checkProps(CalculationsSummaryTable, expectedProps);
		expect(propsError).toBeUndefined();
	});
});

describe('should calculation summary component, calculate the cost, margin and sell correctly', () => {
	let Props = {
		name: CalculationsSummaryType.preliminary,
		preliminary: []
	};
	it('should calculate the pricing summary correctly, if discount is Zero', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		discountInitialState.form.clientDiscount = 0;
		discountInitialState.form.supplierTotalDiscount = 0;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 100, sell: 125, margin: 20 });
	});
	it('should calculate the pricing summary correctly if only sub contractor discount is applying', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		discountInitialState.form.clientDiscount = 0;
		discountInitialState.form.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 90, sell: 125, margin: 28 });
	});
	it('should calculate the pricing summary correctly if only client discount(%) is applying', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		discountInitialState.form.discountType = 1;
		discountInitialState.form.clientDiscount = 10;
		discountInitialState.form.supplierTotalDiscount = 0;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 100, sell: 112.5, margin: 11.11 });
	});
	it('should calculate the pricing summary correctly if only client discount(value) is applying', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		discountInitialState.form.discountType = 2;
		discountInitialState.form.clientDiscount = 10;
		discountInitialState.form.supplierTotalDiscount = 0;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 100, sell: 115, margin: 13.04 });
	});
	it('should calculate the pricing summary correctly after applying discount in percentage', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		discountInitialState.form.discountType = 1;
		discountInitialState.form.clientDiscount = 10;
		discountInitialState.form.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 90, sell: 112.5, margin: 20 });
	});
	it('should calculate the pricing summary correctly after applying discount in value', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		discountInitialState.form.discountType = 2;
		discountInitialState.form.clientDiscount = 10;
		discountInitialState.form.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 90, sell: 115, margin: 21.74 });
	});
	it('should calculate the pricing summary correctly after applying discount in percentage on more than 1 activity', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		subContractorInitialState.form.activities.push({ ...newActivity });
		subContractorInitialState.form.activities[1].totalCost = 100;
		subContractorInitialState.form.activities[1].grossMargin = 20;
		discountInitialState.form.discountType = 1;
		discountInitialState.form.clientDiscount = 10;
		discountInitialState.form.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 190, sell: 225, margin: 15.56 });
	});
	it('should calculate the pricing summary correctly after applying discount in value on more than 1 activity', () => {
		subContractorInitialState.form.activities[0].totalCost = 100;
		subContractorInitialState.form.activities[0].grossMargin = 20;
		subContractorInitialState.form.activities.push({ ...newActivity });
		subContractorInitialState.form.activities[1].totalCost = 100;
		subContractorInitialState.form.activities[1].grossMargin = 20;
		discountInitialState.form.discountType = 2;
		discountInitialState.form.clientDiscount = 10;
		discountInitialState.form.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(store.getState().summaryCalculation).toEqual({ cost: 190, sell: 240, margin: 20.83 });
	});
});
