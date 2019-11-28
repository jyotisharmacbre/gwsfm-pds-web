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
import {
  getDynamicContractData,
  getDynamicCompanyData
} from '../store/DynamicsData/Action';
import {
  IDynamicContractData,
  IDynamicCompanyData
} from '../store/DynamicsData/Types/IDynamicData';
import {
  IAdPOData,
  IAdHOPData,
  IAdPMData
} from '../store/ActiveDirectory/Types/IActiveDirectory';
import {
  getActiveDirectoryHOP,
  getActiveDirectoryPO,
  getActiveDirectoryPM
} from '../store/ActiveDirectory/Action';

interface IMapStateToProps {
  notify: Notify;
  event: EventType;
  projectId: string;
  currencies: Array<ICurrency> | null;
  projectStatus: Array<ILookup>;
  dynamicsContract: Array<IDynamicContractData>;
  dynamicsCompany: Array<IDynamicCompanyData>;
  adHOPData: Array<IAdHOPData>;
  adPOData: Array<IAdPOData>;
  adPMData: Array<IAdPMData>;
}

interface IMapDispatchToProps {
  handleGetDynamicContractData: (searchContract: string) => void;
  handleGetDynamicCompanyData: (searchCompany: string) => void;
  handleGetADHOPData: (searchHOP: string) => void;
  handleGetADPOData: (searchPO: string) => void;
  handleGetADPMData: (searchPM: string) => void;
  getProjectStatus: () => void;
  getProjectDetail: (projectId: string) => void;
  resetProjectDetailState: () => void;
  getAllCurrencies: () => void;
  getDynamicContractData: () => void;
  getDynamicCompanyData: () => void;
  handleProjectDetailsSubmit: (form: IProjectDetail, event: EventType) => void;
  handleProjectDetailsEdit: (form: IProjectDetail, event: EventType) => void;
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

  const onSearchContract = (values: any) => {
    props.handleGetDynamicContractData(values);
  };

  const onSearchCompany = (values: any) => {
    props.handleGetDynamicCompanyData(values);
  };

  const onSearchHOP = (values: any) => {
    props.handleGetADHOPData(values);
  };

  const onSearchPO = (values: any) => {
    props.handleGetADPOData(values);
  };

  const onSearchPM = (values: any) => {
    props.handleGetADPMData(values);
  };

  return (
    <ProjectForm
      onSave={handleSave}
      onNext={handleNext}
      currencies={props.currencies}
      onSearchContract={onSearchContract}
      onSearchCompany={onSearchCompany}
      projectstatus={props.projectStatus}
      dynamicsContract={props.dynamicsContract}
      dynamicsCompany={props.dynamicsCompany}
      onSearchHOP={onSearchHOP}
      onSearchPO={onSearchPO}
      onSearchPM={onSearchPM}
      adHOPData={props.adHOPData}
      adPOData={props.adPOData}
      adPMData={props.adPMData}
    />
  );
};

const mapStateToProps = (state: IState) => {
  return {
    projectStatus: state.lookup.projectstatus,
    dynamicsContract: state.dynamicData.dynamicsContract,
    dynamicsCompany: state.dynamicData.dynamicsCompany,
    adHOPData: state.adData.ADhopData,
    adPOData: state.adData.ADpoData,
    adPMData: state.adData.ADpmData,
    notify: state.project.notify,
    event: state.project.event,
    projectId: state.project.form.projectId,
    currencies: state.lookup.currencies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectStatus: () => dispatch(getProjectStatus()),
    handleProjectDetailsSubmit: (form, event) =>
      dispatch(projectDetailAdd(form, event)),
    handleProjectDetailsEdit: (form, event) =>
      dispatch(actions.projectDetailEdit(form, event)),
    getProjectDetail: (projectId: string) =>
      dispatch(actions.getProjectDetail(projectId)),
    resetProjectDetailState: () => dispatch(actions.resetProjectDetailState()),
    getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
    handleGetDynamicContractData: searchContract =>
      dispatch(getDynamicContractData(searchContract)),
    handleGetDynamicCompanyData: searchCompany =>
      dispatch(getDynamicCompanyData(searchCompany)),
    handleGetADHOPData: searchHOP => dispatch(getActiveDirectoryHOP(searchHOP)),
    handleGetADPOData: searchPO => dispatch(getActiveDirectoryPO(searchPO)),
    handleGetADPMData: searchPM => dispatch(getActiveDirectoryPM(searchPM))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
