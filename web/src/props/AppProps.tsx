import { Color } from './PropTypes';

import IQueryParams from '../models/tableQueryParams/IQueryParams';

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
  Color?: Color;
  LinkTo?: string;
  HandleClick?: () => void;
  isSubmit?: boolean;
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
export interface IGridTableProps {
  columns: any[];
  data: any[];
  ActionList: IBtnActionProps[];
  sorting: boolean;
  pagination?: boolean;
  className: string;
  onRowClick?: (
    e: React.MouseEvent<Element, MouseEvent> | undefined,
    rowData: any
  ) => void;
  onTableChange?: (type, params) => void;
  totalSize?: number;
  queryParams?: IQueryParams;
  intl?: any,

}
export interface ITableFilterProps extends ITableProps { }

export interface INotificationViewProps {
  tableData: [];
}

export interface INotificationViewState {
  tableData: [];
}
