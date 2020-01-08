import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';

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

const getDynamicSubContractorSuccess = (response: any) => {
  return {
    type: ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_SUCCESS,
    payload: response
  };
};

const getDynamicSubContractorError = (error: any) => {
  return {
    type: ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_ERROR,
    payload: error
  };
};


const getDynamicSubContractorOtherSuccess = (response: any) => {
  return {
    type: ActionType.DYNAMIC_OTHER_SUB_CONTRACTOR_SUCCESS,
    payload: response
  };
};

const getDefaultSuccess = (response: any) => {
  return {
    type: ActionType.DYNAMIC_OTHER_DEFAULT_SUCCESS
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
        `/api/ERPLookup/getContractsAndCustomers/${searchContract}?topCount=50
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
        `/api/ERPLookup/getCompanies/${searchCompany}?topCount=50
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

// export const getDynamicSubContractorData = (searchSubContractor: string) => {
//   console.log(searchSubContractor, 'searchSubContractor')
//   return (dispatch: Dispatch) => {
//     axios.baseAPI
//       .get(
//         `/api/ErpLookup/getSubContractors/${searchSubContractor}?topCount=50
//       `,
//         config
//       )
//       .then(response => {
//         console.log(response.data, 'rees')
//         dispatch(getDynamicSubContractorSuccess(response.data));
//       })
//       .catch(error => {
//         dispatch(getDynamicSubContractorError(error));
//       });
//   };
// };

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
    case 'subcontractorId':
    return (dispatch: Dispatch) => {
      dispatch(getDynamicSubContractorOtherSuccess(data));
    };
      default:
        return (dispatch: Dispatch) => {
          dispatch(getDefaultSuccess(data));
        };
  }
};

export const getDynamicSubContractorData = (searchSubContractor: string,success,failure) => {
  axios.baseAPI
    .get(
      `/api/ERPLookup/getSubContractors/${searchSubContractor}?topCount=50
    `,
      config
    )
    .then(response => {
      success(response.data);
    })
    .catch(error => {
      failure(error);
    });

};


export const getListOfCompanies = (searchCompany: string,success,failure) => {
    axios.baseAPI
      .get(
        `/api/ERPLookup/getCompanies/${searchCompany}?topCount=50
      `,
        config
      )
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        failure(error);
      });
  
};

export const getListOfContract = (searchContract: string,success,failure) => {
    axios.baseAPI
      .get(
        `/api/ERPLookup/getContractsAndCustomers/${searchContract}?topCount=50
      `,
        config
      )
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        failure(error);
      });
};

