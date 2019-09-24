import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import GeneralTable from '../components/Table/General';
import { Grid, FormControl, InputLabel, TextField, Container } from '@material-ui/core';
import ProjectOverviewForm from '../components/Forms/ProjectOverviewForm';

class ProjectOverview extends React.Component {

    render() {
        return <React.Fragment>
            <Container component="main" >
                <HeaderPage Title={'Project Overview'} ActionList={[]} />
                <Grid spacing={3} container>
                    <Grid item xs={12} sm={12}>
                        <GeneralTable />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <ProjectOverviewForm />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>;
    }
}

export default ProjectOverview;