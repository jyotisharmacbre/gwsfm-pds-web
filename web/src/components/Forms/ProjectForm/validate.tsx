import { FormErrors } from 'redux-form';
import { AddProjectParams } from './AddProjectParams.d';

const validate = (values: AddProjectParams): FormErrors<AddProjectParams> => {
  const errors: FormErrors<AddProjectParams> = {};

  if (!values.projectName) {
    errors.projectName = 'Project name is required';
  }

  if (!values.companyName) {
    errors.companyName = 'Company name is required';
  }

  if (!values.contractName) {
    errors.contractName = 'Contract name is required';
  }

  if (!values.projectHead) {
    errors.projectHead = 'Head of project name is required';
  }

  if (!values.projectOwner) {
    errors.projectOwner = 'Project owner is required';
  }

  if (!values.projectManager) {
    errors.projectManager = 'Project manager name is required';
  }

  if (!values.projectScope) {
    errors.projectScope = 'Project scope is required';
  }

  if (!values.projectStatus) {
    errors.projectStatus = 'Project status is required';
  }

  if (!values.country) {
    errors.country = 'Country name is required';
  }

  if (!values.winProbabilty) {
    errors.winProbabilty = 'Probability of winning is required';
  }

  if (!values.currency) {
    errors.currency = 'Currency is required';
  }

  if (!values.approxValue) {
    errors.approxValue = 'Approximate value is required';
  }
  if (!values.contractType) {
    errors.contractType = 'Contract type is required';
  }

  if (!values.cdmNotifiable) {
    errors.cdmNotifiable = 'CDM notifiable is required';
  }

  if (!values.assetworkedonprimary) {
    errors.assetworkedonprimary = 'Asset is required';
  }

  if (!values.assetworkedonsecond) {
    errors.assetworkedonsecond = 'Asset is required';
  }
  if (!values.assetworkedonthird) {
    errors.assetworkedonthird = 'Asset is required';
  }
  return errors;
};
export default validate;
