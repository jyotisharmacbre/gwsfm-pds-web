import { IProjectDetailState } from './Types/IProjectDetailState';
import EventType from '../../enums/EventType';
import Notify from '../../enums/Notify';

export const initialState: IProjectDetailState = {
    form: {
        projectId: '',
        name: '',
        contractorId: '',
        companyId: '',
        headOfProject: '',
        projectOwner: '',
        projectManager: '',
        pmHasExperience: false,
        scope: '',
        cnNumber: '',
        status: 1,
        engagementId: undefined,
        countryId: 0,
        currencyId: 0,
        probabilityOfWinning: '',
        approxValue: '',
        contractTypeId: '',
        cdmNotifiable: false,
        firstAssetWorkedOn: undefined,
        secondAssetWorkedOn: undefined,
        thirdAssetWorkedOn: undefined,
        comment: '',
        otherCompanyName: '',
        otherContractName: '',
        divisionId: '',
        otherDivision: '',
        businessUnitId: '',
        otherBusinessUnit: '',
        weightedTCV: undefined,
        soldMargin: undefined,
        otherEngagementType: '',
        otherFirstAssetWorkedOn: '',
        otherSecondAssetWorkedOn: '',
        otherThirdAssetWorkedOn: ''
    },
    enquiryOverview: {
        projectName: '',
        contractorId: '',
        headOfProject: '',
        projectManager: '',
        scope: '',
        cnNumber: '',
        otherContractName: ''
    },
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none,
    enquiryOverviewError: null
};