import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../../Dashboard';
import { pipelineInitialState, lookUpInitialState, dashboardInitialState } from './DashboardTestData';
import { findByTestAtrr } from '../../../helpers/test-helper';

const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = (lookUpInitialState, dashboardGridInitialState, pipelineGridInitialState) => {
	store = mockStore({
        lookup: lookUpInitialState,       
        userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }]},
		dashboardGrid: dashboardGridInitialState,
		pipelineGrid: pipelineGridInitialState
	});
	store.dispatch = jest.fn();
};
const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
            <Router>
				<Dashboard {...Props} />
            </Router>
			</IntlProvider>
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
		setUpStore(lookUpInitialState, dashboardInitialState, pipelineInitialState);
		mountComponent(Props);
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
	it('should render the legend and chart correctly for In Review status', () => {
		expect(wrapper.find('.inreview').length).toEqual(1);
		expect(findByTestAtrr(wrapper, 'inreview').text()).toEqual('0 (0%)');
	});
});