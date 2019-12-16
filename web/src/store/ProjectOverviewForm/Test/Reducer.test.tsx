import {ActionType} from '../Types/ActionType';
import projectOverviewFormReducer from '../Reducer';
import nock from 'nock';
import { baseURL } from '../../../client/client';
import { initialState } from './Reducertestdata';

  nock(baseURL)
  .post('/api/Projects/additionalDetails')
  .reply(200, "Project overview form added successfully");
  nock(baseURL)
  .put('/api/Projects/additionalDetails')
  .reply(200, "Project overview form updated successfully");
  nock(baseURL)
  .get('/api/Projects/4d27e2e1-843d-435a-b27c-03dca70ce232/additionalDetails')
  .reply(200, "Project overview data fetched successfully");
  nock(baseURL)
  .put('/api/Projects/4d27e2e1-843d-435a-b27c-03dca70ce232/bidlost')
  .reply(200, "Project overview status updated successfully");
  nock(baseURL)
  .put('/api/Projects/4d27e2e1-843d-435a-b27c-03dca70ce232/onHold')
  .reply(200, "Project overview status updated successfully");
  nock(baseURL)
  .put('/api/Projects/4d27e2e1-843d-435a-b27c-03dca70ce232/reactivate')
  .reply(200, "Project overview status reactivated successfully");

  describe('Project overview Reducer', () => {

      it('should handle add project overview data ', () => {
        const projectOverviewFormAddAction: any = {
          type: ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormAddAction)
        ).toMatchSnapshot();
      });  
      it('should handle error while add project overview data ', () => {
        const projectOverviewFormErrorAction: any = {
          type: ActionType.PROJECT_OVERVIEW_FORM_ERROR
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormErrorAction)
        ).toMatchSnapshot();
      });  
      it('should handle edit  project overview data ', () => {
        const projectOverviewFormEditAction: any = {
          type: ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormEditAction)
        ).toMatchSnapshot();
      }); 
      it('should handle on hold project status change event ', () => {
        const projectOverviewFormOnHoldAction: any = {
          type: ActionType.CHANGE_PROJECT_STATUS_TO_ON_HOLD_SUCCESS
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormOnHoldAction)
        ).toMatchSnapshot();
      }); 
      it('should handle on hold error during change of project status ', () => {
        const projectOverviewFormOnHoldErrorAction: any = {
          type: ActionType.CHANGE_PROJECT_STATUS_TO_ON_HOLD_ERROR
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormOnHoldErrorAction)
        ).toMatchSnapshot();
      }); 
      it('should handle bid lost project status change event ', () => {
        const projectOverviewFormBidLostAction: any = {
          type: ActionType.CHANGE_PROJECT_STATUS_TO_BID_LOST_SUCCESS
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormBidLostAction)
        ).toMatchSnapshot();
      }); 
      it('should handle bid lost error during change of project status ', () => {
        const projectOverviewFormBidLostErrorAction: any = {
          type: ActionType.CHANGE_PROJECT_STATUS_TO_ON_HOLD_ERROR
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormBidLostErrorAction)
        ).toMatchSnapshot();
      }); 
      it('should handle reactivate project event ', () => {
        const projectOverviewFormReactivateAction: any = {
          type: ActionType.REACTIVATE_PROJECT_SUCCESS
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormReactivateAction)
        ).toMatchSnapshot();
      }); 
      it('should handle reactivate error event ', () => {
        const projectOverviewFormReactivateErrorAction: any = {
          type: ActionType.REACTIVATE_PROJECT_ERROR
        };
        expect(
            projectOverviewFormReducer(initialState, projectOverviewFormReactivateErrorAction)
        ).toMatchSnapshot();
      });
   
});
