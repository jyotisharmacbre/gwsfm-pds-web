import IDashboardApprovalStatusAndClassMapping from './IDashboardApprovalStatusAndClassMapping';
import { ProjectSignOffStatus } from '../../ProjectOverviewForm/Types/ProjectApprovalEnums';

const DashboardApprovalStatusAndClassMapping: Array<IDashboardApprovalStatusAndClassMapping> = [
    { approvalStatus: ProjectSignOffStatus.Draft, className: 'status_draft' },
    { approvalStatus: ProjectSignOffStatus.Approved, className: 'status_approved' },
    { approvalStatus: ProjectSignOffStatus.Pending, className: 'status_pending' },
    { approvalStatus: ProjectSignOffStatus.Response_Awaited, className: 'status_responseawaited' },

]

export default DashboardApprovalStatusAndClassMapping;