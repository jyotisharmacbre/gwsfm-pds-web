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
import CalculationsSummaryTable from '../../Table/CalculationsSummaryTable';
import { faCheckCircle, faClock, faExclamationTriangle, faUser, faTimes, faCheck, faDownload } from '@fortawesome/free-solid-svg-icons';


import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { Validate, alphaNumeric } from '../../../helpers/fieldValidations';
import { FormattedMessage, injectIntl } from 'react-intl';
import IReactIntl from '../../../Translations/IReactIntl';
import TypeAhead from '../../TypeAhead/TypeAhead';
import { dynamicsSubcontractorData } from '../../TypeAhead/TypeAheadConstantData/dynamicSubcontractorData';
import { IDynamicsOtherSubContractor } from '../../../store/DynamicsData/Types/IDynamicData';
import ProjectStatus from '../../../enums/ProjectStatus';
import ProjectActivity from '../ProjectActivities/ProjectActivity'; 
import ProjectOverviewGrid from "../../Table/ProjectOverviewGrid";
import { IProjectOverviewDetails } from '../../../store/ProjectOverviewForm/Types/IProjectOverviewDetails';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType';
import PricingSummary from './PricingSummary';
import ProjectOverviewRiskForm from './ProjectOverviewRiskForm';

interface Props {
  onNext: (data: IProjectOverviewDetails) => void;
  onPrevious: () => void;
  projectstatus: any;
  status:number;
  projectId:string;
}

let ProjectOverviewForm: React.FC<Props &
  InjectedFormProps<IProjectOverviewDetails, Props>> = props => {
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
            {/* 20-dec-2019 */}
            <div className="custom-wrap">
              <div className="row align-items-center mb-3">
                <div className="col-lg-6">
                  <h1 className="mb-2">Project Overview</h1>
                </div>
                <div className="col-lg-6 d-flex justify-content-xl-end justify-content-start">
                  <button
                    className="download_pdf_btn"
                    type="button"
                  ><FontAwesomeIcon className="" icon={faDownload} /> DOWNLOAD PDF
                  </button>
                </div>
              </div>
              <div className="project-info-block">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0">
                        <label>End Client Name</label>
                        <p>Mr. Client Name</p>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0">
                        <label>Project Name</label>
                        <p>The Project Name</p>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0">
                        <label>Project ID</label>
                        <p>PDS12345#</p>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0">
                        <label>Project Manager</label>
                        <p>Manager Name</p>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0">
                        <label>CN Number</label>
                        <p>651684654684</p>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-6 mb-3 m-xl-0 d-flex justify-content-start justify-content-xl-end">
                        <div className="d-flex justify-content-between">
                          <button type="submit" className="edit-btn">EDIT</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hr"></div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="project-info-desc">
                      <label>Project Scope</label>
                      <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <form
                className="project-overview-form"
                noValidate={true}
                data-test="projectOverviewForm"
              >
                <div className={(props.status == ProjectStatus.BidLost || props.status == ProjectStatus.OnHold) ? "link_disabled row" : "row"}>
                  <div className="col-lg-8">

                  <Field
                    name="projectAdditionalDetail.mainContractor"
                    type="text"
                    component={PdsFormInput}
                    className="required"
                    validate={[
                      Validate.required('LABEL_MAIN_CONTRACTOR')
                    ]}
                    labelKey="LABEL_MAIN_CONTRACTOR"
                    placeholderKey="PLACEHOLDER_CONTRACTORS_NAME"
                  />
                  <Field
                    name="projectAdditionalDetail.enquiryReceivedFrom"
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
                                name="projectAdditionalDetail.enquiryTypeId"
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
                    name="projectAdditionalDetail.creditCheckResult"
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
                    name="projectAdditionalDetail.siteAddress"
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
                    name="projectAdditionalDetail.cdmNotifiable"
                    data-test="cdmNotifiable"
                    component={PdsFormButton}
                    buttons={selectionButtons}
                    labelKey="LABEL_CDMNOTIFIABLE"
                  />
                  <Field
                    name="projectAdditionalDetail.formOfContract"
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
                    name="projectAdditionalDetail.retention"
                    data-test="retention"
                    type="text"
                    component={PdsFormInput}
                    validate={[
                      Validate.maxLength(1000)
                    ]}
                    warn={alphaNumeric}
                    labelKey="LABEL_RETENTION"
                    placeholderKey="PLACEHOLDER_ADD_RETENTION"
                  />
                  <Field
                    name="projectAdditionalDetail.liquidatedDamages"
                    data-test="liquidatedDamages"
                    type="text"
                    component={PdsFormInput}
                    validate={[
                      Validate.maxLength(1000)
                    ]}
                    warn={alphaNumeric}
                    labelKey="LABEL_LIQUIDATED_DAMAGES"
                    placeholderKey="PLACEHOLDER_ADD_LIQUIDATED_DAMAGES"
                  />
                  <Field
                    name="projectAdditionalDetail.insurance"
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
                        name="projectAdditionalDetailworkTypeId"
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
                              name="projectAdditionalDetail.commenceDate"
                              data-test="commenceDate"
                              className="required"
                              labelKey="LABEL_COMMENCE_DATE"
                            />
                          </div>
                          <div className="col-xl-6 mt-2 position-relative manipulate-calendar">
                            <DatePicker
                              name="projectAdditionalDetail.completionDate"
                              data-test="completionDate"
                              className="required"
                              labelKey="LABEL_COMPLETION_DATE"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <Field
                              name="projectAdditionalDetail.milestones"
                              data-test="milestones"
                              labelKey="LABEL_PROJECTMILE_STONES"
                              rows="7"
                              className="required"
                              validate={[Validate.required('LABEL_PROJECTMILE_STONES')]}
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
                      <label><FormattedMessage id='LABEL_PROJECT_PLAN'></FormattedMessage></label>
                      <div className="calender-wrap">
                        <div className="row">
                          <div className="col-xl-6 mt-2 position-relative manipulate-calendar">
                            <DatePicker
                              name="projectAdditionalDetail.firstValuationDate"
                              data-test="firstValuationDate"
                              className="required"
                              labelKey="LABEL_FIRST_VALUATION_DATE"
                            />
                          </div>
                          <div className="col-xl-6 mt-2 position-relative manipulate-calendar" >
                            <DatePicker
                              name="projectAdditionalDetail.finalAccountDate"
                              data-test="finalAccountDate"
                              className="required"
                              labelKey="LABEL_FIRST_ACCOUNT_DATE"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <Field
                              name="projectAdditionalDetail.valuationIntervals"
                              data-test="valuationIntervals"
                              type="text"
                              className="required"
                              validate={[Validate.required('LABEL_VALUATION_INTERVALS')]}
                              component={PdsFormInput}
                              labelKey="LABEL_VALUATION_INTERVALS"
                              placeholderKey="PLACEHOLDER_VALUATION_INTERVALS"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <Field
                              name="projectAdditionalDetail.paymentTerms"
                              data-test="paymentTerms"
                              type="text"
                              className="required"
                              validate={[Validate.required('LABEL_PAYMENT_TERMS')]}
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
                  name="projectAdditionalDetail.isProjectLive"
                  data-test="isProjectLive"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_PROJECT_IS_LIVE"
                />
                <Field
                  name="projectAdditionalDetail.comments"
                  data-test="comments"
                  labelKey="LABEL_COMMENTS"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                />
              </div>
            </div>
            {/* AUTHORISED SECTION */}
            <div className={(props.status==ProjectStatus.BidLost||props.status==ProjectStatus.OnHold)?"link_disabled row":"row"}>
              <div className="col-xl-6">
                <div className="authorised_form_wrap">
                  <h6 className="ml-0">
                    <FormattedMessage id="LABEL_PROJECT_AUTHORISED" />
                  </h6>
                  <div className="authorised_form_inner">
                    <div className="row">
                      <div className="col-md-12 d-flex">
                        <label><FormattedMessage id="LABEL_AUTHORISED_BY" /></label>
                        <h6 className="mb-0 d-none d-lg-block"><FormattedMessage id="LABEL_SIGN_OFF_STATUS" /> </h6>
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
                        <label>{formatMessage('LABEL_AUTHORISED_BY_UP_TO', {0: '£ 100k' })}</label>
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
                        <label> {formatMessage('LABEL_AUTHORISED_BY_UP_TO', {0: '£ 250k' })}</label>
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
                        <label>{formatMessage('LABEL_AUTHORISED_BY_UP_TO', {0: '£ 250k' })}</label>
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
                        <label>{formatMessage('LABEL_AUTHORISED_BY_UP_TO', {0: '£ 1 Million' })}</label>
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
                        <label> {formatMessage('LABEL_AUTHORISED_BY_UP_TO', {0: '£ 3 Million' })}</label>
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
                          <label>{formatMessage('LABEL_OVER_MILLION', {0: '£ 405'})}</label></div>
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
                        <label>{formatMessage('LABEL_OVER_MILLION_AUTHORITY', {0: '£ 3'})}</label>
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
              <div className="col-xl-6">
                  <h3 className="feed_head"><FormattedMessage id='LABEL_ACTIVITY_FEED'></FormattedMessage></h3>
                  <section className="activity_feed">
                    <div className="feed-block">
                      <div className="feed-block-img feed-icon">
                        <FontAwesomeIcon className="" icon={faUser} />
                      </div>
                      <div className="feed-block-content">
                        <h2><FormattedMessage id='LABEL_APPROVED_BY'></FormattedMessage> <span>John Wick</span></h2>
                        <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                            optio, dolorum provident rerum aut hic quasi placeat iure
                            tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                        veritatis qui ut.</p>

                      </div>
                    </div>
                    <div className="feed-block">
                      <div className="feed-block-img close-icon">
                        <FontAwesomeIcon className="" icon={faTimes} />
                      </div>
                      <div className="feed-block-content">
                        <h2><FormattedMessage id='LABEL_APPROVED_BY'></FormattedMessage> <span>John Smith</span></h2>
                        <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                            optio, dolorum provident rerum aut hic quasi placeat iure
                            tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                        veritatis qui ut.</p>

                      </div>
                    </div>
                    <div className="feed-block">
                      <div className="feed-block-img feed-icon">
                        <FontAwesomeIcon className="" icon={faUser} />
                      </div>
                      <div className="feed-block-content">
                        <h2><FormattedMessage id='LABEL_APPROVED_BY'></FormattedMessage> <span>John Wick</span></h2>
                        <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                            optio, dolorum provident rerum aut hic quasi placeat iure
                            tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                        veritatis qui ut.</p>

                      </div>
                    </div>
                    <div className="feed-block">
                      <div className="feed-block-img check-icon">
                        <FontAwesomeIcon className="" icon={faCheck} />
                      </div>
                      <div className="feed-block-content">
                        <h2><FormattedMessage id='LABEL_APPROVED_BY'></FormattedMessage> <span>John Doe</span></h2>
                        <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                            optio, dolorum provident rerum aut hic quasi placeat iure
                            tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                        veritatis qui ut.</p>

                      </div>
                    </div>
                    <div className="feed-block">
                      <div className="feed-block-img feed-icon">
                        <FontAwesomeIcon className="" icon={faUser} />
                      </div>
                      <div className="feed-block-content">
                        <h2><FormattedMessage id='LABEL_APPROVED_BY'></FormattedMessage> <span>John Wick</span></h2>
                        <span className="feed-date-time">20/11/2019 | 03:40 AM</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                                                        optio, dolorum provident .</p>

                      </div>
                    </div>
                  </section>
                </div>
               </div>
              <div className="row">
              <div className="col-xl-10">
              <PricingSummary
                  projectId={props.projectId}
                  currencySymbol='$'
                  showPreliminary = {true}
                  showSubContractor = {true}
                  showDiscount = {true}
                  />
                <CalculationsSummaryTable
                  name={CalculationsSummaryType.other}
                  projectId={props.projectId}
                  currencySymbol='$'/>
              </div>
            </div>
              <div className="row">
                <div className="col-lg-4">
                  <ProjectOverviewRiskForm
                    riskName="projectAdditionalDetail.projectRisk1"
                    riskLabelName="LABEL_PROJECT_RISK_1"
                    riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure1"
                    riskControlMeasureLabelName="LABEL_RISK_1_CONTROL_MEASURE"
                  ></ProjectOverviewRiskForm>
                </div>
                <div className="col-lg-4">
                  <ProjectOverviewRiskForm
                    riskName="projectAdditionalDetail.projectRisk2"
                    riskLabelName="LABEL_PROJECT_RISK_2"
                    riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure2"
                    riskControlMeasureLabelName="LABEL_RISK_2_CONTROL_MEASURE"
                  ></ProjectOverviewRiskForm>
                </div>
                <div className="col-lg-4">
                  <ProjectOverviewRiskForm
                    riskName="projectAdditionalDetail.projectRisk3"
                    riskLabelName="LABEL_PROJECT_RISK_3"
                    riskControlMeasureName="projectAdditionalDetail.projectRiskControlMeasure3"
                    riskControlMeasureLabelName="LABEL_RISK_3_CONTROL_MEASURE"
                  ></ProjectOverviewRiskForm>
                </div>
              </div>
             

              <div className="mr-35 d-flex justify-content-between mb-4">
                <button
                  className="active mb-4 mt-5"
                  type="button"
                  onClick={()=>props.onPrevious()}
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
      </div>
    );
  };

const mapStateToProps = (state: IState) => ({
  initialValues: state.projectOverview.form,
  dynamicsOtherSubContractor: state.dynamicData.dynamicsOtherSubContractor,
});

const form = reduxForm<IProjectOverviewDetails, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'projectOverviewForm',
  enableReinitialize: true
})(ProjectOverviewForm);

export default connect(mapStateToProps)(form);
