import { PROJECT_ADD } from '../../actionTypes/projectTypes';

export const addProject = (data: any) => ({
  payload: data,
  type: PROJECT_ADD
});
