import { IProjectOverviewState } from "../Types/IProjectOverviewState";
import Notify from "../../../enums/Notify";
import EventType from "../../../enums/EventType";

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
      commenceDate: "2019-12-17T11:53:25.003Z",
      completionDate: "2019-12-17T11:53:25.003Z",
      milestones: '',
      firstValuationDate: "2019-12-17T11:53:25.003Z",
      finalAccountDate: "2019-12-17T11:53:25.003Z",
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
        userId: ''
      }
    ]
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};