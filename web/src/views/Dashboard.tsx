import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
import Table from '../components/Table/Simple/Table';

import Grid from '@material-ui/core/Grid';
import MultipleChart from '../components/Charts/MultipleCharts';
import PreferredChart from '../components/Charts/PreferredChart';
import RunRateChart from '../components/Charts/RunRateChart';
import CardContainer from '../components/CardContainer/CardContainer';

class Dashboard extends React.Component {

    constructor(props: any) {
        super(props);
    }

    GetButtons() {
        const action1: IBtnActionProps = {
            Title: 'Create A New Project',
            Icon: 'create',
            Color: 'primary',
            HandleClick: () => {
                window.location.href = '/Project';
            }
        };
        const action2: IBtnActionProps = {
            Title: 'Pipeline',
            Icon: 'pipeline',
            Color: 'secondary',
            HandleClick: () => {
                window.location.href = '/Pipeline';
            }
        };
        return ([
            action1, action2]
        );
    }

    viewAll: IBtnActionProps = {
        Title: 'View All',
        Icon: '',
        Color: 'secondary',
        HandleClick: () => {
            window.location.href = '/Pipeline';
        }
    };

    createTableColumns(){
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
              lookup: { 1: 'Draft', 2: 'Submitted', 3: 'Completed' },
            },
          ];
    }

    getTableData(){
        return [
            { name: 'Russel street road works', updatedby: 'Stacy Salter', date: new Date('07/21/1987'), status: 1 },
            { name: 'London Bridge aqueduct planning', updatedby: 'Hame Moore', date: new Date('07/21/1987'), status: 1 },
            { name: '51 Southwark street refilling', updatedby: 'Lucy Benner', date: new Date('07/21/1987'), status: 2 },
            { name: 'Church street reviewing', updatedby: 'Imran Khan', date: new Date('07/21/1987'), status: 3 },
            { name: 'Russel street road works', updatedby: 'Jacy Lue', date: new Date('07/21/1987'), status: 1 },
            { name: 'Gregory Nash approval', updatedby: 'Stirlin Archer', date: new Date('07/21/1987'), status: 3 },
          ];
    }
    render() {
        return (
            <React.Fragment>
                <HeaderPage Title={'Overview'} ActionList={this.GetButtons()} />
                <CardContainer Title="Your Projects">
                <Table columns={this.createTableColumns()} data={this.getTableData()} ActionList={[this.viewAll]}/>
                </CardContainer>
             

                <Grid container spacing={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} lg={6} md={6}>
                            <CardContainer Title="Preferred">
                                <PreferredChart Preferred={4} NotPreferred={6} />
                            </CardContainer>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6} md={6}>
                            <CardContainer Title="Run Rate">
                                <RunRateChart ICE={56} JandA={12} BidSubmitted={30} OrderReceived={20} InProgress={24} Completed={20} />
                            </CardContainer>

                        </Grid>

                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} lg={12} md={12} >
                            <CardContainer Title=" Analytics">
                                <MultipleChart ICE={56} JandA={12} BidSubmitted={30} OrderReceived={20} InProgress={24} Completed={20} />
                            </CardContainer>
                        </Grid>
                    </Grid>
                </Grid>





            </React.Fragment >
        );
    }
}

export default Dashboard;