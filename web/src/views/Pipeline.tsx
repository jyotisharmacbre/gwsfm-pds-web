import React, { useEffect, Props } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ProjectPipelineForm from '../components/Forms/Pipeline/ProjectPipelineForm';
import { IState } from '../store/state';
import { projectPipelineDetail } from '../store/pipeline/Action';
import { IProjectPipelineGrid } from '../store/pipeline/Types/IProjectPipelineGrid';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { getProjectStatus } from '../store/Lookups/Actions';
import Notify from '../enums/Notify';
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
class Dashboard extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-wrap">
              <div className="top_Title">
                <h2>Current Pipeline</h2>
              </div>

              <div className="table-grid-wrap price-sumry">
                <div className="inner-block">
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>
                          Project className
                          <FontAwesomeIcon
                            className="active"
                            icon={faArrowDown}
                          />
                        </th>
                        <th>
                          Owner
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Last update
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Client/customer
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Prob of wining
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Status
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Expected start date
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Approx value
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Contact type
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          CDM notifiable
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Sold margin
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Weighted TCV
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Rank
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Leak detection improvement</td>
                        <td>Steven jones</td>
                        <td>20/04/19</td>
                        <td>JCB</td>
                        <td className="text-green">25%</td>
                        <td>J&amp;K</td>
                        <td>21/01/19</td>
                        <td>&#163;60,000</td>
                        <td>JCT</td>
                        <td>Yes</td>
                        <td className="text-green">15%</td>
                        <td>&#163;63,750</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Leak detection improvement</td>
                        <td>Steven jones</td>
                        <td>20/04/19</td>
                        <td>JCB</td>
                        <td className="text-green">25%</td>
                        <td>J&amp;K</td>
                        <td>21/01/19</td>
                        <td>&#163;60,000</td>
                        <td>JCT</td>
                        <td>Yes</td>
                        <td className="text-green">15%</td>
                        <td>&#163;63,750</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Leak detection improvement</td>
                        <td>Steven jones</td>
                        <td>20/04/19</td>
                        <td>JCB</td>
                        <td className="text-green">25%</td>
                        <td>J&amp;K</td>
                        <td>21/01/19</td>
                        <td>&#163;60,000</td>
                        <td>JCT</td>
                        <td>Yes</td>
                        <td className="text-green">15%</td>
                        <td>&amp;#163;63,750</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
