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
});
