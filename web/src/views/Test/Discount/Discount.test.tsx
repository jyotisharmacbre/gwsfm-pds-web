import React from 'react';
import { mount } from 'enzyme';
import Discounts from '../../Discounts';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {
	lookUpInitialState,
	customerEnquiryInitialState,
	dynamicsInitialState
} from '../Preliminaries/PreliminariesTestData';
import { discountInitialState } from './DiscountTestData';
import Notify from '../../../enums/Notify';
import { initialState as subcontractorInitialState } from '../../../store/SubContractor/InitialState';
import { initialState as preliminaryInitialState } from '../../../store/Preliminaries/InitialState';
import ProjectStatus from '../../../enums/ProjectStatus';

const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = (lookUpInitialState, customerEnquiryInitialState) => {
	store = mockStore({
		discount: discountInitialState,
		lookup: lookUpInitialState,
		project: customerEnquiryInitialState,
		subContractor: subcontractorInitialState,
		preliminary: preliminaryInitialState,
		dynamicData: dynamicsInitialState,
		admin: { adminDefaultValues: [] }
	});
	store.dispatch = jest.fn();
};
const mountPreliminaryComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<Discounts {...Props} />
			</IntlProvider>
		</Provider>
	);
};
describe('Discount component test cases', () => {
	const Props: any = {
		form: discountInitialState.form,
		notify: Notify.none,
		projectId: '',
		event: EventType.none,
		projectStatus: [],
		currencies: [],
		currencyId: 1,
		customerName: 'test',
		otherCustomerName: 'test',
		status: 1,
		match: { params: { projectId: 1 } },
		history: { push: jest.fn() },
		getProjectStatus: jest.fn(),
		discountFormAdd: jest.fn(),
		discountFormEdit: jest.fn(),
		resetDiscountState: jest.fn(),
		getDiscountData: jest.fn(),
		getAllCurrencies: jest.fn()
	};
	beforeEach(() => {
		setUpStore(lookUpInitialState, customerEnquiryInitialState);
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
		let container = findByTestAtrr(wrapper, 'dis_row_status').first();
		expect(container.hasClass('row')).toBe(true);
	});
	it('should make preliminaries element into readonly if project status is not bidlost or onhold', () => {
		customerEnquiryInitialState.form.status = ProjectStatus.BidLost;
		setUpStore(lookUpInitialState, customerEnquiryInitialState);
		mountPreliminaryComponent(Props);
		let container = findByTestAtrr(wrapper, 'dis_row_status').first();
		expect(container.hasClass('link_disabled')).toBe(true);
	});
	it('should disable the form when state is InReview', () => {
		let data = { ...customerEnquiryInitialState };
		data.form.status = ProjectStatus.InReview;
		setUpStore(lookUpInitialState, data);
		expect(wrapper.find('.link_disabled').length).toBeGreaterThan(0);
	});
	it('should make discount element into readonly if project status is order received', () => {
		customerEnquiryInitialState.form.status = ProjectStatus.OrderReceived;
		setUpStore(lookUpInitialState, customerEnquiryInitialState);
		mountPreliminaryComponent(Props);
		let container = findByTestAtrr(wrapper, 'dis_row_status').first();
		expect(container.hasClass('link_disabled')).toBe(true);
	});
});
