import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { IGridTableProps } from '../../props/AppProps';
import ColumnTypeEnum from '../../enums/ColumnTypeEnum';
import moment from 'moment';
import appConfig from '../../helpers/config-helper';

const config = appConfig();
const dateFormat = config.REACT_APP_DATE_FORMAT;

const GridTable: React.FC<IGridTableProps> = props => {
    const getColumnValue = (col, arr) => {
        let className = '';
        let value = arr[col.field];
        switch (col.type) {
            case ColumnTypeEnum.numeric:
            case ColumnTypeEnum.currency:
                className = 'float-right';
            case ColumnTypeEnum.percentage:
                {
                    className = 'float-right';
                    value = arr[col.field] + ' %';
                }
            case ColumnTypeEnum.date:
                {
                    value = arr[col.field] ? moment(arr[col.field]).format(dateFormat) : '';
                }
        }
        if (col.class) {
            className = className == '' ? arr[col.class] : className + ' ' + arr[col.class];
        }
        return <span className={className}> {value}</span>;
    };
    return (
        <table className={`${props.className} table_responsive`}>
            <thead>
                <tr>
                    {props.columns.map(x => (
                        <th>
                            {x.title}
                            {props.sorting ? (
                                <FontAwesomeIcon className="active" icon={faArrowDown} />
                            ) : null}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map(x => (
                    <tr>
                        {props.columns.map(yy => (
                            <td data-column={yy.title}>{getColumnValue(yy, x)}&nbsp;</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default GridTable;
