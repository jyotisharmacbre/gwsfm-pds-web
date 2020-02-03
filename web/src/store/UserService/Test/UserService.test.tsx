
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getUserNamesForEmailsService, getUserNamesForEmailsServiceSuccess, getUserNamesForEmailsServiceError, getUserProfileForEmailsServiceSuccess, getCurrentUserProfileForEmailsService } from '../Action';
import { ActionType } from './../Types/ActionType';
import { store } from './../../index';
import * as helper from '../../../helpers/auth-helper';

import { IUserServiceState } from '../Types/IUserServiceState';
import nock from 'nock';
import { baseURL } from '../../../client/client';
import userServiceReducer, { initialState } from '../Reducer';

nock(baseURL)
  .get('/api/identity/users/getusernamesforemailids')
  .reply(200, [{ email: 'test1@pds.com' }]);


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let _store;
_store = mockStore({
  userServiceData: {
    id: 'string',
    lastName: 'string',
    firstname: 'string',
    email: 'test@pds.com',
    displayName: 'string',
    groups: []
  }
});


describe('User service Action', () => {
  it('should not add email if data already exist', () => {
    const getState = jest.mock(
      './../../index'
    );

    const state: any = {
      userService: { userServiceData: [{ email: 'test@pds.com' }] }
    }

    const getDisplayEmail = jest.mock(
      '../../../helpers/auth-helper'
    );

    jest
    .spyOn(helper, 'getDisplayEmail')
    .mockImplementationOnce(() => {
      return 'test@pds.com';
    });

    jest
      .spyOn(store, 'getState')
      .mockImplementationOnce(() => state);

    const expectedActions =
    {
      type: ActionType.USER_NAMES_FOR_EMAILSSERVICE_GET_SUCCESS,
      payload: "test data"
    }
    const expectedActionForCurrentUserProfile ={
      type: ActionType.CURRENT_USER_PROFILE_FOR_EMAILSSERVICE_GET_SUCCESS,
      payload: "test data"
    }

  expect(getUserNamesForEmailsServiceSuccess("test data")).toMatchObject(expectedActions);
  expect(getUserProfileForEmailsServiceSuccess("test data")).toMatchObject(expectedActionForCurrentUserProfile);
   expect(getUserNamesForEmailsServiceError("error")).toMatchSnapshot();
    expect(_store.dispatch(getUserNamesForEmailsService(['test@pds.com']))).toMatchSnapshot();
    expect(_store.dispatch(getCurrentUserProfileForEmailsService())).toMatchSnapshot();
  });

  it('should add email if data not exist', () => {
    const getState = jest.mock(
      './../../index'
    );
    let state: any = {
      userService: { userServiceData: [{ email: 'test@pds.com' }] }
    }

    jest
      .spyOn(store, 'getState')
      .mockImplementationOnce(() => state);
    expect(_store.dispatch(getUserNamesForEmailsService(['test1@pds.com']))).toMatchSnapshot();
  });
});

describe('User service Reducer', () => {
  it('should return updated state on getUSerServiceSuccessAction', () => {
    const getUSerServiceSuccessAction = {
      type: ActionType.USER_SERVICE_GET_SUCCESS,
      payload: {
        userServiceData: [{ email: "test@pds.com" }],
        error: null
      }
    }
    expect(userServiceReducer(initialState, getUSerServiceSuccessAction)).toMatchSnapshot();
  });

  it('should return updated state on getUSerServiceErrorAction', () => {
    const getUSerServiceErrorAction = {
      type: ActionType.USER_SERVICE_GET_ERROR,
      payload: {        
        error: {error: true}
      }
    }
    expect(userServiceReducer(initialState, getUSerServiceErrorAction)).toMatchSnapshot();
  });

  it('should return updated state on getUSerServiceEmailSuccessAction', () => {
    const getUSerServiceSuccessAction = {
      type: ActionType.USER_NAMES_FOR_EMAILSSERVICE_GET_SUCCESS,
      payload: {        
        userServiceData: [{ email: "test@pds.com" }],
        error: null
      }
    }
    expect(userServiceReducer(initialState, getUSerServiceSuccessAction)).toMatchSnapshot();
  });

  it('should return updated state on getCurrentUserProfileSuccess', () => {
    const getCurrentUserProfileSuccess = {
      type: ActionType.CURRENT_USER_PROFILE_FOR_EMAILSSERVICE_GET_SUCCESS,
      payload: { email: "test@pds.com" }
    }
    expect(userServiceReducer(initialState, getCurrentUserProfileSuccess)).toMatchSnapshot();
  });

  it('should return updated state on getUSerServiceEmailErrorAction', () => {
    const getUSerServiceErrorAction = {
      type: ActionType.USER_NAMES_FOR_EMAILS_SERVICE_GET_ERROR,
      payload: {        
        error: {error: true}
      }
    }
    expect(userServiceReducer(initialState, getUSerServiceErrorAction)).toMatchSnapshot();
  });
});