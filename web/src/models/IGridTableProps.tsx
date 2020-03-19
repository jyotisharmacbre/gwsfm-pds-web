import { IBtnActionProps } from "./IBtnActionProps";
import IQueryParams from "./tableQueryParams/IQueryParams";

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