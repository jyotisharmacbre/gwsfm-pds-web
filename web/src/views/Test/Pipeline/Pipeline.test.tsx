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
import * as action from '../../../store/pipeline/Action';
import * as services from '../../../services'
import { findByTestAtrr } from '../../../helpers/test-helper';
import nock from 'nock';
import { baseURL, userServiceURL } from '../../../client/client';
import { pipelineGridData, getUsersEmailData, excelPipelineData, intialLookupvalues, currenciesData, clients, emails, expectedExportExcelData } from '../../../components/Forms/Pipeline/Test/ProjectPipelineFormTestData';
import { AxiosResponse } from 'axios';
import { formatDataToExportExcel } from '../../Pipeline/PipelineExcelFormatter';
import Currency from '../../../store/Lookups/InitialState/Currency';

const mockStore = configureStore([]);
let store;
let wrapper;

nock(baseURL)
	.post('/api/Projects/Getall')
	.reply(200, pipelineGridData);

nock(userServiceURL)
	.post('/api/users/getusernamesforemailids')
	.reply(200, getUsersEmailData);

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
		userService: { userServiceData: [{ email: 'test@pds.com' }], currentUserProfile: [{ email: 'test@pds.com' }] },
		userPreferences: { notify: 0 }
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
	jest.spyOn(action, 'projectPipelineDetail');

	const Props: any = {
		location: {
			search: '?pageIndex=1&pageSize=1&sortField=test&sortOrder=asc',
			key: '1234'
		},
		projectPipelineGridDetail: jest.fn(),
		history: []
	};

	beforeEach(() => {
		setUpStore();
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
	it('should call projectPipelineGridDetail with params', () => {
		expect(action.projectPipelineDetail).toHaveBeenCalledWith({
			pagingParams: {
				pageIndex: 1,
				pageSize: 1
			},
			sortingParams: {
				sortColumnName: 'test',
				sortOrder: 'asc'
			}
		});
	});
	it('should click the export excel', () => {
		let exportToExcel = findByTestAtrr(wrapper, "export_to_excel").first();
		exportToExcel.simulate('click');
	});
	it('should format the excel data correctly', () => {
		let exportToExcel = formatDataToExportExcel(excelPipelineData, emails, clients, currenciesData, new Currency(), intialLookupvalues, "MM/DD/YYYY");
		expect(exportToExcel).toEqual(expectedExportExcelData);
	});
});