import { IProjectOverviewState } from "../Types/IProjectOverviewState";
import Notify from "../../../enums/Notify";
import EventType from "../../../enums/EventType";
import { ProjectApprovalRange, ProjectApproverType, ProjectSignOffStatus } from "../Types/ProjectApprovalEnums";
import { IProjectApprovals } from "../Types/IProjectApprovals";

export const existingProjectId = '1';
export const test_emailId_1: string = "test1@cbre.com";
export const test_emailId_2: string = "test2@cbre.com";

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
        projectApprovalRange: ProjectApprovalRange.Authorised_By,
        approverType: ProjectApproverType.HOP,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By',
        approverTypeDescription: 'HOP',
        showRangeLabel: true
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_100K,
        approverType: ProjectApproverType.AGMOrAD,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 100K',
        approverTypeDescription: 'AGM/AD',
        showRangeLabel: true
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_250K,
        approverType: ProjectApproverType.ComM,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 250K',
        approverTypeDescription: 'ComM',
        showRangeLabel: true
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_250K,
        approverType: ProjectApproverType.BUL,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 250K',
        approverTypeDescription: 'BUL',
        showRangeLabel: false
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_1_Million,
        approverType: ProjectApproverType.DPD,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 1 Million',
        approverTypeDescription: 'DPD',
        showRangeLabel: true
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_1_Million,
        approverType: ProjectApproverType.DMD,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 1 Million',
        approverTypeDescription: 'DMD',
        showRangeLabel: false
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million,
        approverType: ProjectApproverType.DofP,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 3 Million',
        approverTypeDescription: 'DofP',
        showRangeLabel: true
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million,
        approverType: ProjectApproverType.PComM,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 3 Million',
        approverTypeDescription: 'PComM',
        showRangeLabel: false
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_3_Million,
        approverType: ProjectApproverType.COOOrUKFD,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Authorised By Up to $ 3 Million',
        approverTypeDescription: 'COO/UKFD',
        showRangeLabel: false
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Over_CurrencySymbol_3_Million_Authority,
        approverType: ProjectApproverType.CEOOrGroupFD,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Over $ 3 Million Authority',
        approverTypeDescription: 'CEO/GroupFD',
        showRangeLabel: true
      },
      {
        projectApprovalId: '',
        projectId: '',
        projectApprovalRange: ProjectApprovalRange.Over_CurrencySymbol_4_And_half_Million,
        approverType: ProjectApproverType.CBRERegulations,
        approvalStatus: ProjectSignOffStatus.Pending,
        userId: '',
        approvalStatusDescription: 'Pending',
        projectApprovalRangeDescription: 'Over $ 4 and half Million',
        approverTypeDescription: 'CBRE Regulations',
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

export const existingProjectApprovalData: IProjectApprovals[] = [
  {
    projectApprovalId: '1',
    projectId: existingProjectId,
    projectApprovalRange: ProjectApprovalRange.Authorised_By,
    approverType: ProjectApproverType.HOP,
    approvalStatus: ProjectSignOffStatus.Pending,
    userId: test_emailId_1,
    approvalStatusDescription: 'Pending',
    projectApprovalRangeDescription: 'Authorised By',
    approverTypeDescription: 'HOP',
    showRangeLabel: true
  },
  {
    projectApprovalId: '2',
    projectId: existingProjectId,
    projectApprovalRange: ProjectApprovalRange.Authorised_By_Up_To_CurrencySymbol_100K,
    approverType: ProjectApproverType.AGMOrAD,
    approvalStatus: ProjectSignOffStatus.Pending,
    userId: test_emailId_2,
    approvalStatusDescription: 'Pending',
    projectApprovalRangeDescription: 'Authorised By Up to $ 100K',
    approverTypeDescription: 'AGM/AD',
    showRangeLabel: true
  }
]

