import { IUserServiceData } from "../../../../store/UserService/Types/IUserService";
import { IProjectPipelineGridState } from "../../../../store/pipeline/Types/IProjectPipelineGridState";
import moment from "moment";
import { ILookup } from "../../../../store/Lookups/Types/ILookup";
import { LookupItems } from "../../../../helpers/constants";
import { IDynamicContractCustomerData } from "../../../../store/DynamicsData/Types/IDynamicData";
import { ICurrency } from "../../../../store/Lookups/Types/ICurrency";
import { IProjectPipelineGrid } from "../../../../store/pipeline/Types/IProjectPipelineGrid";

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
    loading: false,
    data: [{
        projectId: '1',
        projectRefId: 1,
        name: 'Name1',
        projectOwner: 'a',
        headOfProject: 'a',
        contractorId: '1',
        probabilityOfWinning: 1,
        lastModified: moment().toJSON(),
        status: '1',
        commenceDate: moment().toJSON(),
        approxValue: 0,
        contractTypeId: 0,
        cdmNotifiable: false,
        soldMargin: '2',
        weightedTCV: '3',
        projectStatusDescription: 'status',
        contractTypeDescription: 'type'
    },
    {
        projectId: '2',
        projectRefId: 1,
        name: 'Name2',
        projectOwner: 'a',
        headOfProject: 'a',
        contractorId: '2',
        probabilityOfWinning: 1,
        lastModified: moment().toJSON(),
        status: '1',
        commenceDate: moment().toJSON(),
        approxValue: 0,
        contractTypeId: 0,
        cdmNotifiable: false,
        soldMargin: '2',
        weightedTCV: '3',
        projectStatusDescription: 'status',
        contractTypeDescription: 'type'
    }],
    error: null,
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
        currencySymbol: '$',
        isActive: true
    },
    {
        currencyId: 2,
        currencyName: 'string',
        currencySymbol: '£',
        isActive: true
    }
]

export const excelPipelineData = [{
    projectId: '1',
    projectRefId: 1,
    name: 'Name1',
    projectOwner: 'test@test.com',
    headOfProject: 'a',
    contractorId: "1",
    probabilityOfWinning: 1,
    lastModified: '03/03/2020',
    status: '1',
    commenceDate: '03/03/2020',
    approxValue: 0,
    contractTypeId: 1,
    cdmNotifiable: false,
    soldMargin: '2',
    weightedTCV: '3',
    rank: "",
    currencyId: 1
},
{
    projectId: '2',
    projectRefId: 2,
    name: 'Name2',
    projectOwner: 'test2@test.com',
    headOfProject: 'a',
    contractorId: "2",
    probabilityOfWinning: 1,
    lastModified: '03/03/2020',
    status: '1',
    commenceDate: '03/03/2020',
    approxValue: 0,
    contractTypeId: 2,
    cdmNotifiable: false,
    soldMargin: '2',
    weightedTCV: '3',
    rank: "",
    currencyId: 2
}];

export const emails = [{
    id: null,
    lastName: "t2",
    firstname: "t1",
    email: "test@test.com",
    displayName: "t2, t1 @ test",
    groups: null
},
{
    id: null,
    lastName: "t4",
    firstname: "t3",
    email: "test2@test.com",
    displayName: "t4, t3 @ test",
    groups: null
}]

export const clients = [{
    contractId: "2",
    contractName: "Exchange Tower",
    customerId: "SL00193",
    customerName: "Caretown Ltd",
    isCustomerDeleted: 0,
    isContractDeleted: 0
}]

export const expectedExportExcelData = [
    {
        MESSAGE_PROJECT_ID: 1,
        MESSAGE_PROJECT_NAME: 'Name1',
        LABEL_CLIENT_CUSTOMER: '1',
        LABEL_LAST_UPDATE: "03/03/2020",
        LABEL_STATUS: 'PrjStatus1',
        LABEL_EXPECTED_START_DATE: '03/03/2020',
        LABEL_APPROX_VALUE: '$0',
        LABEL_HEAD_OF_PROJECT: "t2, t1 @ test"
    },
    {
        MESSAGE_PROJECT_ID: 2,
        MESSAGE_PROJECT_NAME: 'Name2',
        LABEL_CLIENT_CUSTOMER: 'Caretown Ltd',
        LABEL_LAST_UPDATE: "03/03/2020",
        LABEL_STATUS: 'PrjStatus1',
        LABEL_EXPECTED_START_DATE: '03/03/2020',
        LABEL_APPROX_VALUE: '£0',
        LABEL_HEAD_OF_PROJECT: "t4, t3 @ test"
    }
]