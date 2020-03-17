import { IProjectOverviewState } from '../../../../store/ProjectOverviewForm/Types/IProjectOverviewState';
import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import { IProjectApprovals } from '../../../../store/ProjectOverviewForm/Types/IProjectApprovals';

export const projectApprovalsList: Array<IProjectApprovals> =  [
    {
      projectApprovalId: '1',
      projectId : '1',
       projectApprovalRange : 1,
       projectApprovalRangeDescription : '1',
       approverType: 1,
       approverTypeDescription: 'string',
       approvalStatus: 4,
       approvalStatusDescription: 'string',
       userId: 'string',
       showRangeLabel: true,
    },
    {
      projectApprovalId: '2',
      projectId : '2',
       projectApprovalRange : 1,
       projectApprovalRangeDescription : '1',
       approverType: 2,
       approverTypeDescription: 'string',
       approvalStatus: 2,
       approvalStatusDescription: 'string',
       userId: 'string',
       showRangeLabel: true,
    }
  ];
