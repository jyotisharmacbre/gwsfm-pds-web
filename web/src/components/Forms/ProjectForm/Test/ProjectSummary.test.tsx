import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectSummary from '../ProjectSummary';
import { initialState as projectInitialState } from '../../../../store/CustomerEnquiryForm/InitialState';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';

let wrapper: any;
const mountComponent = (props) => {
	wrapper = mount(
		<Provider store={store}>
		<IntlProvider locale="en" messages={translations['en'].messages}>
			<ProjectSummary {...props} />
		</IntlProvider>
		</Provider>);
};

projectInitialState.form.projectId = '0';
projectInitialState.form.divisionId = '1';
projectInitialState.form.businessUnitId = '1';
projectInitialState.form.headOfProject = 'test@pds.com';
projectInitialState.form.projectManager = 'test@pds.com';
projectInitialState.form.status = 1;
projectInitialState.form.engagementId = 1;

	const props: any = {
		project: projectInitialState.form,
		company: 'test',
		headOfProject: 'test',
		projectManager: 'test',
		handleGetUserNamesForEmails: jest.fn(),
		listOfDivisions: [{divisionId: '1'}],
		listOfBusinessUnits: [{businessUnitId: '1'}],
		userNamesForEmails: [{email: 'test@pds.com', displayName: 'testName'}],
		lookUpData: [{ lookupItem: 'Project_Status', lookupKey: 1 }, { lookupItem: 'Engagement_Type', lookupKey: 1 }],
		countryCode:'GBR'
	};

describe('Project Summary componenet', () => {

	beforeEach(() => {
		mountComponent(props);
	});

	it('should defines the componenet', () => {
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render the company', () => {
		expect(findByTestAtrr(wrapper, 'company')).toBeDefined();
	});

    it('should render the head of project', () => {
		expect(findByTestAtrr(wrapper, 'head-of-project')).toBeDefined();
	});

	it('should render the cdm notiiable when Country is UK (country code GBR)', () => {
		expect(findByTestAtrr(wrapper, 'cdm_notifiable')).toHaveLength(1);
	});

	it('should not render the cdm notiiable when Country is not UK', () => {
		props.countryCode = 'OTHER';
		mountComponent(props);
		expect(findByTestAtrr(wrapper, 'cdm_notifiable')).toHaveLength(0);
	});

});

describe('Project Summary componenet useEffect', () => {

	it('should defines the componenet when projectId is not 0', () => {
		props.project.projectId = '1';
		mountComponent(props);
		expect(wrapper).toBeDefined();
	});

	it('should defines the componenet when companyId is 0 and projectId is not 0', () => {
		props.project.projectId = '1';
		props.project.companyId = '0';
		mountComponent(props);
		expect(wrapper).toBeDefined();
	});

	it('should defines the componenet when companyId is 0 and projectId is not 0 and contractorId is 0', () => {
		props.project.projectId = '1';
		props.project.companyId = '0';
		props.project.contractorId = '0';
		mountComponent(props);
		expect(wrapper).toBeDefined();
	});
	

	it('should defines the componenet when companyId is 0 and projectId is not 0 and contractorId is not 0', () => {
		props.project.projectId = '1';
		props.project.companyId = '0';
		props.project.contractorId = '1';
		mountComponent(props);
		expect(wrapper).toBeDefined();
	});
	
});