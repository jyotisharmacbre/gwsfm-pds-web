export interface IProjectDetail {
    projectId: string;
    projectRefId?: number;
    name: string;
    contractorId: string;
    companyId: string;
    headOfProject: string;
    projectOwner: string;
    projectManager: string;
    pmHasExperience: boolean;
    scope: string;
    cnNumber: string;
    status: number;
    engagementId?: number;
    countryId: number;
    currencyId: number;
    probabilityOfWinning: String;
    approxValue: string;
    contractTypeId: string;
    cdmNotifiable: boolean;
    firstAssetWorkedOn?: number;
    secondAssetWorkedOn?: number;
    thirdAssetWorkedOn?: number;
    comment: string;
    otherCompanyName: string;
    otherContractName: string;
    businessUnitId: string;
    otherBusinessUnit: string;
    divisionId: string;
    otherDivision: string;
    weightedTCV: number | undefined;
    soldMargin: number | undefined;
    otherEngagementType: string;
    otherFirstAssetWorkedOn: string;
    otherSecondAssetWorkedOn: string;
    otherThirdAssetWorkedOn: string;
}
