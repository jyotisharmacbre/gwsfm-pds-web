export interface IProjectFormState {
    readonly projectname: string,
    readonly company: string;
    readonly customer_contract: string,
    readonly pmexperience: boolean;
    readonly projectmanager: string;
    readonly projectscope: string;
    readonly locale: string;
    readonly headofproject:string;
    readonly cnnumber:string;
    readonly comments:string;
    readonly typeofengagement:string;
    readonly currency:string;
    readonly projectowner:string;
    readonly probofwinning?:number;
    readonly approximatevalue?:number;
    readonly contracttype:string;
    readonly cdmnotifiable:boolean;
    readonly projectstatus:string;
    readonly assetworkedonprimary:string;
    readonly assetworkedonsecond:string;
    readonly assetworkedonthird:string;
    readonly soldmargin?:number;
    readonly weightedtcv?:number;
    readonly rank?:number;
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
