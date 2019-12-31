import { IProjectOverviewState } from '../../../../store/ProjectOverviewForm/Types/IProjectOverviewState';
import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';

export const initialState: IProjectOverviewState = {
  form: {
    projectId: '',
    projectAdditionalDetail: {
      projectAddDetailId: '',
      projectId: '',
      mainContractor: '',
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
      authorizedByThird: '',
      projectRisk1: '',
      projectRisk2: '',
      projectRisk3: '',
      projectRiskControlMeasure1: '',
      projectRiskControlMeasure2: '',
      projectRiskControlMeasure3: ''
    },
    projectApprovals: [
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: '',
        approverType: '',
        approvalStatus: '',
        userId: '',
        approvalStatusDescription: '',
        projectApprovalRangeDescription: '',
        approverTypeDescription: '',
        showRangeLabel: true
      }
    ]
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none,
  initialStateSetForProjectApprovals: false

};

export const getProjectOverviewData: IProjectOverviewState = {
  form: {
    projectId: '1',
    projectAdditionalDetail: {
      projectAddDetailId: '1',
      projectId: '1',
      mainContractor: '1',
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
      authorizedByThird: '',
      projectRisk1: '',
      projectRisk2: '',
      projectRisk3: '',
      projectRiskControlMeasure1: '',
      projectRiskControlMeasure2: '',
      projectRiskControlMeasure3: ''
    },
    projectApprovals: [
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: '',
        approverType: '',
        approvalStatus: '',
        userId: '',
        approvalStatusDescription: '',
        projectApprovalRangeDescription: '',
        approverTypeDescription: '',
        showRangeLabel: true
      }
    ]
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none,
  initialStateSetForProjectApprovals: false
};
