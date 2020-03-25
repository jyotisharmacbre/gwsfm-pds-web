import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReviewSubmit from '../ReviewSubmit';
import { findByTestAtrr, checkProps } from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';
import configureStore from 'redux-mock-store';
import { initialState as projectInitialState } from '../../store/CustomerEnquiryForm/InitialState';
import { initialState as projectOverViewInitialState } from '../../store/ProjectOverviewForm/InitialState';
import { initialState as subContractorInitialState } from '../../store/SubContractor/InitialState';
import { initialState as lookUpInitialState } from '../../store/Lookups/Reducer';
import { initialState as customerEnquiryInitialState } from '../../store/CustomerEnquiryForm/InitialState';
import { initialState as preliminaryInitialState } from '../../store/Preliminaries/InitialState';
import { discountInitialState } from './Discount/DiscountTestData';
import { initialState as adminInitialState } from '../../store/Admin/InitialState';
import ConnectedIntlProvider from '../../Translations/connectedIntlProvider';

import ProjectStatus from '../../enums/ProjectStatus';

const history = { push: jest.fn() };
const mockStore = configureStore([thunk]);

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

const store = mockStore(storeData);

let wrapper;
const mountComponent = (store) => {
	wrapper = mount(
		<Provider store={store}>
			<ConnectedIntlProvider>
				<ReviewSubmit history={history} match={{ params: { projectId: '1' } }} />
			</ConnectedIntlProvider>
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

	it('should redirect to discount page on previous button click', () => {
		const button = findByTestAtrr(wrapper, 'previous-button');
		button.simulate('click');
		expect(history.push).toHaveBeenLastCalledWith('/Discounts/1');
	});

	it('should renders the pricing summary component', () => {
		expect(findByTestAtrr(wrapper, 'pricing-summary')).toBeDefined();
	});

	it('should renders the calculation summary component', () => {
		expect(findByTestAtrr(wrapper, 'calculation-summary')).toBeDefined();
	});

	it('should enable the submit button when state is not InReview', () => {
		expect(wrapper.find('.link_disabled').length).toEqual(0);
	});

	it('should disable the submit button when state is InReview', () => {
		projectInitialState.form.status = ProjectStatus.InReview;
		mountComponent(store);
		expect(wrapper.find('.link_disabled').length).toBeGreaterThan(0);
	});
	it('should hide the submit button when state is not JA', () => {
		projectInitialState.form.status = ProjectStatus.InReview;
		const button = findByTestAtrr(wrapper, 'submit-button');
		expect(button.length).toEqual(0);
	});
	it('should show the submit button when state is  JA', () => {
		projectInitialState.form.status = ProjectStatus.JA;
		mountComponent(store);
		const button = findByTestAtrr(wrapper, 'submit-button');
		expect(button.length).toBeGreaterThan(0);
	});

	it('should show the date as per the locale selected', () => {
		const storeDataValues = { ...storeData };
		storeDataValues.userPreferences.preferences.languageName = 'fr';
		const store = mockStore(storeDataValues);
		mountComponent(store);
		expect(findByTestAtrr(wrapper, 'firstValuationDate').prop('children')).toEqual('25-mars-2020');
		expect(findByTestAtrr(wrapper, 'finalAccountDate').prop('children')).toEqual('25-mars-2020');
		expect(findByTestAtrr(wrapper, 'commenceDate').prop('children')).toEqual('25-mars-2020');
		expect(findByTestAtrr(wrapper, 'completionDate').prop('children')).toEqual('25-mars-2020');
	});
});
