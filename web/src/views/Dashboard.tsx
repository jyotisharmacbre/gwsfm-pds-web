import React from 'react';
import HeaderPage from '../components/HeaderPage';
import { IBtnActionProps } from '../props/AppProps';
import Table from '../components/Table';
import TestTable from '../components/TestTable'

import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Responsive from 'react-responsive';
import Grid from '@material-ui/core/Grid';
import MultipleChart from '../components/MultipleCharts';
import { Typography } from '@material-ui/core';
import PreferredChart from '../components/PreferredChart';
import RunRateChart from '../components/RunRateChart';
import CardContainer from '../components/CardContainer';

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
                <TestTable />
                {/* <Table IsSuperManager={true} /> */}
                <Table IsSuperManager={true} />

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