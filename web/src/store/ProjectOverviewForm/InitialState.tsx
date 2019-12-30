import { IProjectOverviewState } from './Types/IProjectOverviewState';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';

export const initialState: IProjectOverviewState = {
  form: {
    projectId: '',
    projectAdditionalDetail: {
      projectAddDetailId: '',
      projectId: '',
      mainContractor: '',
      enquiryReceivedFrom: '',
      enquiryTypeId: -1,
      creditCheckResult: '',
      siteAddress: '',
      cdmNotifiable: false,
      formOfContract: '',
      retention: '',
      liquidatedDamages: '',
      insurance: '',
      workTypeId: -1,
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
    projectApprovals: []
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};