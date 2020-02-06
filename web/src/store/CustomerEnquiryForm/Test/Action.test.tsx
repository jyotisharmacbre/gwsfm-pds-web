import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../rootActions';
import { initialState } from '../InitialState';
import {ActionType} from '../../Common/Types/ActionType';
import EventType from '../../../enums/EventType';

const mockStore = configureStore([ thunk ]);
let reduxStore;
const setUpStore = (customerEnquiryInitialState) => {
	reduxStore = mockStore({
		project: customerEnquiryInitialState
	});
};
describe('add user redux', () => {
	beforeEach(() => {
		setUpStore(initialState);
		reduxStore.clearActions();
	});
    it('should dispatch the default action when requested projectId data exists in store', () => {
		initialState.form.projectId = 'TEST';
		setUpStore(initialState);
		const expectedActions = [
			{
				type: ActionType.DEFAULT
			}
		];
		reduxStore.dispatch(actions.getProjectDetail('TEST'));
		expect(reduxStore.getActions()).toEqual(expectedActions);
	});

	it('should dispatch the default action when requested project detail add in store', () => {
		initialState.form.projectId = 'TEST';
		setUpStore(initialState);
		reduxStore.dispatch(actions.projectDetailAdd(initialState.form, EventType.save));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch getEnquiryOverview', () => {
		reduxStore.dispatch(actions.getEnquiryOverview('1'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	
	it('should dispatch projectDetailEdit', () => {
		reduxStore.dispatch(actions.projectDetailEdit(initialState.form, EventType.save));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch resetCustomerEnquiryStateDispatch', () => {	
		reduxStore.dispatch(actions.resetCustomerEnquiryState());
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch resetProjectDetailStateToInitial', () => {	
		reduxStore.dispatch(actions.resetProjectDetailStateToInitial());
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch changeProjectStatus', () => {	
		reduxStore.dispatch(actions.changeProjectStatus(1));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});

	it('should dispatch setProjectId', () => {	
		reduxStore.dispatch(actions.setProjectId('1'));
		expect(reduxStore.getActions()).toMatchSnapshot();
	});
	it('should dispatch resetProjectDetailState', () => {	
		reduxStore.dispatch(actions.resetProjectDetailState());
		expect(reduxStore.getActions()).toMatchSnapshot();
	});
	it('should dispatch resetProjectDetailState', () => {	
		reduxStore.dispatch(actions.resetProjectDetailState());
		expect(reduxStore.getActions()).toMatchSnapshot();
	});
});
