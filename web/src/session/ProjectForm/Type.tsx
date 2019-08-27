import { Action } from 'redux';

export type PROJECTFORM_ADD = 'PROJECTFORM_ADD';

export interface IProjectForm {
    projectname: string;
    company: string;
    customer_contract: string;
    pmexperience: boolean;
    projectmanager: string;
    projectscope: string;
    locale: string;
    headofproject:string;
    cnnumber:string;
    comments:string;
    typeofengagement:string;
    currency:string;
    projectowner:string;
    probofwinning?:number;
    approximatevalue?:number;
    contracttype:string;
    cdmnotifiable:boolean;
    projectstatus:string;
    assetworkedonprimary:string;
    assetworkedonsecond:string;
    assetworkedonthird:string;
    soldmargin?:number;
    weightedtcv?:number;
    rank?:number;
    validForm: boolean;
    invalidCurrency: boolean;
    invalidProjectOwner: boolean;
    invalidProbOfWinning:boolean;
    invalidApproxValue: boolean;
    invalidContractType:boolean;
    invalidCMDNotifiable:boolean;
    invalidAssetsWorkedOnPrimary:boolean;
    invalidProjectName: boolean;
    invalidCompany: boolean;
    invalidCustomerContract: boolean;
    invalidPMExperience: boolean;
    invalidProjectScope: boolean;
    invalidLocale: boolean;
    invalidProjectManager: boolean;
    invalidHeadOfProject: boolean;
    InvalidProjectOwner: boolean;
}

export interface IGetProjectFormAction extends Action<'GetProjectFormAction'>{

}

export interface IProjectFormAddAction extends Action<'ProjectFormAddAction'> {
    form: IProjectForm;
}

export type ProjectFormActions = IGetProjectFormAction| IProjectFormAddAction;