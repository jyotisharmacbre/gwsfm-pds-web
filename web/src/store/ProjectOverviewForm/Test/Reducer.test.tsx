import { ActionType } from '../Types/ActionType';
import projectOverviewFormReducer from '../Reducer';
import nock from 'nock';
import { baseURL } from '../../../client/client';
import * as testData from './Reducertestdata';
import { ProjectApproverType } from '../Types/ProjectApprovalEnums';
import { payload } from './DataWrapperTestData';

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

	const removeDate = (obj) =>{
		obj.commenceDate = 'testDate';
		obj.completionDate = 'testDate';
		obj.finalAccountDate = 'testDate';
	}

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

	it('should handle get additional details successfully and return db data directly when no intial data has been set up', () => {
		const getAdditionalDetailsAction: any = {
			type: ActionType.GET_ADDITIONALS_DETAILS_SUCCESS,
			payload: {
				projectId: testData.existingProjectId,
				projectApprovals: testData.existingProjectApprovalData,
				projectAdditionalDetail: {}
			}
		};
		let newState = projectOverviewFormReducer(testData.initialDataWithoutProjectApprovals, getAdditionalDetailsAction);
		expect(newState.form.projectApprovals[0].userId).toEqual(testData.test_emailId_1);
		expect(newState.form.projectApprovals[0].approverType).toEqual(ProjectApproverType.HOP);
		expect(newState.form.projectApprovals[0].projectId).toEqual(testData.existingProjectId);
	});

	it('should handle get additional details error data ', () => {
		const action: any = {
			type: ActionType.GET_ADDITIONALS_DETAILS_ERROR,
			error: true
		};
		expect(removeDate(projectOverviewFormReducer(testData.initialState, action))).toMatchSnapshot();
	});

	it('should reset project overview state data ', () => {
		const action: any = {
			type: ActionType.RESET_PROJECT_OVERVIEW_STATE
		};
		expect(removeDate(projectOverviewFormReducer(testData.initialState, action))).toMatchSnapshot();
	});

	it('should bind initial data ', () => {
		const action: any = {
			type: ActionType.BIND_PROJECT_APPROVAL_INITIAL_DATA,
			payload: {lookupdata : []}
		};
		expect(projectOverviewFormReducer(testData.initialState, action)).toMatchSnapshot();
	});

	it('should handle project activities success', () => {
		const action: any = {
			type: ActionType.GET_PROJECT_ACTIVITIES_SUCCESS,
			payload: testData.initialState.form
		};
		expect(projectOverviewFormReducer(testData.initialState, action)).toMatchSnapshot();
	});

	it('should handle project activities error', () => {
		const action: any = {
			type: ActionType.GET_PROJECT_ACTIVITIES_SUCCESS,
			error: true
		};
		expect(projectOverviewFormReducer(testData.initialState, action)).toMatchSnapshot();
	});

	it('should reset project overview state', () => {
		const action: any = {
			type: ActionType.RESET_PROJECT_OVERVIEW_STATE
		};
		expect(removeDate(projectOverviewFormReducer(testData.initialState, action))).toMatchSnapshot();
	});

	it('should reset project overview notifier state', () => {
		const action: any = {
			type: ActionType.RESET_PROJECT_OVERVIEW_NOTIFIER
		};
		expect(projectOverviewFormReducer(testData.initialState, action)).toMatchSnapshot();
	});

	it('should set loading true', () => {
		const action: any = {
			type: ActionType.SET_LOADING_TRUE,
			payload: { loading: true }
		};
		expect(projectOverviewFormReducer(testData.initialState, action)).toMatchSnapshot();
	});

});
