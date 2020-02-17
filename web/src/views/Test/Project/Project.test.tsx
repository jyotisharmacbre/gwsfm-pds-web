import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../store/Preliminaries/InitialState';
import { initialState as lookUpInitialState } from '../../../store/Lookups/Reducer';
import {initialState as customerEnquiryInitialState } from '../../../store/CustomerEnquiryForm/InitialState';
import Project from '../../Project';
import { BrowserRouter as Router } from 'react-router-dom';
import Notify from '../../../enums/Notify';

const mockStore = configureStore([]);
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
  customerEnquiryInitialState.form.projectId = 'id';
  customerEnquiryInitialState.form.currencyId = 1;
  customerEnquiryInitialState.form.countryId = 1;

let store;
let wrapper;
const setUpStore = () => {
	store = mockStore({
		lookup: lookUpInitialState,
		project: customerEnquiryInitialState,
		userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }]},
		dynamicData: [{
			contractId: 1,
			contractName: "TestName",
			customerId: 1,
			customerName: "TestName"
		  }]
	});
	store.dispatch = jest.fn();
};

const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
			<Router>
				<Project {...Props} />
				</Router>
			</IntlProvider>
		</Provider>
	);
};

const Props: any = {
	match: { params: { projectId: 1 } },
	history: { push: jest.fn() },
	handleGetDynamicContractData: jest.fn(),
	handleGetDynamicCompanyData: jest.fn(),
	getDynamicsListOfDivision: jest.fn(),
	getListOfBusinessUnits:jest.fn(),
	getProjectStatus: jest.fn(),
	getProjectDetail: jest.fn(),
	resetProjectDetailState: jest.fn(),
	getAllCurrencies: jest.fn(),
	getAllCountries: jest.fn(),
	getDynamicContractData: jest.fn(),
	getDynamicCompanyData: jest.fn(),
	getDynamicSubContractorData: jest.fn(),
	getUserService: jest.fn(),
	handleProjectDetailsSubmit: jest.fn(),
	handleProjectDetailsEdit: jest.fn(),
	resetProjectDetailStateToInitial: jest.fn()
};

describe('Project component test cases', () => {

	it('should defines the component', () => {
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});
	it('should defines the component when paramProjectId is empty', () => {
		Props.match.params.projectId = '';	
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});
	
	it('should render the component when notify is success and event is next', () => {
		customerEnquiryInitialState.notify = Notify.success;
		customerEnquiryInitialState.event = EventType.next;
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is save', () => {
		customerEnquiryInitialState.notify = Notify.success;
		customerEnquiryInitialState.event = EventType.save;
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is none', () => {
		customerEnquiryInitialState.notify = Notify.success;
		customerEnquiryInitialState.event = EventType.none;
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	describe('Inline loading test', () => {
		it('should not load loader when loading is false', () => {
			customerEnquiryInitialState.loading = false;
			setUpStore();
			mountComponent(Props);
			expect(wrapper.hasClass('MuiCircularProgress-root')).toBe(false);
		});
			it('should load loader when loading is true and event is save', () => {
				customerEnquiryInitialState.loading = true;
				customerEnquiryInitialState.event = EventType.save;
				setUpStore();
				mountComponent(Props);
				expect(wrapper.find('.MuiCircularProgress-svg')).toBeDefined();
			});
	
			it('should load loader when loading is true and event is next', () => {
				customerEnquiryInitialState.loading = true;
				customerEnquiryInitialState.event = EventType.next;
				setUpStore();
				mountComponent(Props);
				expect(wrapper.find('.MuiCircularProgress-svg')).toBeDefined();
			});
	});
});
