import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { IGridTableProps } from '../../props/AppProps';
import ColumnTypeEnum from '../../enums/ColumnTypeEnum';
import moment from 'moment';
const GridTable: React.FC<IGridTableProps> = props => {
  const getColumnValue = (col, arr) => {
    switch (col.type) {
      case ColumnTypeEnum.numeric:
      case ColumnTypeEnum.currency:
        return <span className='float-right'>{arr[col.field]}</span>;
      case ColumnTypeEnum.percentage:
        return <span className='float-right'> {arr[col.field] + ' %'}</span>;
      case ColumnTypeEnum.date:
        return arr[col.field] ? moment(arr[col.field]).format('MM/DD/YYYY') : '';
    }
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
              <td data-column={yy.title}>{yy.type ? getColumnValue(yy, x) : x[yy.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default GridTable;
