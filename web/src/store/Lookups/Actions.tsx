import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { ICurrency } from './Types/ICurrency';
import { ILanguage } from './Types/ILanguage';
import { de } from 'date-fns/esm/locale';

const getProjectStatusSuccess = (response: any) => {
  return {
    type: ActionType.LOOKUP_PROJECT_STATUS_GET_SUCCESS,
    payload: response
  };
};

const getProjectStatusError = (error: any) => {
  return {
    type: ActionType.LOOKUP_PROJECT_STATUS_GET_ERROR,
    payload: error
  };
};

const headers = {
  'Content-Type': 'application/json'
};
export const getProjectStatus = () => {
  var data = [
    'Project_Status',
    'Engagement_Type',
    'Contract_Type',
    'Country',
    'Currency',
    'Asset',
    'Work_Type',
    'Enquiry_Type',
    'Discount_Type',
    'Pre_Components',
    'Pre_Component_Items'
  ];
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('api/LookupData/GetLookupsByIds', data, { headers: headers })
      .then(response => {
        dispatch(getProjectStatusSuccess(response.data));
      })
      .catch(error => {
        dispatch(getProjectStatusError(error));
      });
  };
};

const getAllCurrenciesSuccess = (response: Array<ICurrency>) => {
  return {
    type: ActionType.GET_ALL_CURRENCIES_SUCCESS,
    payload: response
  };
};

const getAllCurrenciesError = (error: any) => {
  return {
    type: ActionType.GET_ALL_CURRENCIES_ERROR,
    payload: error
  };
};

const getAllLanguagesSuccess = (response: Array<ILanguage>) => {
  return {
    type: ActionType.GET_ALL_LANGUAGE_SUCCESS,
    payload: response
  };
};

const getAllLanguagesError = (error: any) => {
  return {
    type: ActionType.GET_ALL_LANGUAGE_ERROR,
    payload: error
  };
};

export const getAllCurrencies = () => {
  debugger;
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('api/LookupData/GetAllCurrencies')
      .then(response => {
        dispatch(getAllCurrenciesSuccess(response.data));
      })
      .catch(error => {
        dispatch(getAllCurrenciesError(error));
      });
  };
};

export const getAllLanguages = () => { 
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('api/LookupData/GetLanguages')
      .then(response => {       
        dispatch(getAllLanguagesSuccess(response.data));
      })
      .catch(error => {       
        dispatch(getAllCurrenciesError(error));
      });
  };
};
