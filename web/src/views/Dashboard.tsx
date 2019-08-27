import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
<<<<<<< HEAD
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import PreferredChart from '../components/PrefrerredChart';
=======

import PreferredChart from '../components/PreferredChart';
>>>>>>> 3bb3b811ce330fe93d94f6eb57e6ceba12faa169
import RunRateChart from '../components/RunRateChart';
import MediaQuery from 'react-responsive';
import Typography from '@material-ui/core/Typography';
import Table from '../components/Table';
<<<<<<< HEAD

=======
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
>>>>>>> 3bb3b811ce330fe93d94f6eb57e6ceba12faa169
import Responsive from 'react-responsive';
import Grid from '@material-ui/core/Grid';

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
<<<<<<< HEAD
                <HeaderPage Title={'Overview'} ActionList={this.GetButtons()} /> 
               <div style={{"height" : "100%", "width" : "100%","display":"inline-block"}}> <div style={{"height" : "100%","background":"white", "width" : "49%","display":"inline-block"}}>
                    <Typography variant="h6" id="tableTitle" style={{ color: "#00684d" , paddingLeft:"10px"}}>
              Preferred
          </Typography><PreferredChart Preferred={4} NotPreferred={6}/> </div><div style={{"height" : "100%", "width" : "2%","display":"inline-block"}}></div>
              <div style={{"height" : "100%","background":"white", "width" : "49%","display":"inline-block"}}>  <Typography variant="h6" id="tableTitle" style={{ color: "#00684d" ,paddingLeft:"10px"}}>
              Run Rate
          </Typography> <RunRateChart Opportunities={9} JandA={4} Lost={3}/></div>
             </div>
                <HeaderPage Title={'Overview'} ActionList={this.GetButtons()} />
                <Table IsSuperManager = { true }/>
=======
                <HeaderPage Title={'Overview'} ActionList={this.GetButtons()} />
                
                <Grid container spacing={2} style={{"height":"500px"}}>  
                    <Grid item xs={12} sm={12} lg={6} md={6} style={{"height":"500px"}} ><Paper  style={{ "width": "100%","height":"100%"}} >
                    <Typography variant="h6" id="tableTitle" style={{ color: "#00684d", paddingLeft: "10px" }}>
                        Preferred
          </Typography><PreferredChart Preferred={4} NotPreferred={6} /> 
          </Paper>  </Grid> 
                    <Grid item xs={12} sm={12} lg={6} md={6} style={{"height":"500px"}} ><Paper  style={{ "width": "100%","height":"100%"}} >
                    <Typography variant="h6" id="tableTitle" style={{ color: "#00684d", paddingLeft: "10px" }}>
                        Run Rate
          </Typography> <RunRateChart ICE={56} JandA={12} BidSubmitted={30} OrderReceived={20} InProgress={24} Completed={20}/></Paper> 
</Grid> 
                </Grid>
               
                <Table IsSuperManager={true} />
              
             
                <Table IsSuperManager={true} />
>>>>>>> 3bb3b811ce330fe93d94f6eb57e6ceba12faa169
            </React.Fragment>
        );
    }
}

export default Dashboard;