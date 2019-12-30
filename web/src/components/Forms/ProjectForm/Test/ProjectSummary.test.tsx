import React from 'react';
import { shallow } from 'enzyme';
import ProjectSummary from '../ProjectSummary';
import { initialState as projectInitialState } from '../../../../store/CustomerEnquiryForm/InitialState';
import { findByTestAtrr } from '../../../../helpers/test-helper';

let wrapper: any;
const mountComponent = (props) => {
	wrapper = shallow(<ProjectSummary {...props} />);
};

describe('Project Summary componenet', () => {
	const props: any = {
		project: projectInitialState.form,
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

	it('should render the company', () => {
		expect(findByTestAtrr(wrapper, 'company')).toBeDefined();
	});

    it('should render the head of project', () => {
		expect(findByTestAtrr(wrapper, 'head-of-project')).toBeDefined();
	});

});
