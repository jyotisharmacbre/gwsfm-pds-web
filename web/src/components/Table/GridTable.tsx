import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { IGridTableProps } from '../../props/AppProps';
const GridTable: React.FC<IGridTableProps> = props => {
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
              <td data-column={yy.title}>{x[yy.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default GridTable;
