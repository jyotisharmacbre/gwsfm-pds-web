import {
  IDynamicCompanyData,
  IDynamicContractCustomerData,
  IDynamicOther,
  IDynamicSubContractorData
} from './IDynamicData';

export interface IDynamicDataState {
  dynamicsCompany: Array<IDynamicCompanyData>;
  dynamicsContract: Array<IDynamicContractCustomerData>;
  error: string | null;
  dynamicsOtherContract: Array<IDynamicOther>;
  dynamicsOtherCompany: Array<IDynamicOther>;
  dynamicsSubcontractor: Array<IDynamicSubContractorData>;
  dynamicsOtherSubContractor: Array<IDynamicOther>;
}
