import React, { useEffect } from 'react';
import ProjectForm from '../components/Forms/ProjectForm/ProjectForm';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { projectDetailAdd } from '../store/CustomerEnquiryForm/Action';
import { Notify } from '../helpers/constants';
interface IMapDispatchToProps {
  getProjectStatus: () => void;
}

interface IMapStateToProps {
  form: IProjectDetail;
  notify:Notify;
  projectStatus: Array<ILookup>;
}

interface IMapDispatchToProps {
  handleProjectDetailsSubmit: (
    form: IProjectDetail
  ) => void;
}

const Project: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {

useEffect(() => {
    props.getProjectStatus();
  }, []); 

  useEffect(() => {
    if(props.notify == Notify.success){
      alert("data saved successfully");
    }
  }, [props.notify]); 

  const handleSubmit = (values: any) => {
    props.handleProjectDetailsSubmit(values);
  };

      return (
      <ProjectForm 
      onSubmit ={handleSubmit}
      projectstatus={props.projectStatus}/>  
        )  
  };



const mapStateToProps = (state: IState) => {
  return {
    projectStatus: state.lookup.projectstatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectStatus: () => dispatch(getProjectStatus()),
    handleProjectDetailsSubmit: (form) =>
      dispatch(projectDetailAdd(form))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
