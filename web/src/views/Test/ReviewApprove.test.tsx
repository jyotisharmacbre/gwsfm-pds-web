import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReviewApprove from '../ReviewApprove';
import { findByTestAtrr, checkProps } from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';
import configureStore from 'redux-mock-store';
import { initialState as preliminaryInitialState } from '../../store/Preliminaries/InitialState';
import { initialState as projectOverViewInitialState } from '../../store/ProjectOverviewForm/InitialState';
import { initialState as subContractorInitialState } from '../../store/SubContractor/InitialState';
import { initialState as lookUpInitialState } from '../../store/Lookups/Reducer';
import { initialState as customerEnquiryInitialState } from '../../store/CustomerEnquiryForm/InitialState';
import { discountInitialState } from './Discount/DiscountTestData';
import {
	initialState as adminInitialState
} from '../../store/Admin/InitialState';

customerEnquiryInitialState.form.projectId = 'id';
customerEnquiryInitialState.form.currencyId = 1;
customerEnquiryInitialState.form.countryId = 1;
lookUpInitialState.currencies = [{
	currencyId: 1,
	currencyName: 'INR',
	currencySymbol: 'R',
	isActive: true
}];
lookUpInitialState.countries = [{
	currencyId: 143,
	name: 'india',
	code: 'IN',
	isoAlpha2Code: "IND",
	countryId: 1
}];
const history = { push: jest.fn() };
const mockStore = configureStore([thunk]);
const store = mockStore({
	projectOverview: projectOverViewInitialState,
	lookup: lookUpInitialState,
	project: customerEnquiryInitialState,
	subContractor: subContractorInitialState,
	preliminary: preliminaryInitialState,
	discount: discountInitialState,
	admin: adminInitialState,
	userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }] },
	dynamicData: [{
		contractId: 1,
		contractName: "TestName",
		customerId: 1,
		customerName: "TestName"
	}]
});
let wrapper;
const mountComponent = () => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<ReviewApprove history={history} match={{ params: { projectId: 1 } }} />
			</IntlProvider>
		</Provider>
	);
};

describe('review and approve component test cases', () => {
	beforeEach(() => {
		mountComponent();
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should renders the component', () => {
		expect(findByTestAtrr(wrapper, 'review-approve-component')).toBeDefined();
	});

	it('should renders the pricing summary component', () => {
		expect(findByTestAtrr(wrapper, 'pricing-summary')).toBeDefined();
	});

	it('should renders the calculation summary component', () => {
		expect(findByTestAtrr(wrapper, 'calculation-summary')).toBeDefined();
	});
	it('should renders the activity feed component', () => {
		expect(findByTestAtrr(wrapper, 'activity-feed-list')).toBeDefined();
	});
});
