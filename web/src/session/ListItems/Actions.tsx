import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IGetLocalesSuccessAction, IListItem, ListItemActions, IGetLocalesBeginAction, IGetCustomerContractSuccessAction, IGetCustomerContractBeginAction } from './Type';


export const getLocaleActionCreator: ActionCreator<ThunkAction<Promise<IGetLocalesSuccessAction>, IListItem[], null, IGetLocalesSuccessAction>> = () => {
    return async (dispatch: Dispatch) => {
        const getLocalesBeginAction: IGetLocalesBeginAction = {
            type: 'GetLocalesBegin',
        };

        dispatch(getLocalesBeginAction);

        //make api call here to return promise

        const locales = [
            {
                name: '--Please choose an option---', value: ''
            }
            ,
            {
                name: 'English', value: 'English'
            },
            {
                name: 'English (US)', value: 'English (US)'
            }
        ];

        const getLocalesSuccessAction: IGetLocalesSuccessAction = {
            type: 'GetLocalesSuccess',
            data: locales
        };
        return dispatch(getLocalesSuccessAction);
    }
}

export const getCustomerContractActionCreator: ActionCreator<ThunkAction<Promise<IGetCustomerContractSuccessAction>, IListItem[], null, IGetCustomerContractSuccessAction>> = (companyName: string) => {
    return async (dispatch: Dispatch) => {
        const getCustomerContractBeginAction: IGetCustomerContractBeginAction = {
            type: 'GetCustomerContractBegin',
        };

        dispatch(getCustomerContractBeginAction);

        //make api call here to return promise

        const cust_contracts = [
            {
                name: '---Please choose an option---', value: ''
            },
            {
                name: 'RS Electrical', value: 'RS Electrical'
            },
            {
                name: 'Demostics', value: 'Demostics'
            }
        ];
        

        const getCustomerContractSuccessAction: IGetCustomerContractSuccessAction = {
            type: 'GetCustomerContractSuccess',
            data: cust_contracts
        };
        return dispatch(getCustomerContractSuccessAction);
    }
}