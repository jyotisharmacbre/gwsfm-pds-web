import React from 'react';
import { mount } from 'enzyme';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import CalculationsSummaryTable from '../index';
import { initialState as subContractorInitialState, newActivity } from '../../../../store/SubContractor/InitialState';
import { initialState as preliminariesInitialState } from '../../../../store/Preliminaries/InitialState';
import { findByTestAtrr, checkProps } from '../../../../helpers/test-helper';
import { initialState as discountInitialState } from '../../../../store/DiscountForm/InitialState';

let wrapper: any;

const mountCalculationSummaryTable = (props) => {
	wrapper = mount(
		<IntlProvider locale="en" messages={translations['en'].messages}>
			<CalculationsSummaryTable {...props} />
		</IntlProvider>
	);
};

describe('should calculation summary component renders without error', () => {
	let Props = {
		preliminary: preliminariesInitialState,
		subContractor: subContractorInitialState.form.activities,
		discount: discountInitialState,
		currencySymbol: '$'
	};
	Props.subContractor[0].projectId = 'test';
	beforeEach(() => {
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
			preliminary: preliminariesInitialState,
			subContractor: subContractorInitialState.form.activities,
			discount: discountInitialState,
			currencySymbol: '$'
		};
		const propsError = checkProps(CalculationsSummaryTable, expectedProps);
		expect(propsError).toBeUndefined();
	});
});
describe('should calculation summary component, calculate the cost, margin and sell correctly', () => {
	let Props = {
		preliminary: preliminariesInitialState,
		subContractor: subContractorInitialState.form.activities,
		discount: discountInitialState.form,
		currencySymbol: '$'
	};
	it('should calculate the pricing summary correctly, if discount is Zero', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.discount.clientDiscount = 0;
		Props.discount.supplierTotalDiscount = 0;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('100.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('20');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('25');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('125.00');
	});

	it('should calculate the pricing summary correctly if only sub contractor discount is applying', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.discount.clientDiscount = 0;
		Props.discount.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('90.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('28');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('35');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('125.00');
	});

	it('should calculate the pricing summary correctly if only client discount(%) is applying', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.discount.discountType = 1;
		Props.discount.clientDiscount = 10;
		Props.discount.supplierTotalDiscount = 0;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('100.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('11.11');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('12.5');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('112.50');
	});

	it('should calculate the pricing summary correctly if only client discount(value) is applying', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.discount.discountType = 2;
		Props.discount.clientDiscount = 10;
		Props.discount.supplierTotalDiscount = 0;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('100.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('13.04');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('15');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('115.00');
	});

	it('should calculate the pricing summary correctly after applying discount in percentage', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.discount.discountType = 1;
		Props.discount.clientDiscount = 10;
		Props.discount.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('90.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('20');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('22.5');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('112.50');
	});

	it('should calculate the pricing summary correctly after applying discount in value', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.discount.discountType = 2;
		Props.discount.clientDiscount = 10;
		Props.discount.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('90.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('21.74');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('25');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('115.00');
	});

	it('should calculate the pricing summary correctly after applying discount in percentage on more than 1 activity', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.subContractor.push({ ...newActivity });
		Props.subContractor[1].totalCost = 100;
		Props.subContractor[1].grossMargin = 20;
		Props.discount.discountType = 1;
		Props.discount.clientDiscount = 10;
		Props.discount.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('190.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('15.56');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('35');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('225.00');
	});

	it('should calculate the pricing summary correctly after applying discount in value on more than 1 activity', () => {
		Props.subContractor[0].totalCost = 100;
		Props.subContractor[0].grossMargin = 20;
		Props.subContractor.push({ ...newActivity });
		Props.subContractor[1].totalCost = 100;
		Props.subContractor[1].grossMargin = 20;
		Props.discount.discountType = 2;
		Props.discount.clientDiscount = 10;
		Props.discount.supplierTotalDiscount = 10;
		mountCalculationSummaryTable(Props);
		expect(findByTestAtrr(wrapper, 'total-cost-summary').text()).toEqual('190.00');
		expect(findByTestAtrr(wrapper, 'total-margin-summary').text()).toEqual('20.83');
		expect(findByTestAtrr(wrapper, 'gross-margin-summary').text()).toEqual('50');
		expect(findByTestAtrr(wrapper, 'total-sell-summary').text()).toEqual('240.00');
	});
});
