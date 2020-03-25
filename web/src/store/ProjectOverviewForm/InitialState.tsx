import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import { IProjectOverviewState } from './Types/IProjectOverviewState';

export const initialState: IProjectOverviewState = {
    form: {
        projectId: '',
        projectAdditionalDetail: {
            projectAddDetailId: '',
            projectId: '',
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
            commenceDate: "2020-03-25",
            completionDate: "2020-03-25",
            milestones: '',
            firstValuationDate: "2020-03-25",
            finalAccountDate: "2020-03-25",
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
        projectApprovals: []
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
};

let initialStateWithProjectApprovers = { ...initialState }.form.projectApprovals;