export enum ProjectApprovalRange {
    Authorised_By = '1',
    Authorised_By_Up_To_CurrencySymbol_100K = '2',
    Authorised_By_Up_To_CurrencySymbol_250K = '3',
    Authorised_By_Up_To_CurrencySymbol_1_Million = '4',
    Authorised_By_Up_To_CurrencySymbol_3_Million = '5',
    Over_CurrencySymbol_3_Million_Authority = '6',
    Over_CurrencySymbol_4_And_half_Million = '7'
}

export enum ProjectApproverType {
    HOP = '1',
    AGMOrAD = '2',
    ComM = '3',
    BUL = '4',
    DPD = '5',
    DMD = '6',
    DofP = '7',
    PComM = '8',
    COOOrUKFD = '9',
    CEOOrGroupFD = '10',
    CBRERegulations = '11'
}

export enum ProjectSignOffStatus {
    Approved = '1',
    Pending = '2',
    Response_Awaited = '3'
}
