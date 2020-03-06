import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';
import { IDynamicsDivision, IDynamicBusinessUnits } from '../../../store/DynamicsData/Types/IDynamicData';

export const ProjectFormProps = {
    name: 'Test',
    contractorId: 1,
    companyId: 1,
    headOfProject: 'Test',
    projectOwner: 'Test',
    projectManager: 'Test',
    pmHasExperience: true,
    scope: 'Test',
    cnNumber: 2,
    status: 1,
    engagementId: 2,
    countryId: 3,
    currencyId: 1,
    probabilityOfWinning: 'Test',
    approxValue: 'Test',
    contractTypeId: 'Test',
    cdmNotifiable: true,
    firstAssetWorkedOn: 0,
    secondAssetWorkedOn: 0,
    thirdAssetWorkedOn: 0,
    comment: 'Test',
    divisionId: 'Test',
    businessUnitId: 'Test',
    weightedTCV: 10,
    soldMargin: 10
};

export const initialState = {
    form: {
        projectId: '',
        name: '',
        contractorId: 1,
        companyId: 1,
        headOfProject: '',
        projectOwner: '',
        projectManager: '',
        pmHasExperience: true,
        scope: '',
        cnNumber: 2,
        status: 1,
        engagementId: 2,
        countryId: 3,
        currencyId: 1,
        probabilityOfWinning: '',
        approxValue: '',
        contractTypeId: '',
        cdmNotifiable: true,
        firstAssetWorkedOn: 0,
        secondAssetWorkedOn: 0,
        thirdAssetWorkedOn: 0,
        comment: '',
        divisionId: '',
        businessUnitId: '',
        weightedTCV: 10,
        soldMargin: 10
    },
    enquiryOverview: {
        projectName: '',
        companyId: -1,
        headOfProject: '',
        projectManager: '',
        scope: '',
        cnNumber: -1
    },
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none,
    enquiryOverviewError: null
};

export const getprojectDetailData = {
    form: {
        projectId: '1',
        name: '',
        contractorId: 1,
        companyId: 1,
        headOfProject: '',
        projectOwner: '',
        projectManager: '',
        pmHasExperience: true,
        scope: '',
        cnNumber: 2,
        status: 1,
        engagementId: 2,
        countryId: 3,
        currencyId: 1,
        probabilityOfWinning: '',
        approxValue: '',
        contractTypeId: '',
        cdmNotifiable: true,
        firstAssetWorkedOn: 0,
        secondAssetWorkedOn: 0,
        thirdAssetWorkedOn: 0,
        comment: ''
    },
    enquiryOverview: {
        projectName: '',
        companyId: -1,
        headOfProject: '',
        projectManager: '',
        scope: '',
        cnNumber: -1
    },
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none,
    enquiryOverviewError: null
};

export const listOfDivisions: Array<IDynamicsDivision> = [{
    divisionId: 0,
    divisionCode: "0",
    description: "Other",
    dataSourceId: "0",
    isDeleted: "0"
},
{
    divisionId: 1,
    divisionCode: "A",
    description: "Other",
    dataSourceId: "0",
    isDeleted: "0"
}];
export const listOfBusinessUnits: Array<IDynamicBusinessUnits> = [{
    businessUnitId: "0",
    description: "Other",
    divisionCode: "0",
    divisionId: 0,
    isDeleted: "0"
}, {
    businessUnitId: "1",
    description: "AA",
    divisionCode: "0",
    divisionId: 1,
    isDeleted: "0"
}, {
    businessUnitId: "2",
    description: "BB",
    divisionCode: "0",
    divisionId: 1,
    isDeleted: "0"
    }];
