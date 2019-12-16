import { IProjectDetailState } from "../../../../store/CustomerEnquiryForm/Types/IProjectDetailState";
import Notify from "../../../../enums/Notify";
import EventType from "../../../../enums/EventType";

export let leftMenuProjectData:IProjectDetailState={
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
        otherContractName:''
      },
      enquiryOverview: {
        projectName: '',
        companyId: '',
        headOfProject: '',
        projectManager: '',
        scope: '',
        cnNumber: ''
      },
      error: null,
      loading: false,
      notify: Notify.none,
      event: EventType.none,
      enquiryOverviewError: null
}