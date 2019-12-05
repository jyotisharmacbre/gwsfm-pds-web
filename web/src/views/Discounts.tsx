import React, { Component } from 'react';
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
interface IMapDispatchToProps {
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
}

interface IProps {
  projectId: string;
}

interface IMapStateToProps {
  form: IDiscountActivity;
  notify: Notify;
  projectId: string;
  event: EventType;
}


  const Discounts: React.FC<IProps &
  IMapStateToProps &
  IMapDispatchToProps> = props => {

    const handlePrevious = (data: IDiscountActivity) => {
      data.projectId == ''
        ? props.discountFormAdd(props.projectId, data, EventType.previous)
        : props.discountFormEdit(data, EventType.previous);
    };
  
    const handleNext = (data: IDiscountActivity) => {
      data.projectId == ''
        ? props.discountFormAdd(props.projectId, data, EventType.next)
        : props.discountFormEdit(data, EventType.next);
    };

      
    const handleSave = (data: IDiscountActivity) => {
      data.projectId == ''
        ? props.discountFormAdd(props.projectId, data, EventType.save)
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
              onSave={handleSave}/>
            </div>
          </div>
        </div>
      </div>
    );
  }


  const mapStateToProps = (state: IState) => ({
    form: state.discount.form,
    notify: state.discount.notify,
    projectId: state.form.projectId,
    event: state.discount.event
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      discountFormAdd: (projectId, form, event) =>
        dispatch(actions.discountFormAdd(projectId, form, event)),
      discountFormEdit: (form, event) =>
        dispatch(actions.discountFormEdit(form, event))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Discounts);