import moment from 'moment';

export interface IProjectPipelineGrid {
  projectId: string;
  name: string;
  projectOwner: string;
  contractorId: number;
  probabilityOfWinning: number;
  lastModified: string;
  status: string;
  commenceDate: string;
  approxValue: 0;
  contractTypeId: 0;
  cdmNotifiable: false;
  soldMargin: string;
  weightedTCV: string;
  rank: string;
}
