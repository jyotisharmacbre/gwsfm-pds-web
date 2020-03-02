import { ILookupState } from "../../../store/Lookups/Types/ILookupState";
import { IProjectPipelineGridState } from "../../../store/pipeline/Types/IProjectPipelineGridState";
import { IProjectDashboardGridState } from "../../../store/Dashboard/Types/IProjectDashboardGridState";

export const dashboardInitialState: IProjectDashboardGridState = {
    actionApprovalDetails: [{
        projectId: "2a6ad6e6-bbf8-4b01-a1d1-08d78d3194f2",
        name: 'Pending',
        approvalStatus: 1,
        modifiedOn: "02/13/2020",
        modifiedBy: "test@cbre.com"
    }],
    error: null
};

export const lookUpInitialState: ILookupState = {
    projectstatus: [{
        lookupId: 1,
        lookupItem: "Project_Status",
        lookupKey: 1,
        description: "InitialCustomerInquiry"
    }, {
        lookupId: 2,
        lookupItem: "Project_Status",
        lookupKey: 2,
            description: "Bid Lost"
    }, {
        lookupId: 3,
        lookupItem: "Project_Status",
        lookupKey: 3,
        description: "In Review"
        },
        {
            lookupId: 4,
            lookupItem: "Project_Approval_Sign_Off_Status",
            lookupKey: 1,
            description: "Pending"
        },
    ],
    countries: [],
    languages: [],
    lookups: [],
    currencies: null,
    error: null
};

export const pipelineInitialState: IProjectPipelineGridState = {
    data: [],
    totalNumberOfRecord:1,
    pipelineDetails: [],
    error: null,
    projectChartSummary: {
        data: [{
            name: '1',
            value: 30,
            class: '',
            percentage: ''
        }, {
            name: '2',
            value: 70,
            class: '',
            percentage: ''
        }],
        loading: false,
        error: null
    }
}