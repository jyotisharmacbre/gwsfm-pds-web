import React from 'react';
import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { MainTitle } from '../../Title/Title';

import { Field, reduxForm } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';
import {
  required,
  maxLength1000,
  alphaNumeric
} from '../../../helpers/fieldValidations';
import { FormattedMessage } from 'react-intl';

const ProjectForm = props => {
  const { handleSubmit } = props;

  const DropdownOptions = projectStatusData.map((status: any, i: number) => (
    <option key={i} value={status.value}>
      {status.label}
    </option>
  ));

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
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_PROJECT_NAME"
                  labelKey="LABEL_PROJECT"
                  placeholderKey="PLACEHOLDER_PROJECT_NAME"
                />
                <Field
                  name="companyName"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_COMPANY_NAME"
                  labelKey="LABEL_COMPANY"
                  placeholderKey="PLACEHOLDER_COMPANY_NAME"
                />
                <Field
                  name="contractName"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_CONTRACT_NAME"
                  labelKey="LABEL_CONTRACT"
                  placeholderKey="PLACEHOLDER_CONTRACT"
                />
                <Field
                  name="projectHead"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_HEAD_OF_PROJECT"
                  labelKey="LABEL_HEAD_OF_PROJECT"
                  placeholderKey="PLACEHOLDER_HEAD_OF_PROJECT_NAME"
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_PROJECT_OWNER"
                  labelKey="LABEL_PROJECT_OWNER"
                  placeholderKey="PLACEHOLDER_PROJECT_OWNER_NAME"
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_PROJECT_MANAGER"
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
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_PROJECT_SCOPE"
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
                      name="projectStatus"
                      component={PdsFormSelect}
                      validate={required}
                      placeholderKey="PLACEHOLDER_PROJECT_STATUS"
                      message="MESSAGE_PROJECT_STATUS"
                    >
                      <FormattedMessage id="PLACEHOLDER_PROJECT_STATUS">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {DropdownOptions}
                    </Field>
                  </div>
                </div>

                <Field
                  name="engagementType"
                  type="radio"
                  datas={engagementData}
                  component={PdsFormRadio}
                  labelKey="LABEL_TYPE_OF_ENGAGEMENT"
                />

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_COUNTRY" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="country"
                      component={PdsFormSelect}
                      validate={required}
                      placeholderKey="PLACEHOLDER_COUNTRY"
                      message="MESSAGE_COUNTRY"
                    >
                      <FormattedMessage id="PLACEHOLDER_COUNTRY">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>

                      {DropdownOptions}
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
                      validate={required}
                      placeholderKey="PLACEHOLDER_CURRENCY"
                      message="MESSAGE_CURRENCY"
                    >
                      <FormattedMessage id="PLACEHOLDER_CURRENCY">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>

                      {DropdownOptions}
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
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_PROBABILITYOFWINING"
                />

                <Field
                  name="approxValue"
                  type="text"
                  component={PdsFormInput}
                  labelKey="LABEL_APPROXIMATE_VALUE"
                  placeholderKey=""
                  className="width-120"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="MESSAGE_APPROXIMATE_VALUE"
                />

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_CONTRACT_TYPE" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="contractType"
                      component={PdsFormSelect}
                      validate={required}
                      placeholderKey="PLACEHOLDER_CONTRACT_TYPE"
                      message="MESSAGE_CONTRACT_TYPE"
                    >
                      <FormattedMessage id="PLACEHOLDER_CONTRACT_TYPE">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {DropdownOptions}
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
                      validate={required}
                      placeholderKey="PLACEHOLDER_FIRST_ASSET"
                      message="MESSAGE_FIRST_ASSET"
                    >
                      <FormattedMessage id="PLACEHOLDER_FIRST_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {DropdownOptions}
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
                      {DropdownOptions}
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
                      {DropdownOptions}
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

const ProjectAddForm = reduxForm({
  form: 'ProjectForm'
})(ProjectForm);

export default ProjectAddForm;
