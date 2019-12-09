import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import GeneralTable from '../components/Table/General';
import { Grid, Container } from '@material-ui/core';
import ProjectOverviewForm from '../components/Forms/ProjectOverviewForm/ProjectOverviewForm';
import {
  IGeneralTableHeaderProps,
  IGeneralTableProps
} from '../components/Table/General/props';
import * as actions from '../store/rootActions';
import { IProjectAdditionalDetail } from '../store/ProjectOverviewForm/Types/IProjectAdditionalDetail';
import { IProject } from '../store/CustomerEnquiryForm/Types/IProject';
import { IState } from '../store/state';
import Notify from '../enums/Notify';
import EventType from '../enums/EventType';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  enquiryOverview: IProject;
  event: EventType;
  projectScope: string;
}
interface IMapDispatchToProps {
  getProjectStatus: () => void;
  projectOverviewFormAdd: (
    projectId: string,
    form: IProjectAdditionalDetail,
    event: EventType
  ) => void;
  projectOverviewFormEdit: (
    form: IProjectAdditionalDetail,
    event: EventType
  ) => void;
  getAdditionalDetails: (projectId: string) => void;
  getEnquiryOverview: (projectId: string) => void;
  resetProjectOverviewState: () => void;
}
interface IProps {
  projectId: string;
  match: any;
}

const ProjectOverview: React.FC<IProps &
  IMapStateToProps &
  IMapDispatchToProps> = props => {
  let history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getProjectStatus();
    let paramProjectId = props.projectId == '' ? props.match.params.projectId : props.projectId;
    if (paramProjectId != null && paramProjectId != '') {
      props.getAdditionalDetails(paramProjectId);
      props.getEnquiryOverview(paramProjectId);
    }
  }, []);

  useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.next) {
        toast.success('Data Saved Successfully');
        history.push('/JustificationAuthorisation');
      } else if (props.event == EventType.previous) {
        toast.success('Data Saved Successfully');
        history.push('/Project');
      }
      props.resetProjectOverviewState();
    }
  }, [props.notify, props.event]);

  const handlePrevious = (data: IProjectAdditionalDetail) => {
    data.projectAddDetailId == ''
      ? props.projectOverviewFormAdd(props.projectId, data, EventType.previous)
      : props.projectOverviewFormEdit(data, EventType.previous);
  };

  const handleNext = (data: IProjectAdditionalDetail) => {
    data.projectAddDetailId == ''
      ? props.projectOverviewFormAdd(props.projectId, data, EventType.next)
      : props.projectOverviewFormEdit(data, EventType.next);
  };
  const convertToString = id => {
    let data = '';
    if (id != null && id != undefined) data = id.toString();
    return data;
  };
  return (
    <React.Fragment>
      <Container component="main">
        <HeaderPage Title={'Project Overview'} ActionList={[]} />
        <Grid spacing={3} container>
          <Grid item xs={12} sm={12}>
            <GeneralTable
              {...{
                headers: [
                  {
                    heading: 'End Client Name',
                    subHeading: convertToString(props.enquiryOverview.companyId)
                  },
                  {
                    heading: 'Project Name',
                    subHeading: props.enquiryOverview.projectName
                  },
                  { heading: 'Project ID', subHeading: props.projectId },
                  {
                    heading: 'CN Number',
                    subHeading: convertToString(props.enquiryOverview.cnNumber)
                  }
                ],
                content: props.projectScope,
                editActionClick: () => {
                  history.push('/Project');
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ProjectOverviewForm
              onNext={handleNext}
              onPrevious={handlePrevious}
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
  projectId: state.project.form.projectId,
  projectStatus: state.lookup.projectstatus,
  enquiryOverview: state.project.enquiryOverview,
  event: state.projectOverview.event,
  projectScope: state.project.form.scope
});

const mapDispatchToProps = dispatch => {
  return {
    getProjectStatus: () => dispatch(actions.getProjectStatus()),
    projectOverviewFormAdd: (projectId, form, event) =>
      dispatch(actions.projectOverviewFormAdd(projectId, form, event)),
    projectOverviewFormEdit: (form, event) =>
      dispatch(actions.projectOverviewFormEdit(form, event)),
    getAdditionalDetails: projectId =>
      dispatch(actions.getAdditionalDetails(projectId)),
    getEnquiryOverview: projectId =>
      dispatch(actions.getEnquiryOverview(projectId)),
    resetProjectOverviewState: () =>
      dispatch(actions.resetProjectOverviewState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);
