import { PROJECT_ADD } from '../../actionTypes/projectTypes';

export const addProject = (data: any) => {
  console.log('submitted values', data);
  return dispatch => {
    dispatch({ payload: data, type: PROJECT_ADD });
  };
};
