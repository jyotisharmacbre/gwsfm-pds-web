import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import GeneralTable from '../components/Table/General';
import { Grid, Container } from '@material-ui/core';
import ProjectOverviewForm from '../components/Forms/ProjectOverviewForm/ProjectOverviewForm';
import {
  IGeneralTableHeaderProps,
  IGeneralTableProps
} from '../components/Table/General/props';
import * as actions from '../store/actions';
import { IProjectAdditionalDetail } from '../store/ProjectOverviewForm/Types/IProjectAdditionalDetail';
import { IState } from '../store/state';
import Notify from '../enums/Notify';
import { ILookup } from '../store/Lookups/Types/ILookup';

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

interface IMapStateToProps {
  form: IProjectAdditionalDetail;
  notify: Notify;
  projectId: string;
  projectStatus: Array<ILookup>;
}
interface IMapDispatchToProps {
  getProjectStatus: () => void;
  handleProjectOverviewFormSubmit: (
    projectId: string,
    form: IProjectAdditionalDetail
  ) => void;
  getAdditionalDetails: (projectId: string) => void;
}
interface IProps {
  projectId: string;
}

const ProjectOverview: React.FC<
  IProps & IMapStateToProps & IMapDispatchToProps
> = props => {
  useEffect(() => {
    props.getProjectStatus();
    if (
      props.form.projectAddDetailId != null &&
      props.form.projectAddDetailId != ''
    ) {
      props.getAdditionalDetails(props.form.projectAddDetailId);
    }
  }, []);

  useEffect(() => {
    if (props.notify == Notify.success) {
      alert('data saved successfully');
    }
  }, [props.notify]);

  const handleSubmit = (values: any) => {
    props.handleProjectOverviewFormSubmit('', values);
  };

  return (
    <React.Fragment>
      <Container component="main">
        <HeaderPage Title={'Project Overview'} ActionList={[]} />
        <Grid spacing={3} container>
          <Grid item xs={12} sm={12}>
            <GeneralTable {...table} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ProjectOverviewForm
              onSubmit={handleSubmit}
              projectstatus={props.projectStatus}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  form: state.projectOverview.form,
  notify: state.projectOverview.notify,
  projectId: state.project.projectId,
  projectStatus: state.lookup.projectstatus
});

const mapDispatchToProps = dispatch => {
  return {
    getProjectStatus: () => dispatch(actions.getProjectStatus()),
    handleProjectOverviewFormSubmit: (projectId, form) =>
      dispatch(actions.projectOverviewFormAdd(projectId, form)),
    getAdditionalDetails: projectId =>
      dispatch(actions.getAdditionalDetails(projectId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectOverview);
