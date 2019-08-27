import { IProjectFormState } from "../state";
import { ProjectFormActions } from "./Type";
import { Reducer } from "redux";

const initialState: IProjectFormState = {
    company: '',
    customer_contract: '',
    pmexperience: false,
    locale: '',
    projectscope: '',
    projectmanager: '',
    projectname: '',
    headofproject:'',
    cnnumber:'',
    comments:'',
    typeofengagement:'',
    currency:'',
    projectowner:'',
    probofwinning: undefined,
    approximatevalue: undefined,
    contracttype:'',
    cdmnotifiable:false,
    projectstatus:'',
    assetworkedonprimary:'',
    assetworkedonsecond:'',
    assetworkedonthird:'',
    soldmargin:undefined,
    weightedtcv:undefined,
    rank:undefined,
    validForm: false,
    invalidCompany: false,
    invalidCustomerContract: false,
    invalidLocale: false,
    invalidPMExperience: false,
    invalidProjectName: false,
    invalidProjectScope: false,
    invalidProjectManager: false,
    invalidApproxValue: false,
    invalidAssetsWorkedOnPrimary: false,
    invalidCMDNotifiable:false,
    invalidContractType:false,
    invalidCurrency:false,
    invalidProbOfWinning: false,
    invalidProjectOwner:false,
    invalidHeadOfProject: false,
    InvalidProjectOwner: false
};

const projectReducer: Reducer<IProjectFormState, ProjectFormActions> = (
    state = initialState, action,
) => {
    switch (action.type) {
        case 'GetProjectFormAction':
            {
                return {
                    ...state
                }
            }
        case 'ProjectFormAddAction':
            {
                return Object.assign({}, state, action.form);
            }

        default:
            return state
    }
}

export default projectReducer;