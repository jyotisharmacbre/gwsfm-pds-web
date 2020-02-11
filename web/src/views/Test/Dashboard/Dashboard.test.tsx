import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import EventType from '../../../enums/EventType';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {
	lookUpInitialState,
	customerEnquiryInitialState,
	dynamicsInitialState
} from '../Preliminaries/PreliminariesTestData';
import Notify from '../../../enums/Notify';
import { initialState as subcontractorInitialState } from '../../../store/SubContractor/InitialState';
import { initialState as preliminaryInitialState } from '../../../store/Preliminaries/InitialState';
import ProjectStatus from '../../../enums/ProjectStatus';
import Dashboard from '../../Dashboard';
import { initialState } from '../../../store/Dashboard/Reducer';

const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = (lookUpInitialState, dashboardGridInitialState) => {
	store = mockStore({
        lookup: lookUpInitialState,       
        userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }]},
        dashboardGrid: dashboardGridInitialState
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
        initialState.actionApprovalDetails = [
            {name: 'string',
            modifiedBy: 'test@pds.com',
            modifiedOn: 'string',
            approvalStatus: 1,
            projectId: 'string'
        }
        ]
		setUpStore(lookUpInitialState, initialState);
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
});