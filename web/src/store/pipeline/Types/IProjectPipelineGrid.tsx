import moment from 'moment';

export interface IProjectPipelineGrid {
  projectId: string;
  projectRefId: number;
  name: string;
  projectOwner: string;
  headOfProject: string;
  contractorId: string;
  probabilityOfWinning: number;
  lastModified: string;
  status: string;
  commenceDate: string;
  approxValue: 0;
  contractTypeId: 0;
  cdmNotifiable: false;
  soldMargin: string;
  weightedTCV: string;
  projectStatusDescription: string;
  contractTypeDescription: string;
}
