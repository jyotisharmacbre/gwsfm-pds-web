import * as axios from '../client';

let config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const getCompanies = (searchCompany: string) => {
	return axios.baseAPI.get(`/api/ERPLookup/getCompanies/${searchCompany}?topCount=50`);
};

export const getContractsAndCustomers = (searchContract: string) => {
	return axios.baseAPI.get(`/api/ERPLookup/getContractsAndCustomers/${searchContract}?topCount=50`);
};

export const getDynamicSubContractorData = (searchSubContract: string) => {
	return axios.baseAPI.get(`/api/ERPLookup/getSubContractors/${searchSubContract}?topCount=50`);
};

export const getContractsAndCustomersList = (searchSubContractor: Array<string>) => {
	return axios.baseAPI.post(
		`/api/ERPLookup/getContractsAndCustomersList`, searchSubContractor,
		config
	)
};
