import React from 'react';
import { ActionType } from '../Types/ActionType';
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

  it('should handle edit sub contractor successfully', () => {
    const action: any = {
      type: ActionType.SUB_CONTRACTOR_FORM_EDIT_SUCCESS,
      payload: { data: {} }
    };
    expect(
      subContractorReducer(initialState, action)
    ).toMatchSnapshot();
  });

  it('should handle sub contractor error successfully', () => {
    const action: any = {
      type: ActionType.SUB_CONTRACTOR_FORM_ERROR,
      error: true
    };
    expect(
      subContractorReducer(initialState, action)
    ).toMatchSnapshot();
  });

  it('should handle get sub contractor successfully', () => {
    const action: any = {
      type: ActionType.GET_SUB_CONTRACTOR_SUCCESS,
      payload: { data: {} }
    };
    expect(
      subContractorReducer(initialState, action)
    ).toMatchSnapshot();
  });

  it('should handle get sub contractor error successfully', () => {
    const action: any = {
      type: ActionType.GET_SUB_CONTRACTOR_ERROR,
      error: true
    };
    expect(
      subContractorReducer(initialState, action)
    ).toMatchSnapshot();
  });

  it('should handle reset sub contractor state successfully', () => {
    const action: any = {
      type: ActionType.RESET_SUB_CONTRACTOR_STATE
    };
    expect(
      subContractorReducer(initialState, action)
    ).toMatchSnapshot();
  });

  it('should handle reset sub contractor notifier successfully', () => {
    const action: any = {
      type: ActionType.RESET_SUB_CONTRACTOR_NOTIFIER
    };
    expect(
      subContractorReducer(initialState, action)
    ).toMatchSnapshot();
  });

  it('should handle loading successfully', () => {
    const action: any = {
      type: ActionType.SET_LOADING_TRUE,
      payload: { loading: true }
    };
    expect(
      subContractorReducer(initialState, action)
    ).toMatchSnapshot();
  });
});
