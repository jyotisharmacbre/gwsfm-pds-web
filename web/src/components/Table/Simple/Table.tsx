import React from 'react';
import MaterialTable from 'material-table';
import { ITableProps } from '../../../props/AppProps';
import './Table.css';
import { PageBtnActions } from '../../BtnActions/BtnActions';
import { HtmlAttributes } from 'csstype';


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
        onRowClick={(e: React.MouseEvent<Element, MouseEvent>|undefined, rowData:any)=> alert("hello" + rowData.name)}
      />
      <div style={{ textAlign: 'right' }}>
        <PageBtnActions Actions={props.ActionList} />
      </div>
    </React.Fragment>

  )
}

export default Table;