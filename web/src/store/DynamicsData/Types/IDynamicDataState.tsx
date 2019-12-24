import {
  IDynamicCompanyData,
  IDynamicContractData,
  IDynamicOther,
  IDynamicSubContractorData
} from './IDynamicData';

export interface IDynamicDataState {
  dynamicsCompany: Array<IDynamicCompanyData>;
  dynamicsContract: Array<IDynamicContractData>;
  error: string | null;
  dynamicsOtherContract: Array<IDynamicOther>;
  dynamicsOtherCompany: Array<IDynamicOther>;
  dynamicsSubcontractor: Array<IDynamicSubContractorData>;
  dynamicsOtherSubContractor: Array<IDynamicOther>;
}
