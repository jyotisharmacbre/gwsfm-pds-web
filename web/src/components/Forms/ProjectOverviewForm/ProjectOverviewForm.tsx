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
import { getPropertyName } from '../../../helpers/utility-helper';
import {
  projectStatusData
} from '../../../helpers/dropDownFormValues';

interface Props {}

let dates = {
  dateOneLabel: '',
  dateTwoLabel: ''
};

let ProjectOverviewForm: React.FC<Props & InjectedFormProps<{}, Props>> = (
  props: any
) => {
  const { handleSubmit, pristine, reset, submitting, initialValues } = props;
  let ddd = initialValues.mainContractor;
  return (
    <Container>
      <Row>
        <Col lg={12} sm={12}>
          <Form
            className="project-overview-form"
            onSubmit={handleSubmit}
            noValidate={true}
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
                  label="Main Contractor*"
                  placeHolder="Contractor's name"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.enquiryReceivedFrom
                  )}
                  data-test="enquiryReceivedFrom"
                  type="text"
                  component={PdsFormInput}
                  label="Enquiry Received From*"
                  placeHolder="Enquiry Sender Name"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.potentialCustomer
                  )}
                  data-test="potentialCustomer"
                  type="text"
                  component={PdsFormInput}
                  label="Potential Customer*"
                  placeHolder="Potential Customer's name"
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
                  label="Type of Enquiry*"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.creditCheckResult
                  )}
                  data-test="creditCheckResult"
                  type="text"
                  component={PdsFormInput}
                  label="Credit Check Result*"
                  placeHolder="Credit Check Result details"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.siteAddress
                  )}
                  data-test="siteAddress"
                  type="text"
                  component={PdsFormInput}
                  label="Site Address*"
                  placeHolder="Add Site address"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.cdmNotifiable
                  )}
                  data-test="cdmNotifiable"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="CDM notifiable"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.formOfContract
                  )}
                  data-test="formOfContract"
                  type="text"
                  component={PdsFormInput}
                  label="Form of Contract*"
                  placeHolder="Add form of contract"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.retention)}
                  data-test="retention"
                  type="text"
                  component={PdsFormInput}
                  label="Retention*"
                  placeHolder="Add retention"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.liquidatedDamages
                  )}
                  data-test="liquidatedDamages"
                  type="text"
                  component={PdsFormInput}
                  label="Liquidated Damages*"
                  placeHolder="Add Liquidated Damages"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.insurance)}
                  data-test="insurance"
                  type="text"
                  component={PdsFormInput}
                  label="Insurance*"
                  placeHolder="Add Insurance"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.workTypeId)}
                  data-test="workTypeId"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="Work Type"
                  placeHolder="Select work types"
                />
                <Form.Group>
                  <Form.Label>Project Plan</Form.Label>
                  <Col className="calender-wrap">
                    <Row>
                      <Col>
                        <DatePicker
                          name="commenceDate"
                          data-test="commenceDate"
                          label="Commence Date"
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          name="completionDate"
                          data-test="completionDate"
                          label="Completion Date"
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
                          label="Project Milestones"
                          rows="7"
                          component={PdsFormTextArea}
                          placeHolder="Add project milestones"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Project Plan</Form.Label>
                  <Col className="calender-wrap">
                    <Row>
                      <Col>
                        <DatePicker
                          name="firstValuationDate"
                          data-test="firstValuationDate"
                          label="First Valuation Date"
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          name="finalAccountDate"
                          data-test="finalAccountDate"
                          label="First Account Date"
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
                          label="Valuation Intervals"
                          placeHolder="Add valuation intervals"
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
                          label="Payment Terms"
                          placeHolder="Add payment terms"
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
                  label="Authorized by HOP"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.budget)}
                  data-test="budget"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="Project Budget"
                  placeHolder="Select budget"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedBy
                  )}
                  data-test="authorizedBy"
                  type="text"
                  component={PdsFormInput}
                  label="Authorized by"
                  placeHolder="Label"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedBySecond
                  )}
                  data-test="authorizedBySecond"
                  type="text"
                  component={PdsFormInput}
                  placeHolder="Label"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedByThird
                  )}
                  data-test="authorizedByThird"
                  type="text"
                  component={PdsFormInput}
                  placeHolder="Label"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.isProjectLive
                  )}
                  data-test="isProjectLive"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="Project is Live"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.comments)}
                  data-test="comments"
                  label="Comments"
                  rows="7"
                  component={PdsFormTextArea}
                  placeHolder="Type in any additional comments"
                />
              </Col>
            </Row>
            <div className="mr-35 d-flex justify-content-between mb-4">
              <button className="active mb-4 mt-5" type="submit">
                PREVIOUS
              </button>
              <button type="submit" className="mb-4 mt-5 text-right mr-0">
                NEXT
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

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'projectOverviewForm'
})(ProjectOverviewForm);

export default connect(mapStateToProps)(form);
