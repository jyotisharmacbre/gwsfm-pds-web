import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ActivityFeedList from '../ActivityFeedList';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import { lookUpInitialState } from './ActivityFeedListTestData';
import { initialState as projectOverviewState } from '../../../../store/ProjectOverviewForm/InitialState';

const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = (projectOverviewState, lookUpInitialState) => {
	store = mockStore({
		projectOverview: projectOverviewState,
		lookup: lookUpInitialState,
		userService: []
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
		setUpStore(projectOverviewState, lookUpInitialState);
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});