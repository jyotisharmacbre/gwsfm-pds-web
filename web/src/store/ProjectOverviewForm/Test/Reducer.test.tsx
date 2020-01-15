import { ActionType } from '../Types/ActionType';
import projectOverviewFormReducer from '../Reducer';
import nock from 'nock';
import { baseURL } from '../../../client/client';
import * as testData from './Reducertestdata';
import { ProjectApproverType } from '../Types/ProjectApprovalEnums';

nock(baseURL).post('/api/Projects/additionalDetails').reply(200, 'Project overview form added successfully');
nock(baseURL).put('/api/Projects/additionalDetails').reply(200, 'Project overview form updated successfully');
nock(baseURL)
	.get('/api/Projects/4d27e2e1-843d-435a-b27c-03dca70ce232/additionalDetails')
	.reply(200, 'Project overview data fetched successfully');
nock(baseURL)
	.put('/api/Workflow/4d27e2e1-843d-435a-b27c-03dca70ce232/bidlost')
	.reply(200, 'Project overview status updated successfully');
nock(baseURL)
	.put('/api/Workflow/4d27e2e1-843d-435a-b27c-03dca70ce232/onHold')
	.reply(200, 'Project overview status updated successfully');
nock(baseURL)
	.put('/api/Workflow/4d27e2e1-843d-435a-b27c-03dca70ce232/reactivate')
	.reply(200, 'Project overview status reactivated successfully');

describe('Project overview Reducer', () => {
	it('should handle add project overview data ', () => {
		const projectOverviewFormAddAction: any = {
			type: ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS,
			payload: testData.initialState.form
		};
		expect(projectOverviewFormReducer(testData.initialState, projectOverviewFormAddAction)).toMatchSnapshot();
	});
	it('should handle error while add project overview data ', () => {
		const projectOverviewFormErrorAction: any = {
			type: ActionType.PROJECT_OVERVIEW_FORM_ERROR
		};
		expect(projectOverviewFormReducer(testData.initialState, projectOverviewFormErrorAction)).toMatchSnapshot();
	});
	it('should handle edit  project overview data ', () => {
		const projectOverviewFormEditAction: any = {
			type: ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS,
			payload: testData.initialState.form
		};
		expect(projectOverviewFormReducer(testData.initialState, projectOverviewFormEditAction)).toMatchSnapshot();
	});

	it('should handle get additional details successfully and sync InitialData with db data', () => {
		const getAdditionalDetailsAction: any = {
			type: ActionType.GET_ADDITIONALS_DETAILS_SUCCESS,
			payload: {
				projectId: testData.existingProjectId,
				projectApprovals: testData.existingProjectApprovalData,
				projectAdditionalDetail: {}
			}
		};
		let newState = projectOverviewFormReducer(testData.initialState, getAdditionalDetailsAction);
		expect(newState.form.projectApprovals[0].userId).toEqual(testData.test_emailId_1);
		expect(newState.form.projectApprovals[0].approverType).toEqual(ProjectApproverType.HOP);
		expect(newState.form.projectApprovals[0].projectId).toEqual(testData.existingProjectId);
	});
});
