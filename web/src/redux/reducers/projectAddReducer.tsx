import { PROJECT_ADD, PROJECT_ADD_ERROR } from '../actionTypes/projectTypes';
import { ProjectState, ProjectTypes } from '../actions/projectFrom/project.d';

const INITIAL_STATE: ProjectState = {
  data: [],
  status: ''
};

function projectAddReducer(
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
    case PROJECT_ADD_ERROR: {
      return {
        status: 'failed',
        data: [action.payload]
      };
    }
    default:
      return state;
  }
}

export default projectAddReducer;
