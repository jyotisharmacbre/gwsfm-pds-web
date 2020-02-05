import { ActionType } from './../Types/ActionType';
import { initialState } from '../InitialState';
import projectDetailReducer from '../Reducer';


describe('CustomerEnquiry Form reducer test cases', ()=>{

it('should handle PROJECT_ADD_ERROR ', () => {
    const PROJECT_ADD_ERROR: any = {
        type: ActionType.PROJECT_ADD_ERROR,
        payload: {error:true}
    };
    expect(projectDetailReducer(initialState, PROJECT_ADD_ERROR)).toMatchSnapshot();
});

it('should handle GET_ENQUIRY_OVERVIEW_ERROR ', () => {
    const GET_ENQUIRY_OVERVIEW_ERROR: any = {
        type: ActionType.GET_ENQUIRY_OVERVIEW_ERROR,
        payload: {error:true}
    };
    expect(projectDetailReducer(initialState, GET_ENQUIRY_OVERVIEW_ERROR)).toMatchSnapshot();
});

it('should handle GET_PROJECT_DETAIL_SUCCESS ', () => {
    const GET_PROJECT_DETAIL_SUCCESS: any = {
        type: ActionType.GET_PROJECT_DETAIL_SUCCESS,
        payload: initialState
    };
    expect(projectDetailReducer(initialState, GET_PROJECT_DETAIL_SUCCESS)).toMatchSnapshot();
});

it('should handle RESET_PROJECT_DETAIL_STATE ', () => {
    const RESET_PROJECT_DETAIL_STATE: any = {
        type: ActionType.RESET_PROJECT_DETAIL_STATE,
        payload: initialState
    };
    expect(projectDetailReducer(initialState, RESET_PROJECT_DETAIL_STATE)).toMatchSnapshot();
});

it('should handle SET_PROJECT_ID_STATE ', () => {
    const SET_PROJECT_ID_STATE: any = {
        type: ActionType.SET_PROJECT_ID_STATE,
        payload: initialState
    };
    expect(projectDetailReducer(initialState, SET_PROJECT_ID_STATE)).toMatchSnapshot();
});

it('should handle CHANGE_PROJECT_STATUS_STATE ', () => {
    const CHANGE_PROJECT_STATUS_STATE: any = {
        type: ActionType.CHANGE_PROJECT_STATUS_STATE,
        payload: initialState
    };
    expect(projectDetailReducer(initialState, CHANGE_PROJECT_STATUS_STATE)).toMatchSnapshot();
});

it('should handle RESET_PROJECT_DETAIL_STATE_TO_INITIAL ', () => {
    const RESET_PROJECT_DETAIL_STATE_TO_INITIAL: any = {
        type: ActionType.RESET_PROJECT_DETAIL_STATE_TO_INITIAL,
        payload: initialState
    };
    expect(projectDetailReducer(initialState, RESET_PROJECT_DETAIL_STATE_TO_INITIAL)).toMatchSnapshot();
});

it('should handle RESET_CUSTOMER_ENQUIRY_STATE ', () => {
    const RESET_CUSTOMER_ENQUIRY_STATE: any = {
        type: ActionType.RESET_CUSTOMER_ENQUIRY_STATE,
        payload: initialState
    };
    expect(projectDetailReducer(initialState, RESET_CUSTOMER_ENQUIRY_STATE)).toMatchSnapshot();
});

})