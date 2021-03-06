import React from 'react';
import { mount } from 'enzyme';
import Subcontractor from '../../Subcontractor';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../store/Preliminaries/InitialState';
import { initialState as subcontractorInitialState } from '../../../store/SubContractor/InitialState';
import { lookUpInitialState, customerEnquiryInitialState } from '../Preliminaries/PreliminariesTestData';
import Notify from '../../../enums/Notify';
import { initialState as discountInitialState } from '../../../store/DiscountForm/InitialState';
import ProjectStatus from '../../../enums/ProjectStatus';

const mockStore = configureStore([]);
let store;
let wrapper;
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
customerEnquiryInitialState.form.currencyId = 1;
customerEnquiryInitialState.form.countryId = 1;
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
const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<Subcontractor {...Props} />
			</IntlProvider>
		</Provider>
	);
};
const Props: any = {
	form: subcontractorInitialState.form,
	notify: Notify.none,
	event: EventType.none,
	currencyId: 1,
	currencies: [],
	status: 1,
	history: { push: jest.fn() },
	match: { params: { projectId: 1 } },
	subContractorFormAdd: jest.fn(),
	subContractorFormEdit: jest.fn(),
	getSubContractor: jest.fn(),
	getProjectDetail: jest.fn(),
	resetSubContractorState: jest.fn(),
	getAllCurrencies: jest.fn()
};
describe('Subcontractor component test cases', () => {
	const Props: any = {
		form: subcontractorInitialState.form,
		notify: Notify.none,
		event: EventType.none,
		currencyId: 1,
		currencies: [],
		status: 1,
		history: { push: jest.fn() },
		match: { params: { projectId: 1 } },
		subContractorFormAdd: jest.fn(),
		subContractorFormEdit: jest.fn(),
		getSubContractor: jest.fn(),
		getProjectDetail: jest.fn(),
		resetSubContractorState: jest.fn(),
		getAllCurrencies: jest.fn()
	};
	beforeEach(() => {
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should not make subcontractor element into readonly if project status is not bidlost or onhold', () => {
		let container = findByTestAtrr(wrapper, 'sub_row_status').first();
		expect(container.hasClass('row')).toBe(true);
	});
	it('should enable the form when state is not InReview', () => {
		expect(wrapper.find('.link_disabled').length).toEqual(0);
	});
	it('should make subcontractor element into readonly if project status is not bidlost or onhold', () => {
		let data = { ...customerEnquiryInitialState };
		data.form.status = ProjectStatus.BidLost;
		setUpStore(initialState, lookUpInitialState, data, subcontractorInitialState);
		mountComponent(Props);
		let container = findByTestAtrr(wrapper, 'sub_row_status').first();
		expect(container.hasClass('link_disabled')).toBe(true);
	});
	it('should disable the form when state is InReview', () => {
		let data = { ...customerEnquiryInitialState };
		data.form.status = ProjectStatus.InReview;
		setUpStore(initialState, lookUpInitialState, data, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper.find('.link_disabled').length).toBeGreaterThan(0);
	});
	it('should disable the form when state is OrderReceived', () => {
		let data = { ...customerEnquiryInitialState };
		data.form.status = ProjectStatus.OrderReceived;
		setUpStore(initialState, lookUpInitialState, data, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper.find('.link_disabled').length).toBeGreaterThan(0);
	});
	it('should disable the form when state is OrderReceived', () => {
		let data = { ...customerEnquiryInitialState };
		data.form.status = ProjectStatus.JAApproved;
		setUpStore(initialState, lookUpInitialState, data, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper.find('.link_disabled').length).toBeGreaterThan(0);
	});

	it('should render the component when notify is success and event is none', () => {
		subcontractorInitialState.notify = Notify.success;
		subcontractorInitialState.event = EventType.none;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is none', () => {
		subcontractorInitialState.notify = Notify.success;
		subcontractorInitialState.event = EventType.none;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is next', () => {
		subcontractorInitialState.notify = Notify.success;
		subcontractorInitialState.event = EventType.next;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is save', () => {
		subcontractorInitialState.notify = Notify.success;
		subcontractorInitialState.event = EventType.save;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is previou', () => {
		subcontractorInitialState.notify = Notify.success;
		subcontractorInitialState.event = EventType.previous;
		setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	describe('Inline loading test', () => {
		it('should not load loader when loading is false', () => {
			subcontractorInitialState.loading = false;
			setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
			mountComponent(Props);
			expect(wrapper.hasClass('MuiCircularProgress-root')).toBe(false);
		});
			it('should load loader when loading is true and event is save', () => {
				subcontractorInitialState.loading = true;
				subcontractorInitialState.event = EventType.save;
				setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
				mountComponent(Props);
				expect(wrapper.find('.MuiCircularProgress-svg')).toBeDefined();
			});
	
			it('should load loader when loading is true and event is next', () => {
				subcontractorInitialState.loading = true;
				subcontractorInitialState.event = EventType.next;
				setUpStore(initialState, lookUpInitialState, customerEnquiryInitialState, subcontractorInitialState);
				mountComponent(Props);
				expect(wrapper.find('.MuiCircularProgress-svg')).toBeDefined();
			});
	});
});

