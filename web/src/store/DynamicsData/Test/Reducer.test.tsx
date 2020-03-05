import { ActionType } from './../Types/ActionType';
import dynamicDataReducer, { initialState } from '../Reducer';

describe('Dynamic data reducer test cases', ()=>{

it('should handle DYNAMIC_CONTRACT_DATA_GET_SUCCESS ', () => {
    const DYNAMIC_CONTRACT_DATA_GET_SUCCESS: any = {
        type: ActionType.DYNAMIC_CONTRACT_DATA_GET_SUCCESS,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_CONTRACT_DATA_GET_SUCCESS)).toMatchSnapshot();
});

it('should handle DYNAMIC_CONTRACT_DATA_GET_SUCCESS ', () => {
    const DYNAMIC_CONTRACT_DATA_GET_ERROR: any = {
        type: ActionType.DYNAMIC_CONTRACT_DATA_GET_ERROR,
        payload: {error: true}
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_CONTRACT_DATA_GET_ERROR)).toMatchSnapshot();
});

it('should handle DYNAMIC_CONTRACT_DATA_GET_SUCCESS ', () => {
    const DYNAMIC_COMPANY_DATA_GET_SUCCESS: any = {
        type: ActionType.DYNAMIC_COMPANY_DATA_GET_SUCCESS,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_COMPANY_DATA_GET_SUCCESS)).toMatchSnapshot();
});

it('should handle DYNAMIC_COMPANY_DATA_GET_ERROR ', () => {
    const DYNAMIC_COMPANY_DATA_GET_ERROR: any = {
        type: ActionType.DYNAMIC_COMPANY_DATA_GET_ERROR,
        payload: {error: true}
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_COMPANY_DATA_GET_ERROR)).toMatchSnapshot();
});

it('should handle DYNAMIC_OTHER_CONTRACT_SUCCESS ', () => {
    const DYNAMIC_OTHER_CONTRACT_SUCCESS: any = {
        type: ActionType.DYNAMIC_OTHER_CONTRACT_SUCCESS,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_OTHER_CONTRACT_SUCCESS)).toMatchSnapshot();
});

it('should handle DYNAMIC_OTHER_COMPANY_SUCCESS ', () => {
    const DYNAMIC_OTHER_COMPANY_SUCCESS: any = {
        type: ActionType.DYNAMIC_OTHER_COMPANY_SUCCESS,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_OTHER_COMPANY_SUCCESS)).toMatchSnapshot();
});

it('should handle DYNAMIC_SUB_CONTRACTOR_DATA_GET_SUCCESS ', () => {
    const DYNAMIC_SUB_CONTRACTOR_DATA_GET_SUCCESS: any = {
        type: ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_SUCCESS,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_SUB_CONTRACTOR_DATA_GET_SUCCESS)).toMatchSnapshot();
});

it('should handle DYNAMIC_SUB_CONTRACTOR_DATA_GET_ERROR ', () => {
    const DYNAMIC_SUB_CONTRACTOR_DATA_GET_ERROR: any = {
        type: ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_ERROR,
        payload: {error:true}
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_SUB_CONTRACTOR_DATA_GET_ERROR)).toMatchSnapshot();
});

it('should handle DYNAMIC_OTHER_SUB_CONTRACTOR_SUCCESS ', () => {
    const DYNAMIC_OTHER_SUB_CONTRACTOR_SUCCESS: any = {
        type: ActionType.DYNAMIC_OTHER_SUB_CONTRACTOR_SUCCESS,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_OTHER_SUB_CONTRACTOR_SUCCESS)).toMatchSnapshot();
});

it('should handle DYNAMIC_DIVISION_DATA_GET_SUCCESS ', () => {
    const DYNAMIC_DIVISION_DATA_GET_SUCCESS: any = {
        type: ActionType.DYNAMIC_DIVISION_DATA_GET_SUCCESS,
        payload: initialState.dynamicsListOfDivision
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_DIVISION_DATA_GET_SUCCESS)).toMatchSnapshot();
});

it('should handle DYNAMIC_DIVISION_DATA_GET_ERROR ', () => {
    const DYNAMIC_DIVISION_DATA_GET_ERROR: any = {
        type: ActionType.DYNAMIC_DIVISION_DATA_GET_ERROR,
        payload: {error: true}
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_DIVISION_DATA_GET_ERROR)).toMatchSnapshot();
});

it('should handle DYNAMIC_BUSINESSUNIT_SUCCESS ', () => {
    const DYNAMIC_BUSINESSUNIT_SUCCESS: any = {
        type: ActionType.DYNAMIC_BUSINESSUNIT_SUCCESS,
        payload: initialState.dynamicsListOfBusinessUnits
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_BUSINESSUNIT_SUCCESS)).toMatchSnapshot();
}); 

it('should handle DYNAMIC_BUSINESSUNIT_ERROR ', () => {
    const DYNAMIC_BUSINESSUNIT_ERROR: any = {
        type: ActionType.DYNAMIC_BUSINESSUNIT_ERROR,
        payload: {error: true}
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_BUSINESSUNIT_ERROR)).toMatchSnapshot();
}); 

it('should handle DYNAMIC_CONTRACTLIST_SUCCESS ', () => {
    const DYNAMIC_CONTRACTLIST_SUCCESS: any = {
        type: ActionType.DYNAMIC_CONTRACTLIST_SUCCESS,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_CONTRACTLIST_SUCCESS)).toMatchSnapshot();
}); 

it('should handle DYNAMIC_CONTRACTLIST_ERROR ', () => {
    const DYNAMIC_CONTRACTLIST_ERROR: any = {
        type: ActionType.DYNAMIC_CONTRACTLIST_ERROR,
        payload: initialState
    };
    expect(dynamicDataReducer(initialState, DYNAMIC_CONTRACTLIST_ERROR)).toMatchSnapshot();
}); 

})