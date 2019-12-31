export interface IProjectApprovals {
    projectApprovalId?: string;
    projectId: string;
    projectApprovalRange: string;
    projectApprovalRangeDescription: string;
    approverType: string;
    approverTypeDescription: string;
    approvalStatus: string;
    approvalStatusDescription: string;
    userId?: string;
    showRangeLabel: boolean;
}