import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
import Table from '../components/Table';

import Grid from '@material-ui/core/Grid';
import MultipleChart from '../components/MultipleCharts';
import PreferredChart from '../components/PreferredChart';
import RunRateChart from '../components/RunRateChart';
import CardContainer from '../components/CardContainer';

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
                <Grid container spacing={2} >  
                    <Grid item xs={12} sm={12} lg={6} md={6} style={{"height":"500px"}} ><Paper  style={{ "width": "100%","height":"100%"}} >
                    <Typography variant="h6" id="TitlePreferred" style={{ color: "#00684d", paddingLeft: "10px" }}>
                        Preferred
          </Typography><PreferredChart Preferred={4} NotPreferred={6} /> 
          </Paper>  </Grid> 
                    <Grid item xs={12} sm={12} lg={6} md={6} min-Height={500}  ><Paper  style={{ "width": "100%","height":"100%"}} >
                    <Typography variant="h6" id="TitleRunRate" style={{ color: "#00684d", paddingLeft: "10px" }}>
                        Run Rate
          </Typography> <RunRateChart ICE={56} JandA={12} BidSubmitted={30} OrderReceived={20} InProgress={24} Completed={20}/></Paper> 
</Grid> 
                </Grid>
                <Grid container spacing={2} min-Height={300} >  
                    <Grid item xs={12} sm={12} lg={12} md={12} min-Height={300}  ><Paper  style={{ "width": "100%","height":"100%"}} >
                    <Typography variant="h6" id="tableTitle" style={{ color: "#00684d", paddingLeft: "10px" }}>
                        Analytics
          </Typography>
          <MultipleChart ProjectTotal={200} ICE={50} Rejected={60} JandA={49} LostProjects={30} OrderReceived={20} OnHoldProject={15} InProgress={24} Completed={20}/> 
          </Paper>  </Grid> </Grid>
              
            </React.Fragment>

               
        );
    }
}

export default Dashboard;