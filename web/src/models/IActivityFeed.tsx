import ProjectApprovalActivityType from '../enums/ProjectApprovalActivityType';

interface IActivityFeed {
	activityType: ProjectApprovalActivityType;
	approvedBy: string;
	query: string;
	createdDate: string;
}

export default IActivityFeed;
