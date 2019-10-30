import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import GeneralTable from '../components/Table/General';
import { Grid, Container } from '@material-ui/core';
import ProjectOverviewForm from '../components/Forms/ProjectOverviewForm';
import {
  IGeneralTableHeaderProps,
  IGeneralTableProps
} from '../components/Table/General/props';

const tableHeaders: IGeneralTableHeaderProps[] = [
  { heading: 'End Client Name', subHeading: 'ING' },
  { heading: 'Project Name', subHeading: 'Building Maintainance' },
  { heading: 'Project ID', subHeading: 'ING65956' },
  { heading: 'CN Number', subHeading: 'ING89855' }
];

const table: IGeneralTableProps = {
  headers: tableHeaders,
  content: 'Working on new structure of a building with lighting',
  editActionClick: () => {
    alert('You clicked me');
  }
};

class ProjectOverview extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container component="main">
          <HeaderPage Title={'Project Overview'} ActionList={[]} />
          <Grid spacing={3} container>
            <Grid item xs={12} sm={12}>
              <GeneralTable {...table} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ProjectOverviewForm />
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default ProjectOverview;
