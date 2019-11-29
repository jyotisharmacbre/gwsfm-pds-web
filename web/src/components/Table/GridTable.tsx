import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ITableProps } from '../../props/AppProps';
const GridTable: React.FC<ITableProps> = props => {
  return (
    <table className="price-table">
      <thead>
        <tr>
          {props.columns.map(x => (
            <th>
              {x.title}
              <FontAwesomeIcon className="active" icon={faArrowDown} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map(x => (
          <tr>
            {props.columns.map(yy => (
              <td>{x[yy.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default GridTable;
