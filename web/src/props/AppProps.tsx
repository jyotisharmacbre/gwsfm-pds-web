import { AppTypes } from "./PropTypes";

export interface IAppProps{
    Theme: any,
    UseStyles: any
}

export interface IHeaderPageProps
{
    Title:string,
    ActionList?: IBtnActionProps []
}

export interface IBtnActionProps
{
    Title: string,
    Icon?: any,
    Color?: AppTypes.Color,
    HandleClick:  ()=> void
}

export interface IProjectFormState {
    projectname: string,
    company: string;
    customer_contract: string,
    pmexperience: boolean,
    projectmanager: string,
    projectscope: string,
    locale: string
}

export interface IProjectFormProps {
    handleClick: (data:any) => void;
    addToForm: (data: any) => void;
     projectname: string,
     company: string;
     customer_contract: string,
     pmexperience: boolean,
     projectmanager: string,
     projectscope: string,
     locale: string
}

export interface ICreateProjectFormProps
{
    projectname: string,
    company: string;
    customer_contract: string,
    pmexperience: boolean,
    projectmanager: string,
    projectscope: string,
    locale: string
}