import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import DatePicker from '../../DatePicker';
import { selectionButtons } from '../../../helpers/constants';
import { enquiryTypeData } from '../../../helpers/dropDownFormValues';
import { IState } from '../../../store/state';
import { IProjectAdditionalDetail } from '../../../store/ProjectOverviewForm/Types/IProjectAdditionalDetail';
import { getPropertyName, getDropdown } from '../../../helpers/utility-helper';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import EventType from '../../../enums/EventType';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { Validate, alphaNumeric } from '../../../helpers/fieldValidations';
import { FormattedMessage, injectIntl } from 'react-intl';
import IReactIntl from '../../../Translations/IReactIntl';

interface Props {
  onNext: (data: IProjectAdditionalDetail) => void;
  onPrevious: (data: IProjectAdditionalDetail) => void;
  projectstatus: any;
  status:number;
}

let ProjectOverviewForm: React.FC<Props &
  IReactIntl &
  InjectedFormProps<IProjectAdditionalDetail, Props>> = (props: any) => {
  const { handleSubmit, initialValues } = props;
  const DropdownOptions = projectStatusData.map((status: any, i: number) => (
    <option key={i} value={status.value}>
      {status.label}
    </option>
  ));
  const normalize = value => (value ? parseInt(value) : null);
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-lg-12 col-sm-12">
          <form
            className="project-overview-form"
            noValidate={true}
            data-test="projectOverviewForm"
          >
            <div className={(props.status==4||props.status==6)?"link_disabled row":"row"}>
              <div className="col-lg-8">
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.mainContractor
                  )}
                  data-test="mainContractor"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_MAIN_CONTRACTOR"
                  placeholderKey="PLACEHOLDER_CONTRACTORS_NAME"
                  className="required"
                  validate={[
                    Validate.required('LABEL_MAIN_CONTRACTOR'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.enquiryReceivedFrom
                  )}
                  data-test="enquiryReceivedFrom"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                  validate={[
                    Validate.required('LABEL_ENQUIRY_RECEIVED_FROM'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_ENQUIRY_RECEIVED_FROM"
                  placeholderKey="PLACEHOLDER_ENQUIRY_SENDER_NAME"
                />
                <div className="form-group">
                  <label>
                    <FormattedMessage id="LABEL_TYPE_OF_ENQUIRY" />*
                  </label>
                  {props.projectstatus &&
                    props.projectstatus
                      .filter(
                        element => element.lookupItem == LookupType.Enquiry_Type
                      )
                      .map((data, index) => {
                        return (
                          <div className="form-check" key={index}>
                            <Field
                              name={getPropertyName(
                                initialValues,
                                prop => prop.enquiryTypeId
                              )}
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
                  name={getPropertyName(
                    initialValues,
                    prop => prop.creditCheckResult
                  )}
                  data-test="creditCheckResult"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                  validate={[
                    Validate.required('LABEL_CREDIT_CHECK_RESULT'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_CREDIT_CHECK_RESULT"
                  placeholderKey="PLACEHOLDER_CREDIT_CHECK_DETAILS"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.siteAddress
                  )}
                  data-test="siteAddress"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                  validate={[
                    Validate.required('LABEL_SITE_ADDRESS'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_SITE_ADDRESS"
                  placeholderKey="PLACEHOLDER_ADD_SITE_ADDRESS"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.cdmNotifiable
                  )}
                  data-test="cdmNotifiable"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_CDMNOTIFIABLE"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.formOfContract
                  )}
                  data-test="formOfContract"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                  validate={[
                    Validate.required('LABEL_FORM_OF_CONTRACT'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_FORM_OF_CONTRACT"
                  placeholderKey="PLACEHOLDER_FORM_OF_CONTRACT"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.retention)}
                  data-test="retention"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                  validate={[
                    Validate.required('LABEL_RETENTION'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_RETENTION"
                  placeholderKey="PLACEHOLDER_ADD_RETENTION"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.liquidatedDamages
                  )}
                  data-test="liquidatedDamages"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                  validate={[
                    Validate.required('LABEL_LIQUIDATED_DAMAGES'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_LIQUIDATED_DAMAGES"
                  placeholderKey="PLACEHOLDER_ADD_LIQUIDATED_DAMAGES"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.insurance)}
                  data-test="insurance"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                  validate={[
                    Validate.required('LABEL_INSURANCE'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_INSURANCE"
                  placeholderKey="PLACEHOLDER_ADD_INSURANCE"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_WORK_TYPE" />*
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name={getPropertyName(
                        initialValues,
                        prop => prop.workTypeId
                      )}
                      component={PdsFormSelect}
                      className="required"
                      validate={[Validate.required('MESSAGE_PROJECT_STATUS')]}
                      placeholderKey="PLACEHOLDER_WORK_TYPES"
                      messageKey="MESSAGE_PROJECT_STATUS"
                    >
                      <FormattedMessage id="PLACEHOLDER_WORK_TYPES">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(props.projectstatus, LookupType.Work_Type)}
                    </Field>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-10">
                    <div className="form-group">
                      <label>
                        <FormattedMessage id="LABEL_PROJECT_PLAN" />
                      </label>
                      <div className="calender-wrap">
                        <div className="row">
                          <div className="col-xl-6 mt-2 position-relative manipulate-calendar">
                            <DatePicker
                              name="commenceDate"
                              data-test="commenceDate"
                              labelKey="LABEL_COMMENCE_DATE"
                            />
                          </div>
                          <div className="col-xl-6 mt-2 position-relative manipulate-calendar">
                            <DatePicker
                              name="completionDate"
                              data-test="completionDate"
                              labelKey="LABEL_COMPLETION_DATE"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <Field
                              name={getPropertyName(
                                initialValues,
                                prop => prop.milestones
                              )}
                              data-test="milestones"
                              labelKey="LABEL_PROJECTMILE_STONES"
                              rows="7"
                              component={PdsFormTextArea}
                              placeholderKey="PLACEHOLDER_PROJECT_MILESTONES"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-10">
                    <div className="form-group">
                      <label>Project Plan</label>
                      <div className="calender-wrap">
                        <div className="row">
                          <div className="col-xl-6 mt-2 position-relative manipulate-calendar">
                            <DatePicker
                              name="firstValuationDate"
                              data-test="firstValuationDate"
                              labelKey="LABEL_FIRST_VALUATION_DATE"
                            />
                          </div>
                          <div className="col-xl-6 mt-2 position-relative manipulate-calendar" >
                            <DatePicker
                              name="finalAccountDate"
                              data-test="finalAccountDate"
                              labelKey="LABEL_FIRST_ACCOUNT_DATE"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <Field
                              name={getPropertyName(
                                initialValues,
                                prop => prop.valuationIntervals
                              )}
                              data-test="valuationIntervals"
                              type="text"
                              component={PdsFormInput}
                              labelKey="LABEL_VALUATION_INTERVALS"
                              placeholderKey="PLACEHOLDER_VALUATION_INTERVALS"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <Field
                              name={getPropertyName(
                                initialValues,
                                prop => prop.paymentTerms
                              )}
                              data-test="paymentTerms"
                              type="text"
                              component={PdsFormInput}
                              labelKey="LABEL_PAYMENT_TERMS"
                              placeholderKey="PLACEHOLDER_PAYMENT_TERMS"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedByHop
                  )}
                  data-test="authorizedByHop"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_AUTHORIZED_BY_HOP"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_PROJECT_BUDGET" />*
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name={getPropertyName(initialValues, prop => prop.budget)}
                      component={PdsFormSelect}
                      validate={[Validate.required('PLACEHOLDER_BUDGET')]}
                      placeholderKey="PLACEHOLDER_BUDGET"
                      messageKey="MESSAGE_PROJECT_STATUS"
                    >
                      <FormattedMessage id="PLACEHOLDER_BUDGET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {DropdownOptions}
                    </Field>
                  </div>
                </div>
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedBy
                  )}
                  data-test="authorizedBy"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_AUTHORIZED_BY"
                  placeholderKey="PLACEHOLDER_LABEL"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedBySecond
                  )}
                  data-test="authorizedBySecond"
                  type="text"
                  component={PdsFormInput}
                  placeholderKey="PLACEHOLDER_LABEL"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedByThird
                  )}
                  data-test="authorizedByThird"
                  type="text"
                  component={PdsFormInput}
                  placeholderKey="PLACEHOLDER_LABEL"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.isProjectLive
                  )}
                  data-test="isProjectLive"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_PROJECT_IS_LIVE"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.comments)}
                  data-test="comments"
                  labelKey="LABEL_COMMENTS"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                />
              </div>
            </div>
            {/* AUTHORISED SECTION */}
            <div className={(props.status==4||props.status==6)?"link_disabled row":"row"}>
              <div className="col-xl-6">
                <div className="authorised_form_wrap">
                  <h6 className="ml-0">
                    <FormattedMessage id="TITLE_PROJECT_AUTHORISED" />
                  </h6>
                  <div className="authorised_form_inner">
                    <div className="row">
                      <div className="col-md-12 d-flex">
                        <label><FormattedMessage id="LABEL_AUTHORISED_BY" /></label>
                        <h6 className="mb-0 d-none d-lg-block"><FormattedMessage id="TITLE_SIGN_OFF_STATUS" /> </h6>
                      </div>
                      <div className="col-lg-9">
                          {/* <input className="form-control" type="text" placeholder="" /> */}
                          <Field
                            name={getPropertyName(
                              initialValues,
                              prop => prop.mainContractor
                            )}
                            data-test="mainContractor"
                            type="text"
                            component={PdsFormInput}                            
                            rightSideFixPlaceHolderKey = "FIX_TEXT_HOP"
                            className="required"
                            validate={[
                              Validate.required(''),
                              Validate.maxLength(1000)
                            ]}
                            warn={alphaNumeric}
                          />
                      </div>
                      <div className="col-lg-3">

                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="green" icon={faCheckCircle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_APPROVED" /> </label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label> Authorised By Up To &#163; 100k</label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_AGM" /></span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="green" icon={faCheckCircle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_APPROVED" /> </label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label> Authorised By Up To &#163; 250k</label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_COM" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="orange" icon={faClock} /></span>
                          <label className="approv_label"><FormattedMessage id="LABEL_PENDING" /> </label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label> Authorised By Up To &#163; 250k</label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_BUL" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="orange" icon={faClock} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_PENDING" /> </label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label> Authorised By Up To &#163; 1 Million</label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_DPD" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="orange" icon={faExclamationTriangle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_RESPONSE_AWAITED" /> </label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_DMD" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="orange" icon={faExclamationTriangle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_RESPONSE_AWAITED" /> </label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label> Authorised By Up To &#163; 3 Million</label>
                        <label className="right_label"><FormattedMessage id="LABEL_DELEGATE" /> </label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_DOFP" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="orange" icon={faExclamationTriangle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_RESPONSE_AWAITED" /> </label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label className="right_label"><FormattedMessage id="LABEL_DELEGATE" /> </label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_PCOMM" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="orange" icon={faExclamationTriangle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_RESPONSE_AWAITED" /></label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label className="right_label"><FormattedMessage id="LABEL_DELEGATE" /></label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_COO_UK_FD" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="orange" icon={faExclamationTriangle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_RESPONSE_AWAITED" /></label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label>Over &#163; 3 Million Authority</label></div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_CEO_GROUP_FD" /> </span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="green" icon={faCheckCircle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_APPROVED" /></label>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-stretch">
                      <div className="col-lg-9 col-md-12 d-flex">
                        <label>Over &#163; 4.5 Million</label>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <input className="form-control" type="number" placeholder="" />
                          <span className="right_fix_txt"><FormattedMessage id="FIX_TEXT_CBRE_REGULATIONS" /></span>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="approve_state">
                          <span className="icon"><FontAwesomeIcon className="green" icon={faCheckCircle} /></span>
                          <label className='approv_label'><FormattedMessage id="LABEL_APPROVED" /></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mr-35 d-flex justify-content-between mb-4">
              <button
                className="active mb-4 mt-5"
                type="button"
                onClick={handleSubmit(values => props.onPrevious(values))}
              >
                <FormattedMessage id="BUTTON_PREVIOUS" />
              </button>
              <button
                type="button"
                name="next"
                onClick={handleSubmit(values => props.onNext(values))}
                className="mb-4 mt-5 mr-0"
              >
                <FormattedMessage id="BUTTON_NEXT" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.projectOverview.form
});

const form = reduxForm<IProjectAdditionalDetail, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'projectOverviewForm',
  enableReinitialize: true
})(injectIntl(ProjectOverviewForm));

export default connect(mapStateToProps)(form);
