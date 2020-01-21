import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ActivityFeedList from '../ActivityFeedList';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import { lookUpInitialState, ApprovalFeedList } from './ActivityFeedListTestData';
import { initialState as projectOverviewState } from '../../../../store/ProjectOverviewForm/InitialState';

const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = (projectOverviewState, lookUpInitialState, ApprovalFeedList) => {
	store = mockStore({
		projectOverview: projectOverviewState,
		lookup: lookUpInitialState,
		userService: [],
		projectActivities: ApprovalFeedList
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
describe('ActivityFeed list test cases', () => {
	const Props = {
		currencySymbol: '$'
	};
	beforeEach(() => {
		setUpStore(projectOverviewState, lookUpInitialState, ApprovalFeedList);
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should fill the activity list', () => {
		let states = store.getState()
		expect(states.projectActivities).toHaveLength(2);
	});
	it('should fill the activity list in sorted order based on modified date', () => {
		let states = store.getState();
		const sortByKey = key => (a, b) => a[key] < b[key] ? 1 : -1;
		let sortedFeed = states.projectActivities.slice().sort(sortByKey('createdOn'));
		expect(sortedFeed[0].projectActivityId).toEqual("2");
	});
});
