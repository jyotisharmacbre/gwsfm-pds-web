import React, { useEffect, Props } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ProjectPipelineForm from '../components/Forms/Pipeline/ProjectPipelineForm';
import { Notify } from '../helpers/constants';
import { IState } from '../store/state';
import { projectPipelineDetail } from '../store/pipeline/Action';
import { IProjectPipelineGrid } from '../store/pipeline/Types/IProjectPipelineGrid';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
interface IMapDispatchToProps {
  projectPipelineGridDetail: () => void;
  getLookups: () => void;
}
interface IMapStateToProps {
  notify: Notify;
  projectPipeline: Array<IProjectPipelineGrid>;
  lookupDetails: Array<ILookup>;
}
const ProjectPipeline: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {
  useEffect(() => {
    props.getLookups();

    props.projectPipelineGridDetail();
  }, []);
  return (
    <React.Fragment>
      <ProjectPipelineForm
        lookupValues={props.lookupDetails}
        pipelineValues={props.projectPipeline}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  lookupDetails: state.lookup.projectstatus,

  projectPipeline: state.pipelineGrid.pipelineDetails
});

const mapDispatchToProps = dispatch => {
  return {
    getLookups: () => dispatch(getProjectStatus()),
    projectPipelineGridDetail: () => dispatch(projectPipelineDetail())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPipeline);
