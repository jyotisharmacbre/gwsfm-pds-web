import { ListItemActions } from "./Type";
import { IListState } from "../state";
import { Reducer } from "redux";

const initialState: IListState = {
    locales: [{ name: '--Please choose an option---', value: '' }],
    customerContract: [{ name: '--Please choose an option---', value: '' }],
    error: ''
};

const listItemReducer: Reducer<IListState, ListItemActions> = (
    state = initialState, action,
) => {
    switch (action.type) {
        case 'GetLocalesBegin':
            return { ...state }
        case 'GetLocalesSuccess':
            return Object.assign({}, state, { locales: action.data });
        case 'GetLocalesFailure':
            return { ...state, error: action.error };
        case 'GetCustomerContractBegin':
            return { ...state }
        case 'GetCustomerContractSuccess':
            return Object.assign({}, state, { customerContract: action.data });
        case 'GetCustomerContractFailure':
            return { ...state, error: action.error };
        default:
            return state
    }
}

export default listItemReducer;