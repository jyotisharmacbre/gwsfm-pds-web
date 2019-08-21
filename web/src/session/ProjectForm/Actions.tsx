import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IProjectFormAddAction, IProjectForm, IGetProjectFormAction } from "./Type";
import {Validator} from "class-validator";

// Validation methods
const validator = new Validator();

export const addFormActionCreator: ActionCreator<ThunkAction<Promise<IProjectFormAddAction>, IProjectForm, null, IProjectFormAddAction>> = (data: IProjectForm) => {
    return async (dispatch: Dispatch) => {
        const getProjectFormAction: IGetProjectFormAction = {
            type: 'GetProjectFormAction'
        };
        dispatch(getProjectFormAction);

        const addProjectFormAction: IProjectFormAddAction = {
            type: 'ProjectFormAddAction',
            form: data,
            isCompanyValid: !validator.isEmpty(data.company),
            isLocaleValid: !validator.isEmpty(data.locale),
            isProjectManagerValid: !validator.isEmail(data.projectmanager),
            isProjectNameValid: !validator.isEmpty(data.projectname),
            isProjectScopeValid:!validator.isEmpty(data.projectscope)
        };

        return dispatch(addProjectFormAction)

    }
}