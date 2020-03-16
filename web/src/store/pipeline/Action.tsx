import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import IProjectChartSummary from '../../models/IProjectChartSummary';
import IQueryParams from '../../models/tableQueryParams/IQueryParams';
import EventType from '../../enums/EventType';
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

/* istanbul ignore next */
const getProjectChartSummarySuccess = (response: Array<IProjectChartSummary>) => {
  return {
    type: ActionType.GET_PROJECT_CHART_SUMMARY_SUCCESS,
    payload: response
  };
};
/* istanbul ignore next */
const getProjectChartSummaryError = (error: string) => {
  return {
    type: ActionType.GET_PROJECT_CHART_SUMMARY_ERROR,
    payload: error
  };
};

const setloadingTrue = () => {
  return {
    type: ActionType.SET_LOADING_TRUE,
  };
};

const headers = {
  'Content-Type': 'application/json'
};

export const projectPipelineDetail = (queryParams: IQueryParams) => {
  return (dispatch: Dispatch) => {
    dispatch(setloadingTrue());
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

export const getProjectChartSummary = () => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('api/Projects/GetProjectChartSummary', { headers: headers })
      .then(response => {
        /* istanbul ignore next */
        dispatch(getProjectChartSummarySuccess(response.data));
      })
      .catch(error => {
        /* istanbul ignore next */
        dispatch(getProjectChartSummaryError(error));
      });
  };
};
