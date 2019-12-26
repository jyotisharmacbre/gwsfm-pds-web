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
    otherContractName:'',
    divisionId : '',
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
};