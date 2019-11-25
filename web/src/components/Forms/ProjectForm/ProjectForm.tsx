import React from 'react';
import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { MainTitle } from '../../Title/Title';

import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';
import {
  alphaNumeric,
  onlyNumber,
  Validate
} from '../../../helpers/fieldValidations';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
interface Props {
  projectstatus: any;
}

const ProjectForm: React.FC<Props & InjectedFormProps<{}, Props>> = (
  props: any
) => {
  const { handleSubmit, projectstatus } = props;

  const getDropdown = value => {
    let data = projectstatus.map((status: any, i: number) => {
      if (status.lookupItem == value) {
        return (
          <option key={status.lookupId} value={+status.lookupKey}>
            {status.description}
          </option>
        );
      }
    });
    return data;
  };

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-12 col-sm-12">
          <form className="customer-enquiry" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8">
                <MainTitle>
                  <FormattedMessage id="HEADING_CUSTOMER_ENQUIRY" />
                </MainTitle>
                <Field
                  name="projectName"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROJECT_NAME"
                  labelKey="LABEL_PROJECT"
                  placeholderKey="PLACEHOLDER_PROJECT_NAME"
                />
                <Field
                  name="companyName"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_COMPANY_NAME"
                  labelKey="LABEL_COMPANY"
                  placeholderKey="PLACEHOLDER_COMPANY_NAME"
                />
                <Field
                  name="contractName"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_CONTRACT_NAME"
                  labelKey="LABEL_CONTRACT"
                  placeholderKey="PLACEHOLDER_CONTRACT"
                />
                <Field
                  name="projectHead"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_HEAD_OF_PROJECT"
                  labelKey="LABEL_HEAD_OF_PROJECT"
                  placeholderKey="PLACEHOLDER_HEAD_OF_PROJECT_NAME"
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROJECT_OWNER"
                  labelKey="LABEL_PROJECT_OWNER"
                  placeholderKey="PLACEHOLDER_PROJECT_OWNER_NAME"
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROJECT_MANAGER"
                  labelKey="LABEL_PROJECT_MANAGER"
                  placeholderKey="PLACEHOLDER_PROJECT_MANAGER"
                />

                <Field
                  name="mngExperience"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_PROJECT_MANAGER_EXPERIENCEN"
                />

                <Field
                  labelKey="LABEL_PROJECT_SCOPE"
                  name="projectScope"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholderKey="PACEHODER_PROJECT_SCOPE"
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROJECT_SCOPE"
                />
                <Field
                  name="cnNumber"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_CN_NUMBER"
                  placeholderKey="PLACEHOLDER_CN_NUMBER"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_PROJECT_STATUS" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="status"
                      component={PdsFormSelect}
                      validate={[Validate.required('Project name')]}
                      placeholderKey="PLACEHOLDER_PROJECT_STATUS"
                      messageKey="MESSAGE_PROJECT_STATUS"
                    >
                      <FormattedMessage id="PLACEHOLDER_PROJECT_STATUS">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown('Project_Status')}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>Type of engagement</label>
                  <div className="select-wrapper">
                    <Field name="engagementId" component={PdsFormSelect}>
                      <option value="">Select type of engagement</option>
                      {getDropdown('Engagement_Type')}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_COUNTRY" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="country"
                      component={PdsFormSelect}
                      validate={[Validate.required('Project name')]}
                      placeholderKey="PLACEHOLDER_COUNTRY"
                      messageKey="MESSAGE_COUNTRY"
                    >
                      <FormattedMessage id="PLACEHOLDER_COUNTRY">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>

                      {getDropdown('Country')}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_CURRENCY" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="currency"
                      component={PdsFormSelect}
                      validate={[Validate.required('Project name')]}
                      placeholderKey="PLACEHOLDER_CURRENCY"
                      messageKey="MESSAGE_CURRENCY"
                    >
                      <FormattedMessage id="PLACEHOLDER_CURRENCY">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>

                      {getDropdown(LookupType.Currency)}
                    </Field>
                  </div>
                </div>

                <Field
                  name="winProbabilty"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_PROBABILITY_OF_WINING"
                  placeholderKey="PLACEHOLDER_WIN_PROBABILITY"
                  className="width-100"
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROBABILITYOFWINING"
                />

                <Field
                  name="approxValue"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_APPROXIMATE_VALUE"
                  placeholderKey=""
                  className="width-120"
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_APPROXIMATE_VALUE"
                />

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_CONTRACT_TYPE" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="contractType"
                      component={PdsFormSelect}
                      validate={[Validate.required('Project name')]}
                      placeholderKey="PLACEHOLDER_CONTRACT_TYPE"
                      messageKey="MESSAGE_CONTRACT_TYPE"
                    >
                      <FormattedMessage id="PLACEHOLDER_CONTRACT_TYPE">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(LookupType.Currency)}
                    </Field>
                  </div>
                </div>

                <Field
                  name="cdmNotifiable"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_CDMNOTIFIABLE"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_ASSETS_WORKED_ON" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonprimary"
                      component={PdsFormSelect}
                      validate={[Validate.required('Project name')]}
                      placeholderKey="PLACEHOLDER_FIRST_ASSET"
                      messageKey="MESSAGE_FIRST_ASSET"
                    >
                      <FormattedMessage id="PLACEHOLDER_FIRST_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(LookupType.Currency)}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonsecond"
                      component={PdsFormSelect}
                      placeholderKey="PLACEHOLDER_SECOND_ASSET"
                    >
                      <FormattedMessage id="PLACEHOLDER_SECOND_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(LookupType.Currency)}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonthird"
                      component={PdsFormSelect}
                      placeholderKey="PLACEHOLDER_THIRD_ASSET"
                    >
                      <FormattedMessage id="PLACEHOLDER_THIRD_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(LookupType.Currency)}
                    </Field>
                  </div>
                </div>

                <Field
                  labelKey="LABEL_COMMENTS"
                  name="comments"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                />
              </div>
            </div>
            <div className="mr-35 d-flex justify-content-between mb-4">
              <button className="active mb-4 mt-5" type="submit">
                <FormattedMessage id="BUTTON_SAVE_AND_CLOSE" />
              </button>
              <button type="submit" className="mb-4 mt-5 text-right mr-0">
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
  initialValues: state.project.form
});

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'ProjectForm'
})(ProjectForm);

export default connect(mapStateToProps)(form);
