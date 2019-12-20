import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import SubcontractorForm from '../components/Forms/Subcontractor/SubcontractorForm';
import { ISubContractor } from '../store/SubContractor/Types/ISubContractor';
import * as actions from '../store/rootActions';
import { IState } from '../store/state';
import EventType from '../enums/EventType';
import { toast } from 'react-toastify';
import Notify from '../enums/Notify';
import {getPropertyName,getFilterElementFromArray} from '../helpers/utility-helper';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { FormattedMessage } from 'react-intl';
import Currency from '../store/Lookups/InitialState/Currency';
import ProjectStatus from '../enums/ProjectStatus';
import {History} from "history";

interface IProps {
  match: any;
  history:History;
} 

interface IMapStateToProps {
  form:ISubContractor;
  notify: Notify;
  event: EventType;
  currencyId:number,
  currencies: Array<ICurrency> | null;
  status:number;
}

interface IMapDispatchToProps {
  subContractorFormAdd: (
    projectId: string,
    form: ISubContractor,
    event: EventType
  ) => void;
  subContractorFormEdit: (
    projectId:string,
    form: ISubContractor,
    event: EventType
  ) => void;
  getSubContractor: (projectId: string) => void;
  getProjectDetail: (projectId: string) => void;
  resetSubContractorState: () => void;
  getAllCurrencies:() => void;
}

const Subcontractor: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = props => {
  let paramProjectId:string = '';
  const CurrencyObj = new Currency();
  const [currencySymbol,setCurrencySymbol] = React.useState('$');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    let allc = props.currencies;
    props.getAllCurrencies();
    paramProjectId = props.match.params.projectId;
    if (paramProjectId != null && paramProjectId != '') {
      props.getProjectDetail(paramProjectId);
      props.getSubContractor(paramProjectId);
    }
  }, []);

  useEffect(() => {
    if(props.currencyId>0 && props.currencies){
      setCurrencySymbol(
        getFilterElementFromArray(
                        props.currencies,
                        getPropertyName(
                        CurrencyObj,
                        prop => prop.currencyId
                      ),
                        props.currencyId,
                        getPropertyName(
                        CurrencyObj,
                        prop => prop.currencySymbol
                      )
                      )
      )
    }
  }, [props.currencyId,props.currencies]);
 
  useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.next) {
        toast.success('Data Saved Successfully');
        props.history.push(`/Discounts/${props.match.params.projectId}`);
      } else if (props.event == EventType.previous) {
        toast.success('Data Saved Successfully');
        props.history.push(`/preliminaries/${props.match.params.projectId}`);
      }
      else if (props.event == EventType.save) {
        toast.success('Data Saved Successfully');
      }
      props.resetSubContractorState();
    }
  }, [props.notify, props.event]);

  const handleEvent= (data: ISubContractor,event:EventType) => {
    paramProjectId = props.match.params.projectId;
    data.activities[0].subContrActivityId == ''
      ? props.subContractorFormAdd(paramProjectId, data, event)
      : props.subContractorFormEdit(paramProjectId,data, event);
  }; 

  return (
    <div className="container-fluid">
           <div data-test="sub_row_status" className={(props.status==ProjectStatus.BidLost||props.status==ProjectStatus.OnHold)?"link_disabled row":"row"}>
          <div className="col-lg-12">
            <div className="custom-wrap">
              <div className="heading-subtitle">
                <h1>
                  <span className="d-md-block d-none">
                   <FormattedMessage id='TITLE_JUSTIFICATION'></FormattedMessage>
                  </span>
                  <span className="d-md-none"> <FormattedMessage id='TITLE_JUSTIFICATION_SHORT'></FormattedMessage></span>
                </h1>
                <p className="text-green"> <FormattedMessage id='PAGE_SUB_TITLE'></FormattedMessage></p>
              </div>
            {currencySymbol != '' ? <SubcontractorForm
              projectId={props.match.params.projectId}
              onSubmitForm={handleEvent}
              currencySymbol={currencySymbol}
            />:null}
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
  currencyId:state.project.form.currencyId,
  currencies: state.lookup.currencies,
  status:state.project.form.status

});

const mapDispatchToProps = dispatch => {
  return {
    subContractorFormAdd: (projectId, form, event) =>
      dispatch(actions.subContractorFormAdd(projectId, form, event)),
    subContractorFormEdit: (projectId,form, event) =>
      dispatch(actions.subContractorFormEdit(projectId,form, event)),
    getProjectDetail: projectId =>
      dispatch(actions.getProjectDetail(projectId)),
    getSubContractor: projectId =>
      dispatch(actions.getSubContractor(projectId)),
    resetSubContractorState: () =>
      dispatch(actions.resetSubContractorState()),
    getAllCurrencies: () => dispatch(actions.getAllCurrencies())
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subcontractor);