import moment from 'moment';

export interface IProjectPipelineGrid {
  projectId: string;
  projectRefId: number;
  name: string;
  headOfProject: string;
  contractorId: number;
  probabilityOfWinning: number;
  lastModified: string;
  status: string;
  commenceDate: string;
  approxValue: 0;
  contractTypeId: 0;
  cdmNotifiable: false;
  soldMargin: string;
  projectStatusDescription: string;
  contractTypeDescription: string;
}
