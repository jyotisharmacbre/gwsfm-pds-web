import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReviewApprove from '../../ReviewApprove';
import { findByTestAtrr, checkProps } from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { initialState as preliminaryInitialState } from '../../../store/Preliminaries/InitialState';
import { initialState as projectOverViewInitialState } from '../../../store/ProjectOverviewForm/InitialState';
import { initialState as subContractorInitialState } from '../../../store/SubContractor/InitialState';
import { initialState as lookUpInitialState } from '../../../store/Lookups/Reducer';
import { initialState as customerEnquiryInitialState } from '../../../store/CustomerEnquiryForm/InitialState';
import { discountInitialState } from '../Discount/DiscountTestData';
import { getCustomerEnquiryData, getProjectOverviewState } from './ReviewApproveTestData';
import * as helper from '../../../helpers/auth-helper';
import { toast } from 'react-toastify';
import ConnectedIntlProvider from '../../../Translations/connectedIntlProvider';



import {
	initialState as adminInitialState
} from '../../../store/Admin/InitialState';

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

let storeData = {
	projectOverview: projectOverViewInitialState,
	lookup: lookUpInitialState,
	project: customerEnquiryInitialState,
	subContractor: subContractorInitialState,
	preliminary: preliminaryInitialState,
	discount: discountInitialState,
	admin: adminInitialState,
	userPreferences: { preferences: { languageName: 'en' } },
	userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }] },
	dynamicData: [{
		contractId: 1,
		contractName: "TestName",
		customerId: 1,
		customerName: "TestName"
	}]
};
const history = { push: jest.fn() };
const mockStore = configureStore([thunk]);
const store = mockStore(storeData);

let wrapper;
const mountComponent = (store) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<ConnectedIntlProvider>
					<ReviewApprove history={history} match={{ params: { projectId: 1 } }} />
				</ConnectedIntlProvider>
			</IntlProvider>
		</Provider>
	);
};

describe('review and approve component test cases', () => {
	beforeEach(() => {
		mountComponent(store);
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

	it('should redirect to unauthorized page when logged in user is not in the approvers list', () => {
		const storeDataValues = { ...storeData };
		storeDataValues.projectOverview = getProjectOverviewState(1);
		storeDataValues.project = getCustomerEnquiryData(3);
		const store = mockStore(storeDataValues);

		jest
			.spyOn(helper, 'getDisplayEmail').mockImplementationOnce(() => {
				return 'test@pds.com';
			});

		mountComponent(store);
		expect(history.push).toHaveBeenCalledWith({ "pathname": "/Error", "state": { "type": 0 } });
	});

	it('should show error toaster when Project is in JA status and approver status is draft', () => {

		const storeDataValues = { ...storeData };
		storeDataValues.projectOverview = getProjectOverviewState(1);
		storeDataValues.project = getCustomerEnquiryData(2);
		const store = mockStore(storeDataValues);

		jest
			.spyOn(helper, 'getDisplayEmail').mockImplementationOnce(() => {
				return 'test1@pds.com';
			});
		const toastError = jest.spyOn(toast, "error");

		mountComponent(store);
		expect(toastError).toHaveBeenCalledWith('The Project is currently not available for review as another approver has raised a query');

		const btnQuery = findByTestAtrr(wrapper, 'btnQuery');
		expect(btnQuery.prop('hidden')).toBe(true);

		const btnApprove = findByTestAtrr(wrapper, 'btnApprove');
		expect(btnApprove.prop('hidden')).toBe(true);
	});

	it('should show error toaster when Project is InReview but approver status is Approved', () => {

		const storeDataValues = { ...storeData };
		storeDataValues.projectOverview = getProjectOverviewState(2);
		storeDataValues.project = getCustomerEnquiryData(3);
		const store = mockStore(storeDataValues);

		jest
			.spyOn(helper, 'getDisplayEmail').mockImplementationOnce(() => {
				return 'test1@pds.com';
			});
		const toastError = jest.spyOn(toast, "error");
		mountComponent(store);

		expect(toastError).toHaveBeenCalledWith('You have already taken an action on the Project');

		const btnQuery = findByTestAtrr(wrapper, 'btnQuery');
		expect(btnQuery.prop('hidden')).toBe(true);

		const btnApprove = findByTestAtrr(wrapper, 'btnApprove');
		expect(btnApprove.prop('hidden')).toBe(true);
	});

	it('should not show error toaster when Project is InReview but approver status is pending', () => {

		const storeDataValues = { ...storeData };
		storeDataValues.projectOverview = getProjectOverviewState(3);
		storeDataValues.project = getCustomerEnquiryData(3);
		const store = mockStore(storeDataValues);

		jest
			.spyOn(helper, 'getDisplayEmail').mockImplementationOnce(() => {
				return 'test1@pds.com';
			});

		mountComponent(store);

		const btnQuery = findByTestAtrr(wrapper, 'btnQuery');
		expect(btnQuery.prop('hidden')).toBe(false);

		const btnApprove = findByTestAtrr(wrapper, 'btnApprove');
		expect(btnApprove.prop('hidden')).toBe(false);
	});
});
