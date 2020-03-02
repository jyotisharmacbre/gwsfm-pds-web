import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { getContractsAndCustomersList } from '../../services';
/* istanbul ignore next */
export const getDynamicContractSuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_CONTRACT_DATA_GET_SUCCESS,
		payload: response
	};
};
/* istanbul ignore next */
export const getDynamicContractError = (error: any) => {
	return {
		type: ActionType.DYNAMIC_CONTRACT_DATA_GET_ERROR,
		payload: error
	};
};
/* istanbul ignore next */
export const getDynamicCompanySuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_COMPANY_DATA_GET_SUCCESS,
		payload: response
	};
};
/* istanbul ignore next */
export const getDynamicDivisionError = (error: any) => {
	return {
		type: ActionType.DYNAMIC_COMPANY_DATA_GET_ERROR,
		payload: error
	};
};
/* istanbul ignore next */
export const getDynamicDivisionSuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_DIVISION_DATA_GET_SUCCESS,
		payload: response
	};
};
export const getDynamicCompanyError = (error: any) => {
	return {
		type: ActionType.DYNAMIC_COMPANY_DATA_GET_ERROR,
		payload: error
	};
};

export const getDynamicContractOtherSuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_OTHER_CONTRACT_SUCCESS,
		payload: response
	};
};

export const getDynamicCompanyOtherSuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_OTHER_COMPANY_SUCCESS,
		payload: response
	};
};

export const getDynamicSubContractorSuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_SUCCESS,
		payload: response
	};
};

export const getDynamicSubContractorError = (error: any) => {
	return {
		type: ActionType.DYNAMIC_SUB_CONTRACTOR_DATA_GET_ERROR,
		payload: error
	};
};

export const getDynamicSubContractorOtherSuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_OTHER_SUB_CONTRACTOR_SUCCESS,
		payload: response
	};
};

export const getDefaultSuccess = (response: any) => {
	return {
		type: ActionType.DYNAMIC_OTHER_DEFAULT_SUCCESS
	};
};
export const getDynamicBusinessUnitSuccess=(response:any)=>{
	return {
		type:ActionType.DYNAMIC_BUSINESSUNIT_SUCCESS,
		payload:response
	}
};
export const getDynamicBusinessUnitError =(error:any) =>
{
	return {
		type:ActionType.DYNAMIC_BUSINESSUNIT_ERROR,
		payload:error
};
};
export const getDynamicContractListSuccess=(response:any)=>{
	return {
		type:ActionType.DYNAMIC_CONTRACTLIST_SUCCESS,
		payload:response
	}
};
export const getDynamicContractListError =(error:any) =>
{
	return {
		type:ActionType.DYNAMIC_CONTRACTLIST_ERROR,
		payload:error
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
			.then((response) => {
				/* istanbul ignore next */
				dispatch(getDynamicContractSuccess(response.data));
			})
			.catch((error) => {
				/* istanbul ignore next */
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
			.then((response) => {
				/* istanbul ignore next */
				dispatch(getDynamicCompanySuccess(response.data));
			})
			.catch((error) => {
				/* istanbul ignore next */
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

export const getDynamicSubContractorData = (searchSubContractor: string, success, failure) => {
	axios.baseAPI
		.get(
			`/api/ERPLookup/getSubContractors/${searchSubContractor}?topCount=50`,
			config
		)
		.then((response) => {
			/* istanbul ignore next */
			success(response.data);
		})
		.catch((error) => {
			/* istanbul ignore next */
			failure(error);
		});
};
export const getContractDetailsByIds = (searchSubContractor: Array<string>) => {
	return (dispatch: Dispatch) => {
		getContractsAndCustomersList(searchSubContractor)
		.then((response) => {
			/* istanbul ignore next */
			dispatch(getDynamicContractListSuccess(response.data));
		})
		.catch((error) => {
			/* istanbul ignore next */
			dispatch(getDynamicContractListError(error)) ;
		});
	};
};

export const getListOfDivision = () => {
	return (dispatch: Dispatch) => {
	axios.baseAPI
		.get(
			`/api/ERPLookup/getDivision`,
			config
		)
		.then(response => {
			/* istanbul ignore next */
			dispatch(getDynamicDivisionSuccess(response.data));
		})
		.catch(error => {
			/* istanbul ignore next */
			dispatch(getDynamicDivisionError(error)) ;
		});
	};
};
export const getListOfBusinessUnits = () => {
	return (dispatch: Dispatch) => {
	axios.baseAPI
		.get(
			`/api/ERPLookup/getBusinessUnit`,
			config
		)
		.then(response => {
			/* istanbul ignore next */
			dispatch(getDynamicBusinessUnitSuccess(response.data));
		})
		.catch(error => {
			/* istanbul ignore next */
			dispatch(getDynamicBusinessUnitError(error)) ;
		});
	};
};