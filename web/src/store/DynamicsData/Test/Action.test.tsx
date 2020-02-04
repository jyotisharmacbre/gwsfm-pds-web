import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../rootActions';
import {ActionType} from '../../Common/Types/ActionType';
import EventType from '../../../enums/EventType';
import { initialState } from '../Reducer';
import nock from 'nock';
import { baseURL } from '../../../client/client';
import { getDynamicContractSuccess, getDynamicCompanySuccess, getDynamicDivisionError, getDynamicDivisionSuccess, getDynamicContractOtherSuccess, getDynamicSubContractorError, getDynamicCompanyOtherSuccess, getDynamicSubContractorSuccess, getDynamicSubContractorOtherSuccess, getDefaultSuccess, getDynamicBusinessUnitSuccess, getDynamicBusinessUnitError, getDynamicContractListSuccess, getDynamicContractListError } from '../Action';

nock(baseURL)
  .get('/api/ERPLookup/getDivision')
  .reply(200, {data: initialState});

  nock(baseURL)
  .get('/api/ERPLookup/getSubContractors/test?topCount=50')
  .reply(200, {data: initialState});

  nock(baseURL)
  .get('/api/ERPLookup/getCompanies/test?topCount=50')
  .reply(200, {data: initialState});

  nock(baseURL)
  .get('/api/ERPLookup/getContractsAndCustomers/test?topCount=50')
  .reply(200, {data: initialState});

  nock(baseURL)
  .post('/api/ERPLookup/getContractsAndCustomersList')
  .reply(200, {data: initialState});



const mockStore = configureStore([ thunk ]);
let reduxStore;
const setUpStore = (initialState) => {
	reduxStore = mockStore({
		project: initialState
	});
};
describe('Dynamics data action tests', () => {
	beforeEach(() => {
		setUpStore(initialState);
		reduxStore.clearActions();
	});
   
	it('should dispatch the getDynamicDivisionSuccess', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getListOfDivision());
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDynamicContractListSuccess', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getContractDetailsByIds(['test']));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDynamicSubContractorData', () => {		
		const fun = jest.fn();
		setUpStore(initialState);
		actions.getDynamicSubContractorData('test', fun, fun);
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDynamicContractOtherSuccess', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getDynamicOther(initialState, 'contractorId'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDynamicCompanyOtherSuccess', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getDynamicOther(initialState, 'companyId'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDynamicSubContractorOtherSuccess', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getDynamicOther(initialState, 'subcontractorId'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDefaultSuccess', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getDynamicOther(initialState, 'anythingelse'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDynamicCompanyData', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getDynamicCompanyData('test'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch the getDynamicContractData', () => {		
		setUpStore(initialState);
		reduxStore.dispatch(actions.getDynamicCompanyData('test'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should return getDynamicContractSuccess', () => {				
		expect(getDynamicContractSuccess({data: 'test'})).toMatchSnapshot();
	});

	it('should return getDynamicContractError', () => {				
		expect(getDynamicContractSuccess({error: 'test'})).toMatchSnapshot();
	});

	
	it('should return getDynamicCompanySuccess', () => {				
		expect(getDynamicCompanySuccess({data: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicDivisionError', () => {				
		expect(getDynamicDivisionError({error: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicDivisionSuccess', () => {				
		expect(getDynamicDivisionSuccess({data: 'test'})).toMatchSnapshot();
	});

	it('should return getDynamicCompanyError', () => {				
		expect(getDynamicDivisionError({error: 'test'})).toMatchSnapshot();
	});

	it('should return getDynamicContractOtherSuccess', () => {				
		expect(getDynamicContractOtherSuccess({data: 'test'})).toMatchSnapshot();
	});

	it('should return getDynamicCompanyOtherSuccess', () => {				
		expect(getDynamicCompanyOtherSuccess({data: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicSubContractorSuccess', () => {				
		expect(getDynamicSubContractorSuccess({data: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicSubContractorError', () => {				
		expect(getDynamicSubContractorError({error: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicSubContractorOtherSuccess', () => {				
		expect(getDynamicSubContractorOtherSuccess({data: 'test'})).toMatchSnapshot();
	});
	it('should return getDefaultSuccess', () => {				
		expect(getDefaultSuccess({data: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicBusinessUnitSuccess', () => {				
		expect(getDynamicBusinessUnitSuccess({data: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicBusinessUnitError', () => {				
		expect(getDynamicBusinessUnitError({error: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicContractListSuccess', () => {				
		expect(getDynamicContractListSuccess({data: 'test'})).toMatchSnapshot();
	});
	it('should return getDynamicContractListError', () => {				
		expect(getDynamicContractListError({error: 'test'})).toMatchSnapshot();
	});
});
