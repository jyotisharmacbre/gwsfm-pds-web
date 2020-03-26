import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { findByTestAtrr } from '../../../helpers/test-helper';
import * as context from '../../../hooks/useConfigContext';
import IConfig from '../../../models/IConfig';
import ConnectedIntlProvider from '../../../Translations/connectedIntlProvider';
import Dashboard from '../../Dashboard';
import { dashboardInitialState, lookUpInitialState, pipelineInitialState } from './DashboardTestData';

const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = (lookUpInitialState, dashboardGridInitialState, pipelineGridInitialState, languageName) => {
	store = mockStore({
		lookup: lookUpInitialState,
		userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }] },
		dashboardGrid: dashboardGridInitialState,
		pipelineGrid: pipelineGridInitialState,
		userPreferences: { preferences: { languageName: languageName } }
	});
	store.dispatch = jest.fn();
};
const mountComponent = (Props, store) => {
	wrapper = mount(
		<Provider store={store}>
			<ConnectedIntlProvider>
				<Router>
					<Dashboard {...Props} />
				</Router>
			</ConnectedIntlProvider>
		</Provider>
	);
};
describe('Dashboard component test cases', () => {
	const Props: any = {
		dashboardGridDetail: jest.fn(),
		getLookups: jest.fn(),
		handleGetUserNamesForEmails: jest.fn(),
		resetDashboardState: jest.fn(),
		resetProjectOverviewState: jest.fn(),
		resetSubContractorState: jest.fn(),
		resetCustomerEnquiryState: jest.fn(),
		resetPreliminaryState: jest.fn(),
		getCurrentUserProfile: jest.fn()

	};
	beforeEach(() => {
		setUpStore(lookUpInitialState, dashboardInitialState, pipelineInitialState, 'en');
		mountComponent(Props, store);
	});
	describe('should format the date with the format given corresponding to locale given', () => {
		let localeList =
			[{ locale: 'en', dateFormat: "D-MMM-YYYY", date: '13-Feb-2020', expectedResult: true },
			{ locale: 'fr', dateFormat: "D-MMM-YYYY", date: '13-févr.-2020', expectedResult: true }];

		localeList.forEach(localeItem => {
			it(`should have result ${localeItem.date} for locale ${localeItem.locale}`, () => {
				var configs = {} as IConfig;
				configs.REACT_APP_DATE_FORMAT = localeItem.dateFormat;
				jest.spyOn(context, "default").mockImplementationOnce(() => {
					return configs;
				});
				setUpStore(lookUpInitialState, dashboardInitialState, pipelineInitialState, localeItem.locale);
				mountComponent(Props, store);
				var isDateAsPerGivenLocale = wrapper.find('.home_screen_table td[data-column="Date"] span')
					.props('value').children.some(x => x === localeItem.date);
				expect(isDateAsPerGivenLocale).toEqual(true);
			})
		})
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
	it('should render the legend and chart correctly for initialcustomerinquiry status', () => {
		expect(wrapper.find('.initialcustomerinquiry').length).toEqual(1);
		expect(findByTestAtrr(wrapper, 'initialcustomerinquiry').text()).toEqual('30 (30%)');
	});
	it('should render the legend and chart correctly for Bid Lost status', () => {
		expect(wrapper.find('.bidlost').length).toEqual(1);
		expect(findByTestAtrr(wrapper, 'bidlost').text()).toEqual('70 (70%)');
	});
	it(' should render the legend and chart correctly for In Review status', () => {
		expect(wrapper.find('.inreview').length).toEqual(1);
		expect(findByTestAtrr(wrapper, 'inreview').text()).toEqual('0 (0%)');
	});
	it('should render the total No. of Projects on dashboard chart', () => {
		var totalNoOfProjectOnChart = findByTestAtrr(wrapper, 'totalNoOfProjectOnChart');
		expect(totalNoOfProjectOnChart.text()).toEqual('100');
	});

});