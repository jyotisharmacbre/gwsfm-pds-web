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
                <MainTitle>Customer Enquiry</MainTitle>
                <Field
                  name="projectName"
                  type="text"
                  component={PdsFormInput}
                  label="Project*"
                  placeHolder="Enter project name"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />
                <Field
                  name="companyName"
                  type="text"
                  component={PdsFormInput}
                  label="Company*"
                  placeHolder="Enter company name"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />
                <Field
                  name="contractName"
                  type="text"
                  component={PdsFormInput}
                  label="Contract*"
                  placeHolder="Enter contract"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />
                <Field
                  name="projectHead"
                  type="text"
                  component={PdsFormInput}
                  label="Head of project*"
                  placeHolder="Enter head of project name"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormInput}
                  label="Project Owner*"
                  placeHolder="Project Owner name"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormInput}
                  label="Project Manager*"
                  placeHolder="Enter Project Manager name"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />

                <Field
                  name="mngExperience"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="Project Manager has experience in this type of project"
                />

                <Field
                  label="Project scope*"
                  name="projectScope"
                  rows="7"
                  component={PdsFormTextArea}
                  placeHolder="Type in the details involved in this project"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />
                <Field
                  name="cnNumber"
                  type="text"
                  component={PdsFormInput}
                  label="CN Number"
                  placeHolder="Enter CN Number"
                />
                <div className={'form-group'}>
                  <label>Project status*</label>
                  <div className="select-wrapper">
                    <Field
                      name="projectStatus"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select status"
                      messages={{
                        required: () => 'Required.'
                      }}
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
                      messages={{
                        required: () => 'Required.'
                      }}
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
                      messages={{
                        required: () => 'Required.'
                      }}
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
                  label="Probability of wining (%)*"
                  placeHolder="00%"
                  className="width-100"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />

                <Field
                  name="approxValue"
                  type="text"
                  component={PdsFormInput}
                  label="Approximate value*"
                  placeHolder=""
                  className="width-120"
                  validate={[required, maxLength1000]}
                  warn={alphaNumeric}
                  messages={{
                    required: () => 'Required.'
                  }}
                />

                <div className={'form-group'}>
                  <label>Contract type*</label>
                  <div className="select-wrapper">
                    <Field
                      name="contractType"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select contract type"
                      messages={{
                        required: () => 'Required.'
                      }}
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
                  label="CDM notifiable"
                />
                <div className={'form-group'}>
                  <label>Assets worked on*</label>
                  <div className="select-wrapper">
                    <Field
                      name="assetworkedonprimary"
                      component={PdsFormSelect}
                      validate={required}
                      placeHolder="Select First Asset"
                      messages={{
                        required: () => 'Required.'
                      }}
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
                  label="Comments"
                  name="comments"
                  rows="7"
                  component={PdsFormTextArea}
                  placeHolder="Type in additional comments"
                />
              </div>
            </div>
            <div className="mr-35 d-flex justify-content-between mb-4">
              <button className="active mb-4 mt-5" type="submit">
                SAVE AND CLOSE
              </button>
              <button type="submit" className="mb-4 mt-5 text-right mr-0">
                NEXT
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
