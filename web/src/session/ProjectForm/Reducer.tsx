import { IProjectFormState } from "../../props/AppProps";
import { ProjectFormActions } from "./Type";
import { Reducer } from "redux";

const initialState: IProjectFormState = {
    company: 'CBRE Managed Services',
    customer_contract: 'RS Electrical',
    pmexperience: true,
    locale: 'English',
    projectscope: '',
    projectmanager: '',
    projectname: '',
    isCompanyValid: false,
    isLocaleValid: false,
    isProjectManagerValid: false,
    isProjectNameValid:  false,
    isProjectScopeValid: false
};

const projectReducer: Reducer<IProjectFormState, ProjectFormActions> = (
    state = initialState, action,
) => {
    switch (action.type) {
        case 'ProjectFormAddAction':
            {
                return Object.assign({}, state, action);
            }

        default:
            return state
    }
}

export default projectReducer;