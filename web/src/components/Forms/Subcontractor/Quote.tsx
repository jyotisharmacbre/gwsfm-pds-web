import React from 'react';
import { Field, reduxForm, InjectedFormProps, FormSection } from 'redux-form';
import IReactIntl from '../../../Translations/IReactIntl';
import { IQuote } from '../../../store/SubContractor/Types/IQuote';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import ValidatedNumericInput from '../../NumericInput';

const Quote = ({ fields }) => (
  <div className="row" data-test="sub-contractor-quote-form">
    <div className="col-lg-12">
      <div className="card_outer_wrap quote_wrap">
        <div className="row">
          {fields.map((member, index) => (
            <div key={index} className="col-lg-4 pl-md-2" data-test="sub-contractor-quote-member">
              <div className="card_wrap">
                <div className="card">
                  <h6 className="title"><FormattedMessage id='TITLE_QUOTE'></FormattedMessage> {index + 1}</h6>
                  <Field
                    name={`${member}.supplierName`}
                    data-test="supplierName"
                    type="text"
                    component={PdsFormInput}
                    validate={[
                      Validate.maxLength(1000)
                    ]}
                    labelKey="LABEL_ACTIVITY_NAME"
                    placeholderKey="PLACEHOLDER_SUPPLIER_NAME"
                  />
                  <ValidatedNumericInput
                    name={`${member}.quoteValue`}
                    type="number"
                    component={PdsFormInput}
                    className="pl-20"
                    validate={[
                      Validate.maxLength(1000),
                      onlyNumber
                    ]}
                    currency="$"
                    divPosition="relative"
                    labelKey="LABEL_QUOTE_VALUE"
                    placeholderKey=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Quote; 
