import {
  IDynamicCompanyData,
  IDynamicContractCustomerData,
  IDynamicOther,
  IDynamicSubContractorData,
  IDynamicsDivision
} from './IDynamicData';

export interface IDynamicDataState {
  dynamicsCompany: Array<IDynamicCompanyData>;
  dynamicsListOfDivision: Array<IDynamicsDivision>;
  dynamicsContract: Array<IDynamicContractCustomerData>;
  error: string | null;
  dynamicsOtherContract: Array<IDynamicOther>;
  dynamicsOtherCompany: Array<IDynamicOther>;
  dynamicsSubcontractor: Array<IDynamicSubContractorData>;
  dynamicsOtherSubContractor: Array<IDynamicOther>;
}
