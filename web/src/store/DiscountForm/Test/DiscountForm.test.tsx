import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../rootActions';
import { initialState } from '../InitialState';
import {ActionType} from '../../Common/Types/ActionType';
import { ActionType as discountActionType } from '../Types/ActionType'
import discountFormReducer from '../Reducer';

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

let store = mockStore();

describe('DiscountForm reducer', () => {
	beforeEach(() => {
	  store.dispatch = jest.fn();
	})
  
	it('should handle DISCOUNT_FORM_DATA_ADD action', () => {
	  const DISCOUNT_FORM_DATA_ADD: any = {
		type: discountActionType.DISCOUNT_FORM_DATA_ADD,
		payload: {data: {id: "1"}}
	  };
	  expect(
		discountFormReducer(initialState, DISCOUNT_FORM_DATA_ADD)
	  ).toMatchSnapshot();
	});

	it('should handle DISCOUNT_FORM_DATA_EDIT action', () => {
		const DISCOUNT_FORM_DATA_EDIT: any = {
		  type: discountActionType.DISCOUNT_FORM_DATA_EDIT,
		  payload: {data: {id: "1"}}
		};
		expect(
		  discountFormReducer(initialState, DISCOUNT_FORM_DATA_EDIT)
		).toMatchSnapshot();
	  });

	  it('should handle discountFormError action', () => {
		const DISCOUNT_FORM_DATA_ERROR: any = {
		  type: discountActionType.DISCOUNT_FORM_DATA_ERROR,
		  error: "test error"
		};
		expect(
		  discountFormReducer(initialState, DISCOUNT_FORM_DATA_ERROR)
		).toMatchSnapshot();
	  });

	  it('should handle RESET_DISCOUNT_FORM_STATE action', () => {
		const RESET_DISCOUNT_FORM_STATE: any = {
		  type: discountActionType.RESET_DISCOUNT_FORM_STATE
		};
		expect(
		  discountFormReducer(initialState, RESET_DISCOUNT_FORM_STATE)
		).toMatchSnapshot();
	  });

	  it('should handle RESET_DISCOUNT_FORM_STATE_NOTIFIER action', () => {
		const RESET_DISCOUNT_FORM_STATE_NOTIFIER: any = {
		  type: discountActionType.RESET_DISCOUNT_FORM_STATE_NOTIFIER
		};
		expect(
		  discountFormReducer(initialState, RESET_DISCOUNT_FORM_STATE_NOTIFIER)
		).toMatchSnapshot();
	  });

	  it('should handle DISCOUNT_FORM_DATA_GET action', () => {
		const DISCOUNT_FORM_DATA_GET: any = {
		  type: discountActionType.DISCOUNT_FORM_DATA_GET,
		  payload: {data: {id: "1"}}
		};
		expect(
		  discountFormReducer(initialState, DISCOUNT_FORM_DATA_GET)
		).toMatchSnapshot();
	  });

	  it('should handle DISCOUNT_FORM_DATA_GET_ERROR action', () => {
		const DISCOUNT_FORM_DATA_GET_ERROR: any = {
		  type: discountActionType.DISCOUNT_FORM_DATA_GET_ERROR,
		  error: true
		};
		expect(
		  discountFormReducer(initialState, DISCOUNT_FORM_DATA_GET_ERROR)
		).toMatchSnapshot();
	  });

	  it('should handle SET_LOADING_TRUE action', () => {
		const SET_LOADING_TRUE: any = {
		  type: discountActionType.SET_LOADING_TRUE,
		  payload: {loading: true, event: 'SAVE'}
		};
		expect(
		  discountFormReducer(initialState, SET_LOADING_TRUE)
		).toMatchSnapshot();
	  });
});