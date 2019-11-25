import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
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
import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import {
  alphaNumeric,
  onlyNumber,
  Validate
} from '../../../helpers/fieldValidations';
import { FormattedMessage } from 'react-intl';

interface Props {
  onNext: (data: IProjectAdditionalDetail) => void;
  onPrevious: (data: IProjectAdditionalDetail) => void;
  projectstatus: any;
}

let ProjectOverviewForm: React.FC<
  Props & InjectedFormProps<IProjectAdditionalDetail, Props>
> = (props: any) => {
  const { handleSubmit, initialValues } = props;
  const DropdownOptions = projectStatusData.map((status: any, i: number) => (
    <option key={i} value={status.value}>
      {status.label}
    </option>
  ));
  return (
    <Container>
      <Row>
        <Col lg={12} sm={12}>
          <Form
            className="project-overview-form"
            noValidate={true}
            data-test="projectOverviewForm"
          >
            <Row>
              <Col lg={8}>
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
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
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
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_ENQUIRY_RECEIVED_FROM"
                  placeholderKey="PLACEHOLDER_ENQUIRY_SENDER_NAME"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.potentialCustomer
                  )}
                  data-test="potentialCustomer"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_POTENTIAL_CUSTOMER"
                  placeholderKey="PLACEHOLDER_POTENTIAL_CUSTOMERS_NAME"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.enquiryTypeId
                  )}
                  data-test="enquiryTypeId"
                  type="radio"
                  datas={enquiryTypeData}
                  component={PdsFormRadio}
                  labelKey="LABEL_TYPE_OF_ENQUIRY"
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.creditCheckResult
                  )}
                  data-test="creditCheckResult"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
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
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
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
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
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
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
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
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
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
                  validate={[
                    Validate.required('VALIDATION_REQUIRED'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_INSURANCE"
                  placeholderKey="PLACEHOLDER_ADD_INSURANCE"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_WORK_TYPE" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name={getPropertyName(
                        initialValues,
                        prop => prop.workTypeId
                      )}
                      component={PdsFormSelect}
                      validate={[Validate.required('VALIDATION_REQUIRED')]}
                      placeholderKey="PLACEHOLDER_WORK_TYPES"
                      messageKey="MESSAGE_PROJECT_STATUS"
                    >
                      <FormattedMessage id="PLACEHOLDER_WORK_TYPES">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(
                        props.projectstatus,
                        LookupType.Project_Status
                      )}
                    </Field>
                  </div>
                </div>
                <Form.Group>
                  <Form.Label>
                    <FormattedMessage id="LABEL_PROJECT_PLAN" />
                  </Form.Label>
                  <Col className="calender-wrap">
                    <Row>
                      <Col>
                        <DatePicker
                          name="commenceDate"
                          data-test="commenceDate"
                          labelKey="LABEL_COMMENCE_DATE"
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          name="completionDate"
                          data-test="completionDate"
                          labelKey="LABEL_COMPLETION_DATE"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
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
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>projectPlan</Form.Label>
                  <Col className="calender-wrap">
                    <Row>
                      <Col>
                        <DatePicker
                          name="firstValuationDate"
                          data-test="firstValuationDate"
                          labelKey="LABEL_FIRST_VALUATION_DATE"
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          name="finalAccountDate"
                          data-test="finalAccountDate"
                          labelKey="LABEL_FIRST_ACCOUNT_DATE"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col>
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
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
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
                    <FormattedMessage id="LABEL_PROJECT_BUDGET" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name={getPropertyName(initialValues, prop => prop.budget)}
                      component={PdsFormSelect}
                      validate={[Validate.required('VALIDATION_REQUIRED')]}
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
              </Col>
            </Row>
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
                className="mb-4 mt-5 text-right mr-0"
              >
                <FormattedMessage id="BUTTON_NEXT" />
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
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
})(ProjectOverviewForm);

export default connect(mapStateToProps)(form);
