import React from 'react';
import {Field, FieldArray, reduxForm, InjectedFormProps, FormSection, formValueSelector} from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import Quote from './Quote';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import IReactIntl from '../../../Translations/IReactIntl';
import { FormattedMessage, injectIntl } from 'react-intl';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  Validate,
  alphaNumeric,
  onlyNumber
} from '../../../helpers/fieldValidations';
import { selectionButtons } from '../../../helpers/constants';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {newActivity} from '../../../store/SubContractor/InitialState';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import {calculateSell} from '../../../helpers/utility-helper';
import { confirmAlert } from '../../Popup/CustomModalPopup';

interface Props {
  fields:any,
  activities:Array<ISubContractorActivity>;
  currencySymbol:string;
  intl:any;
}
 
const SubContractorActivityForm :React.FC<Props> = (props:Props) => {
  const {fields,intl} = props;
  return(
    <div>
    {fields.map((member, index) => (
      <div className="row" key={index} data-test="sub-contractor-form">
        <div className="col-lg-12">
          <div className="forms_wrap">
            {fields.length > 1 ? (
              <button
                data-test="deleteactivity"
                className="delete_text"
                onClick={
                 ()=>confirmAlert({
                  intl:props.intl,
                  title:"TITLE_CONFIRMATION",
                  message:"MESSAGE_SUBCONTRACTOR_DELETE_ACTIVITY",
                  handleConfirm:()=>fields.remove(index)
                })}
              >
                <FormattedMessage id='BUTTON_DELETE' />
                <FontAwesomeIcon className="" icon={faTrash} />
              </button>
            ) : null}
            <div className="row">
              <div className="col-lg-7">
                <Field
                  name={`${member}.activityName`}
                  data-test="activityName"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.maxLength(1000)
                  ]}
                  labelKey="LABEL_ACTIVITY_NAME"
                  placeholderKey="PLACEHOLDER_ACTIVITY_NAME"
                />
                <Field
                  name={`${member}.isExistingSubcontractor`}
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_EXISTING_SUBCONTRACTOR"
                />
                <Field
                  name={`${member}.subcontractorId`}
                  data-test="subcontractorId"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_SUBCONTRACTOR"
                  placeholderKey="PLACEHOLDER_SUBCONTRACTOR"
                />
                <Field
                  name={`${member}.isPreferredSupplier`}
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_PREFERRED_SUPPLIER"
                />
                <Field
                  name={`${member}.totalCost`}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20"
                  validate={[
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  currency={props.currencySymbol}
                  divPosition="relative"
                  labelKey="LABEL_TOTAL_COST"
                  placeholderKey=""
                />
                <Field
                  name={`${member}.grossMargin`}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20"
                  validate={[
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  currency="%"
                  divPosition="relative"
                  labelKey="LABEL_GROSS_MARGIN"
                  placeholderKey=""
                />
                <Field
                  name={`${member}.totalSell`}
                  type="number"
                  input={{
                    value:calculateSell(props.activities[index].totalCost,props.activities[index].grossMargin),
                    disabled:true
                    }}
                  component={PdsFormInput}
                  className="width-120 pl-20"
                  currency={props.currencySymbol}
                  divPosition="relative"
                  labelKey="LABEL_TOTAL_SELL"
                  placeholderKey=""
                />
                <Field
                  labelKey="LABEL_COMMENTS"
                  name={`${member}.comments`}
                  rows="7"
                  component={PdsFormTextArea}
                  placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                />
              </div>
            </div>
            <FieldArray
              name={`${member}.quotes`}
              component={Quote}
              key={index}
            />
          </div>
        </div>
      </div>
    ))}
    <div className="newActiv_btn"> 
          <button data-test="addActivity" name="addActivity" type="button" disabled={fields.length>4} className="active" onClick={() => fields.push({...newActivity})}>
            <FontAwesomeIcon className="" icon={faPlusCircle} />
            <FormattedMessage id='BUTTON_NEW_ACTIVITY'></FormattedMessage>
          </button>
        </div>
  </div>
  )
  
}

const mapStateToProps = (state: IState) => ({
    activities: selector(state, 'activities')
});

const selector = formValueSelector('subContractorForm');

export default connect(mapStateToProps)(SubContractorActivityForm);
