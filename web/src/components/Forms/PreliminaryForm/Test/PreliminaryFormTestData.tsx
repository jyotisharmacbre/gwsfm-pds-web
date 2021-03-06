import { IPreliminariesComponentDetails } from '../../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { ICurrency } from '../../../../store/Lookups/Types/ICurrency';
import { ILookupState } from '../../../../store/Lookups/Types/ILookupState';
import { IProjectDetailState } from '../../../../store/CustomerEnquiryForm/Types/IProjectDetailState';
import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';

export const preliminaryComponentIdList: Array<string> = ["1"]
export const preliminariuserData: Array<IPreliminariesComponentDetails> = [

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
            },
            {
                itemId: '2',
                itemName: 'Sub-Contractor-second',
                preliminaryId: '',
                nameOfSupplier: 'test',
                noOfHours: 0,
                hourRate: 0,
                totalCost: 0,
                grossMargin: 0,
                comments: 'test'
            }
        ]
    }
];
export const currencies: Array<ICurrency> = [

    {
        currencyId: 1,
        currencyName: 'en',
        currencySymbol: "$",
        isActive: true
    }

];
export const lookupState: ILookupState = {
    currencies: currencies,
    countries: [],
    languages: [],
    projectstatus: [],
    lookups: [],
    error: null
}

export const projectDetail: IProjectDetailState = {
    form: {
        projectId: '',
        name: '',
        contractorId: "1",
        companyId: "1",
        headOfProject: '',
        projectManager: '',
        pmHasExperience: true,
        scope: '',
        cnNumber: "2",
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
        comment: '',
        otherCompanyName: '',
        otherContractName: '',
        divisionId: '',
        businessUnitId: '',
        soldMargin: 0,
        otherEngagementType: '',
        otherFirstAssetWorkedOn: '',
        otherSecondAssetWorkedOn: '',
        otherThirdAssetWorkedOn: '',
        otherDivision: '',
        otherBusinessUnit: ''
    },
    enquiryOverview: {
        projectName: '',
        contractorId: '1',
        headOfProject: '',
        projectManager: '',
        scope: '',
        cnNumber: '1',
        otherContractName: ''
    },
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none,
    enquiryOverviewError: null
}
export const preliminariBlankData: Array<IPreliminariesComponentDetails> = [

    {
        componentId: '1',
        componentName: 'H&S File Production',
        items: [
            {
                itemId: '1',
                itemName: 'Sub-Contractor',
                preliminaryId: '',
                nameOfSupplier: 'test',
                noOfHours: 0,
                hourRate: 0,
                totalCost: 0,
                grossMargin: 0,
                comments: 'test'
            }
        ]
    },
    {
        componentId: '13',
        componentName: 'Insurance',
        items: [
            {
                itemId: '1',
                itemName: 'Sub-Contractor',
                preliminaryId: '',
                nameOfSupplier: 'test',
                noOfHours: 0,
                hourRate: 0,
                totalCost: 0,
                grossMargin: 0,
                comments: 'test'
            }
        ]
    }
];