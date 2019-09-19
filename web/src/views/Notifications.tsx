
import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import Table from '../components/Table/Simple/Table';


class Notifications extends React.Component {

    getColoumns = ()=>{
        return [
            {
              title: 'Name',
              field: 'name',
              customFilterAndSearch: (term: any, rowData:any) => term == rowData.name.length
            },
            { title: 'Updated By', field: 'updatedby' },
            { title: 'Date', field: 'date', type: 'date' },
            {
              title: 'Status',
              field: 'status',
              lookup: { 1: 'Manage', 2: 'Completed', 3: 'View' },
            },
          ];
    }

    getData = ()=>{
        return [
            { name: 'Aprroval Request', updatedby: 'Stacy Salter', date: new Date('07/21/1987'), status: 1 },
            { name: 'New Project - DN9090 Created', updatedby: 'Hame Moore', date: new Date('07/21/1987'), status: 3 },
            { name: 'Approval Request', updatedby: 'Lucy Benner', date: new Date('07/21/1987'), status: 1 },
            { name: 'Project PL7898', updatedby: 'Imran Khan', date: new Date('07/21/1987'), status: 2 },
            { name: 'Project ORT898 Rejected', updatedby: 'Jacy Lue', date: new Date('07/21/1987'), status: 3 },
            { name: 'Gregory Nash Approval', updatedby: 'Stirlin Archer', date: new Date('07/21/1987'), status: 3 },
        ];
    }

    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Notifications'}  />
                 <Table columns={this.getColoumns()} data={this.getData()} ActionList={[]}/>
            </React.Fragment>
        );
    }
}

export default Notifications;