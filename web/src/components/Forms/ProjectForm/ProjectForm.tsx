import React from 'react';
import './ProjectForm.css';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, bindActionCreators } from 'redux';
import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import { MainTitle } from '../../Title/Title';

import { Field, reduxForm } from 'redux-form';
import ReduxFormInput from '../../ReduxFormHandlers/ReduxFromInput';
import ReduxFormSelect from '../../ReduxFormHandlers/ReduxFormSelect';
import ReduxFormRadio from '../../ReduxFormHandlers/ReduxFormRadio';
import { booleanLiteral } from '@babel/types';
import ReduxFormTextArea from '../../ReduxFormHandlers/ReduxFormTextArea';
import { addProject } from '../../../redux/actions';
import validate from './validate';

interface Props {}

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
                  component={ReduxFormInput}
                  label="Project*"
                  placeHolder="Enter project name"
                />
                <Field
                  name="companyName"
                  type="text"
                  component={ReduxFormInput}
                  label="Company*"
                  placeHolder="Enter company name"
                />
                <Field
                  name="contractName"
                  type="text"
                  component={ReduxFormInput}
                  label="Contract*"
                  placeHolder="Enter contract"
                />
                <Field
                  name="projectHead"
                  type="text"
                  component={ReduxFormInput}
                  label="Head of project*"
                  placeHolder="Enter head of project name"
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={ReduxFormInput}
                  label="Project Owner*"
                  placeHolder="Project Owner name"
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={ReduxFormInput}
                  label="Project Manager*"
                  placeHolder="Enter Project Manager name"
                />

                <Field
                  label="Project scope*"
                  name="projectScope"
                  rows="7"
                  component={ReduxFormTextArea}
                  placeHolder="Type in the details involved in this project"
                />
                <Field
                  name="cnNumber"
                  type="text"
                  component={ReduxFormInput}
                  label="CN Number"
                  placeHolder="Enter CN Number"
                />

                <Field
                  name="projectStatus"
                  type="text"
                  datas={projectStatusData}
                  component={ReduxFormSelect}
                  label="Project status*"
                  placeHolder="Select status"
                />

                <Field
                  name="engagementType"
                  type="radio"
                  datas={engagementData}
                  component={ReduxFormRadio}
                  label="Type of engagement*"
                />

                <Field
                  name="country"
                  type="text"
                  datas={projectStatusData}
                  component={ReduxFormSelect}
                  label="Country*"
                  placeHolder="Select country"
                />

                <Field
                  name="currency"
                  type="text"
                  datas={projectStatusData}
                  component={ReduxFormSelect}
                  label="Currency*"
                  placeHolder="Select currency"
                />

                <Field
                  name="winProbabilty"
                  type="text"
                  component={ReduxFormInput}
                  label="Probability of wining (%)*"
                  placeHolder="00%"
                  className="width-100"
                />

                <Field
                  name="approxValue"
                  type="text"
                  component={ReduxFormInput}
                  label="Approximate value*"
                  placeHolder=""
                  className="width-120"
                />

                <Field
                  name="contractType"
                  type="text"
                  datas={projectStatusData}
                  component={ReduxFormSelect}
                  label="Contract type*"
                  placeHolder="Select contract type"
                />
                <Field
                  name="assetworkedonprimary"
                  type="text"
                  datas={projectStatusData}
                  component={ReduxFormSelect}
                  label="Assets worked on*"
                  placeHolder="Select First Asset"
                />
                <Field
                  name="assetworkedonsecond"
                  type="text"
                  datas={projectStatusData}
                  component={ReduxFormSelect}
                  placeHolder="Select Second Asset"
                />
                <Field
                  name="assetworkedonthird"
                  type="text"
                  datas={projectStatusData}
                  component={ReduxFormSelect}
                  placeHolder="Select Third Asset"
                />
                <Field
                  label="Comments"
                  name="comments"
                  rows="7"
                  component={ReduxFormTextArea}
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  onSubmit: values => {
    console.log(values);
    dispatch(addProject(values));
  }
});

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'projectForm',
  validate
})(ProjectForm);

export default connect(
  null,
  mapDispatchToProps
)(form);
