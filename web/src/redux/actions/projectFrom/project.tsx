import { ActionType } from '../../actionTypes/projectTypes';
import axios from 'axios';

const ROOT_URL =
  'https://qat-pds-middletier.azurewebsites.net/swagger/index.html';

export const addProject = (data: any) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}`, data).then(response => {
      dispatch({ payload: response.data, type: ActionType.PROJECT_ADD }).catch(
        error =>
          dispatch({
            type: ActionType.PROJECT_ADD_ERROR,
            payload: error
          })
      );
    });
  };
};
