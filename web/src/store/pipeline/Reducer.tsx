import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IProjectPipelineGridState } from './Types/IProjectPipelineGridState';
import moment from 'moment';
import Notify from '../../enums/Notify';

export const initialState: IProjectPipelineGridState = {
    pipelineDetails: [
        {
            projectId: '',
            projectRefId: 0,
            name: '',
            projectOwner: '',
            headOfProject: '',
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
    error: null,
    projectChartSummary: {
        data: [],
        loading: false,
        error: null
    }
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

const getProjectChartSummarySuccess = (oldState, action) => {
    return updateObject(oldState, {
        projectChartSummary: updateObject(oldState.projectChartSummary, {
            data: action.payload,
            error: null,
            loading: false
        })
    });
};

const getProjectChartSummaryError = (oldState, action) => {
    return updateObject(oldState, {
        projectChartSummary: updateObject(oldState.projectChartSummary, {
            error: action.error,
            loading: false
        })
    });
};

const projectPipelineDetailReducer = (oldState = initialState, action) => {
    switch (action.type) {
        case ActionType.PROJECT_PIPELINE_GRID_DETAILS:
            return projectPipelineDetailSuccess(oldState, action);
        case ActionType.PROJECT_PIPELINE_GRID_ERROR:
            return projectPipeineDetailError(oldState, action);
        case ActionType.GET_PROJECT_CHART_SUMMARY_SUCCESS:
            return getProjectChartSummarySuccess(oldState, action);
        case ActionType.GET_PROJECT_CHART_SUMMARY_ERROR:
            return getProjectChartSummaryError(oldState, action);
        default:
            return oldState;
    }
};

export default projectPipelineDetailReducer;
