import {
  IDynamicCompanyData,
  IDynamicContractCustomerData,
  IDynamicOther,
  IDynamicSubContractorData,
  IDynamicsDivision,
  IDynamicBusinessUnits
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
  dynamicsListOfBusinessUnits:Array<IDynamicBusinessUnits>;
}
