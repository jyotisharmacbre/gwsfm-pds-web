import Notify from '../../../enums/Notify';
import EventType from '../../../enums/EventType';

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
  comment: 'Test'
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
