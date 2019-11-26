import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { projectDetailAdd } from '../store/CustomerEnquiryForm/Action';
import { Notify } from '../helpers/constants';
import EventType from '../enums/EventType';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/rootActions';
import { toast } from 'react-toastify';
import { ICurrency } from '../store/Lookups/Types/ICurrency';

interface IMapStateToProps {
  notify: Notify;
  event: EventType;
  projectStatus: Array<ILookup>;
  projectId: string;
  currencies: Array<ICurrency> | null;
}

interface IMapDispatchToProps {
  getProjectStatus: () => void;
  handleProjectDetailsSubmit: (form: IProjectDetail, event: EventType) => void;
  handleProjectDetailsEdit: (form: IProjectDetail, event: EventType) => void;
  getProjectDetail: (projectId: string) => void;
  resetProjectDetailState: () => void;
  getAllCurrencies: () => void;
}

const Project: React.FC<IMapStateToProps & IMapDispatchToProps> = props => {
  let history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getProjectStatus();
    props.getAllCurrencies();
    if (props.projectId != null && props.projectId != '') {
      props.getProjectDetail(props.projectId);
    }
  }, []);

  useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.next) {
        toast.success('Data Saved Successfully');
        history.push('/ProjectOverview');
      } else if (props.event == EventType.save) {
        toast.success('Data Saved Successfully');
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
      currencies={props.currencies}
    />
  );
};

const mapStateToProps = (state: IState): IMapStateToProps => {
  return {
    projectStatus: state.lookup.projectstatus,
    notify: state.project.notify,
    event: state.project.event,
    projectId: state.project.form.projectId,
    currencies: state.lookup.currencies
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
    resetProjectDetailState: () => dispatch(actions.resetProjectDetailState()),
    getAllCurrencies: () => dispatch(actions.getAllCurrencies())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
