import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectPipeline from '../../Pipeline';
import { initialState as lookupInitalState } from '../../../store/Lookups/Reducer';
import { initialState as pipelineInitailState } from '../../../store/pipeline/Reducer'

const mockStore = configureStore([]);
let store;
let wrapper;

lookupInitalState.currencies = [{
	currencyId: 1,
	currencyName: 'INR',
	currencySymbol: 'R',
	isActive: true
}];

lookupInitalState.countries = [{
	currencyId: 143,
	name: 'india',
	code: 'IN',
	isoAlpha2Code: "IND",
	countryId: 1
}];

const setUpStore = () => {
	store = mockStore({
		lookup: lookupInitalState,
		pipelineGrid: pipelineInitailState,
		dynamicData: [{
			contractId: 1,
			contractName: "TestName",
			customerId: 1,
			customerName: "TestName"
		}],
		userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }] }
	});
	store.dispatch = jest.fn();
};
const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<Router>
					<ProjectPipeline {...Props} />
				</Router>
			</IntlProvider>
		</Provider>
	);
};
describe('Pipline component test cases', () => {
	const Props: any = {

	};
	beforeEach(() => {
		setUpStore();
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
});