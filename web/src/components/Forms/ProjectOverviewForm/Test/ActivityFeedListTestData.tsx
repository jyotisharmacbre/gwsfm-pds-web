import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import { ILookupState } from '../../../../store/Lookups/Types/ILookupState';
import { IProjectDetailState } from '../../../../store/CustomerEnquiryForm/Types/IProjectDetailState';
import { IProjectOverviewState } from '../../../../store/ProjectOverviewForm/Types/IProjectOverviewState';
import ProjectApprovalActivityType from '../../../../enums/ProjectApprovalActivityType';
import moment from 'moment';
import { LookupType } from '../../../../store/Lookups/Types/LookupType';
import { IProjectApprovalActivitiy } from '../../../../store/ProjectOverviewForm/Types/IProjectApprovalActivitiy';
export const preliminariesData: any = {
	preliminary: {
		preliminaryDetails: [
			{
				componentId: '1',
				componentName: 'H&S File Production',
				items: [
					{
						itemId: '1',
						itemName: 'Sub-Contractor',
						preliminaryId: '48315d81-3495-4904-b3ab-010966e27c31',
						nameOfSupplier: 'test',
						noOfHours: 0,
						hourRate: 0,
						totalCost: 0,
						grossMargin: 0,
						comments: 'test'
					}
				]
			}
		],

		notify: Notify,
		event: EventType.none,
		lookup: {
			projectstatus: [
				{
					lookupId: 1,
					lookupItem: 'Pre_Components',
					lookupKey: 1,
					description: 'H&S File Production'
				},
				{
					lookupId: 2,
					lookupItem: 'Pre_Component_Items',
					lookupKey: 1,
					description: 'Sub-Contractor'
				}
			],
			currencies: [
				{
					currencyId: 1,
					currencyName: 'test',
					currencySymbol: '$',
					isActive: true
				}
			],
			error: 'test'
		},
		project: {
			form: {
				currencyId: 1,
				status: 4
			},
			enquiryOverview: {
				projectName: 'test',
				companyId: 'test',
				headOfProject: 'test',
				projectManager: 'test',
				scope: 'test',
				cnNumber: 'test'
			},
			error: 'test',
			loading: false,
			notify: Notify,
			event: EventType,
			enquiryOverviewError: 'test'
		}
	}
};
export const lookUpInitialState: ILookupState = {
	projectstatus: [],
	countries: [],
	languages: [],
	lookups: [{
		lookupId: 1,
		lookupItem: LookupType.Project_Approver_Type,
		lookupKey: 1,
		description: 'string'
	}, {
		lookupId: 2,
		lookupItem: LookupType.Project_Approver_Type,
		lookupKey: 2,
		description: 'string2',
	}],
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
		otherContractName: '',
		divisionId: '',
		businessUnitId: '',
		soldMargin: undefined,
		otherEngagementType: '',
		otherFirstAssetWorkedOn: '',
		otherSecondAssetWorkedOn: '',
		otherThirdAssetWorkedOn: '',
		otherDivision: '',
		otherBusinessUnit: ''
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

export const dynamicsInitialState = {
	contractId: '',
	contractName: '',
	customerId: '',
	customerName: ''
};
export const initialStatePO: IProjectOverviewState = {
	form: {
		projectId: '1',
		projectAdditionalDetail: {
			projectAddDetailId: '',
			projectId: '',
			mainContractor: '',
			enquiryReceivedFrom: '',
			enquiryTypeId: 0,
			creditCheckResult: '',
			siteAddress: '',
			cdmNotifiable: false,
			formOfContract: '',
			retention: '',
			liquidatedDamages: '',
			insurance: '',
			workTypeId: 0,
			commenceDate: new Date().toJSON(),
			completionDate: new Date().toJSON(),
			milestones: '',
			firstValuationDate: new Date().toJSON(),
			finalAccountDate: new Date().toJSON(),
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
		projectApprovals: []
	},
	error: null,
	loading: false,
	notify: Notify.none,
	event: EventType.none,
	initialStateSetForProjectApprovals: false,
	projectActivities: {
		error: null,
		loading: false,
		notify: Notify.none,
		data: [{
			projectActivityId: '1',
			projectId: '1',
			approverType: 1,
			userId: '1',
			query: '1',
			activityType: ProjectApprovalActivityType.SystemGenerated,
			createdBy: '1',
			createdOn: moment().toJSON()
		}, {
			projectActivityId: '2',
			projectId: '1',
			approverType: 2,
			userId: '2',
			query: '1',
			activityType: ProjectApprovalActivityType.SystemGenerated,
			createdBy: '2',
			createdOn: moment().add(1, 'day').toJSON()
		}]
	}
};
export const InitialEmailsForUsersState = {
	activityFeedUserServiceData: [{
		id: '1',
		lastName: 'lastName1',
		firstname: 'FirstName1',
		email: '1',
		displayName: 'User1',
		groups: []
	},
	{
		id: '2',
		lastName: 'lastName2',
		firstname: 'FirstName2',
		email: '2',
		displayName: 'User2',
		groups: []
	}]
};
