import { ActionType } from './../Types/ActionType';
import projectPipelineDetailReducer, { initialState } from '../Reducer';

initialState.data[0].lastModified = '';

describe('Pipeline reducer test cases', () => {

    it('should handle PROJECT_PIPELINE_GRID_DETAILS ', () => {
        const PROJECT_PIPELINE_GRID_DETAILS: any = {
            type: ActionType.PROJECT_PIPELINE_GRID_DETAILS,
            payload: initialState
        };
        expect(projectPipelineDetailReducer(initialState, PROJECT_PIPELINE_GRID_DETAILS)).toMatchSnapshot();
    });

    it('should handle PROJECT_PIPELINE_GRID_ERROR ', () => {
        const PROJECT_PIPELINE_GRID_ERROR: any = {
            type: ActionType.PROJECT_PIPELINE_GRID_ERROR,
            payload: { error: true }
        };
        expect(projectPipelineDetailReducer(initialState, PROJECT_PIPELINE_GRID_ERROR)).toMatchSnapshot();
    });
})