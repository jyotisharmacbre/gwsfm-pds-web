import React, { Component } from 'react';
import {
  Field,
  reduxForm,
  InjectedFormProps,
  formValueSelector
} from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import { getDropdown } from '../../../helpers/utility-helper';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import IReactIntl from '../../../Translations/IReactIntl';

interface Props{

}

const DiscountForm: React.FC<
  Props & IReactIntl & InjectedFormProps<any>
> = (props: any) => {
  
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="Discountforms_wrap">
            <div className="row">
              <div className="col-lg-7">
                <form className="custom-wrap p-0">
                  <h2><FormattedMessage id="TITLE_SUBCONTRACTOR_DISCOUNT"></FormattedMessage></h2>
                    <Field
                      name="name"
                      type="text"
                      component={PdsFormInput}
                      className="required"
                      validate={[
                        Validate.required('LABEL_SUPPLIER'),
                        Validate.maxLength(1000)
                      ]}
                      messageKey="MESSAGE_SUPPLIER_NAME"
                      labelKey="LABEL_SUPPLIER"
                      placeholderKey="PLACEHOLDER_ENTER_SUPPLIER_NAME"
                    />
                    <Field
                      name="name"
                      type="text"
                      component={PdsFormInput}
                      className="required"
                      validate={[
                        Validate.required('LABEL_STATE_DETAILS'),
                        Validate.maxLength(1000)
                      ]}
                      messageKey="MESSAGE_STATE_DETAILS_NAME"
                      labelKey="LABEL_STATE_DETAILS"
                      placeholderKey="PLACEHOLDER_ENTER_STATE_DETAILS"
                    /> 
                  <div className="form-group">
                    <label><FormattedMessage id="LABEL_TOTAL_DISCOUNT"></FormattedMessage></label>
                    <input
                      className="width-120 form-control"
                      type="text"
                      placeholder=""
                    />
                    <span className="symbol_fix">&#163;</span>
                    <label className="w-100 mb-0 mt-3">
                    <FormattedMessage id="LABEL_SUB_TOTAL_DISCOUNTS"></FormattedMessage> 
                    </label>
                    <label className="m-0"><FormattedMessage id="LABEL_200000"></FormattedMessage></label>
                    </div>
                  <Field
                  name="scope"
                  rows="6"
                  component={PdsFormTextArea}
                  className="required"
                  validate={[
                    Validate.required('LABEL_COMMENTS'),
                    Validate.maxLength(1040)
                  ]}             
                  labelKey="LABEL_COMMENTS"
                  placeholderKey="PLACEHOLDER_TYPE_IN_ANY_ADDITIONAL_COMMENTS"
                />
                </form>
              </div>
            </div>

            <div className="hr_line"></div>

            <div className="row">
              <div className="col-lg-7">
                <form className="custom-wrap p-0">
                  <h2><FormattedMessage id="TITAL_CLIENT_DISCOUNT"></FormattedMessage></h2>
                  <Field
                      name="name"
                      type="text"
                      component={PdsFormInput}
                      className="required"
                      validate={[
                        Validate.required('LABEL_CLIENT'),
                        Validate.maxLength(1000)
                      ]}
                      messageKey="MESSAGE_CLIENT_NAME"
                      labelKey="LABEL_CLIENT"
                      placeholderKey="PLACEHOLDER_ENTER_CLIENT_NAME"
                    />
                  <Field
                      name="name"
                      type="text"
                      component={PdsFormInput}
                      className="required"
                      validate={[
                        Validate.required('STATE_DETAILS'),
                        Validate.maxLength(1000)
                      ]}
                      messageKey="MESSAGE_STATE_DETAILS"
                      labelKey="LABEL_STATE_DETAILS"
                      placeholderKey="PLACEHOLDER_ENTER_STATE_DETAILS"
                    />
                  <div className="form-group">
                    <label><FormattedMessage id="LABEL_DISCOUNT_TYPE"></FormattedMessage></label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="Value"
                        id="1"
                      />
                      <label className="form-check-label" htmlFor="1">
                      <FormattedMessage id="LABEL_PERCENTAGE"></FormattedMessage>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="Value"
                        id="2"
                      />
                      <label className="form-check-label" htmlFor="2">
                        LABEL_VALUE
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>LABEL_DISCOUNT</label>
                    <input
                      className="width-250 form-control"
                      type="text"
                      placeholder=""
                    />
                    <span className="symbol_fix">PLACEHOLDER_QUOTE_SUPPLIER2</span>
                    <label className="w-100 mb-0 mt-3">
                      LABEL_SUB_TOTAL_DISCOUNTS
                    </label>
                    <label className="m-0">LABEL_&#163;2,000.00</label>
                  </div>
                  <Field
                  name="scope"
                  rows="6"
                  component={PdsFormTextArea}
                  className="required"
                  validate={[
                    Validate.required('LABEL_COMMENTS'),
                    Validate.maxLength(1040)
                  ]}             
                  labelKey="LABEL_COMMENTS"
                  placeholderKey="PLACEHOLDER_TYPE_IN_ANY_ADDITIONAL_COMMENTS"
                />
                </form>
              </div>
            </div> 

            <div className="hr_line mb-0 mt-4"></div>

            <div className="mr-35 three-btn">
              <button className="active" type="button">
                BUTTON_PREVIOUS
              </button>
              <button type="button" name="next" className="active ml-auto">
                BUTTON_SAVE
              </button>
              <button type="button" name="next">
                BUTTON_NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const form = reduxForm<IProjectDetail, Props>({
    form: 'DiscountForm',
    enableReinitialize: true
  })(injectIntl(DiscountForm));
  
  export default connect(null)(form);


