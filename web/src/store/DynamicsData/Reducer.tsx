import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IDynamicDataState } from './Types/IDynamicDataState';

const initialState: IDynamicDataState = {
  dynamicsCompany: [],
  dynamicsContract: [],
  error: null,
  dynamicsOtherCompany: [],
  dynamicsOtherContract: [],
  dynamicsSubcontractor: [],
  dynamicsOtherSubContractor: [],
  dynamicsListOfDivision: [],
  dynamicsListOfBusinessUnits:[]
};

const getDynamicContractSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    dynamicsContract: action.payload
  });
};

const getDynamicContractError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const getDynamicCompanySuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    dynamicsCompany: action.payload
  });
};

const getDynamicCompanyError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const getDynamicSubContractorSuccess = (oldState, action) => {
  return updateObject(oldState, {
    error: null,
    dynamicsSubcontractor: action.payload
  });
};

const getDynamicSubContractorError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};

const getDynamicContractOther = (oldState, action) => {
  return updateObject(oldState, {
    dynamicsOtherContract: action.payload
  });
};

const getDynamicCompanyOther = (oldState, action) => {
  return updateObject(oldState, {
    dynamicsOtherCompany: action.payload
  });
};

const getDynamicSubContractorOther = (oldState, action) => {
  return updateObject(oldState, {
    dynamicsOtherSubContractor: action.payload
  });
};
const getDynamicDivisionSuccess = (oldState, action) => {
  return updateObject(oldState, {
    dynamicsListOfDivision: action.payload
  });
};
const getDynamicDivisionError = (oldState, action) => {
  return updateObject(oldState, {
    error: action.payload
  });
};
const getDynamicBusinessUnitSuccess=(oldState,action)=>
{
  return updateObject(oldState,{dynamicsListOfBusinessUnits:action.payload})
}
const getDynamicBusinessUnitError=(oldState,action)=>
{
  return updateObject(oldState,{error:action.payload})
}
const dynamicDataReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.DYNAMIC_CONTRACT_DATA_GET_SUCCESS:
      return getDynamicContractSuccess(oldState, action);
    case ActionType.DYNAMIC_CONTRACT_DATA_GET_ERROR:
      return getDynamicContractError(oldState, action);
    case ActionType.DYNAMIC_COMPANY_DATA_GET_SUCCESS:
      return getDynamicCompanySuccess(oldState, action);
    case ActionType.DYNAMIC_COMPANY_DATA_GET_ERROR:
      return getDynamicCompanyError(oldState, action);
    case ActionType.DYNAMIC_OTHER_CONTRACT_SUCCESS:
      return getDynamicContractOther(oldState, action);
    case ActionType.DYNAMIC_OTHER_COMPANY_SUCCESS:
      return getDynamicCompanyOther(oldState, action);
    case ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_SUCCESS:
      return getDynamicSubContractorSuccess(oldState, action);
    case ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_ERROR:
      return getDynamicSubContractorError(oldState, action);
    case ActionType.DYNAMIC_OTHER_SUB_CONTRACTOR_SUCCESS:
      return getDynamicSubContractorOther(oldState, action);
    case ActionType.DYNAMIC_DIVISION_DATA_GET_SUCCESS:
      return getDynamicDivisionSuccess(oldState, action);
    case ActionType.DYNAMIC_DIVISION_DATA_GET_ERROR:
      return getDynamicDivisionError(oldState, action);
    case ActionType.DYNAMIC_BUSINESSUNIT_SUCCESS:
      return getDynamicBusinessUnitSuccess(oldState, action);
    case ActionType.DYNAMIC_BUSINESSUNIT_ERROR:
      return getDynamicDivisionError(oldState, action);
    default:
      return oldState;
  }
};

export default dynamicDataReducer;
