
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getUserNamesForEmailsService, getUserNamesForEmailsServiceSuccess, getUserNamesForEmailsServiceError } from '../Action';
import { ActionType } from './../Types/ActionType';
import { store } from './../../index';

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
const _userService: IUserServiceState = {
  userServiceData: [],
  error: null
};



describe('User service Action', () => {
  it('should not add email if data already exist', () => {
    const getState = jest.mock(
      './../../index'
    );
    let state: any = {
      userService: { userServiceData: [{ email: 'test@pds.com' }] }
    }

    jest
      .spyOn(store, 'getState')
      .mockImplementationOnce(() => state);

    const expectedActions =
    {
      type: ActionType.USER_NAMES_FOR_EMAILSSERVICE_GET_SUCCESS,
      payload: "test data"
    }

    expect(getUserNamesForEmailsServiceSuccess("test data")).toMatchObject(expectedActions);
    expect(getUserNamesForEmailsServiceError("error")).toMatchSnapshot();
    expect(_store.dispatch(getUserNamesForEmailsService(['test@pds.com']))).toMatchSnapshot();
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