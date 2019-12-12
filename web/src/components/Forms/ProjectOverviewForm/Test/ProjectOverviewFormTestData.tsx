import { IProjectOverviewState } from '../../../../store/ProjectOverviewForm/Types/IProjectOverviewState';
import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';

export const initialState: IProjectOverviewState = {
  form: {
    projectAddDetailId: '',
    projectId: '',
    mainContractor: '',
    otherMainContractor: '',
    enquiryReceivedFrom: '',
    enquiryTypeId: 1,
    creditCheckResult: '',
    siteAddress: '',
    cdmNotifiable: false,
    formOfContract: '',
    retention: '',
    liquidatedDamages: '',
    insurance: '',
    workTypeId: -1,
    commenceDate: 'date',
    completionDate: 'date',
    milestones: '',
    firstValuationDate: 'date',
    finalAccountDate: 'date',
    valuationIntervals: '',
    paymentTerms: '',
    isProjectLive: false,
    comments: '',
    authorizedByHop: '',
    budget: 1,
    authorizedBy: '',
    authorizedBySecond: '',
    authorizedByThird: ''
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};

export const getProjectOverviewData: IProjectOverviewState = {
  form: {
    projectAddDetailId: '1',
    projectId: '1',
    mainContractor: '1',
    otherMainContractor: '',
    enquiryReceivedFrom: '',
    enquiryTypeId: 1,
    creditCheckResult: '',
    siteAddress: '',
    cdmNotifiable: false,
    formOfContract: '',
    retention: '',
    liquidatedDamages: '',
    insurance: '',
    workTypeId: -1,
    commenceDate: 'date',
    completionDate: 'date',
    milestones: '',
    firstValuationDate: 'date',
    finalAccountDate: 'date',
    valuationIntervals: '',
    paymentTerms: '',
    isProjectLive: false,
    comments: '',
    authorizedByHop: '',
    budget: 1,
    authorizedBy: '',
    authorizedBySecond: '',
    authorizedByThird: ''
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};
