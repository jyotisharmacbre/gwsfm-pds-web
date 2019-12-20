import { IProjectAdditionalDetail } from "./IProjectAdditionalDetail";
import { IProjectApprovals } from "./IProjectApprovals";

export interface IProjectOverviewDetails {
    projectId: string;
    projectAdditionalDetail: IProjectAdditionalDetail;
    projectApprovals: Array<IProjectApprovals>;
  }
  