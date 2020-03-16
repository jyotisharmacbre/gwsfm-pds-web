import ColumnTypeEnum from '../enums/ColumnTypeEnum';
import moment from 'moment';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import IQueryParams from '../models/tableQueryParams/IQueryParams';
import appConfig from '../helpers/config-helper';

const config = appConfig();
const dateFormat = config.REACT_APP_DATE_FORMAT;

export const columnFormatter = (cell, row, rowIndex, cellParams) => {
    if (!cellParams) return cell;

    switch (cellParams.type) {
        case ColumnTypeEnum.numeric:
        case ColumnTypeEnum.currency:
            return <div><span className='float-right'>{cell}</span>&nbsp;</div>;
        case ColumnTypeEnum.percentage:
            return <div><span className='float-right'>{cell + ' %'}</span> &nbsp;</div >;
        case ColumnTypeEnum.date:
            return cell ? moment(cell).format(dateFormat) : <div>&nbsp;</div>;
    }
}
export const sortCaret = (order, column) => {
    if (!order)
        return;
    else if (order === 'asc')
        return <FontAwesomeIcon className="active" icon={faArrowDown} />;

    else if (order === 'desc')
        return <FontAwesomeIcon className="active" icon={faArrowUp} />;

    return null;
};

export const setTableQueryParams = (params) => {
    let updatedParams: IQueryParams = {
        pagingParams: {
            pageIndex: params.page,
            pageSize: params.sizePerPage
        },
        sortingParams: {
            sortColumnName: params.sortField,
            sortOrder: params.sortOrder
        }
    }
    return updatedParams;
};

export const setURLParammsForGridTable = (history, path, queryParams: IQueryParams, isSort: boolean = true, isPagination: boolean = true) => {
    let queryString = '?';
    queryString += isPagination ? 'pageIndex=' + queryParams.pagingParams.pageIndex + '&pageSize=' + queryParams.pagingParams.pageSize : '';
    queryString += isPagination && isSort ? '&' : '';
    queryString += isSort ? 'sortField=' + queryParams.sortingParams.sortColumnName + '&sortOrder=' + queryParams.sortingParams.sortOrder : '';

    history.push({
        pathname: path,
        search: queryString
    });
    return history;
}

export const extractQueryParams = (locationSearch: string, defaultSortField: string, defaultPageIndex: number, defaultPageSize?: number) => {
    let result: IQueryParams;
    const query = new URLSearchParams(locationSearch);

    let pageIndex = query.get('pageIndex');
    let pageSize = query.get('pageSize');
    let sortField = query.get('sortField');
    let sortOrder = query.get('sortOrder');
    result = {
        pagingParams: {
            pageIndex: parseInt(pageIndex ?? defaultPageIndex.toString()),
            pageSize: pageSize ? parseInt(pageSize) : defaultPageSize
        },
        sortingParams: {
            sortColumnName: sortField ?? defaultSortField,
            sortOrder: sortOrder ?? 'desc'
        }
    };

    return result;
}