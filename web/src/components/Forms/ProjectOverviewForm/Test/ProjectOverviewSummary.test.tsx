import React from 'react';
import { shallow } from 'enzyme';
import ProjectOverviewSummary from '../ProjectOverviewSummary';
import { initialState as projectInitialState } from '../../../../store/CustomerEnquiryForm/InitialState';
import { initialState as projectOverviewInitialState } from '../../../../store/ProjectOverviewForm/InitialState';
import { findByTestAtrr } from '../../../../helpers/test-helper';

let wrapper: any;
const mountComponent = (props) => {
	wrapper = shallow(<ProjectOverviewSummary {...props} />);
};

describe('Project Overview Summary componenet', () => {
	const props: any = {
		projectOverview: projectOverviewInitialState.form,
		lookUpData: [],
		company: 'test',
		headOfProject: 'test',
		projectOwner: 'test',
		projectManager: 'test'
	};

	beforeEach(() => {
		mountComponent(props);
	});

	it('should defines the componenet', () => {
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render the main contractor value', () => {
		expect(findByTestAtrr(wrapper, 'main-contractor')).toBeDefined();
	});

    it('should render the enquiry reveived form', () => {
		expect(findByTestAtrr(wrapper, 'enquiry-reveived-form')).toBeDefined();
	});

    it('should render the liquidated damages', () => {
		expect(findByTestAtrr(wrapper, 'liquidated-damages')).toBeDefined();
	});

    it('should render the enquiry type', () => {
		expect(findByTestAtrr(wrapper, 'enquiry-type')).toBeDefined();
	});
    it('should render the work type', () => {
		expect(findByTestAtrr(wrapper, 'work-type')).toBeDefined();
	});
    it('should render the credit check result', () => {
		expect(findByTestAtrr(wrapper, 'credit-check-result')).toBeDefined();
	});
    it('should render the insurance', () => {
		expect(findByTestAtrr(wrapper, 'insurance')).toBeDefined();
	});
    it('should render the site address', () => {
		expect(findByTestAtrr(wrapper, 'site-address')).toBeDefined();
	});
    it('should render the form of contract', () => {
		expect(findByTestAtrr(wrapper, 'form-of-contract')).toBeDefined();
	});
    
});
