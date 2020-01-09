import { ProjectApproverType, ProjectApprovalRange } from "./ProjectApprovalEnums";

interface IApproverTypeAndRangeMapping {
    type: number,
    range: number
}

export const ProjectApproverTypeAndRangeMapping: Array<IApproverTypeAndRangeMapping> = [
    { type: ProjectApproverType.HOP, range: ProjectApprovalRange.Authorised_By },
    { type: ProjectApproverType.AGMOrAD, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_100K },
    { type: ProjectApproverType.ComM, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_250K },
    { type: ProjectApproverType.BUL, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_250K },
    { type: ProjectApproverType.DPD, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_1_Million },
    { type: ProjectApproverType.DMD, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_1_Million },
    { type: ProjectApproverType.DofP, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million },
    { type: ProjectApproverType.PComM, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million },
    { type: ProjectApproverType.COOOrUKFD, range: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million },
    { type: ProjectApproverType.CEOOrGroupFD, range: ProjectApprovalRange.Over_CurrencySymbol_3_Million_Authority },
    { type: ProjectApproverType.CBRERegulations, range: ProjectApprovalRange.Over_CurrencySymbol_4_And_half_Million },
]
