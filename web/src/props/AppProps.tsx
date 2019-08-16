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
    Color?: string,
    HandleClick:  ()=> void
}