export interface IProjectAdditionalDetail {
  projectAddDetailId: string;
  projectId: string;
  mainContractor: string;
  otherMainContractor: string;
  enquiryReceivedFrom: string;
  potentialCustomer: string;
  otherPotentialCustomer: string;
  enquiryTypeId: number;
  creditCheckResult: string;
  siteAddress: string;
  cdmNotifiable: boolean;
  formOfContract: string;
  retention: string;
  liquidatedDamages: string;
  insurance: string;
  workTypeId: number;
  commenceDate: Date;
  completionDate: Date;
  milestones: string;
  firstValuationDate: Date;
  finalAccountDate: Date;
  valuationIntervals: string;
  paymentTerms: string;
  isProjectLive: boolean;
  comments: string;
  authorizedByHop: string;
  budget: number;
  authorizedBy: string;
  authorizedBySecond: string;
  authorizedByThird: string;
}
