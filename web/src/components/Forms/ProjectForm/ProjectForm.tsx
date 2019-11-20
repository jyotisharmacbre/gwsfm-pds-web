import React from 'react';
import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { MainTitle } from '../../Title/Title';

import { Field, reduxForm } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFromInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import validate from './validate';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';

const ProjectForm = props => {
  const { handleSubmit } = props;

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-12 col-sm-12">
          <form
            className="customer-enquiry"
            onSubmit={handleSubmit}
            noValidate={true}
          >
            <div className="row">
              <div className="col-lg-8">
                <MainTitle>Customer Enquiry</MainTitle>
                <Field
                  name="projectName"
                  type="text"
                  component={PdsFormInput}
                  label="Project*"
                  placeHolder="Enter project name"
                />
                <Field
                  name="companyName"
                  type="text"
                  component={PdsFormInput}
                  label="Company*"
                  placeHolder="Enter company name"
                />
                <Field
                  name="contractName"
                  type="text"
                  component={PdsFormInput}
                  label="Contract*"
                  placeHolder="Enter contract"
                />
                <Field
                  name="projectHead"
                  type="text"
                  component={PdsFormInput}
                  label="Head of project*"
                  placeHolder="Enter head of project name"
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormInput}
                  label="Project Owner*"
                  placeHolder="Project Owner name"
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormInput}
                  label="Project Manager*"
                  placeHolder="Enter Project Manager name"
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
                />
                <Field
                  name="cnNumber"
                  type="text"
                  component={PdsFormInput}
                  label="CN Number"
                  placeHolder="Enter CN Number"
                />

                <Field
                  name="projectStatus"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="Project status*"
                  placeHolder="Select status"
                />

                <Field
                  name="engagementType"
                  type="radio"
                  datas={engagementData}
                  component={PdsFormRadio}
                  label="Type of engagement*"
                />

                <Field
                  name="country"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="Country*"
                  placeHolder="Select country"
                />

                <Field
                  name="currency"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="Currency*"
                  placeHolder="Select currency"
                />

                <Field
                  name="winProbabilty"
                  type="text"
                  component={PdsFormInput}
                  label="Probability of wining (%)*"
                  placeHolder="00%"
                  className="width-100"
                />

                <Field
                  name="approxValue"
                  type="text"
                  component={PdsFormInput}
                  label="Approximate value*"
                  placeHolder=""
                  className="width-120"
                />

                <Field
                  name="contractType"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="Contract type*"
                  placeHolder="Select contract type"
                />

                <Field
                  name="cdmNotifiable"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="CDM notifiable"
                />
                <Field
                  name="assetworkedonprimary"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  label="Assets worked on*"
                  placeHolder="Select First Asset"
                />
                <Field
                  name="assetworkedonsecond"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  placeHolder="Select Second Asset"
                />
                <Field
                  name="assetworkedonthird"
                  type="text"
                  datas={projectStatusData}
                  component={PdsFormSelect}
                  placeHolder="Select Third Asset"
                />
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
  form: 'ProjectForm',
  validate // a unique identifier for this form
})(ProjectForm);

export default ProjectAddForm;
