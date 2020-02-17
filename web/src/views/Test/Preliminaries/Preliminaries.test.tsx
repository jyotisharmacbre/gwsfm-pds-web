import React from 'react';
import { mount } from 'enzyme';
import Preliminaries from '../../Preliminaries';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../store/Preliminaries/InitialState';
import { initialState as subcontractorInitialState } from '../../../store/SubContractor/InitialState';
import { preliminariesData, lookUpInitialState, customerEnquiryInitialState } from './PreliminariesTestData';
import { initialState as discountInitialState } from '../../../store/DiscountForm/InitialState';
import ProjectStatus from '../../../enums/ProjectStatus';
import Notify from '../../../enums/Notify';

const mockStore = configureStore([]);
const Props: any = {
	preliminary: preliminariesData,
	lookupData: preliminariesData,
	currencies: preliminariesData,
	match: { params: { projectId: 1 } },
	notify: initialState.notify,
	event: EventType,
	currencyId: 1,
	status: 1,
	preliminaryForm: preliminariesData,
	history: { push: jest.fn() },
	preliminaryAdd: jest.fn(),
	preliminaryEdit: jest.fn(),
	getPreliminaryDetails: jest.fn(),
	updateInputField: jest.fn(),
	getAllCurrencies: jest.fn(),
	getProjectStatus: jest.fn(),
	getProjectDetail: jest.fn()
};
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
const setUpStore = (initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState) => {
	store = mockStore({
		preliminary: initialState,
		lookup: lookUpInitialState,
		project: customerEnquiryInitialState,
		subContractor: subcontractorInitialState,
		discount: discountInitialState,
		admin: { adminDefaultValues: [] }
	});
	store.dispatch = jest.fn();
};
const mountPreliminaryComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<Preliminaries {...Props} />
			</IntlProvider>
		</Provider>
	);
};
describe('Preliminaries component test cases', () => {
	
	beforeEach(() => {
		initialState.preliminaryDetails
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountPreliminaryComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should enable the form when state is not InReview', () => {
		expect(wrapper.find('.link_disabled').length).toEqual(0);
	});
	it('should not make preliminaries element into readonly if project status is not bidlost or onhold', () => {
		let container = findByTestAtrr(wrapper, 'pre_row_status').first();
		expect(container.hasClass('row')).toBe(true);
	});
	it('should make preliminaries element into readonly if project status is not bidlost or onhold', () => {
		customerEnquiryInitialState.form.status = ProjectStatus.BidLost;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountPreliminaryComponent(Props);
		let container = findByTestAtrr(wrapper, 'pre_row_status').first();
		expect(container.hasClass('link_disabled')).toBe(true);
	});
	it('should disable the form when state is InReview', () => {
		let data = { ...customerEnquiryInitialState };
		data.form.status = ProjectStatus.InReview;
		setUpStore(initialState, lookUpInitialState, data, subcontractorInitialState);
		expect(wrapper.find('.link_disabled').length).toBeGreaterThan(0);
	});
	it('should show collapse all button and hide expandall button on click on expand all button', () => {
		const btnExpandAll = findByTestAtrr(wrapper, 'btn-expandall').first();
		const btnCollapseAll = findByTestAtrr(wrapper, 'btn-collapseall').first();
		btnExpandAll.simulate('click');
		expect(btnExpandAll.hasClass('hide')).toBeTruthy;
		expect(btnCollapseAll.hasClass('show')).toBeTruthy;
	});
	it('should show expandall all button and hide collapse button on click on collapse all button', () => {
		const btnExpandAll = findByTestAtrr(wrapper, 'btn-expandall').first();
		const btnCollapseAll = findByTestAtrr(wrapper, 'btn-collapseall').first();
		btnCollapseAll.simulate('click');
		expect(btnCollapseAll.hasClass('hide')).toBeTruthy;
		expect(btnExpandAll.hasClass('show')).toBeTruthy;
	});
	it('should make preliminaries element into readonly if project status is order received', () => {
		customerEnquiryInitialState.form.status = ProjectStatus.OrderReceived;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountPreliminaryComponent(Props);
		let container = findByTestAtrr(wrapper, 'pre_row_status').first();
		expect(container.hasClass('link_disabled')).toBe(true);
	});
	it('should make preliminaries element into readonly if project status is J&A Approved', () => {
		customerEnquiryInitialState.form.status = ProjectStatus.JAApproved;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountPreliminaryComponent(Props);
		let container = findByTestAtrr(wrapper, 'pre_row_status').first();
		expect(container.hasClass('link_disabled')).toBe(true);
	});
});

describe('Preliminaries defined with differnt notification', () => {
	
	it('defines the component when notify success', () => {
		initialState.notify = Notify.success;
		initialState.event = 1;		
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountPreliminaryComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('defines the component when notify error', () => {
		initialState.notify = Notify.error;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountPreliminaryComponent(Props);
		expect(wrapper).toBeDefined();
	});	

	describe('Inline loading test', () => {
		it('should not load loader when loading is false', () => {
			discountInitialState.loading = false;
			setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
			mountPreliminaryComponent(Props);
			expect(wrapper.hasClass('MuiCircularProgress-root')).toBe(false);
		});
			it('should load loader when loading is true', () => {
				initialState.loading = true;
				setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
				mountPreliminaryComponent(Props);
				expect(wrapper.find('.MuiCircularProgress-svg')).toBeDefined();
			});
	});
});

