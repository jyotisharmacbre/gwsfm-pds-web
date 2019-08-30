import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
import Table from '../components/Table';

import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Responsive from 'react-responsive';
import Grid from '@material-ui/core/Grid';
import MultipleChart from '../components/MultipleCharts';
import { Typography } from '@material-ui/core';
import PreferredChart from '../components/PreferredChart';
import RunRateChart from '../components/RunRateChart';

//const Desktop = props => <Responsive {...props} minWidth={992} />;
//const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
//const Mobile = props => <Responsive {...props} maxWidth={767} />;
//const Default = props => <Responsive {...props} minWidth={768} />;
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing(3),
//     },
//     paper: {
//       width: '100%',
//       marginBottom: theme.spacing(2),
//     },

//   }),
// );
// const classes = useStyles();
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

    render() {
        return (
            <React.Fragment>
                <HeaderPage Title={'Overview'} ActionList={this.GetButtons()} /> 
                   <Table IsSuperManager = { true }/>
                
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
          <MultipleChart ProjectTotal={200} ICE={50} Rejected={50} JandA={50} LostProjects={30} OrderReceived={20} OnHoldProject={15} InProgress={24} Completed={20}/> 
          </Paper>  </Grid> </Grid>
              
            </React.Fragment>
        );
    }
}

export default Dashboard;