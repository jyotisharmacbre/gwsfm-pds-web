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
import * as actions from '../store/rootActions';
import { IProjectAdditionalDetail } from '../store/ProjectOverviewForm/Types/IProjectAdditionalDetail';
import { IProject } from '../store/CustomerEnquiryForm/Types/IProject';
import { IState } from '../store/state';
import Notify from '../enums/Notify';
import EventType from '../enums/EventType';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { History } from 'history';
import { toast } from 'react-toastify';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { dynamicsContract } from '../components/TypeAhead/TypeAheadConstantData/dynamicContractData';
import { getFilterElementFromArray,getClassNameForProjectStatus } from '../helpers/utility-helper';
import ProjectOverviewStatusTab from '../components/HeaderPage/ProjectOverviewStatusTab';
import { getDynamicSubContractorData } from '../store/DynamicsData/Action';
import { IDynamicSubContractorData } from '../store/DynamicsData/Types/IDynamicData';
import { IProjectOverviewDetails } from '../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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
  form: IProjectOverviewDetails;
  notify: Notify;
  projectId: string;
  projectStatus: Array<ILookup>;
  enquiryOverview: IProject;
  event: EventType;
  projectScope: string;
  status:number;
  dynamicsSubContractor: Array<IDynamicSubContractorData>;
  countryId:number;
  history:History;
}
interface IMapDispatchToProps {
  getProjectStatus: () => void;
  projectOverviewFormAdd: (
    projectId: string,
    form: IProjectOverviewDetails,
    event: EventType
  ) => void;
  projectOverviewFormEdit: (
    form: IProjectOverviewDetails,
    event: EventType
  ) => void;
  getAdditionalDetails: (projectId: string) => void;
  getEnquiryOverview: (projectId: string) => void;
  resetProjectOverviewState: () => void;
  getProjectDetail: (projectId: string) => void;
  changeProjectStatusToOnHold: (projectId: string) => void;
  changeProjectStatusToBidLost: (projectId: string) => void;
  reactivateProject:(projectId: string) => void;
  setProjectStatus:(status: number) => void;
  handleGetDynamicSubContractorData: (searchSubContractor: string) => void;
  setAdminDefaultValues:(countryId:number)=>void;
}
interface IProps {
  projectId: string;
  match: any;
}

const ProjectOverview: React.FC<IProps &
  IMapStateToProps &
  IMapDispatchToProps> = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.getProjectStatus();
    let paramProjectId = props.match.params.projectId;
    if (paramProjectId != null && paramProjectId != '') {
      props.getProjectDetail(paramProjectId);
      props.getAdditionalDetails(paramProjectId);
      props.getEnquiryOverview(paramProjectId);
    }
  }, []);

  useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.next) {
        toast.success('Data Saved Successfully');
        props.history.push(`/JustificationAuthorisation/${props.match.params.projectId}`);
      } else if (props.event == EventType.previous) {
        toast.success('Data Saved Successfully');
        props.history.push(`/Project/${props.match.params.projectId}`);
      }
      props.resetProjectOverviewState();
    }
  }, [props.notify, props.event]);
  useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.save) 
      {
        toast.success('Project reactivated successfully');
        props.getProjectDetail(props.match.params.projectId);
      }
      else
      {
        toast.success('Project status changed successfully');

      }
        
      } else if (props.notify == Notify.error) 
      {
        toast.error('Error occured.Please contact administrator');
      }
      props.resetProjectOverviewState();
    },
 [props.notify]);
useEffect(() => {
 props.setAdminDefaultValues(props.countryId);
  },
[props.countryId]);
  const handlePrevious = () => {
    props.history.push(`/Project/${props.match.params.projectId}`);

  };

  const handleNext = (data: IProjectOverviewDetails) => {
    data.projectAdditionalDetail.projectAddDetailId == ''
      ? props.projectOverviewFormAdd(props.match.params.projectId, data, EventType.next)
      : props.projectOverviewFormEdit(data, EventType.next);
  };
  const convertToString = id => {
    let data = '';
    if (id != null && id != undefined) data = id.toString();
    return data;
  };
  const getProjectStatusName=()=>{
    let projectStatusData:Array<ILookup>=[];
    if(props.projectStatus.length>0)
    {
       projectStatusData=props.projectStatus.filter((data)=>{return (data.lookupItem=="Project_Status"&&data.lookupKey==props.status)});
    }
    else if(sessionStorage.getItem("lookupData"))
    {
      let lookupData:any=sessionStorage.getItem("lookupData");
      projectStatusData=JSON.parse(lookupData).filter((data)=>{return (data.lookupItem=="Project_Status"&&data.lookupKey==props.status)});
    }
    return (projectStatusData.length>0?projectStatusData[0].description:"")
  }
  const handleReactivateEvent=()=>{
    props.reactivateProject(props.match.params.projectId);
  }
  const handleOnHoldEvent=()=>{
    props.setProjectStatus(6);
    props.changeProjectStatusToOnHold(props.match.params.projectId);
  }
  const handleBidLostEvent=()=>{
    props.setProjectStatus(4);
    props.changeProjectStatusToBidLost(props.match.params.projectId);
  }

  return (
      <Container component="main">
        
       <HeaderPage Title={formatMessage('TITLE_PROJECT_OVERVIEW')} ActionList={[]} /> 
        <ProjectOverviewStatusTab status={props.status} statusName={getProjectStatusName()} onReactivate={handleReactivateEvent} handleOnHold={handleOnHoldEvent} handleBidLost={handleBidLostEvent}/>
            <div className={getClassNameForProjectStatus(props.status)}>
            <GeneralTable
              {...{
                headers: [
                  {
                    heading: formatMessage('LABEL_END_CUSTOMER_NAME'),
                    subHeading: convertToString(getFilterElementFromArray(dynamicsContract, 'ContractId',
                    props.enquiryOverview.contractorId, 'Name') || props.enquiryOverview.otherContractName)
                  },
                  {
                    heading: formatMessage('MESSAGE_PROJECT_NAME'),
                    subHeading: props.enquiryOverview.projectName
                  },
                  { heading: formatMessage('LABEL_PROJECT_ID'), subHeading: props.projectId },
                  {
                    heading: formatMessage('LABEL_CN_NUMBER'),
                    subHeading: convertToString(props.enquiryOverview.cnNumber)
                  }
                ],
                content: props.projectScope,
                editActionClick: () => {
                  props.history.push(`/Project/${props.match.params.projectId}`);
                }
              }}
            />
            </div>
            <ProjectOverviewForm
              onNext={handleNext}
              onPrevious={handlePrevious}
              projectstatus={props.projectStatus}
              status={props.status}
              projectId={props.match.params.projectId}
            />
      </Container>
  );
};

const mapStateToProps = (state: IState) => ({
  form: state.projectOverview.form,
  notify: state.projectOverview.notify,
  projectId: state.project.form.projectId,
  projectStatus: state.lookup.projectstatus,
  enquiryOverview: state.project.enquiryOverview,
  event: state.projectOverview.event,
  projectScope: state.project.form.scope,
  status:state.project.form.status, 
  dynamicsSubcontractor: state.dynamicData.dynamicsSubcontractor,
  countryId: state.project.form.countryId
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
      dispatch(actions.resetProjectOverviewState()),
    getProjectDetail: projectId =>
      dispatch(actions.getProjectDetail(projectId)),
    changeProjectStatusToOnHold: projectId =>
      dispatch(actions.changeProjectStatusToOnHold(projectId)),
    changeProjectStatusToBidLost: projectId =>
      dispatch(actions.changeProjectStatusToBidLost(projectId)),
    reactivateProject: projectId =>
      dispatch(actions.reactivateProject(projectId)),
    setProjectStatus: status =>
      dispatch(actions.changeProjectStatus(status)),
    handleGetDynamicSubContractorData: searchSubContractor =>
      dispatch(getDynamicSubContractorData(searchSubContractor)),
    setAdminDefaultValues: countryId =>
      dispatch(actions.getAdminDefaultValues(countryId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);
