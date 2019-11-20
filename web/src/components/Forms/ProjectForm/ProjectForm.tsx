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
                  <FormattedMessage id="customerEnquiry" />
                </MainTitle>
                <Field
                  name="projectName"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="projectName"
                  label="project*"
                  placeholder="enterProjectName"
                />
                <Field
                  name="companyName"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="companyName"
                  label="company*"
                  placeholder="enterCompanyName"
                />
                <Field
                  name="contractName"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="contractName"
                  label="contract*"
                  placeholder="enterContract"
                />
                <Field
                  name="projectHead"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="headOfProject"
                  label="headOfProject*"
                  placeholder="enterHeadOfProjectName"
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="projectOwner"
                  label="projectOwner*"
                  placeholder="projectOwnerName"
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="projectManager"
                  label="projectManager*"
                  placeholder="enterProjectManagerName"
                />

                <Field
                  name="mngExperience"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="projectManagerHasExperiencen"
                />

                <Field
                  label="projectScope*"
                  name="projectScope"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholder="typeInTheDetailsInvolved"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="projectScope"
                />
                <Field
                  name="cnNumber"
                  type="text"
                  component={PdsFormInput}
                  label="cNNumber"
                  placeholder="enterCNNumber"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="projectStatus*" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="projectStatus"
                      component={PdsFormSelect}
                      validate={required}
                      placeholder="selectProjectStatus"
                      message="projectStatus"
                    >
                      <FormattedMessage id="selectProjectStatus">
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
                  label="typeOfEngagement"
                />

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="country*" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="country"
                      component={PdsFormSelect}
                      validate={required}
                      placeholder="selectCountry"
                      message="country"
                    >
                      <FormattedMessage id="selectCountry">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>

                      {DropdownOptions}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="currency*" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="currency"
                      component={PdsFormSelect}
                      validate={required}
                      placeholder="selectCurrency"
                      message="currency"
                    >
                      <FormattedMessage id="selectCurrency">
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
                  label="probabilityOfWining*"
                  placeholder="00%"
                  className="width-100"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="probabilityOfWining"
                />

                <Field
                  name="approxValue"
                  type="text"
                  component={PdsFormInput}
                  label="approximateValue*"
                  placeholder=""
                  className="width-120"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="approximateValue"
                />

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="contractType*" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="contractType"
                      component={PdsFormSelect}
                      validate={required}
                      placeholder="selectContractType"
                      message="contractType"
                    >
                      <FormattedMessage id="selectContractType">
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
                  label="cDMNotifiable"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="assetsWorkedOn*" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonprimary"
                      component={PdsFormSelect}
                      validate={required}
                      placeholder="selectFirstAsset"
                      message="firstAsset"
                    >
                      <FormattedMessage id="selectFirstAsset">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {DropdownOptions}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonsecond"
                      component={PdsFormSelect}
                      placeholder="selectSecondAsset"
                    >
                      <FormattedMessage id="selectSecondAsset">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {DropdownOptions}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonthird"
                      component={PdsFormSelect}
                      placeholder="selectThirdAsset"
                    >
                      <FormattedMessage id="selectThirdAsset">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {DropdownOptions}
                    </Field>
                  </div>
                </div>

                <Field
                  label="comments"
                  name="comments"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholder="typeInAdditionalComments"
                />
              </div>
            </div>
            <div className="mr-35 d-flex justify-content-between mb-4">
              <button className="active mb-4 mt-5" type="submit">
                <FormattedMessage id="saveAndClose" />
              </button>
              <button type="submit" className="mb-4 mt-5 text-right mr-0">
                <FormattedMessage id="next" />
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
