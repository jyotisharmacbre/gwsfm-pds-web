import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import Table from '../components/Table/Simple/Table';
import {
  INotificationViewProps,
  INotificationViewState
} from '../props/AppProps';

class Notifications extends React.Component<
  INotificationViewProps,
  INotificationViewState
> {
  constructor(props: INotificationViewProps) {
    super(props);
    this.state = {
      tableData: []
    };
  }
  getColoumns = () => {
    return [
      {
        title: 'Id',
        field: 'id',
        hidden: true
      },
      {
        title: 'Name',
        field: 'name',
        /* istanbul ignore next */
        customFilterAndSearch: (term: any, rowData: any) =>
          (term = rowData.name.length)
      },
      { title: 'Updated By', field: 'updatedby' },
      { title: 'Date', field: 'date', type: 'date' },
      {
        title: 'Status',
        field: 'status',
        lookup: { 1: 'Manage', 2: 'Completed', 3: 'View' }
      }
    ];
  };

  getData = () => {
    var data = [
      {
        id: 5,
        name: 'Aprroval Request',
        updatedby: 'Stacy Salter',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        id: 58,
        name: 'New Project - DN9090 Created',
        updatedby: 'Hame Moore',
        date: new Date('07/21/1987'),
        status: 3
      },
      {
        id: 7,
        name: 'Approval Request',
        updatedby: 'Lucy Benner',
        date: new Date('07/21/1987'),
        status: 1
      },
      {
        id: 3,
        name: 'Project PL7898',
        updatedby: 'Imran Khan',
        date: new Date('07/21/1987'),
        status: 2
      },
      {
        id: 4,
        name: 'Project ORT898 Rejected',
        updatedby: 'Jacy Lue',
        date: new Date('07/21/1987'),
        status: 3
      },
      {
        id: 6,
        name: 'Gregory Nash Approval',
        updatedby: 'Stirlin Archer',
        date: new Date('07/21/1987'),
        status: 3
      }
    ];

    var state = Object.assign({}, this.state, { tableData: data });

    this.setState(state);
  };

  onRowClick = (
    e: React.MouseEvent<Element, MouseEvent> | undefined,
    rowData: any
  ) => {
    /* istanbul ignore next */
    alert(rowData.id);
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <React.Fragment>
        <HeaderPage Title={'Notifications'} />
        <Table
          columns={this.getColoumns()}
          data={this.state.tableData}
          ActionList={[]}
          onRowClick={this.onRowClick}
        />
      </React.Fragment>
    );
  }
}

export default Notifications;
