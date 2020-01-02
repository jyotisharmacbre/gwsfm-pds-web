import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import PricingSumaryTable from './index';
import { initialState as subContractorInitialState, newActivity } from '../../../store/SubContractor/InitialState';
import { initialState as preliminariesInitialState } from '../../../store/Preliminaries/InitialState';
import { findByTestAtrr, checkProps } from '../../../helpers/test-helper';
import { initialState as discountInitialState } from '../../../store/DiscountForm/InitialState';

let wrapper: any;
const mountCalculationSummaryTable = (props) => {
	wrapper = mount(<PricingSumaryTable {...props} />);
}; 

describe('should calculation summary component renders without error', () => {
	let Props = {
		preliminary: preliminariesInitialState,
		subContractor: subContractorInitialState.form.activities,
		discount: discountInitialState,
		currencySymbol: '$'
	};
	beforeEach(() => {
		mountCalculationSummaryTable(Props);
	});
	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should calculate the pricing summary correctly for sub contractor row', () => {
		let newProps = { ...Props };
		newProps.subContractor.push({ ...newActivity });
		newProps.subContractor[0].projectId = 'test';
    newProps.subContractor[0].totalCost = 100;
		newProps.subContractor[0].grossMargin = 20;
		newProps.subContractor[1].totalCost = 100;
		newProps.subContractor[1].grossMargin = 20;
		mountCalculationSummaryTable(newProps);
		expect(findByTestAtrr(wrapper, 'sub-contractor-cost').text()).toEqual('200');
		expect(findByTestAtrr(wrapper, 'sub-contractor-margin').text()).toEqual('20');
		expect(findByTestAtrr(wrapper, 'sub-contractor-sell').text()).toEqual('250');
	});

	it('should render the preliminary row', () => {
		expect(findByTestAtrr(wrapper, 'preliminary-data')).toHaveLength(1);
	});

	it('should not render the preliminary row', () => {
		let newProps = {
			subContractor: subContractorInitialState.form.activities,
			discount: discountInitialState,
			currencySymbol: '$'
		};
		mountCalculationSummaryTable(newProps);
		expect(findByTestAtrr(wrapper, 'preliminary-data')).toHaveLength(0);
	});

	it('should render the sub contractor row', () => {
		expect(findByTestAtrr(wrapper, 'sub-contractor-data')).toHaveLength(1);
	});

	it('should not render the contractor row', () => {
		let newProps = {
			preliminary: preliminariesInitialState,
			discount: discountInitialState,
			currencySymbol: '$'
		};
		mountCalculationSummaryTable(newProps);
		expect(findByTestAtrr(wrapper, 'sub-contractor-data')).toHaveLength(0);
	});

	it('should render the discount row', () => {
		expect(findByTestAtrr(wrapper, 'discount-data')).toHaveLength(1);
	});

	it('should not render the discount row', () => {
		let newProps = {
			preliminary: preliminariesInitialState,
			subContractor: subContractorInitialState.form.activities,
			currencySymbol: '$'
		};
		mountCalculationSummaryTable(newProps);
		expect(findByTestAtrr(wrapper, 'discount-data')).toHaveLength(0);
	});
}); 
