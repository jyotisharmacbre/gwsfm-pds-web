import { StringLiteral } from '@babel/types';

export interface ProjectData {
  projectName: string;
  companyName: string;
  contractName: string;
  projectHead: string;
  projectOwner: string;
  projectManager: string;
  managerExp: boolean;
  projectScope: string;
  cnNumber: number;
  projectStatus: string;
  engagementType: string;
  country: string;
  currency: string;
  winProbabilty: String;
  approxValue: string;
  contractType: string;
  cdmNotify: string;
  assetworkedonprimary: string;
  assetworkedonsecond: string;
  assetworkedonthird: string;
  comments: string;
}

export interface ProjectState {
  data: ProjectData[];
}

export interface ProjectAction {
  type: string;
  payload: any;
}

export type ProjectTypes = ProjectAction;
