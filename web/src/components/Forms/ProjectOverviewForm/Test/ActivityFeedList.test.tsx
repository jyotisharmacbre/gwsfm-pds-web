import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ActivityFeedList from '../ActivityFeedList';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import { lookUpInitialState, initialStatePO, InitialEmailsForUsersState } from './ActivityFeedListTestData';
import { getProjectActivities } from '../../../../store/rootActions';
const mockStore = configureStore([]);
let store;
let wrapper;
const setUpStore = (ProjectOverview, lookups, usernamesemails) => {
	store = mockStore({
		projectOverview: ProjectOverview,
		lookup: lookups,
		userService: usernamesemails
	});
};
const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<ActivityFeedList {...Props} />
			</IntlProvider>
		</Provider>
	);
};
const realUseState = React.useState;
describe('ActivityFeed list test cases', () => {
	const Props = {
		currencySymbol: '$',
		handleGetUserNamesForEmails: jest.fn()
	};
	beforeEach(() => {
		setUpStore(initialStatePO, lookUpInitialState, InitialEmailsForUsersState);
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should fill activityfeed grid with 2 rows', () => {
		const section = findByTestAtrr(wrapper, 'activityFeedSection').first();
		expect(section.find('.feed-block-content')).toHaveLength(2);
	});
	it('should sort the activityfeed before rendering', () => {
		const section = findByTestAtrr(wrapper, 'activityFeedSection').first();
		expect(section.find('.feed-block-content').first().find('span').first().text()).toEqual('User2');
	});
});