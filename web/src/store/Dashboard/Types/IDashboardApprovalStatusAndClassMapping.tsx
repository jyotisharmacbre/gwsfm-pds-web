import { ProjectSignOffStatus } from '../../ProjectOverviewForm/Types/ProjectApprovalEnums';

interface IDashboardApprovalStatusAndClassMapping {
    approvalStatus: ProjectSignOffStatus;
    className: string;
}
export default IDashboardApprovalStatusAndClassMapping;