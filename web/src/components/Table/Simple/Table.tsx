import React from 'react';
import MaterialTable from 'material-table';
import { ITableProps } from '../../../props/AppProps';
import './Table.css';
import { PageBtnActions } from '../../BtnActions/BtnActions';

const Table: React.FC<ITableProps> = props => {
  const onRowClick = (
    e: React.MouseEvent<Element, MouseEvent> | undefined,
    rowData: any
  ) => {
    if (props.onRowClick !== undefined) {
      props.onRowClick(e, rowData);
    }
  };

  return (
    <React.Fragment>
      <MaterialTable
        title=""
        columns={props.columns}
        data={props.data}
        options={{
          filtering: false,
          search: false,
          paging: true
        }}
        onRowClick={onRowClick}
      />
      <div style={{ textAlign: 'right' }}>
        <PageBtnActions Actions={props.ActionList} />
      </div>
    </React.Fragment>
  );
};

export default Table;
