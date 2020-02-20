import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

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
  const products = [
    {
      id: 1,
      name: 'amit',
      price: '123'
    },
    {
      id: 2,
      name: 'sumit',
      price: '345'
    },
    {
      id: 3,
      name: 'akash',
      price: '345'
    },
    {
      id: 4,
      name: 'ruchi',
      price: '345'
    }

  ];
  const columns = [{
    dataField: 'id',
    text: 'Product ID',
    sort: true
  }, {
    dataField: 'name',
    text: 'Product Name',
    sort: true
  }, {
    dataField: 'price',
    text: 'Product Price',
    sort: true
  }];
  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];
  return (

    // <div>
    //   <BootstrapTable keyField='id' data={products} columns={columns} />
    // </div>

    <BootstrapTable
      keyField="id"
      data={products}
      columns={columns}
      defaultSorted={defaultSorted}
    />
  );
}
export default GridTable;
