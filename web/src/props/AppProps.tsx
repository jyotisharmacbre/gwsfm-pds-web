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
    Icon: any,
    Css?: any,
    HandleClick:  ()=> void
}