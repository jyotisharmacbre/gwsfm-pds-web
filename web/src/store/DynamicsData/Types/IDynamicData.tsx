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
    divisionId: number;
    divisionCode: string;
    description: string;
    dataSourceId: string;
    isDeleted: string;

}
export interface IDynamicBusinessUnits {
    businessUnitId: string;
    description: string;
    divisionCode: string;
    divisionId: number;
    isDeleted: string;
}