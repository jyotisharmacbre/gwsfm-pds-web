import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  IProjectFormAddAction,
  IProjectForm,
  IGetProjectFormAction
} from './Type';

export const addFormActionCreator: ActionCreator<
  ThunkAction<
    Promise<IProjectFormAddAction>,
    IProjectForm,
    null,
    IProjectFormAddAction
  >
> = (data: IProjectForm) => {
  return async (dispatch: Dispatch) => {
    const getProjectFormAction: IGetProjectFormAction = {
      type: 'GetProjectFormAction'
    };
    dispatch(getProjectFormAction);

    const addProjectFormAction: IProjectFormAddAction = {
      type: 'ProjectFormAddAction',
      form: data
    };

    return dispatch(addProjectFormAction);
  };
};
