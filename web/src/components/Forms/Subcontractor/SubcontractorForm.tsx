import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, InjectedFormProps,FormSection,formValueSelector } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import CalculationsSummaryTable from '../../Table/CalculationsSummaryTable';
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
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType'; 
import EventType from '../../../enums/EventType';
 
interface Props {
  onSubmitForm: (data: ISubContractor,event:EventType) => void;
}

let SubcontractorForm: React.FC<
  Props & IReactIntl & InjectedFormProps<ISubContractor, Props>
> = (props: any) => {
   const {handleSubmit} = props;
  return (
    <form className="subcontractor_form" onSubmit={handleSubmit} noValidate={true}>
      <CalculationsSummaryTable
      name={CalculationsSummaryType.subContractor} 
      subContractor={props.subContractorForm}/>
      <FieldArray 
      name="activities" 
      component={SubContractorActivityForm}
       />
      
      <div className="mr-35 three-btn">
         <button
          className="active" 
          data-test="previous-click"
                type="button"
                name="previous"
                onClick={handleSubmit(values => props.onSubmitForm(values,EventType.previous))}
              >
                <FormattedMessage id="BUTTON_PREVIOUS" />
              </button>
              <button
              name="save" 
              data-test="save-click" className="active ml-auto"
                type="button"
                onClick={handleSubmit(values => props.onSubmitForm(values,EventType.save))}
              >
                <FormattedMessage id="BUTTON_SAVE" />
              </button>
              <button
              data-test="next-click"
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

const selector = formValueSelector('subContractorForm');

const mapStateToProps = (state: IState) => ({
  initialValues: state.subContractor.form,
  subContractorForm: selector(state, 'activities')
});

const form = reduxForm<ISubContractor, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'subContractorForm',
  enableReinitialize: true
})(injectIntl(SubcontractorForm));

export default connect(mapStateToProps)(form);