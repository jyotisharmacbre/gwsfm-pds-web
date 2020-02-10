export interface IProjectApprovals {
    projectApprovalId?: string;
    projectId: string;
    projectApprovalRange: number;
    projectApprovalRangeDescription: string;
    approverType: number;
    approverTypeDescription: string;
    approvalStatus: number;
    approvalStatusDescription: string;
    userId?: string;
    showRangeLabel: boolean;
}