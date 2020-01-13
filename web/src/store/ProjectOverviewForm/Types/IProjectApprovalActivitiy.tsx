import ProjectApprovalActivityType from '../../../enums/ProjectApprovalActivityType';

export interface IProjectApprovalActivitiy {
  projectActivityId: string;
  projectId: string;
  approverType: number;
  userId: string;
  query: string;
  activityType: ProjectApprovalActivityType;
  createdBy: string;
  createdOn: string;
}
