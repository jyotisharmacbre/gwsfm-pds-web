import { PROJECT_ADD } from '../actionTypes/projectTypes';
import { ProjectState, ProjectTypes } from '../actions/projectFrom/project.d';

const INITIAL_STATE: ProjectState = {
  data: []
};

function userReducer(
  state = INITIAL_STATE,
  action: ProjectTypes
): ProjectState {
  switch (action.type) {
    case PROJECT_ADD: {
      return {
        ...state,
        data: [action.payload, ...state.data]
      };
    }
    default:
      return state;
  }
}

export default userReducer;
