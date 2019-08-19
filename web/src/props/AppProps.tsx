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