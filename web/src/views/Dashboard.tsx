import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Table from '../components/Table';
import TestTable from '../components/TestTable'

class Dashboard extends React.Component {

    constructor(props: any) {
        super(props);
    }

    GetButtons() {
        const action1: IBtnActionProps = {
            Title: 'Create A New Project',
            Icon: 'create',
            HandleClick: () => {
                alert('You clicked on Create a New Project')
            }
        };
        const action2: IBtnActionProps = {
            Title: 'Pipeline',
            Icon: 'pipeline',
            HandleClick: () => {
                window.location.href = '/Pipeline';
            }
        };
        return ([
            action1, action2]
        );
    }

    render() {
        return (
            <React.Fragment>
                <HeaderPage Title={'Overview'} ActionList={this.GetButtons()} />
                {/* <Table IsSuperManager = { true }/> */}
                <TestTable />
            </React.Fragment>
        );
    }
}

export default Dashboard;