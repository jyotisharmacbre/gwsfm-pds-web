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

export interface IProjectFormProps {
    handleClick: (data: any) => void;
    addToForm: (data: IProjectForm) => Promise<IProjectFormAddAction>;
    form: IProjectForm;
}
