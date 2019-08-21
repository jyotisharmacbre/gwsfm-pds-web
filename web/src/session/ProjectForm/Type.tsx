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
}

export interface IGetProjectFormAction extends Action<'GetProjectFormAction'>{

}

export interface IProjectFormAddAction extends Action<'ProjectFormAddAction'> {
    form: IProjectForm;
}

export type ProjectFormActions = IGetProjectFormAction| IProjectFormAddAction;