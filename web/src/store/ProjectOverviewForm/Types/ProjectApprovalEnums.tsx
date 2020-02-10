export enum ProjectApprovalRange {
    Authorised_By = 1,
    Authorised_By_Up_To_CurrencySymbol_100K,
    Authorised_By_Up_To_CurrencySymbol_250K,
    Authorised_By_Up_To_CurrencySymbol_1_Million,
    Authorised_By_Up_To_CurrencySymbol_3_Million,
    Over_CurrencySymbol_3_Million_Authority,
    Over_CurrencySymbol_4_And_half_Million
}

export enum ProjectApproverType {
    HOP = 1,
    AGMOrAD,
    ComM,
    BUL,
    DPD,
    DMD,
    DofP,
    PComM,
    COOOrUKFD,
    CEOOrGroupFD,
    CBRERegulations
}

export enum ProjectSignOffStatus {
    Draft = 1,
    Approved,
    Pending,
    Response_Awaited
}
