import React, { Component, useEffect } from 'react';
import DiscountTable from '../components/Table/DiscountTable';
import DiscountForm from '../components/Forms/Discount/DiscountForm';
import { FormattedMessage, injectIntl } from 'react-intl';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import EventType from '../enums/EventType';
import Notify from '../enums/Notify';
import { IDiscountState } from '../store/DiscountForm/Types/IDiscountState';
import * as actions from '../store/rootActions';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
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
}

interface IProps {
  match: any;
}

interface IMapStateToProps {
  form: IDiscountActivity;
  notify: Notify;
  projectId: string;
  event: EventType;
  projectStatus: Array<ILookup>;
  currencies: Array<ICurrency> | null;
  currencyId: number;
  clientName: string;
  otherClientName: string;
}


  const Discounts: React.FC<IProps &
  IMapStateToProps &
  IMapDispatchToProps> = props => {
    let paramProjectId = props.match.params.projectId;
    let history = useHistory();
    useEffect(() => {
      window.scrollTo(0, 0);
      props.getProjectStatus();
      props.getAllCurrencies();
      if (paramProjectId != null && paramProjectId != '') {
        props.getDiscountData(paramProjectId);
      }
    }, []);

    useEffect(() => {
      if (props.notify == Notify.success) {
        if (props.event == EventType.next) {
          toast.success('Data Saved Successfully');
          history.push(`/Preliminaries/${props.match.params.projectId}`);
        } else if (props.event == EventType.previous) {
          toast.success('Data Saved Successfully');
          history.push('/Subcontractor');
        }
        else if (props.event == EventType.save) {
          toast.success('Data Saved Successfully');
        }
        props.resetDiscountState();
      }
    }, [props.notify, props.event]);

    const handlePrevious = (data: IDiscountActivity) => {
      data.discountId == ''
        ? props.discountFormAdd(paramProjectId, data, EventType.previous)
        : props.discountFormEdit(data, EventType.previous);
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
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-wrap discount_wrap">
              <div className="heading-subtitle">
                <h1>
                  <FormattedMessage id="TITLE_JUSTIFICATION" />
                </h1>
                <p className="text-green"><FormattedMessage id="SUB_TITLE_DISCOUNTS" /></p>
              </div>
              <DiscountTable></DiscountTable>
              <DiscountForm onNext={handleNext}
              onPrevious={handlePrevious}
              onSave={handleSave}
              projectstatus={props.projectStatus}
              currencies={props.currencies}
              currencyId={props.currencyId} 
              clientName={props.clientName}
              otherClientName= {props.otherClientName} />
            </div>
          </div>
        </div>
      </div>
    );
  }


  const mapStateToProps = (state: IState) => ({
    form: state.discount.form,
    notify: state.discount.notify,
    event: state.discount.event,
    projectStatus: state.lookup.projectstatus,
    currencies: state.lookup.currencies,
    currencyId: state.project.form.currencyId,
    clientName: state.project.form.companyId,
    otherClientName: state.project.form.otherCompanyName
  });
  
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
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Discounts);