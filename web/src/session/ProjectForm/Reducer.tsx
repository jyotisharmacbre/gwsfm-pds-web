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
    invalidCompany: false,
    invalidCustomerContract: false,
    invalidLocale:false,
    invalidPMExperience: false,
    invalidProjectName: false,
    invalidProjectScope: false,
    invalidProjectManager: false,
};

const projectReducer: Reducer<IProjectFormState, ProjectFormActions> = (
    state = initialState, action,
) => {
    switch (action.type) {
        case 'GetProjectFormAction':
                {
                    //return Object.assign({},state, action.form);
                    return {
                        ...state
                    }
                }
        case 'ProjectFormAddAction':
            {
                return Object.assign({},state, action.form);
                // return {
                //     ...state,
                //     form:  action.form,
                //     isFormValid: true
                // }
            }

        default:
            return state
    }
}

export default projectReducer;