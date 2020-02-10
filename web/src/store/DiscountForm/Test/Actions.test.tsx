import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../rootActions';
import { initialState } from '../InitialState';
import {ActionType} from '../../Common/Types/ActionType';

const mockStore = configureStore([ thunk ]);
let reduxStore;
const setUpStore = (initialState) => {
	reduxStore = mockStore({
		discount: initialState
	});
};
describe('discount for actions', () => {
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
		reduxStore.dispatch(actions.getDiscountData('TEST'));
		expect(reduxStore.getActions()).toEqual(expectedActions);
	});
});
