import { PROJECT_ADD, PROJECT_ADD_ERROR } from '../../actionTypes/projectTypes';
import axios from 'axios';

const ROOT_URL =
  'https://qat-pds-middletier.azurewebsites.net/swagger/index.html';

export const addProject = (data: any) => {
  console.log('submitted values', data);
  return function(dispatch) {
    axios.post(`${ROOT_URL}`, data).then(response => {
      dispatch({ payload: data, type: PROJECT_ADD }).catch(error =>
        dispatch({
          type: PROJECT_ADD_ERROR,
          payload: error
        })
      );
    });
  };
};
