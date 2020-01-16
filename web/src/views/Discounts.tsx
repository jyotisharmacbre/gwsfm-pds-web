import React, { Component, useEffect } from 'react';
import DiscountForm from '../components/Forms/Discount/DiscountForm';
import { FormattedMessage } from 'react-intl';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import EventType from '../enums/EventType';
import Notify from '../enums/Notify';
import * as actions from '../store/rootActions';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { toast } from 'react-toastify';
import { match } from 'react-router-dom';
import { History } from 'history';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import ProjectStatus from '../enums/ProjectStatus';
import { IDynamicContractCustomerData } from '../store/DynamicsData/Types/IDynamicData';
import { getClassNameForProjectStatus } from '../helpers/utility-helper';

interface IProps {
  match: match<{projectId:string}>;
  history : History;
}

interface IMapStateToProps {
  form: IDiscountActivity;
  notify: Notify;
  event: EventType;
  projectStatus: Array<ILookup>;
  currencies: Array<ICurrency> | null;
  currencyId: number;
  contractorId: string;
  otherCustomerName: string;
  status: number;
  dynamicsContractCustomerData: Array<IDynamicContractCustomerData>;
}

interface IMapDispatchToProps {
  getProjectStatus: () => void;
  discountFormAdd: (
    projectId: string,
    form: IDiscountActivity,
    event: EventType
  ) => void;
  discountFormEdit: (
    form: IDiscountActivity,
    event: EventType
  ) => void;
  resetDiscountState: () => void;
  getDiscountData: (projectId: string) => void;
  getAllCurrencies: () => void;
  getProjectDetail: (projectId: string) => void;
  getSubContractor: (projectId:string) => void;
    getPreliminaryDetails: (projectId: string) => void;
}

const Discounts: React.FC<IProps & IMapStateToProps & IMapDispatchToProps> = props => {
    const paramProjectId = props.match.params.projectId;
  
    useEffect(() => {
      window.scrollTo(0, 0);
      props.getProjectStatus();
      props.getAllCurrencies();
      if (paramProjectId != null && paramProjectId != '') {
        props.getProjectDetail(paramProjectId);
        props.getDiscountData(paramProjectId);
        props.getSubContractor(paramProjectId);
        props.getPreliminaryDetails(paramProjectId);
    }
  }, []);

  useEffect(() => {
    if (props.notify == Notify.success) {
      if (props.event == EventType.next) {
        toast.success('Data Saved Successfully');
        props.history.push(`/ReviewSubmit/${props.match.params.projectId}`);
      } else if (props.event == EventType.previous) {
        props.history.push(`/Subcontractor/${props.match.params.projectId}`);
      } else if (props.event == EventType.save) {
        toast.success('Data Saved Successfully');
      }
      props.resetDiscountState();
    }
  }, [props.notify, props.event]);

  const handlePrevious = () => {
    props.history.push(`/Subcontractor/${props.match.params.projectId}`);
  };

  const handleNext = (data: IDiscountActivity) => {
    data.discountId == ''
      ? props.discountFormAdd(paramProjectId, data, EventType.next)
      : props.discountFormEdit(data, EventType.next);
  };

  const handleSave = (data: IDiscountActivity) => {
    data.discountId == ''
      ? props.discountFormAdd(paramProjectId, data, EventType.save)
      : props.discountFormEdit(data, EventType.save);
  };

  return (
    <div className="container-fluid">
      <div
        data-test="dis_row_status"
        className={`${getClassNameForProjectStatus(props.status)} row`}>
        <div className="col-lg-12">
          <div className="custom-wrap discount_wrap">
            <div className="heading-subtitle">
              <h1>
                <FormattedMessage id="TITLE_JUSTIFICATION" />
              </h1>
              <p className="text-green">
                <FormattedMessage id="SUB_TITLE_DISCOUNTS" />
              </p>
            </div>
            <DiscountForm
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSave={handleSave}
              projectstatus={props.projectStatus}
              currencies={props.currencies}
              currencyId={props.currencyId}
              contractorId={props.contractorId}
              otherCustomerName= {props.otherCustomerName} 
              projectId={props.match.params.projectId}
              dynamicsContractCustomerData={props.dynamicsContractCustomerData}/>
            </div>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state: IState) => ({
    form: state.discount.form,
    notify: state.discount.notify,
    event: state.discount.event,
    projectStatus: state.lookup.projectstatus,
    currencies: state.lookup.currencies,
    currencyId: state.project.form.currencyId,
    status:state.project.form.status,
    contractorId: state.project.form.contractorId,
    otherCustomerName: state.project.form.otherContractName,    
    dynamicsContractCustomerData: state.dynamicData.dynamicsContract
  })

  const mapDispatchToProps = dispatch => {
    return {
      getProjectStatus: () => dispatch(actions.getProjectStatus()),
      discountFormAdd: (projectId, form, event) =>
        dispatch(actions.discountFormAdd(projectId, form, event)),
      discountFormEdit: (form, event) =>
        dispatch(actions.discountFormEdit(form, event)),
      resetDiscountState: () =>
      dispatch(actions.resetDiscountState()),
      getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
      getDiscountData: (projectId: string) =>
      dispatch(actions.getDiscountData(projectId)),
      getProjectDetail: projectId =>
      dispatch(actions.getProjectDetail(projectId)),
      getSubContractor: (projectId:string) =>
        dispatch(actions.getSubContractor(projectId)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId)),
    };
}

  export default connect(mapStateToProps, mapDispatchToProps)(Discounts);
