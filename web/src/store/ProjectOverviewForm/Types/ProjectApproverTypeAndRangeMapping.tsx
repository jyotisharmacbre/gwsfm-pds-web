import { ProjectApproverType, ProjectApprovalRange } from './ProjectApprovalEnums';

interface IApproverTypeAndRangeMapping {
	type: number;
	range: number;
	approvalActivityRangeDesc?: string;
}
enum ApprovalActivityRangeTempplate {
	Authorised_By = '{UserName} has approved as {ApproverType}',
	Authorised_By_Up_To_CurrencySymbol_100K = '{UserName} has approved the field under {CurrencySymbol}100K as {ApproverType}',
	Authorised_By_Up_To_CurrencySymbol_250K = '{UserName} has approved the field under {CurrencySymbol}250K as {ApproverType}',
	Authorised_By_Up_To_CurrencySymbol_1_Million = '{UserName} has approved the field under {CurrencySymbol}1 Million as {ApproverType}',
	Authorised_By_Up_To_CurrencySymbol_3_Million = '{UserName} has approved the field under {CurrencySymbol}3 Million as {ApproverType}',
	Over_CurrencySymbol_3_Million_Authority = '{UserName} has approved the field over {CurrencySymbol}3 Million as {ApproverType}',
	Over_CurrencySymbol_4_And_half_Million = '{UserName} has approved the field over {CurrencySymbol}4.5 Million as {ApproverType}'
}
export const ProjectApproverTypeAndRangeMapping: Array<IApproverTypeAndRangeMapping> = [
	{
		type: ProjectApproverType.HOP,
		range: ProjectApprovalRange.Authorised_By,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By
	},
	{
		type: ProjectApproverType.AGMOrAD,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_100K,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_100K
	},
	{
		type: ProjectApproverType.ComM,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_250K,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_250K
	},
	{
		type: ProjectApproverType.BUL,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_250K,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_250K
	},
	{
		type: ProjectApproverType.DPD,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_1_Million,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_1_Million
	},
	{
		type: ProjectApproverType.DMD,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_1_Million,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_1_Million
	},
	{
		type: ProjectApproverType.DofP,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_3_Million
	},
	{
		type: ProjectApproverType.PComM,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_3_Million
	},
	{
		type: ProjectApproverType.COOOrUKFD,
		range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Authorised_By_Up_To_CurrencySymbol_3_Million
	},
	{
		type: ProjectApproverType.CEOOrGroupFD,
		range: ProjectApprovalRange.Over_CurrencySymbol_3_Million_Authority,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Over_CurrencySymbol_3_Million_Authority
	},
	{
		type: ProjectApproverType.CBRERegulations,
		range: ProjectApprovalRange.Over_CurrencySymbol_4_And_half_Million,
		approvalActivityRangeDesc: ApprovalActivityRangeTempplate.Over_CurrencySymbol_4_And_half_Million
	}
];
