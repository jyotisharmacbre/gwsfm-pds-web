import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectPipelineGridState } from './Types/IProjectPipelineGridState';
import moment from 'moment';
import Notify from '../../enums/Notify';

const initialState: IProjectPipelineGridState = {
  pipelineDetails: [
    {
      projectId: 'string',
      name: 'string',
      projectOwner: 'string',
      contractorId: 1,
      probabilityOfWinning: 1,
      lastModified: moment().toString(),
      status: 'string',
      commenceDate: 'string',
      approxValue: 0,
      contractTypeId: 0,
      cdmNotifiable: false,
      soldMargin: 'string',
      weightedTCV: 'string',
      rank: 'string'
    }
  ],
  error: null
};

const projectPipelineDetailSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    loading: false,
    pipelineDetails: action.payload
  });
};

const projectPipeineDetailError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.error,
    loading: false,
    notify: Notify.error
  });
};

const projectPipelineDetailReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PROJECT_PIPELINE_GRID_DETAILS:
      return projectPipelineDetailSuccess(oldState, action);
    case ActionType.PROJECT_PIPELINE_GRID_ERROR:
      return projectPipeineDetailError(oldState, action);
    default:
      return oldState;
  }
};

export default projectPipelineDetailReducer;
