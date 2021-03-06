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
pipelineInitailState.data[0].projectId = '123'
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
	const Props: any = {
		location: {
			search: '?pageIndex=1&pageSize=1&sortField=test&sortOrder=asc',
			key: '1234'
		},
		projectPipelineGridDetail: jest.fn(),
		history: []
	};
	beforeEach(() => {
		jest.spyOn(action, 'projectPipelineDetail');
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('defines the component', () => {
		setUpStore();
		mountComponent(Props);
		expect(wrapper).toBeDefined();
	});
	it('should call projectPipelineGridDetail with params when directly hit the pipeline url', () => {
		const props: any = {
			location: {
				search: '/pipeline',
			},
			projectPipelineGridDetail: jest.fn(),
			history: []
		};
		setUpStore();
		mountComponent(props);
		expect(action.projectPipelineDetail).toHaveBeenCalled();
	});
	it('should call projectPipelineGridDetail with params', () => {
		setUpStore();
		mountComponent(Props);
		expect(action.projectPipelineDetail).toHaveBeenCalledWith({
			pagingParams: {
				pageIndex: 1,
				pageSize: 1
			},
			sortingParams: {
				sortColumnName: 'test',
				sortOrder: 'asc'
			},
			filterParams: []
		});
	});
	it('should click the export excel', () => {
		setUpStore();
		mountComponent(Props);
		let exportToExcel = findByTestAtrr(wrapper, "export_to_excel").first();
		exportToExcel.simulate('click');
	});
	it('should format the excel data correctly', () => {
		setUpStore();
		mountComponent(Props);
		let exportToExcel = formatDataToExportExcel(excelPipelineData, emails, clients, currenciesData, new Currency(), intialLookupvalues, "MM/DD/YYYY");
		expect(exportToExcel).toEqual(expectedExportExcelData);
	});
	it('should call the projectPipelineGridDetail only twice when we apply filter and page index eqauls 1 initially', () => {
		setUpStore();
		mountComponent(Props);

		let fieldProjectName = wrapper.find(`input[name="projectName"]`);
		const eventProjectName = { target: { value: "TestProject" } };
		fieldProjectName.simulate("change", eventProjectName);

		const applyFilterButton = findByTestAtrr(wrapper, 'apply');
		applyFilterButton.simulate('click');

		expect(action.projectPipelineDetail).toHaveBeenCalledTimes(2);
	});
	it('should change page index to 1 when page index not eqauls to 1 initially and filter is applied', () => {
		const Props: any = {
			location: {
				search: '?pageIndex=3&pageSize=1&sortField=test&sortOrder=asc',
				key: '1234'
			},
			projectPipelineGridDetail: jest.fn(),
			history: []
		};

		setUpStore();
		mountComponent(Props);

		let fieldProjectName = wrapper.find(`input[name="projectName"]`);
		const eventProjectName = { target: { value: "TestProject" } };
		fieldProjectName.simulate("change", eventProjectName);

		const applyFilterButton = findByTestAtrr(wrapper, 'apply');
		applyFilterButton.simulate('click');

		expect(Props.history[0].search).toEqual('?pageIndex=1&pageSize=1&sortField=test&sortOrder=asc');

	});

});