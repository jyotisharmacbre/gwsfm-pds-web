import { AppTypes } from "./PropTypes";
import { IProjectForm, IProjectFormAddAction } from "../session/ProjectForm/Type";
import { IGetLocalesSuccessAction, IListItem, IGetCustomerContractSuccessAction } from "../session/ListItems/Type";

export interface IAppProps {
    Theme: any,
    UseStyles: any
}

export interface IHeaderPageProps {
    Title: string,
    ActionList?: IBtnActionProps[]
}

export interface IBtnActionProps {
    Title: string,
    Icon?: any,
    Color?: AppTypes.Color,
    HandleClick: () => void,
    isSubmit?: boolean
}

export interface IProjectFormProps {
    handleClick: (data: any) => void;
    addToForm: (data: IProjectForm) => Promise<IProjectFormAddAction>;
    getLocales: () => Promise<IGetLocalesSuccessAction>;
    getCustomerContracts: (name:string) => Promise<IGetCustomerContractSuccessAction>;
    form: IProjectForm;
    locales: IListItem[];
    customerContracts: IListItem[];
}
