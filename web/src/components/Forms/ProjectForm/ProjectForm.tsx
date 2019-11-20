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
                  placeHolder="enterProjectName"
                />
                <Field
                  name="companyName"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="Company name"
                  label="company*"
                  placeHolder="enterCompanyName"
                />
                <Field
                  name="contractName"
                  type="text"
                  component={PdsFormInput}   
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="Contract name"
                  label="contract*"
                  placeHolder="enterContract"
                />
                <Field
                  name="projectHead"
                  type="text"
                  component={PdsFormInput}                 
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="headOfProject"
                  label="headOfProject*"
                  placeHolder="enterHeadOfProjectName"
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormInput}
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="projectOwner"
                  label="projectOwner*"
                  placeHolder="projectOwnerName"
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormInput}                 
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="Project manager"
                  label="projectManager*"
                  placeHolder="enterProjectManagerName"
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
                  placeHolder="typeInTheDetailsInvolved"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="Project scope"
                />
                <Field
                  name="cnNumber"
                  type="text"
                  component={PdsFormInput}
                  label="cNNumber"
                  placeHolder="enterCNNumber"
                />
                <div className={'form-group'}>
                  <label>Project status*</label>
                  <div className="select-wrapper">
                    <Field
                      name="projectStatus"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select status"
                      message="Project status"
                    >
                      <option value="">Select project status</option>
                      {DropdownOptions}
                    </Field>
                  </div>
                </div>

                <Field
                  name="engagementType"
                  type="radio"
                  datas={engagementData}
                  component={PdsFormRadio}
                  label="Type of engagement"
                />

                <div className={'form-group'}>
                  <label>Country*</label>
                  <div className="select-wrapper">
                    <Field
                      name="country"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select country"
                      message="Country"
                    >
                      <option value="">Select country</option>
                      {DropdownOptions}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>Currency*</label>
                  <div className="select-wrapper">
                    <Field
                      name="currency"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select currency"
                      message="Currency"
                    >
                      <option value="">Select country</option>
                      {DropdownOptions}
                    </Field>
                  </div>
                </div>

                <Field
                  name="winProbabilty"
                  type="text"
                  component={PdsFormInput}
                  label="probabilityOfWining*"
                  placeHolder="00%"
                  className="width-100"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="Probability of wining"
                />

                <Field
                  name="approxValue"
                  type="text"
                  component={PdsFormInput}
                  label="approximateValue*"
                  placeHolder=""
                  className="width-120"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  message="Approximate value"
                />

                <div className={'form-group'}>
                  <label>Contract type*</label>
                  <div className="select-wrapper">
                    <Field
                      name="contractType"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select contract type"
                      message="Contract type"
                    >
                      <option value="">Select contract type</option>
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
                  <label>Assets worked on*</label>
                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonprimary"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select First Asset"
                      message="First Asset"
                    >
                      <option value="">Select First Asset</option>
                      {DropdownOptions}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonsecond"
                      component={PdsFormSelect}
                      placeHolder="Select Second Asset"
                    >
                      <option value="">Select Second Asset</option>
                      {DropdownOptions}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonthird"
                      component={PdsFormSelect}
                      placeHolder="Select Third Asset"
                    >
                      <option value="">Select Third Asset</option>
                      {DropdownOptions}
                    </Field>
                  </div>
                </div>

                <Field
                  label="comments"
                  name="comments"
                  rows="7"
                  component={PdsFormTextArea}
                  placeHolder="typeInAdditionalComments"
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
