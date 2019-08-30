import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IFilterAddAction, IFilter, IGetFilterAction } from "./Type";

export const addFilterActionCreator: ActionCreator<ThunkAction<Promise<IFilterAddAction>, IFilter, null, IFilterAddAction>> = (data: IFilter) => {
    return async (dispatch: Dispatch) => {
        const getFilterAction: IGetFilterAction = {
            type: 'GetFilterAction'
        };
        dispatch(getFilterAction);

        const addFilterAddAction: IFilterAddAction = {
            type: 'FilterAddAction',
            form: data,
        };

        return dispatch(addFilterAddAction)

    }
}