import { CREATE_PROJECT, PROJECTFORM_ADD } from "../actions/ProjectFormActions";
import { IProjectFormState } from "../../props/AppProps";

const initialState: IProjectFormState = {
    company: 'CBRE Managed Services',
    customer_contract: 'RS Electrical',
    pmexperience: true,
    locale: 'English',
    projectscope: '',
    projectmanager: '',
    projectname: ''
} ;

const ProjectFormReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_PROJECT:
            var newState = Object.assign(state, action.data);
            return newState;
        case PROJECTFORM_ADD:
            return  {...state,  [action.data.name] : action.data.data};
        default:
            return state
    }
}

export default ProjectFormReducer;