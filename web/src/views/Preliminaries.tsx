import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import '../components/Forms/PreliminaryForm/all.css';
import '../components/Forms/PreliminaryForm/customSelect.css';
import '../components/Forms/PreliminaryForm/style.css';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { projectDetailAdd } from '../store/CustomerEnquiryForm/Action';
import { Notify } from '../helpers/constants';
import EventType from '../enums/EventType';
import { useHistory } from 'react-router-dom';
import * as actions from '../store/rootActions';
import PreliminaryForm from '../components/Forms/PreliminaryForm/PreliminaryForm';

interface IMapStateToProps {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
  projectId: string;
  isVisible: boolean;
  notify: Notify;
}
interface IMapDispatchToProps {
  preliminaryAdd: (
    projectId: string,
    preliminaryDetails: Array<IPreliminariesComponentDetails>
  ) => void;
  preliminaryEdit: (
    projectId: string,
    preliminaryDetails: Array<IPreliminariesComponentDetails>
  ) => void;
  getPreliminaryDetails: (projectId: string) => void;
  expandPreliminaryComponentByComponentId: (componentId: string) => void;
  expandAllPreliminaryComponents: () => void;
}

const Preliminaries: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {
  let history = useHistory();
  useEffect(() => {
    if (
      props.projectId != null &&
      props.projectId != '' &&
      props.projectId != undefined
    ) {
      props.getPreliminaryDetails(props.projectId);
    }
  }, []);
  const handleExpandAllComponent = () => {
    props.expandAllPreliminaryComponents();
  };
  const handleExpand = (componentId: string) => {
    props.expandPreliminaryComponentByComponentId(componentId);
  };
  const handleSaveData = (
    projectId: string,
    preliminaryDetails: IPreliminariesComponentDetails
  ) => {
    var tempData: IPreliminariesComponentDetails[] = [];
    tempData.push(preliminaryDetails);
    props.preliminaryAdd(projectId, tempData);
  };
  const handleEditData = (
    projectId: string,
    preliminaryDetails: Array<IPreliminariesComponentDetails>
  ) => {
    props.preliminaryEdit(projectId, preliminaryDetails);
  };

  useEffect(() => {
    if (props.notify == Notify.success) {
    }
  }, [props.notify]);

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-12">
          <form className="customer-enquiry">
            <h1>
              Justification &amp; Authorisation
              <p className="sub_head">preliminaries</p>
            </h1>
            <div className="table-responsive">
              <table className="table table-bordered cost">
                <thead>
                  <tr>
                    <th>Total Cost</th>
                    <th>Total Margin</th>
                    <th>Gross Margin</th>
                    <th>Total Sell</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&pound;36,00.00</td>
                    <td>25%</td>
                    <td>&pound;40,00.00</td>
                    <td>&pound;40,00.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <PreliminaryForm
                onSave={handleSaveData}
                preliminariesDetails={props.preliminaryDetails}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="ml-35 mb-4 js-btn3">
        <div className="row">
          <div className="col-4">
            {' '}
            <button type="submit" className="active mb-4 mt-5">
              PREVIOUS
            </button>
          </div>
          <div className="col-8 text-right">
            <button type="submit" className="active mb-4 mt-5  text-right">
              SAVE
            </button>
            <button type="submit" className="mb-4 mt-5 text-right">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    preliminaryDetails: state.preliminary.preliminaryDetails,
    notify: state.preliminary.notify,
    projectId: state.preliminary.projectId,
    isVisible: state.preliminary.isVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    preliminaryAdd: (projectId, preliminaryDetails) =>
      dispatch(actions.preliminaryAdd(projectId, preliminaryDetails)),
    preliminaryEdit: (projectId, preliminaryDetails) =>
      dispatch(actions.preliminaryEdit(projectId, preliminaryDetails)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId)),
    expandPreliminaryComponentByComponentId: (projectId: string) =>
      dispatch(actions.expandPreliminaryComponentByComponentId(projectId)),
    expandAllPreliminaryComponents: () =>
      dispatch(actions.expandAllPreliminaryComponents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preliminaries);
