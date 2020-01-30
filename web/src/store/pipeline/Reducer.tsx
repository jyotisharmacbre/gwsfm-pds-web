import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectPipelineGridState } from './Types/IProjectPipelineGridState';
import moment from 'moment';
import Notify from '../../enums/Notify';

export const initialState: IProjectPipelineGridState = {
  pipelineDetails: [
    {
      projectId: '',
      name: '',
      projectOwner: '',
      contractorId: -1,
      probabilityOfWinning: 1,
      lastModified: moment().toString(),
      status: '',
      commenceDate: '',
      approxValue: 0,
      contractTypeId: 0,
      cdmNotifiable: false,
      soldMargin: '',
      weightedTCV: ''
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
