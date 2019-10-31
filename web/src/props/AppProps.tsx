import { AppTypes } from './PropTypes';
import {
  IProjectForm,
  IProjectFormAddAction
} from '../session/ProjectForm/Type';
import { IFilter, IFilterAddAction } from '../session/Filters/Type';
import {
  IGetLocalesSuccessAction,
  IListItem,
  IGetCustomerContractSuccessAction
} from '../session/ListItems/Type';
import {
  IGetNotificationSuccessAction,
  INotification
} from '../session/Notification/Type';

export interface IAppProps {
  Theme: any;
  UseStyles: any;
}

export interface INaveState {
  open: boolean;
}

export interface IHeaderPageProps {
  Title: string;
  ActionList?: IBtnActionProps[];
}

export interface IBtnActionProps {
  Title: string;
  Icon?: any;
  Color?: AppTypes.Color;
  LinkTo?: string;
  HandleClick?: () => void;
  isSubmit?: boolean;
}

export interface IProjectFormProps {
  handleClick: (data: any) => void;
  addToForm: (data: IProjectForm) => Promise<IProjectFormAddAction>;
  getLocales: () => Promise<IGetLocalesSuccessAction>;
  getCustomerContracts: (
    name: string
  ) => Promise<IGetCustomerContractSuccessAction>;
  form: IProjectForm;
  locales: IListItem[];
  customerContracts: IListItem[];
}

export interface IFilterProps {
  handleClick: (data: any) => void;
  addToFilter: (data: IFilter) => Promise<IFilterAddAction>;
  getLocales: () => Promise<IGetLocalesSuccessAction>;
  getCustomerContracts: (
    name: string
  ) => Promise<IGetCustomerContractSuccessAction>;
  form: IFilter;
  locales: IListItem[];
  customerContracts: IListItem[];
}

export interface ICardComponentProps {
  Title: string;
}

export interface ITableProps {
  columns: any[];
  data: any[];
  ActionList: IBtnActionProps[];
  onRowClick?: (
    e: React.MouseEvent<Element, MouseEvent> | undefined,
    rowData: any
  ) => void;
}

export interface ITableFilterProps extends ITableProps {}

export interface INotificationProps {
  handleClick: () => void;
  getNotificationCount: () => Promise<IGetNotificationSuccessAction>;
  data: INotification;
}

export interface INotificationViewProps {
  tableData: [];
}

export interface INotificationViewState {
  tableData: [];
}
