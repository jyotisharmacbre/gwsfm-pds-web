import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {
	initialState as adminInitialState
} from '../../../store/Admin/InitialState';

import { initialState as preliminaryInitialState } from '../../../store/Preliminaries/InitialState';
import { initialState as projectOverViewInitialState } from '../../../store/ProjectOverviewForm/InitialState';
import { initialState as subContractorInitialState } from '../../../store/SubContractor/InitialState';
import { initialState as lookUpInitialState } from '../../../store/Lookups/Reducer';
import { initialState as customerEnquiryInitialState } from '../../../store/CustomerEnquiryForm/InitialState';
import Project from '../../Project';
import { BrowserRouter as Router } from 'react-router-dom';
import Notify from '../../../enums/Notify';
import ProjectOverview from '../../ProjectOverview';
import { discountInitialState } from '../Discount/DiscountTestData';

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
lookUpInitialState.projectstatus = [
	{
		lookupId: 1,
		lookupItem: 'string',
		lookupKey: 1,
		description: 'string',
	}
];
const setUpStore = () => {
	store = mockStore({
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
	store.dispatch = jest.fn();
};

const Props: any = {
	match: { params: { projectId: 1 } },
	history: { push: jest.fn() },
	getProjectStatus: jest.fn(),
	projectOverviewFormAdd: jest.fn(),
	projectOverviewFormEdit: jest.fn(),
	getAdditionalDetails: jest.fn(),
	getEnquiryOverview: jest.fn(),
	resetProjectOverviewState: jest.fn(),
	getProjectDetail: jest.fn(),
	changeProjectStatusToOnHold: jest.fn(),
	changeProjectStatusToBidLost: jest.fn(),
	reactivateProject: jest.fn(),
	setProjectStatus: jest.fn(),
	setAdminDefaultValues: jest.fn(),
	getSubContractor: jest.fn(),
	getPreliminaryDetails: jest.fn(),
	getDiscountData: jest.fn(),
	getAllCurrencies: jest.fn(),
	getLookups: jest.fn(),
	setupPojectApprovalsInitialData: jest.fn(),
	getProjectActivities: jest.fn(),
	handleGetUserNamesForEmails: jest.fn(),
	postComment: jest.fn(),
	getProjectParameters: jest.fn(),
	getAllCountries: jest.fn(),
	isPostCommentFormDirty: true
};

const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<Router>
					<ProjectOverview {...Props} />
				</Router>
			</IntlProvider>
		</Provider>
	);
};
describe('Project component test cases', () => {

	it('should defines the component', () => {
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();

	});
	it('should defines the component when paramProjectId is empty', () => {
		customerEnquiryInitialState.form.projectId = '';
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});
	it('should render the component when notify is success and event is next', () => {
		projectOverViewInitialState.notify = Notify.success;
		projectOverViewInitialState.event = EventType.next;
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is save', () => {
		projectOverViewInitialState.notify = Notify.success;
		projectOverViewInitialState.event = EventType.save;
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is previous', () => {
		projectOverViewInitialState.notify = Notify.success;
		projectOverViewInitialState.event = EventType.previous;
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when notify is success and event is none', () => {
		projectOverViewInitialState.notify = Notify.success;
		projectOverViewInitialState.event = EventType.none;
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when projectApprovals length is greater then 0', () => {
		projectOverViewInitialState.form.projectApprovals = [{
			projectApprovalId: 'string',
			projectId: 'string',
			projectApprovalRange: 1,
			projectApprovalRangeDescription: 'string',
			approverType: 1,
			approverTypeDescription: 'string',
			approvalStatus: 1,
			approvalStatusDescription: 'string',
			userId: 'string',
			showRangeLabel: true
		}];

		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when contractorId is 0', () => {
		customerEnquiryInitialState.form.contractorId = '0';
		customerEnquiryInitialState.form.countryId = 1;
		customerEnquiryInitialState.form.projectManager = '';
		customerEnquiryInitialState.enquiryOverview.contractorId = '0';
		customerEnquiryInitialState.enquiryOverview.projectManager = '';

		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should render the component when contractorId is 1', () => {
		customerEnquiryInitialState.form.contractorId = '1';
		customerEnquiryInitialState.form.projectManager = 'testName';
		customerEnquiryInitialState.enquiryOverview.contractorId = '1';
		customerEnquiryInitialState.enquiryOverview.projectManager = 'testName';


		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should set manger name', () => {	
		customerEnquiryInitialState.enquiryOverview.projectManager = 'test@pds.com';
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});

	it('should show conirmation popup when PostCommentForm is Dirty', () => {	
		Props.isPostCommentFormDirty = true;
		setUpStore();
		mountComponent(Props);
		expect(wrapper.find('.modal-dialog')).toBeDefined();
	});

});