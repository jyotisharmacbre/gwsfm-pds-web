import { CREATE } from "../actions/ProjectFormActions";

const ProjectFormReducer = (state = {}, action: any) => {
    switch (action.type) {
        case CREATE:
            //any api calls here
            //include service call
            
            var newState = Object.assign({}, action.data);
            console.log(newState);
            return {
                result: newState
            }
        default:
            return state
    }
}

export default ProjectFormReducer;