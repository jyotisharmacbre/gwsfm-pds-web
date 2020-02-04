import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
/* istanbul ignore next */
const projectPipelineDetailSuccess = (response: any) => {
  return {
    type: ActionType.PROJECT_PIPELINE_GRID_DETAILS,
    payload: response
  };
};
/* istanbul ignore next */
const projectPipeineDetailError = (error: string) => {
  return {
    type: ActionType.PROJECT_PIPELINE_GRID_ERROR,
    payload: error
  };
};

const headers = {
  'Content-Type': 'application/json'
};

export const projectPipelineDetail = () => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('api/Projects/GetAll', { headers: headers })
      .then(response => {
        /* istanbul ignore next */
        dispatch(projectPipelineDetailSuccess(response.data));
      })
      .catch(error => {
        /* istanbul ignore next */
        dispatch(projectPipeineDetailError(error));
      });
  };
};
