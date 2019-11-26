import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';

const projectPipelineDetailSuccess = (response: any) => {
  return {
    type: ActionType.PROJECT_PIPELINE_GRID_DETAILS,
    payload: response
  };
};

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
  console.log('fetching pipeline data');
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('api/Projects/GetAll', { headers: headers })
      .then(response => {
        dispatch(projectPipelineDetailSuccess(response.data));
      })
      .catch(error => {
        dispatch(projectPipeineDetailError(error));
      });
  };
};
