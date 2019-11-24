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
  projectId:string;
}
interface IMapDispatchToProps {
  handleProjectOverviewFormSubmit: (
    projectId: string,
    form: IProjectAdditionalDetail
  ) => void;
  getAdditionalDetails:(projectId:string) => void;
}
interface IProps {
  projectId: string;
}

const ProjectOverview: React.FC<
  IProps & IMapStateToProps & IMapDispatchToProps
> = props => {
  useEffect(() => {
    if (props.form.projectAddDetailId != null && props.form.projectAddDetailId != '') {
      props.getAdditionalDetails(props.form.projectAddDetailId);
    }
  }, []);

  useEffect(() => {
    if (props.notify == Notify.success) {
      alert('data saved successfully');
    }
  }, [props.notify]);

  const handleSubmit = (values: any) => {
    props.handleProjectOverviewFormSubmit(
      'a2658808-2deb-4eba-bc4e-08d770a0b60e',
      values
    );
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
            <ProjectOverviewForm onSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  form: state.projectOverview.form,
  notify: state.projectOverview.notify,
  projectId:state.project.projectId
});

const mapDispatchToProps = dispatch => {
  return {
    handleProjectOverviewFormSubmit: (projectId, form) =>
      dispatch(actions.projectOverviewFormAdd(projectId, form)),
      getAdditionalDetails: (projectId) =>
      dispatch(actions.getAdditionalDetails(projectId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectOverview);
