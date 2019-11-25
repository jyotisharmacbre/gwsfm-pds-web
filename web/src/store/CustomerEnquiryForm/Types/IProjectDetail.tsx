export interface IProjectDetail {
  name: string;
  contractorId: number;
  companyId: number;
  headOfProject: string;
  projectOwner: string;
  projectManager: string;
  pmHasExperience: boolean;
  scope: string;
  cnNumber: number;
  status: number;
  engagementId: number;
  countryId: number;
  currencyId: number;
  probabilityOfWinning: String;
  approxValue: string;
  contractTypeId: string;
  cdmNotifiable: boolean;
  firstAssetWorkedOn: number;
  secondAssetWorkedOn: number;
  thirdAssetWorkedOn: number;
  comment: string;
}