import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../Reducer';
import nock from 'nock';
import { baseURL } from '../../../client/client';
import { projectPipelineDetail } from '../Action';
import IQueryParams from '../../../models/tableQueryParams/IQueryParams';
nock(baseURL)
	.get('/api/Projects/GetAll')
	.reply(200, { data: initialState });



const mockStore = configureStore([thunk]);
let reduxStore;
const setUpStore = (initialState) => {
	reduxStore = mockStore({
		project: initialState
	});
};
describe('Pipeline action tests', () => {
	beforeEach(() => {
		setUpStore(initialState);
		reduxStore.clearActions();
	});

	it('should dispatch the projectPipelineDetail', () => {
		setUpStore(initialState);
		let queryParams = {} as IQueryParams;
		reduxStore.dispatch(projectPipelineDetail(queryParams));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});
});
