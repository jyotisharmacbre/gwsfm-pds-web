import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import { ITableProps, IBtnActionProps } from '../props/AppProps';
import './Table.css';
import { PageBtnActions } from './BtnActions';


const Table: React.FC<ITableProps> = (props) => {

  return (
    <React.Fragment>
      <MaterialTable
        title=""
        columns={props.columns}
        data={props.data}
        options={{
          filtering: false,
          search: false,
          paging: false
        }}
      />
      <div style={{ textAlign: 'right' }}>
        <PageBtnActions Actions={props.ActionList} />
      </div>
    </React.Fragment>

  )
}

export default Table;