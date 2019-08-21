import fetch from 'cross-fetch'
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ThunkResult } from '../root-thunk';

export const CREATE_PROJECT = 'CREATE_PROJECT';

export const PROJECTFORM_ADD = 'PROJECTFORM_ADD';

const createProjectForm = (data: any) => {
  return {
    type: CREATE_PROJECT,
    data
  }
}

const projectFormAdd = (data: any) => {
  return {
    type: PROJECTFORM_ADD,
    data
  }
}


export const anotherThunkAction = (data: any): ThunkResult<void> => (dispatch, getState) => {
  dispatch(createProjectForm(data))
  //  return async (dispatch: Dispatch) => {
  //    dispatch(createProjectForm(data))
  //    const response = await fetch(`https://www.reddit.com/r/${data}.json`);
  //    return await response.json();
  //  }
  // return Promise.resolve( 
  // true
  // );
};


export const addFormAction = (data: any): ThunkResult<void> => (dispatch, getState) => {
  dispatch(projectFormAdd(data))
};