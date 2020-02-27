import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import IQueryParams from '../../models/tableParameters/IQueryParams';
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

export const projectPipelineDetail = (queryParams: IQueryParams) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('api/Projects/GetAll', queryParams, { headers: headers })
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
