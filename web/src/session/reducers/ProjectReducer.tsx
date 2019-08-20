import { CREATE_PROJECT } from "../actions/ProjectFormActions";

const ProjectFormReducer = (state = {}, action: any) => {
    switch (action.type) {
        case CREATE_PROJECT:
            var newState = Object.assign(state, action.data);
            console.log(newState);
            return {
                result: newState
            }
        default:
            return state
    }
}

export default ProjectFormReducer;