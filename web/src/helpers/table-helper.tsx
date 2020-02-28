import ColumnTypeEnum from '../enums/ColumnTypeEnum';
import moment from 'moment';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import SortOrder from '../enums/SortOrder';
import IQueryParams from '../models/tableQueryParams/IQueryParams';

export const columnFormatter = (cell, row, rowIndex, cellParams) => {
    if (!cellParams) return cell;

    switch (cellParams.type) {
        case ColumnTypeEnum.numeric:
        case ColumnTypeEnum.currency:
            return <span className='float-right'>{cell}</span>;
        case ColumnTypeEnum.percentage:
            return <span className='float-right'> {cell + ' %'}</span>;
        case ColumnTypeEnum.date:
            return cell ? moment(cell).format('MM/DD/YYYY') : '';
    }
}
export const sortCaret = (order, column) => {
    if (!order)
        return;
    else if (order === 'asc')
        return (<FontAwesomeIcon className="active" icon={faArrowDown} />);

    else if (order === 'desc')
        return (<FontAwesomeIcon className="active" icon={faArrowUp} />);

    return null;
};

export const setTableQueryParams = (params) => {
    let updatedParams = {
        pagingParams: {
            pageIndex: params.page,
            pageSize: params.sizePerPage
        },
        sortingParams: {
            sortColumnName: params.sortField,
            sortOrder: (params.sortOrder?.toLowerCase() == "asc" ? SortOrder.asc : SortOrder.desc)
        }
    }
    return updatedParams;

};
export const setURLParammsForGridTable = (history, path, queryParams) => {
    history.push({
        pathname: path,
        search:
            "?pageIndex=" + queryParams.pagingParams.pageIndex +
            "&pageSize=" + queryParams.pagingParams.pageSize +
            "&sortField=" + queryParams.sortingParams.sortColumnName +
            "&sortOrder=" + SortOrder[queryParams.sortingParams.sortOrder]
    })
}

export const extractQueryParams = (locationSearch: string, defaultSortField: string, defaultPageIndex: number, defaultPageSize: number) => {
    let result: IQueryParams;
    const query = new URLSearchParams(locationSearch);

    let pageIndex = query.get('pageIndex');
    let pageSize = query.get('pageSize');
    let sortField = query.get('sortField');
    let sortOrder = query.get('sortOrder');
    result = {
        pagingParams: {
            pageIndex: parseInt(pageIndex ?? defaultPageIndex.toString()),
            pageSize: parseInt(pageSize ?? defaultPageSize.toString())
        },
        sortingParams: {
            sortColumnName: sortField ?? defaultSortField,
            sortOrder: sortOrder ? SortOrder[sortOrder] : SortOrder.desc
        }
    };

    return result;
}