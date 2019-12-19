import React, { Component } from 'react';
import {
  Field,
  reduxForm,
  InjectedFormProps,
  formValueSelector,
  getFormValues
} from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import {
  Validate,
  alphaNumeric,
  onlyNumber
} from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LookupType } from '../../../store/Lookups/Types/LookupType'; 
import { getDropdown, getPropertyName, getDiscountTypeValue, getRadioOptions, getFilterElementFromArray } from '../../../helpers/utility-helper';
import { calculateClientDiscount } from '../../../helpers/formulas';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import Currency from '../../../store/Lookups/InitialState/Currency';
import IReactIntl from '../../../Translations/IReactIntl';
import { MainTitle } from '../../Title/Title';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import { dynamicsCompany } from '../../TypeAhead/TypeAheadConstantData/dynamicCompanyData';
import CalculationsSummaryTable from '../../Table/CalculationsSummaryTable';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType';
import ISummaryCalculation from '../../../store/SummaryCalculation/Types/ISummaryCalculation';
import { dynamicsContract } from '../../TypeAhead/TypeAheadConstantData/dynamicContractData';
import Currency from '../../../store/Lookups/InitialState/Currency';


interface Props {
  onNext: (data: IDiscountActivity) => void;
  onPrevious: (data: IDiscountActivity) => void;
  onSave: (data: IDiscountActivity) => void;
  projectstatus: any;
  currencies: Array<ICurrency> | null;
  currencyId: any;
  clientName: string;
  otherClientName: string;
  projectId:string;
}

interface IMapStateToProps {
  initialValues: IDiscountActivity;
  discountTypeValue: number;
  clientDiscountValue:number;
  discountForm:  {} | IDiscountActivity;
  summaryCalculation:ISummaryCalculation;
}

  let DiscountForm: React.FC<Props & IMapStateToProps & InjectedFormProps<IDiscountActivity, Props & IMapStateToProps>> = props => {
  const { handleSubmit, initialValues, discountTypeValue } = props;
  const normalize = value => (value ? parseInt(value) : null);
  const CurrencyObj = new Currency();
  const currencySymbol = getFilterElementFromArray(
                    props.currencies,
                    getPropertyName(
                    CurrencyObj,
                    prop => prop.currencyId
                  ),
                    props.currencyId > 0 ? props.currencyId : props.userPreferenceCurrencyId,
                    getPropertyName(
                    CurrencyObj,
                    prop => prop.currencySymbol
                  )
  );
  
  return (
    <div className="container-fluid">
      <CalculationsSummaryTable
        projectId={props.projectId}
        name={CalculationsSummaryType.discount} 
        discount={props.discountForm}
        currencySymbol={currencySymbol}/>
      <div className=" row">
        <div className="col-lg-12 col-sm-12">
          <div className="Discountforms_wrap">
            <form className="custom-wrap p-0" noValidate={true}>
              <div className="row">
                <div className="col-lg-8">
                  <MainTitle>
                    <FormattedMessage id="TITLE_SUBCONTRACTOR_DISCOUNT" />
                  </MainTitle>
                  <Field
                    name="supplierName"
                    type="text"
                    component={PdsFormInput}
                    validate={[Validate.maxLength(1000)]}
                    messageKey="MESSAGE_SUPPLIER_NAME"
                    labelKey="LABEL_SUPPLIER"
                    placeholderKey="PLACEHOLDER_ENTER_SUPPLIER_NAME"
                  />
                  <Field
                    name="supplierState"
                    type="text"
                    component={PdsFormInput}
                    validate={[Validate.maxLength(1000)]}
                    messageKey="MESSAGE_STATE_DETAILS_NAME"
                    labelKey="LABEL_STATE_DETAILS"
                    placeholderKey="PLACEHOLDER_ENTER_STATE_DETAILS"
                  />
                  <Field
                  name="supplierTotalDiscount"
                    type="text"
                    className="width-120"
                    component={PdsFormInput}
                    validate={[Validate.maxLength(15)]}
                    messageKey="MESSAGE_TOTAL_DISCOUNT"
                    labelKey="LABEL_TOTAL_DISCOUNT"
                    normalize={normalize}
                  />
                  <Field
                  name="supplierComments"
                    rows={7}
                    type="textarea"
                    component={PdsFormTextArea}
                    validate={[Validate.maxLength(5000)]}
                    labelKey="LABEL_COMMENTS"
                    placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                  />
                  </div></div>
                  <div className="row">
                <div className="col-lg-12">
                  <div className="hr_line"></div>
                  </div></div>
                  <div className="row">
                <div className="col-lg-8">
                  <MainTitle>
                    <FormattedMessage id="TITLE_CLIENT_DISCOUNT" />
                  </MainTitle>
                  <Field
                  input={{
                    value: (getFilterElementFromArray(dynamicsContract,"CustomerId", props.clientName,"Name") || props.otherClientName),
                    disabled: true
                    }}
                    type="text"
                    component={PdsFormInput}
                   
                    labelKey="LABEL_CLIENT"
                    messageKey="LABEL_CLIENT"
                    placeholderKey="PLACEHOLDER_ENTER_CLIENT_NAME"
                  />
                  <Field
                  name="clientState"
                    type="text"
                    component={PdsFormInput}
                    validate={[Validate.maxLength(1000)]}
                    messageKey="MESSAGE_STATE_DETAILS"
                    labelKey="LABEL_STATE_DETAILS"
                    placeholderKey="PLACEHOLDER_ENTER_STATE_DETAILS"
                  />
                  <div className="form-group">
                  <label>
                    <FormattedMessage id="LABEL_DISCOUNT_TYPE" />
                  </label>
                 {props.projectstatus &&
                    props.projectstatus.filter(
                        element => element.lookupItem == LookupType.Discount_Type
                      )
                      .map((data, index) => {
                        return (
                          <div className="form-check" key={index}>
                            <Field
                              name= "discountType"
                              component="input"
                              type="radio"
                              value={+data.lookupKey}
                              normalize={normalize}
                            />
                            <label className="form-check-label">
                              <FormattedMessage id={data.description} />
                            </label>
                          </div>
                        );
                      })}
                      </div>
                  <Field
                  name="clientDiscount"
                    type="text"
                    className="width-250 pl-30"
                    component={PdsFormInput}
                    validate={[Validate.maxLength(15)]}
                    messageKey="MESSAGE_DISCOUNT"
                    labelKey="LABEL_DISCOUNT"
                    placeholderKey="PLACEHOLDER_DISCOUNT"
                    normalize={normalize}
                    discountBind = {getDiscountTypeValue(props.projectstatus && props.projectstatus
                      .filter(
                        element => element.lookupItem == LookupType.Discount_Type
                      ), discountTypeValue,
                      currencySymbol                     
                    )}
                  />
                  <label className="w-100 mb-0">
                     <FormattedMessage id='LABEL_SUB_TOTAL_DISCOUNTS'></FormattedMessage>
                    </label>
                    <label className="m-0 mb-4">{currencySymbol}{calculateClientDiscount(discountTypeValue,props.summaryCalculation.cost,props.clientDiscountValue)}</label>
                  <Field
                  name="clientComments"
                    rows={7}
                    type="textarea"
                    component={PdsFormTextArea}
                    validate={[Validate.maxLength(5000)]}
                    labelKey="LABEL_COMMENTS"
                    placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                  />
                </div>
              </div>
              <div className="hr_line mb-0 mt-4"></div>

              <div className="mr-35 d-flex justify-content-between mb-4">
                <button className="active mb-4 mt-5" type="button" name="previous"
                onClick={handleSubmit(values => props.onPrevious(values))}>
                  <FormattedMessage id="BUTTON_PREVIOUS" />
                </button>
                <button
                  className="active mb-4 mt-5"
                  type="button"
                  name="save"
                  style={{ marginLeft: '35%' }}
                  onClick={handleSubmit(values => props.onSave(values))}
                >
                  <FormattedMessage id="BUTTON_SAVE" />
                </button>
                <button type="button" name="next" className="mb-4 mt-5 mr-0"
                onClick={handleSubmit(values => props.onNext(values))}>
                  <FormattedMessage id="BUTTON_NEXT" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.discount.form,
  discountTypeValue: discountSelector(state, 'discountType'),
  clientDiscountValue:discountSelector(state, 'clientDiscount'),
  discountForm:  getFormValues('DiscountForm')(state),
  summaryCalculation:state.summaryCalculation,
  userPreferenceCurrencyId: userPreferenceSelector(state, 'currencyId')
});

const form = reduxForm<IDiscountActivity, Props & IMapStateToProps>({
  form: 'DiscountForm',
  enableReinitialize: true
})(DiscountForm);

const discountSelector = formValueSelector('DiscountForm');
const userPreferenceSelector = formValueSelector('UserProfileForm');

export default connect(mapStateToProps)(form);
