import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, InjectedFormProps,FormSection } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import DiscountTable from '../../Table/DiscountTable';
import SubContractorActivityForm from './SubContractorActivityForm';
import IReactIntl from '../../../Translations/IReactIntl';
import { ISubContractor } from '../../../store/SubContractor/Types/ISubContractor';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import { IState } from '../../../store/state';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import EventType from '../../../enums/EventType';

interface Props {
  onSubmitForm: (data: ISubContractor,event:EventType) => void;
  addNewActivity: () => void;
  deleteActivity: (index:number) => void;
}

let SubcontractorForm: React.FC<
  Props & IReactIntl & InjectedFormProps<ISubContractor, Props>
> = (props: any) => {
   const {handleSubmit} = props;
  return (
    <form className="subcontractor_form" onSubmit={handleSubmit} noValidate={true}>
      <DiscountTable></DiscountTable>
      <FieldArray 
      name="activities" 
      component={SubContractorActivityForm}
      totalCount={props.initialValues.activities.length}
      deleteActivity={props.deleteActivity}
       />
      <div className="newActiv_btn">
          <button type="button" disabled={props.initialValues.activities.length>4} className="active" onClick={props.addNewActivity}>
            <FontAwesomeIcon className="" icon={faPlusCircle} />
            BUTTON_NEW_ACTIVITY
          </button>
        </div>
      <div className="mr-35 three-btn">
         <button
          className="active" 
                type="button"
                name="previous"
                onClick={handleSubmit(values => props.onSubmitForm(values,EventType.previous))}
              >
                <FormattedMessage id="BUTTON_PREVIOUS" />
              </button>
              <button
              name="save" className="active ml-auto"
                type="button"
                onClick={handleSubmit(values => props.onSubmitForm(values,EventType.save))}
              >
                <FormattedMessage id="BUTTON_SAVE" />
              </button>
              <button
                type="button"
                name="next"
                onClick={handleSubmit(values => props.onSubmitForm(values,EventType.next))}
              >
                <FormattedMessage id="BUTTON_NEXT" />
              </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.subContractor.form
});

const form = reduxForm<ISubContractor, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'subContractorForm',
  enableReinitialize: true
})(injectIntl(SubcontractorForm));

export default connect(mapStateToProps)(form);
