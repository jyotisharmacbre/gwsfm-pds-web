import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../../../helpers/test-helper';
import ActivityFeed from '../ActivityFeed';
import IActivityFeed from '../../../../models/IActivityFeed';
import ProjectApprovalActivityType from '../../../../enums/ProjectApprovalActivityType';

let wrapper;
let props: IActivityFeed = {
	activityType: ProjectApprovalActivityType.UserQuery,
	approvedBy: 'test',
	query: 'Testing query',
	createdDate: '10/11/2019 11:44'
};
const mountComponent = (props) => {
	wrapper = shallow(<ActivityFeed {...props} />);
};

describe('Activity feed test cases', () => {
	beforeEach(() => {
		mountComponent(props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should renders the component', () => {
		expect(findByTestAtrr(wrapper, 'activity-feed-component')).toBeDefined();
	});

	it('should renders user icon if approval type is query', () => {
		expect(findByTestAtrr(wrapper, 'user-icon').length).toEqual(1);
	});
	it('should not renders approve icon if approval type is query', () => {
		expect(findByTestAtrr(wrapper, 'approved-icon').length).toEqual(0);
	});
	it('should renders the approve icon if in approval state', () => {
		props.activityType = ProjectApprovalActivityType.SystemGenerated;
		mountComponent(props);
		expect(findByTestAtrr(wrapper, 'approved-icon').length).toEqual(1);
	});
	it('should not renders the user icon if in approval state', () => {
		expect(findByTestAtrr(wrapper, 'user-icon').length).toEqual(0);
	});
	it('should renders the date in correct format', () => {
		expect(findByTestAtrr(wrapper, 'formated-date').text()).toEqual('11/10/2019 | 11:44 AM');
	});
	it('should renders the query correctly', () => {
		expect(findByTestAtrr(wrapper, 'activity-query').text()).toEqual('Testing query');
	});
});
