import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';
import { IProjectOverviewState } from '../../../store/ProjectOverviewForm/Types/IProjectOverviewState';

export const getProjectOverviewState = (approverStatus: number) => {
    let data = {
        form: {
            projectId: '1',
            projectAdditionalDetail: {
                projectAddDetailId: '1',
                projectId: '1',
                mainContractor: '',
                enquiryReceivedFrom: '',
                enquiryTypeId: 0,
                creditCheckResult: '',
                siteAddress: '',
                cdmNotifiable: false,
                formOfContract: '',
                retention: '',
                liquidatedDamages: '',
                insurance: '',
                workTypeId: 0,
                commenceDate: new Date().toJSON(),
                completionDate: new Date().toJSON(),
                milestones: '',
                firstValuationDate: new Date().toJSON(),
                finalAccountDate: new Date().toJSON(),
                valuationIntervals: '',
                paymentTerms: '',
                isProjectLive: false,
                comments: '',
                authorizedByHop: '',
                budget: 1,
                authorizedBy: '',
                authorizedBySecond: '',
                authorizedByThird: '',
                projectRisk1: '',
                projectRisk2: '',
                projectRisk3: '',
                projectRiskControlMeasure1: '',
                projectRiskControlMeasure2: '',
                projectRiskControlMeasure3: ''
            },
            projectApprovals: [{
                projectApprovalId: '1',
                projectId: '1',
                projectApprovalRange: 1,
                approverType: 1,
                approvalStatus: approverStatus,
                userId: 'test1@pds.com',
                approvalStatusDescription: '',
                projectApprovalRangeDescription: '',
                approverTypeDescription: '',
                showRangeLabel: true
            },
            {
                projectApprovalId: '2',
                projectId: '1',
                projectApprovalRange: 2,
                approverType: 2,
                approvalStatus: approverStatus,
                userId: 'test2@pds.com',
                approvalStatusDescription: '',
                projectApprovalRangeDescription: '',
                approverTypeDescription: '',
                showRangeLabel: true
            }]
        },
        error: null,
        loading: false,
        notify: Notify.none,
        event: EventType.none,
        initialStateSetForProjectApprovals: false,
        projectActivities: {
            error: null,
            loading: false,
            notify: Notify.none,
            data: []
        }
    }
    return data;
};


export const getCustomerEnquiryData = (projectStatus) => {
    let data = {
        form: {
            projectId: '1',
            name: 'test1',
            contractorId: '',
            companyId: '',
            headOfProject: '',
            projectOwner: '',
            projectManager: '',
            pmHasExperience: false,
            scope: '',
            cnNumber: '',
            status: projectStatus,
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
            divisionId: '',
            businessUnitId: '',
            weightedTCV: undefined,
            soldMargin: undefined
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
    }
    return data;
};