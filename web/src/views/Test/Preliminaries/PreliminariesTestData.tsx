import Notify from "../../../enums/Notify";
import EventType from "../../../enums/EventType";
import { ILookupState } from "../../../store/Lookups/Types/ILookupState";
import { IProjectDetailState } from "../../../store/CustomerEnquiryForm/Types/IProjectDetailState";
export const preliminariesData:any =
  {
  preliminary :{
      preliminaryDetails:[{
        componentId: '1',
        componentName: 'H&S File Production',
        items: [
          {
            itemId: '1',
            itemName: 'Sub-Contractor',
            preliminaryId:'48315d81-3495-4904-b3ab-010966e27c31',
            nameOfSupplier: 'test',
            noOfHours: 0,
            hourRate: 0,
            totalCost: 0,
            grossMargin: 0,
            comments: 'test'
          }
        ]
      }],
  
  notify: Notify,
  event:EventType.none,
  lookup :{
      projectstatus:[{lookupId: 1,
        lookupItem: "Pre_Components",
        lookupKey: 1,
        description: "H&S File Production",
      },
      {lookupId: 2,
        lookupItem: "Pre_Component_Items",
        lookupKey: 1,
          description: "Sub-Contractor",
        }],
    currencies: [ 
        {currencyId: 1,
        currencyName: "test",
        currencySymbol: "$"
        }
    ],
    error: "test",
},
  project :{
    form: {
        currencyId: 1,
        status:4
    },
    enquiryOverview: {
        projectName: "test",
        companyId: "test",
        headOfProject: "test",
        projectManager: "test",
        scope: "test",
        cnNumber: "test"
    },
    error: "test",
    loading: false,
    notify: Notify,
    event: EventType,
    enquiryOverviewError:"test"
  }
}
}
export const lookUpInitialState: ILookupState = {
    projectstatus: [],
    languages: [],
    currencies: null,
    error: null
  };

  export const customerEnquiryInitialState: IProjectDetailState = {
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
  otherContractName: '',
    },
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none,
    enquiryOverviewError: null
  };


