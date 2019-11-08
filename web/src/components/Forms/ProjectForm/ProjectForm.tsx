import React, { useEffect, useState, useRef } from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  MenuItem,
  FormControl,
  Divider,
  withStyles,
  InputLabel
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { PageBtnActions } from '../../BtnActions/BtnActions';
import TextField from '@material-ui/core/TextField';
import { IBtnActionProps, IProjectFormProps } from '../../../props/AppProps';
import './ProjectForm.css';
import { connect } from 'react-redux';
import { IProjectForm } from '../../../session/ProjectForm/Type';
import { addFormActionCreator } from '../../../session/ProjectForm/Actions';
import { IApplicationState } from '../../../session/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Validator } from 'class-validator';
import { toCurrency } from '../../../helpers/int-helper';
import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import {
  getLocaleActionCreator,
  getCustomerContractActionCreator
} from '../../../session/ListItems/Actions';
import { MainTitle } from '../../Title/Title';

import { Field, InjectedFormProps, reduxForm, change, reset } from 'redux-form';
import ReduxFormInput from '../../ReduxFormHandlers/ReduxFromInput';
import ReduxFormSelect from '../../ReduxFormHandlers/ReduxFormSelect';
import ReduxFormRadio from '../../ReduxFormHandlers/ReduxFormRadio';
import { booleanLiteral } from '@babel/types';
import ReduxFormTextArea from '../../ReduxFormHandlers/ReduxFormTextArea';
import { addProject } from '../../../redux/actions';
// import ReduxFormSelect from '../../ReduxFormHandlers/ReduxFormSelect';
// Validation methods
const validator = new Validator();

interface Props {}

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
//   return {
//     handleClick: () => {},
//     addToForm: (data: IProjectForm) => dispatch(addFormActionCreator(data)),
//     getLocales: () => dispatch(getLocaleActionCreator()),
//     getCustomerContracts: (name: string) =>
//       dispatch(getCustomerContractActionCreator(name))
//   };
// };

// const mapStateToProps = (state: IApplicationState) => {
//   return {
//     form: state.projectFormState,
//     locales: state.listState.locales,
//     customerContracts: state.listState.customerContract
//   };
// };

export const ProjectForm: React.FC<
  Props & InjectedFormProps<{}, Props>
> = (props: any) => {
  const { error, pristine, reset, submitting } = props;
  // useEffect(() => {
  //   props.getLocales();
  //   props.getCustomerContracts('');
  // }, []);

  const Buttons: IBtnActionProps[] = [
    {
      Title: 'Back',
      Color: 'back',
      HandleClick: () => {
        window.location.href = '/';
      }
    },
    {
      Title: 'Create',
      Color: 'cbregreen',
      isSubmit: true,
      HandleClick: () => (e: React.FormEvent<Element>) => {
        handleSubmit(e);
      }
    },
    {
      Title: 'Save',
      Color: 'save',
      HandleClick: () => {
        alert('Saving clicked.');
      }
    }
  ];



  const handleValueChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = event.target.value;
    let data = { ...props.form, [name]: val };
    props.addToForm(data);
  };

  const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    let validEmail = isValidEmail(e.target.value);
    let name = e.target.name;
    var data = { ...props.form, ['invalid' + name]: validEmail };
    props.addToForm(data);
  };

  const validateField = (key?: any) => (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    let valid = isValid(e.target.value);
    let name = e.target.name;
    let dataType = e.target.getAttribute('dataformat');
    let val = e.target.value;

    if (key !== undefined) {
      if (dataType === 'currency') {
        val = toCurrency(val);
      }
      let data = { ...props.form, ['invalid' + name]: valid, [key]: val };
      props.addToForm(data);
    } else {
      let data = { ...props.form, ['invalid' + name]: valid };
      props.addToForm(data);
    }
  };

  const isValid = (value: string | number | undefined) => {
    return validator.isEmpty(value);
  };

  const isValidEmail = (value: string) => {
    return !validator.isEmail(value);
  };

  const handleSubmit = (values: any) => {
    console.log('here');
    console.log('values', values);
    props.dispatch(addProject(values));
    // props.dispatch(reset('projectForm'));
  };

// function submit(values: any) {
//     //Can log the values to the console, but submitFormValues actionCreator does not appear to be dispatched.
//     console.log(values)
// }

  // const handleSubmit = (e: React.FormEvent<Element>) => {
  //   e.preventDefault();
  //   var data = {
  //     ...props.form,
  //     invalidCompany: isValid(props.form.company),
  //     invalidCustomerContract: isValid(props.form.customer_contract),
  //     invalidLocale: isValid(props.form.locale),
  //     invalidProjectManager: isValidEmail(props.form.projectmanager),
  //     invalidProjectName: isValid(props.form.projectname),
  //     invalidProjectScope: isValid(props.form.projectscope),
  //     invalidHeadOfProject: isValidEmail(props.form.headofproject),
  //     invalidCurrency: isValid(props.form.currency),
  //     invalidApproxValue: isValid(props.form.approximatevalue),
  //     invalidAssetsWorkedOnPrimary: isValid(props.form.assetworkedonprimary),
  //     invalidCMDNotifiable: isValid(props.form.cdmnotifiable.toString()),
  //     invalidProbOfWinning: isValid(props.form.probofwinning),
  //     invalidContractType: isValid(props.form.contracttype)
  //   };

  //   if (
  //     !data.invalidCompany &&
  //     !data.invalidCustomerContract &&
  //     !data.invalidProjectManager &&
  //     !data.invalidProjectName &&
  //     !data.invalidProjectScope &&
  //     !data.invalidPMExperience &&
  //     !data.invalidHeadOfProject &&
  //     !data.invalidLocale &&
  //     !data.invalidCurrency &&
  //     !data.invalidApproxValue &&
  //     !data.invalidAssetsWorkedOnPrimary &&
  //     !data.invalidCMDNotifiable &&
  //     !data.invalidProbOfWinning
  //   ) {
  //     props.addToForm({ ...data, validForm: true });

  //     alert('Form is Valid');
  //   } else {
  //     props.addToForm({ ...data, validForm: false });
  //     props.addToForm(data);
  //   }
  // };

  const YES_NO_BUTTON = ['YES', 'NO'];

  const [active, setActive] = useState(false);

  const [showActive, showSetActive] = useState(false);

  const ButtonComponent = ({ ...props }) => (
    <button
     value = {props.button_name}
      onClick={() => { handleCheckChange(props.button_name, props.name);setActive(props.button_name) }}
      className={active === props.button_name ? 'active' : ''}
    >
      {props.button_name}
    </button>
  );

  const handleCheckChange = (button_name: string, name: string) => {
    console.log(button_name, name)
    // var data = { ...props.form, [name]: event.target.checked };
    // props.addToForm(data);
    var data = {
      [name]: button_name
    }
    console.log(data)
  };

  const CDMButtonComponent = ({ ...props }) => (
    <button
      onClick={() => {handleCheckChange(props.button_name, props.name);showSetActive(props.button_name)}}
      className={showActive === props.button_name ? 'active' : ''}
    >
      {props.button_name}
    </button>
  );

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-8 col-sm-12">
          <form className="customer-enquiry" onSubmit={handleSubmit} {...props} noValidate={true}>
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
              label="Company*"
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

            <div className="form-group">
              <label>
                Project manager has experience in this type of project
              </label>
              <div>
                {YES_NO_BUTTON.map(button => (
                  <ButtonComponent button_name={button} name= 'managerExp'/>
                ))}
              </div>
            </div>
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
              label="CN Number*"
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
            <div className="form-group">
              <label>CDM notifiable*</label>
              <div>
                {YES_NO_BUTTON.map(button => (
                  <CDMButtonComponent button_name={button} name= 'cdmNotify'/>
                ))}
              </div>
            </div>
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
          </form>
        </div>
      </div>
      <div className="mx-35 d-flex justify-content-between mb-4">
        <button className="active mb-4 mt-5">
          SAVE AND CLOSE
        </button>
        <button type="submit" className="mb-4 mt-5 text-right">
          NEXT
        </button>
      </div>
    </div>
  );

  
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'projectForm'
})(ProjectForm);


export default connect(null)(form);
