import * as axios from '../../client';
import { store } from '../index';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { ICurrency } from './Types/ICurrency';
import { ILanguage } from './Types/ILanguage';
import { de } from 'date-fns/esm/locale';
import { ICountry } from './Types/ICountry';
import { getDefaultState } from '../Common/Action';
/* istanbul ignore next */
const getProjectStatusSuccess = (response: any) => {
  return {
    type: ActionType.LOOKUP_PROJECT_STATUS_GET_SUCCESS,
    payload: response
  };
};
/* istanbul ignore next */
const getProjectStatusError = (error: any) => {
  return {
    type: ActionType.LOOKUP_PROJECT_STATUS_GET_ERROR,
    payload: error
  };
};
/* istanbul ignore next */
const getLookupsByLookupItemsSuccess = (response: any) => {
  return {
    type: ActionType.LOOKUPS_GET_SUCCESS,
    payload: response
  };
};
/* istanbul ignore next */
const getLookupsByLookupItemsError = (error: any) => {
  return {
    type: ActionType.LOOKUPS_GET_ERROR,
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
    'Asset_Type',
    'Work_Type',
    'Enquiry_Type',
    'Discount_Type',
    'Pre_Components',
    'Pre_Component_Items',
    'Project_Approval_Sign_Off_Status',
    'Notification_Template'
  ];
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('api/LookupData/GetLookupsByIds', data, { headers: headers })
      .then(response => {
        /* istanbul ignore next */
        dispatch(getProjectStatusSuccess(response.data));
      })
      .catch(error => {
        /* istanbul ignore next */
        dispatch(getProjectStatusError(error));
      });
  };
};

export const getLookupsByLookupItems = (lookupItems: string[]) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('api/LookupData/GetLookupsByIds', lookupItems, { headers: headers })
      .then(response => {
        /* istanbul ignore next */
        dispatch(getLookupsByLookupItemsSuccess(response.data));
      })
      .catch(error => {
        /* istanbul ignore next */
        dispatch(getLookupsByLookupItemsError(error));
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


export const getAllCurrencies = (cache: boolean = true) => {
  return (dispatch: Dispatch) => {
    let storeData = store.getState().lookup.currencies;
    if (cache && storeData && storeData.length > 0) dispatch(getDefaultState());
    else {
      axios.baseAPI
        .get('api/LookupData/GetAllCurrencies')
        .then(response => {
          /* istanbul ignore next */
          dispatch(getAllCurrenciesSuccess(response.data));
        })
        .catch(error => {
          /* istanbul ignore next */
          dispatch(getAllCurrenciesError(error));
        });
    }
  };
};

const getAllCountriesSuccess = (response: Array<ICountry>) => {
  return {
    type: ActionType.GET_ALL_COUNTRIES_SUCCESS,
    payload: response
  };
};

const getAllCountriesError = (error: any) => {
  return {
    type: ActionType.GET_ALL_CURRENCIES_ERROR,
    payload: error
  };
};

export const getAllContries = () => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('/api/LookupData/Countries')
      .then(response => {
        /* istanbul ignore next */
        dispatch(getAllCountriesSuccess(response.data));
      })
      .catch(error => {
        /* istanbul ignore next */
        dispatch(getAllCountriesError(error));
      });
  };
};

export const getAllLanguages = () => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get('api/LookupData/GetLanguages')
      .then(response => {
        /* istanbul ignore next */
        dispatch(getAllLanguagesSuccess(response.data));
      })
      .catch(error => {
        /* istanbul ignore next */
        dispatch(getAllCurrenciesError(error));
      });
  };
};
