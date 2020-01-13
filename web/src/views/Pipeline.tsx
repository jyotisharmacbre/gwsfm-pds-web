import React, { useEffect, Props } from 'react';
import { connect } from 'react-redux';
import ProjectPipelineForm from '../components/Forms/Pipeline/ProjectPipelineForm';
import { IState } from '../store/state';
import { projectPipelineDetail } from '../store/pipeline/Action';
import { IProjectPipelineGrid } from '../store/pipeline/Types/IProjectPipelineGrid';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
import Notify from '../enums/Notify';
import { formatMessage } from '../Translations/connectedIntlProvider';
interface IMapDispatchToProps {
  projectPipelineGridDetail: () => void;
  getLookups: () => void;
}
interface IMapStateToProps {
  
  projectPipeline: Array<IProjectPipelineGrid>;
  lookupDetails: Array<ILookup>;
}
const ProjectPipeline: React.FC<IMapStateToProps &
  IMapDispatchToProps> = props => {
  useEffect(() => {
    props.getLookups();
  }, []);
  useEffect(() => {
      props.projectPipelineGridDetail();
  }, [props.lookupDetails]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="custom-wrap">
            <div className="top_Title">
              <h2>{formatMessage('TITLE_CURRENT_PIPELINE')}</h2>
            </div>

            <div className="table-grid-wrap price-sumry">
              <div className="inner-block">
                <React.Fragment>
                  <ProjectPipelineForm
                    lookupValues={props.lookupDetails}
                    pipelineValues={props.projectPipeline}
                  />
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPipeline);
