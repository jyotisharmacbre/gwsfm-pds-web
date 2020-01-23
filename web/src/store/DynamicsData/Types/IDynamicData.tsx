export interface IDynamicContractCustomerData {
  contractId: string;
  contractName: string;
  customerId: string;
  customerName: string;
}

export interface IDynamicCompanyData {
  companyId: string;
  name: string;
}

export interface IDynamicSubContractorData {
  id: string;
  name: string;
}

export interface IDynamicOther {
  id: string;
  label: string;
}

export interface IDynamicsOtherSubContractor {
  label: string;
  id: string;
}
export interface IDynamicsDivision {
  divisionId: string,
  description: string,
}
