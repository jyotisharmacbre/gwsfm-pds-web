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
//import ButtonComponent from './ButtonComponent';
import ReduxFormRadio from '../../ReduxFormHandlers/ReduxFormRadio';
import { booleanLiteral } from '@babel/types';
import ReduxFormTextArea from '../../ReduxFormHandlers/ReduxFormTextArea';
import { addProject } from '../../../redux/actions';
// import ReduxFormSelect from '../../ReduxFormHandlers/ReduxFormSelect';
// Validation methods
const validator = new Validator();

interface Props {
  showActive: boolean;
  YES_NO_BUTTON: any;
}

class ProjectForm extends React.Component<InjectedFormProps, Props> {
  constructor(props) {
    super(props);
    this.state = {
      YES_NO_BUTTON: [
        { name: 'YES', isActive: false },
        { name: 'NO', isActive: false }
      ],
      showActive: false
    };
    //  this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility = index => {
    let tmp = this.state.YES_NO_BUTTON;
    tmp[index].isActive = !tmp[index].isActive;
    this.setState({ YES_NO_BUTTON: tmp });
  };

  // toggleVisibility = () => {
  //   this.setState(previousState => {
  //     return {
  //       showActive: !previousState.showActive
  //     };
  //   });
  // };

  // toggleVisibility() {
  //   this.setState({
  //     showActive: !this.state.showActive
  //   });
  // }

  onSubmit(formValues: any) {
    console.log('here');
    console.log('values', formValues);
    //  this.props.dispatch(addProject(formValues));
    // props.dispatch(reset('projectForm'));
  }

  // ButtonComponent = ({ ...props }) => (
  //   <button
  //     value={props.button_name}
  //     onClick={() => this.toggleVisibility()}
  //     className={this.state.showActive === props.button_name ? 'active' : ''}
  //   >
  //     {props.button_name}
  //   </button>
  // );

  //const [active, setActive] = useState(false);

  //const [showActive, showSetActive] = useState(false);

  // const handleCheckChange = (button_name: string, name: string) => {
  //   console.log(button_name, name);
  //   // var data = { ...props.form, [name]: event.target.checked };
  //   // props.addToForm(data);
  //   var data = {
  //     [name]: button_name
  //   };
  //   console.log(data);
  // };

  // const CDMButtonComponent = ({ ...props }) => (
  //   <button
  //     onClick={() => {
  //       handleCheckChange(props.button_name, props.name);
  //       showSetActive(props.button_name);
  //     }}
  //     className={showActive === props.button_name ? 'active' : ''}
  //   >
  //     {props.button_name}
  //   </button>
  // );
  render() {
    return (
      <div className="container-fluid">
        <div className=" row">
          <div className="col-lg-8 col-sm-12">
            <form
              className="customer-enquiry"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              noValidate={true}
            >
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
                  {this.state.YES_NO_BUTTON.map((button_name, index) => (
                    <button
                      key={index}
                      value={button_name.name}
                      onClick={() => this.toggleVisibility(index)}
                      name="managerExp"
                      className={button_name.isActive ? 'active' : ''}
                    >
                      {button_name.name}
                    </button>
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
              {/* // <div className="form-group">
            //   <label>CDM notifiable*</label>
            //   <div>
            //     {YES_NO_BUTTON.map(button => (
            //       <CDMButtonComponent button_name={button} name="cdmNotify" />
            //     ))}
            //   </div>
            // </div> */}
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
              <div className="mx-35 d-flex justify-content-between mb-4">
                <button className="active mb-4 mt-5" type="submit">
                  SAVE AND CLOSE
                </button>
                <button type="submit" className="mb-4 mt-5 text-right">
                  NEXT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {
    projectName: 'string'
  };

  if (!formValues.projectName) {
    errors.projectName = 'Enter project name';
  }
};

// const ButtonComponent = props => {
//   console.log(props);
//   return (
//     <button
//       name={props.name}
//       onClick={props.toggleVisibility}
//       className={props.showActive ? 'active' : ''}
//     >
//       {props.button}
//     </button>
//   );
// };

export default reduxForm({
  form: 'projectForm',
  validate
})(ProjectForm);

//export default connect(null)(form);
