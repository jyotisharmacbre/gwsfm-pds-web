import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { projectDetailAdd } from '../store/CustomerEnquiryForm/Action';
import EventType from '../enums/EventType';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/rootActions';
import Notify from '../enums/Notify';

interface IMapStateToProps {
  notify: Notify;
  event: EventType;
  projectStatus: Array<ILookup>;
  projectId: string;
}

interface IMapDispatchToProps {
  getProjectStatus: () => void;
  handleProjectDetailsSubmit: (form: IProjectDetail, event: EventType) => void;
  handleProjectDetailsEdit: (form: IProjectDetail, event: EventType) => void;
  getProjectDetail: (projectId: string) => void;
  resetProjectDetailState: () => void;
}

const Project: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
  let history = useHistory();
  useEffect(() => {
    props.getProjectStatus();
    if (props.projectId != null && props.projectId != '') {
      props.getProjectDetail(props.projectId);
    }
  }, []);

  useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.next) {
        alert('data saved successfully next');
        history.push('/ProjectOverview');
      } else if (props.event == EventType.save) {
        alert('data saved successfully save');
      }
      props.resetProjectDetailState();
    }
  }, [props.notify, props.event]);

  const handleSave = (data: IProjectDetail) => {
    data.projectId == ''
      ? props.handleProjectDetailsSubmit(data, EventType.save)
      : props.handleProjectDetailsEdit(data, EventType.save);
  };

  const handleNext = (data: IProjectDetail) => {
    data.projectId == ''
      ? props.handleProjectDetailsSubmit(data, EventType.next)
      : props.handleProjectDetailsEdit(data, EventType.next);
  };

  return (
    <ProjectForm
      onSave={handleSave}
      onNext={handleNext}
      projectstatus={props.projectStatus}
    />
  );
};

const mapStateToProps = (state: IState): IMapStateToProps => {
  return {
    projectStatus: state.lookup.projectstatus,
    notify: state.project.notify,
    event: state.project.event,
    projectId: state.project.form.projectId
  };
};

const mapDispatchToProps = (dispatch): IMapDispatchToProps => {
  return {
    getProjectStatus: () => dispatch(getProjectStatus()),
    handleProjectDetailsSubmit: (form, event) =>
      dispatch(projectDetailAdd(form, event)),
    handleProjectDetailsEdit: (form, event) =>
      dispatch(actions.projectDetailEdit(form, event)),
    getProjectDetail: (projectId: string) =>
      dispatch(actions.getProjectDetail(projectId)),
    resetProjectDetailState: () => dispatch(actions.resetProjectDetailState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
