import React from 'react';
import {
  Field,
  FieldArray,
  reduxForm,
  InjectedFormProps,
  FormSection
} from 'redux-form';
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

interface Props {
  index: number;
  name: string;
  initialValues: ISubContractorActivity;
  totalCount: number;
  deleteActivity: (index: number) => void;
}
 
const SubContractorActivityForm = ({ fields, totalCount, deleteActivity }) => (
  <div>
    {fields.map((member, index) => (
      <div className="row" key={index} data-test="sub-contractor-form">
        <div className="col-lg-12">
          <div className="forms_wrap">
            {totalCount > 1 ? (
              <button
                data-test="deleteactivity"
                className="delete_text"
                onClick={() => deleteActivity(index)}
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
                    Validate.required('LABEL_ACTIVITY_NAME'),
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
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.required('LABEL_TOTAL_COST'),
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  currency="$"
                  divPosition="relative"
                  labelKey="LABEL_TOTAL_COST"
                  placeholderKey=""
                />
                <Field
                  name={`${member}.grossMargin`}
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.required('LABEL_GROSS_MARGIN'),
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
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.required('LABEL_TOTAL_SELL'),
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  currency="$"
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
  </div>
);
//};

export default SubContractorActivityForm;
