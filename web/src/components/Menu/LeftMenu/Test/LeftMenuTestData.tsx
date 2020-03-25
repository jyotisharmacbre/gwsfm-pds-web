import { IProjectDetailState } from "../../../../store/CustomerEnquiryForm/Types/IProjectDetailState";
import Notify from "../../../../enums/Notify";
import EventType from "../../../../enums/EventType";
import { IProjectDetail } from "../../../../store/CustomerEnquiryForm/Types/IProjectDetail";
import { IProject } from "../../../../store/CustomerEnquiryForm/Types/IProject";

export const form: IProjectDetail = {
    projectId: '',
    name: '',
    contractorId: '',
    companyId: '',
    headOfProject: '',
    projectManager: '',
    pmHasExperience: false,
    scope: '',
    cnNumber: '',
    status: 1,
    engagementId: 0,
    countryId: 0,
    currencyId: 0,
    probabilityOfWinning: '',
    approxValue: '',
    contractTypeId: '',
    cdmNotifiable: false,
    firstAssetWorkedOn: 0,
    secondAssetWorkedOn: 0,
    thirdAssetWorkedOn: 0,
    comment: '',
    otherCompanyName: '',
    otherContractName: '',
    businessUnitId: '',
    divisionId: '',
    soldMargin: 0,
    otherEngagementType: '',
    otherFirstAssetWorkedOn: '',
    otherSecondAssetWorkedOn: '',
    otherThirdAssetWorkedOn: '',
    otherDivision: '',
    otherBusinessUnit: ''
}
export const enquiryOverview: IProject = {
    projectName: '',
    contractorId: '',
    headOfProject: '',
    projectManager: '',
    scope: '',
    cnNumber: '',
    otherContractName: ''
}
export const leftMenuProjectData: IProjectDetailState = {
    form: form,
    enquiryOverview: enquiryOverview,
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none,
    enquiryOverviewError: null
}