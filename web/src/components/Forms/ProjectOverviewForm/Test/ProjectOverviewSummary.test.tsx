import React from 'react';
import { shallow } from 'enzyme';
import ProjectOverviewSummary from '../ProjectOverviewSummary';
import { initialState as projectInitialState } from '../../../../store/CustomerEnquiryForm/InitialState';
import { initialState as projectOverviewInitialState } from '../../../../store/ProjectOverviewForm/InitialState';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import EventType from '../../../../enums/EventType';

let wrapper: any;
const mountComponent = (props) => {
	wrapper = shallow(<ProjectOverviewSummary {...props} />);
};

let projectOverviewForm = projectOverviewInitialState.form;

describe('Project Overview Summary componenet', () => {
	projectOverviewForm.projectId = '1';
	projectOverviewForm.projectAdditionalDetail.enquiryTypeId = 1;
	projectOverviewForm.projectAdditionalDetail.workTypeId=1;
	const props: any = {
		projectOverview: projectOverviewForm,
		lookUpData: [
			{
				lookupId: 1,
				lookupItem: 'Enquiry_Type',
				lookupKey: 1,
				description: 'H&amp;S File Production'
			},
			{
				lookupId: 2,
				lookupItem: 'Work_Type',
				lookupKey: 1,
				description: 'test description '
			}],
		company: 'test',
		headOfProject: 'test',
		projectOwner: 'test',
		projectManager: 'test'
	};

	beforeEach(() => {
		mountComponent(props);
	});

	it('should defines the componenet', () => {
		mountComponent(props);
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
	describe('Edit button', () => {
		beforeEach(() => {
			mountComponent(props);
			let field = wrapper.find('button[name="oneditoverview"]');
		});
		it('Should renders Edit button', () => {
			let field = wrapper.find('button[name="oneditoverview"]');
			expect(field.prop('type')).toBe('button');
		});

		it('Should call the oneditOverview event on edit button click', () => {
			let field = wrapper.find('button[name="oneditoverview"]');
			field.simulate('click');
			expect(props.oneditOverview).toBeCalledTimes(1);
		});
	});

});
