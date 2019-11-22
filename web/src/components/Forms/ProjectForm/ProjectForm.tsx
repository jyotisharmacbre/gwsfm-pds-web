import React from 'react';
import { MainTitle } from '../../Title/Title';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';
import {
  alphaNumeric,
  onlyNumber,
  Validate
} from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';

interface Props {
  projectstatus: any;
}
const ProjectForm: React.FC<Props & InjectedFormProps<{}, Props>> = (
  props: any
) => {
  const { handleSubmit, projectstatus } = props;

  const getDropdown = value =>{
    console.log(projectstatus)
    
    let data = projectstatus.map((status: any, i: number) => {
    
      if(status.lookupItem == value){
        console.log(parseInt(status.lookupId))
        console.log(parseInt(status.lookupId))
        return (
          <option key={status.lookupId} value={+(status.lookupKey)}>
            {status.description}
          </option>
        )
      }
    })
    return data;
  }

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-12 col-sm-12">
          <form className="customer-enquiry" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8">
                <MainTitle>Customer Enquiry</MainTitle>
                <Field
                  name="name"
                  type="text"
                  component={PdsFormInput}
                  label="Project*"
                  placeHolder="Enter project name"
                  validate={[Validate.required('Project name'), Validate.maxLength(1000)]}
                  warn={alphaNumeric}
                  message="Project name"
                />
                <Field
                  name="companyId"
                  type="text"
                  component={PdsFormInput}
                  label="Company*"
                  placeHolder="Enter company name"
                  validate={[Validate.required('Company name'), Validate.maxLength(1000)]}
                  warn={alphaNumeric}
                  message="Company name"
                />
                <Field
                  name='contractorId'
                  type="text"
                  component={PdsFormInput}
                  label="Contract*"
                  placeHolder="Enter contract"
                  validate={[Validate.required('Contract name'), Validate.maxLength(1000)]}
                  warn={alphaNumeric}
                  message="Contract name"
                />
                <Field
                  name='headOfProject'
                  type="text"
                  component={PdsFormInput}
                  label="Head of project*"
                  placeHolder="Enter head of project name"
                  validate={[Validate.required('Head of project'), Validate.maxLength(1000)]}
                  warn={alphaNumeric}
                  message="Head of project"
                />
                <Field
                  name='projectOwner'
                  type="text"
                  component={PdsFormInput}
                  label="Project Owner*"
                  placeHolder="Project Owner name"
                  validate={[Validate.required('Project owner'), Validate.maxLength(1000)]}
                  warn={alphaNumeric}
                  message="Project Owner"
                />
                <Field
                  name='projectManager'
                  type="text"
                  component={PdsFormInput}
                  label="Project Manager*"
                  placeHolder="Enter Project Manager name"
                  validate={[Validate.required('Project manager'), Validate.maxLength(1000)]}
                  warn={alphaNumeric}
                  message="Project manager"
                />

                <Field
                  name='pmHasExperience'
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="Project Manager has experience in this type of project"
                />

                <Field
                  label="Project scope*"
                  name='scope'
                  rows="7"
                  component={PdsFormTextArea}
                  placeHolder="Type in the details involved in this project"
                  validate={[Validate.required('Project scope'), Validate.maxLength(1040)]}
                  warn={alphaNumeric}
                  message="Project scope"
                />
                <Field
                  name='cnNumber'
                  type="number"
                  component={PdsFormInput}
                  label="CN Number"
                  placeHolder="Enter CN Number"
                  validate = {onlyNumber}
                />
                <div className={'form-group'}>
                  <label>Project status*</label>
                  <div className="select-wrapper">
                    <Field
                      name='status'
                      component={PdsFormSelect}
                      validate={Validate.required('Project Status')}
                      placeHolder="Select status"
                      message="Project status"
                    >
                      <option value="">Select project status</option>
                      {getDropdown("Project_Status")}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>Type of engagement</label>
                  <div className="select-wrapper">
                    <Field
                      name='engagementId'
                      component={PdsFormSelect}
                    >
                      <option value="">Select type of engagement</option>
                      {getDropdown("Engagement_Type")}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>Country*</label>
                  <div className="select-wrapper">
                    <Field
                      name='countryId'
                      component={PdsFormSelect}
                      validate={Validate.required('Country')}
                      placeHolder="Select country"
                      message="Country"
                    >
                      <option value="">Select country</option>
                      {getDropdown("Country")}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>Currency*</label>
                  <div className="select-wrapper">
                    <Field
                      name='currencyId'
                      component={PdsFormSelect}
                      validate={Validate.required('Currency')}
                      placeHolder="Select currency"
                      message="Currency"
                    >
                      <option value="">Select country</option>
                      {getDropdown("Currency")}
                    </Field>
                  </div>
                </div>

                <Field
                  name='probabilityOfWinning'
                  type="number"
                  component={PdsFormInput}
                  label="Probability of wining (%)*"
                  placeHolder="00%"
                  className="width-100"
                  validate={[Validate.required('Probability of wining'), Validate.maxLength(1000), onlyNumber]}
                  message="Probability of wining"
                />

                <Field
                  name='approxValue'
                  type="number"
                  component={PdsFormInput}
                  label="Approximate value*"
                  className="width-120 pl-20"
                  validate={[Validate.required('Approximate value'), Validate.maxLength(1000), onlyNumber]}
                  message="Approximate value"
                  currency= "$"
                  divPosition = "relative"
                />

                <div className={'form-group'}>
                  <label>Contract type*</label>
                  <div className="select-wrapper">
                    <Field
                      name='contractTypeId'
                      component={PdsFormSelect}
                      validate={Validate.required('Contract type')}
                      placeHolder="Select contract type"
                      message="Contract type"
                    >
                      <option value="">Select contract type</option>
                      {getDropdown("Currency")}
                    </Field>
                  </div>
                </div>

                <Field
                  name='cdmNotifiable'
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  label="CDM notifiable"
                />
                <div className={'form-group'}>
                  <label>Assets worked on*</label>
                  <div className="select-wrapper">
                    <Field
                      name='firstAssetWorkedOn'
                      component={PdsFormSelect}
                      validate={Validate.required('First Asset')}
                      placeHolder="Select First Asset"
                      message="First Asset"
                    >
                      <option value="">Select First Asset</option>
                      {getDropdown("Currency")}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name='secondAssetWorkedOn'
                      component={PdsFormSelect}
                      placeHolder="Select Second Asset"
                    >
                      <option value="">Select Second Asset</option>
                      {getDropdown("Currency")}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name='thirdAssetWorkedOn'
                      component={PdsFormSelect}
                      placeHolder="Select Third Asset"
                    >
                      <option value="">Select Third Asset</option>
                      {getDropdown("Currency")}
                    </Field>
                  </div>
                </div>

                <Field
                  label="Comments"
                  name="comment"
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

const mapStateToProps = (state: IState) => ({
  initialValues: state.project.form
});

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'ProjectForm'
})(ProjectForm);

export default connect(mapStateToProps)(form);
