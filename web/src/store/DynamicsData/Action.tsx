import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import {
  getADhopOther,
  getADpoOther,
  getADpmOther
} from '../UserService/Action';

const getDynamicContractSuccess = (response: any) => {
  return {
    type: ActionType.DYNAMIC_CONTRACT_DATA_GET_SUCCESS,
    payload: response
  };
};

const getDynamicContractError = (error: any) => {
  return {
    type: ActionType.DYNAMIC_CONTRACT_DATA_GET_ERROR,
    payload: error
  };
};

const getDynamicCompanySuccess = (response: any) => {
  return {
    type: ActionType.DYNAMIC_COMPANY_DATA_GET_SUCCESS,
    payload: response
  };
};

const getDynamicCompanyError = (error: any) => {
  return {
    type: ActionType.DYNAMIC_COMPANY_DATA_GET_ERROR,
    payload: error
  };
};

const getDynamicContractOtherSuccess = (response: any) => {
  return {
    type: ActionType.DYNAMIC_OTHER_CONTRACT_SUCCESS,
    payload: response
  };
};

const getDynamicCompanyOtherSuccess = (response: any) => {
  return {
    type: ActionType.DYNAMIC_OTHER_COMPANY_SUCCESS,
    payload: response
  };
};

let config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const getDynamicContractData = (searchContract: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(
        `/api/DynamicsLookup/getContracts/${searchContract}?topCount=50
      `,
        config
      )
      .then(response => {
        dispatch(getDynamicContractSuccess(response.data));
      })
      .catch(error => {
        dispatch(getDynamicContractError(error));
      });
  };
};

export const getDynamicCompanyData = (searchCompany: string) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(
        `/api/DynamicsLookup/getCompanies/${searchCompany}?topCount=50
      `,
        config
      )
      .then(response => {
        dispatch(getDynamicCompanySuccess(response.data));
      })
      .catch(error => {
        dispatch(getDynamicCompanyError(error));
      });
  };
};

export const getDynamicOther = (data: any, type: string) => {
  switch (type) {
    case 'contractorId':
      return (dispatch: Dispatch) => {
        dispatch(getDynamicContractOtherSuccess(data));
      };
    case 'companyId':
      return (dispatch: Dispatch) => {
        dispatch(getDynamicCompanyOtherSuccess(data));
      };
    case 'headOfProject':
      return (dispatch: Dispatch) => {
        dispatch(getADhopOther(data));
      };
    case 'projectOwner':
      return (dispatch: Dispatch) => {
        dispatch(getADpoOther(data));
      };
    case 'projectManager':
      return (dispatch: Dispatch) => {
        dispatch(getADpmOther(data));
      };
  }
};

// export const getDynamicContractOther = (data: string) => {
//   console.log(data);
//   return (dispatch: Dispatch) => {
//     dispatch(getDynamicContractOtherSuccess(data));
//   };
// };

// export const getDynamicCompanyOther = (data: string) => {
//   console.log(data);
//   return (dispatch: Dispatch) => {
//     dispatch(getDynamicCompanyOtherSuccess(data));
//   };
// };
