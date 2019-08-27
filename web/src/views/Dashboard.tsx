import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import PreferredChart from '../components/PrefrerredChart';
import RunRateChart from '../components/RunRateChart';
import MediaQuery from 'react-responsive';
import Typography from '@material-ui/core/Typography';
import Table from '../components/Table';

import Responsive from 'react-responsive';

//const Desktop = props => <Responsive {...props} minWidth={992} />;
//const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
//const Mobile = props => <Responsive {...props} maxWidth={767} />;
//const Default = props => <Responsive {...props} minWidth={768} />;
 
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
            </React.Fragment>
        );
    }
}

export default Dashboard;