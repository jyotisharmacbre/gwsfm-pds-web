import { AppTypes } from "./PropTypes";
import { IProjectForm, IProjectFormAddAction } from "../session/ProjectForm/Type";

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
    HandleClick: () => void
}

export interface IProjectFormState {
    readonly projectname: string,
    readonly company: string;
    readonly customer_contract: string,
    readonly pmexperience: boolean;
    readonly projectmanager: string;
    readonly projectscope: string;
    readonly locale: string;
    invalidProjectName: boolean;
    invalidProjectManager: boolean;
    invalidCompany: boolean;
    invalidCustomerContract: boolean;
    invalidPMExperience: boolean;
    invalidProjectScope: boolean;
    invalidLocale: boolean;
}

export interface IProjectFormProps {
    handleClick: (data: any) => void;
    addToForm: (data: IProjectForm) => Promise<IProjectFormAddAction>;
    form: IProjectForm;
}
