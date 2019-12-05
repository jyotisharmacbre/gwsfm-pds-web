import React from 'react';
import {ActionType} from '../Types/ActionType';
import subContractorReducer from '../Reducer';
import { initialState } from '../InitialState';
import nock from 'nock';
import { baseURL } from '../../../client/client';

  nock(baseURL)
  .post('/api/SubContractor/activities')
  .reply(200, "Sub oontractor form added successfully");

  describe('Sub Contractor Reducer', () => {
      it('should handle add sub contractor successfully', () => {
        const subContractorFormAddAction: any = {
          type: ActionType.SUB_CONTRACTOR_FORM_ADD_SUCCESS
        };
        expect(
          subContractorReducer(initialState, subContractorFormAddAction)
        ).toMatchSnapshot();
      });  

      it('should handle add new activity', () => {
        const subContractorFormAddAction: any = {
          type: ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY
        };
        expect(
          subContractorReducer(initialState, subContractorFormAddAction)
        ).toMatchSnapshot();
      });   

      it('should increment the activity by one', () => {
        const subContractorFormAddAction: any = {
          type: ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY
        };
        expect(
          subContractorReducer(initialState, subContractorFormAddAction).form.activities.length
        ).toBe(2);
      });  

      it('should delete the activity', () => {
        const action: any = {
          type: ActionType.SUB_CONTRACTOR_DELETE_ACTIVITY,
          payload: 0
        };
        expect(
          subContractorReducer(initialState, action).form.activities.length
        ).toBe(0);
      });   
});
