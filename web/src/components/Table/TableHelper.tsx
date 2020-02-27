import ColumnTypeEnum from '../../enums/ColumnTypeEnum';
import moment from 'moment';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

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