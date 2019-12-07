import {ActionType} from '../Types/ActionType';
import preliminaryReducer from '../Reducer';
import { initialState } from '../InitialState';
import {lookupData} from "./ReducerTestData";
import nock from 'nock';
import { baseURL } from '../../../client/client';

nock(baseURL)
.get('/api/Preliminaries/4d27e2e1-843d-435a-b27c-03dca70ce232/preliminaryDetails')
.reply(200, "Preliminary data fetched successfully");

nock(baseURL)
.put('/api/Preliminaries/preliminaryDetails')
.reply(200, "Preliminary data update successfully");

nock(baseURL)
.post('/api/Preliminaries/preliminaryDetails')
.reply(200, "Preliminary data saved successfully");

describe('preliminaryReducer Reducer', () => {
 
  it('should fetch preliminary data', () => {
    const getLookupDataAction: any = {
      type: ActionType.GET_PRELIMINARY_SUCCESS
    };
    expect(
        preliminaryReducer(initialState, getLookupDataAction)
    ).toMatchSnapshot();
  });
  it('should populate error.If get fails', () => {
    const dataAction: any = {
      type: ActionType.GET_PRELIMINARY_ERROR
    };
    expect(
        preliminaryReducer(initialState, dataAction)
    ).toMatchSnapshot();
  });
    it('should update preliminary data', () => {
      const dataAction: any = {
        type: ActionType.PRELIMINARY_EDIT_SUCCESS
      };
      expect(
          preliminaryReducer(initialState, dataAction)
      ).toMatchSnapshot();
    });
    it('should populate error.If update fails', () => {
      const dataAction: any = {
        type: ActionType.PRELIMINARY_EDIT_ERROR
      };
      expect(
          preliminaryReducer(initialState, dataAction)
      ).toMatchSnapshot();
    });
    it('should save preliminary data', () => {
      const dataAction: any = {
        type: ActionType.PRELIMINARY_ADD_SUCCESS
      };
      expect(
          preliminaryReducer(initialState, dataAction)
      ).toMatchSnapshot();
    });
    it('should populate error.If save fails', () => {
      const dataAction: any = {
        type: ActionType.PRELIMINARY_ADD_ERROR
      };
      expect(
          preliminaryReducer(initialState, dataAction)
      ).toMatchSnapshot();
    });
  });
      
