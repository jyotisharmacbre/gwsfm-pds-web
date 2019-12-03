import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SubcontractorForm from '../components/Forms/Subcontractor/SubcontractorForm';
import { ISubContractor } from '../store/SubContractor/Types/ISubContractor';
import * as actions from '../store/rootActions';
import { IState } from '../store/state';
import EventType from '../enums/EventType';
import { toast } from 'react-toastify';
import Notify from '../enums/Notify';

interface IProps {
  match: any;
} 

interface IMapStateToProps {
  form:ISubContractor;
  notify: Notify;
  event: EventType;
}

interface IMapDispatchToProps {
  addNewActivity: () => void;
  deleteActivity:(index:number) => void;
  subContractorFormAdd: (
    projectId: string,
    form: ISubContractor,
    event: EventType
  ) => void;
  subContractorFormEdit: (
    form: ISubContractor,
    event: EventType
  ) => void;
  getSubContractor: (projectId: string) => void;
  getProjectDetail: (projectId: string) => void;
  resetSubContractorState: () => void;
}

const Subcontractor: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = props => {
  let history = useHistory();
  let paramProjectId:string = '';
  
  useEffect(() => {
    window.scrollTo(0, 0);
    paramProjectId = props.match.params.projectId;
    if (paramProjectId != null && paramProjectId != '') {
      props.getProjectDetail(paramProjectId);
      props.getSubContractor(paramProjectId);
    }
  }, []);
 
   useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.next) {
        toast.success('Data Saved Successfully');
        history.push('/Discounts');
      } else if (props.event == EventType.previous) {
        toast.success('Data Saved Successfully');
        history.push('/');
      }
      else if (props.event == EventType.save) {
        toast.success('Data Saved Successfully');
      }
      props.resetSubContractorState();
    }
  }, [props.notify, props.event]);

  const handleEvent= (data: ISubContractor,event:EventType) => {
    console.log(data);
    paramProjectId = props.match.params.projectId;
    data.activities[0].subContrActivityId == ''
      ? props.subContractorFormAdd(paramProjectId, data, event)
      : props.subContractorFormEdit(data, event);
  };

  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-wrap">
              <div className="heading-subtitle">
                <h1>
                  <span className="d-md-block d-none">
                    TITLE_JUSTIFICATION
                  </span>
                  <span className="d-md-none">TITLE_JUSTIFICATION_SHORT</span>
                </h1>
                <p className="text-green">PAGE_SUB_TITLE</p>
              </div>
            <SubcontractorForm
              onSubmitForm={handleEvent}
              addNewActivity={props.addNewActivity}
              deleteActivity={props.deleteActivity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  form: state.subContractor.form,
  notify: state.subContractor.notify,
  event: state.subContractor.event,
});

const mapDispatchToProps = dispatch => {
  return {
    addNewActivity: () => dispatch(actions.addNewActivity()),
    deleteActivity:(index:number) => dispatch(actions.deleteActivity(index)),
    subContractorFormAdd: (projectId, form, event) =>
      dispatch(actions.subContractorFormAdd(projectId, form, event)),
    subContractorFormEdit: (form, event) =>
      dispatch(actions.subContractorFormEdit(form, event)),
    getProjectDetail: projectId =>
      dispatch(actions.getProjectDetail(projectId)),
    getSubContractor: projectId =>
      dispatch(actions.getSubContractor(projectId)),
    resetSubContractorState: () =>
      dispatch(actions.resetSubContractorState())
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subcontractor);
