import { IUserServiceData } from "../../../../store/UserService/Types/IUserService";
import { IProjectPipelineGridState } from "../../../../store/pipeline/Types/IProjectPipelineGridState";
import moment from "moment";
import { ILookup } from "../../../../store/Lookups/Types/ILookup";
import { LookupItems } from "../../../../helpers/constants";
import { IDynamicContractCustomerData } from "../../../../store/DynamicsData/Types/IDynamicData";
import { ICurrency } from "../../../../store/Lookups/Types/ICurrency";

export const getUsersEmailData: Array<IUserServiceData> = [
    {
      id: '1',
      lastName: 'LastName',
      firstname: 'FirstName',
      email: 'last@name.test',
      displayName: 'DisplayName',
      groups: []
    }
  ];

export const pipelineGridData: IProjectPipelineGridState = {
  totalNumberOfRecord: 2,
  data: [{
    projectId: '1',
    projectRefId: 1,
    name: 'Name1',
    projectOwner: 'a',
    headOfProject: 'a',
    contractorId: 1,
    probabilityOfWinning: 1,
    lastModified: moment().toJSON(),
    status: '1',
    commenceDate: moment().toJSON(),
    approxValue: 0,
    contractTypeId: 0,
    cdmNotifiable: false,
    soldMargin: '2',
    weightedTCV: '3'
  },
  {
    projectId: '2',
    projectRefId: 1,
    name: 'Name2',
    projectOwner: 'a',
    headOfProject: 'a',
    contractorId: 2,
    probabilityOfWinning: 1,
    lastModified: moment().toJSON(),
    status: '1',
    commenceDate: moment().toJSON(),
    approxValue: 0,
    contractTypeId: 0,
    cdmNotifiable: false,
    soldMargin: '2',
    weightedTCV: '3'
  }],
  error: null,
  pipelineDetails: [{
        projectId: '1',
        projectRefId: 1,
        name: 'Name1',
        projectOwner: 'a',
        headOfProject: 'a',
        contractorId: 1,
        probabilityOfWinning: 1,
        lastModified: moment().toJSON(),
        status: '1',
        commenceDate: moment().toJSON(),
        approxValue: 0,
        contractTypeId: 0,
        cdmNotifiable: false,
        soldMargin: '2',
        weightedTCV: '3'
      },
      {
        projectId: '2',
        projectRefId: 1,
        name: 'Name2',
        projectOwner: 'a',
        headOfProject: 'a',
        contractorId: 2,
        probabilityOfWinning: 1,
        lastModified: moment().toJSON(),
        status: '1',
        commenceDate: moment().toJSON(),
        approxValue: 0,
        contractTypeId: 0,
        cdmNotifiable: false,
        soldMargin: '2',
        weightedTCV: '3'
      }],
      projectChartSummary: {
          data: [],
          loading: false,
          error: null
      }
};
export const intialLookupvalues: Array<ILookup> = [
  {
    lookupId: 1,
    lookupItem: LookupItems.Project_Status,
    lookupKey: 1,
    description: 'PrjStatus1'
  },
  {
    lookupId: 1,
    lookupItem: LookupItems.Project_Status,
    lookupKey: 2,
    description: 'PrjStatus2'
  }
];

export const customerContractList: Array<IDynamicContractCustomerData> = [{
  contractId: '1',
  contractName: 'Contractor1',
  customerId: '1',
  customerName: 'Customer1'
},
{
  contractId: '2',
  contractName: 'Contractor2',
  customerId: '2',
  customerName: 'Customer2'
}];
export const currenciesData: Array<ICurrency> = [
  {
    currencyId: 1,
    currencyName: 'string',
    currencySymbol: 'string',
    isActive: true
  }
]