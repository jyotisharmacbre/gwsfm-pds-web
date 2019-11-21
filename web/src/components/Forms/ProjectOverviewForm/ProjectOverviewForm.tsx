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
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { FormattedMessage } from 'react-intl';

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
                  label="mainContractor*"
                  placeholder="contractorsName"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.enquiryReceivedFrom
                  )}
                  data-test="enquiryReceivedFrom"
                  type="text"
                  component={PdsFormInput}
                  label="enquiryReceivedFrom*"
                  placeholder="enquirySenderName"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.potentialCustomer
                  )}
                  data-test="potentialCustomer"
                  type="text"
                  component={PdsFormInput}
                  label="potentialCustomer*"
                  placeholder="Potential Customer's name"
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
                  label="typeOfEnquiry*"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.creditCheckResult
                  )}
                  data-test="creditCheckResult"
                  type="text"
                  component={PdsFormInput}
                  label="creditCheckResult*"
                  placeholder="creditCheckDetails"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.siteAddress
                  )}
                  data-test="siteAddress"
                  type="text"
                  component={PdsFormInput}
                  label="siteAddress*"
                  placeholder="addSiteAddress"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.cdmNotifiable
                  )}
                  data-test="cdmNotifiable"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="cDMNotifiable"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.formOfContract
                  )}
                  data-test="formOfContract"
                  type="text"
                  component={PdsFormInput}
                  label="formOfContract*"
                  placeholder="addFormOfContract"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.retention)}
                  data-test="retention"
                  type="text"
                  component={PdsFormInput}
                  label="retention*"
                  placeholder="addRetention"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.liquidatedDamages
                  )}
                  data-test="liquidatedDamages"
                  type="text"
                  component={PdsFormInput}
                  label="liquidatedDamages*"
                  placeholder="addLiquidatedDamages"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.insurance)}
                  data-test="insurance"
                  type="text"
                  component={PdsFormInput}
                  label="insurance*"
                  placeholder="addInsurance"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.workTypeId)}
                  data-test="workTypeId"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="workType"
                  placeholder="selectWorkTypes"
                />
                <Form.Group>
                  <Form.Label><FormattedMessage id="projectPlan" /></Form.Label>
                  <Col className="calender-wrap">
                    <Row>
                      <Col>
                        <DatePicker
                          name="commenceDate"
                          data-test="commenceDate"
                          label="commenceDate"
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          name="completionDate"
                          data-test="completionDate"
                          label="completionDate"
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
                          label="projectMilestones"
                          rows="7"
                          component={PdsFormTextArea}
                          placeholder="addProjectMilestones"
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
                          label="firstValuationDate"
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          name="finalAccountDate"
                          data-test="finalAccountDate"
                          label="firstAccountDate"
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
                          label="valuationIntervals"
                          placeholder="addValuationIntervals"
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
                          label="paymentTerms"
                          placeholder="addPaymentTerms"
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
                  label="authorizedByHOP"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.budget)}
                  data-test="budget"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="projectBudget"
                  placeholder="selectBudget"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedBy
                  )}
                  data-test="authorizedBy"
                  type="text"
                  component={PdsFormInput}
                  label="authorizedBy"
                  placeholder="label"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedBySecond
                  )}
                  data-test="authorizedBySecond"
                  type="text"
                  component={PdsFormInput}
                  placeholder="label"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.authorizedByThird
                  )}
                  data-test="authorizedByThird"
                  type="text"
                  component={PdsFormInput}
                  placeholder="label"
                />
                <Field
                  name={getPropertyName(
                    initialValues,
                    prop => prop.isProjectLive
                  )}
                  data-test="isProjectLive"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="projectIsLive"
                />
                <Field
                  name={getPropertyName(initialValues, prop => prop.comments)}
                  data-test="comments"
                  label="comments"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholder="typeInAdditionalComments"
                />
              </Col>
            </Row>
            <div className="mr-35 d-flex justify-content-between mb-4">
              <button className="active mb-4 mt-5" type="submit">                
                <FormattedMessage id="previous" />
              </button>
              <button type="submit" className="mb-4 mt-5 text-right mr-0">
              <FormattedMessage id="next" />
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
