import { FormErrors } from 'redux-form';
import { Project } from './Project.d';

const validate = (values: Project): FormErrors<Project> => {
  const errors: FormErrors<Project> = {};

  if (!values.projectName) {
    errors.projectName = 'VALIDATION_MESSAGE_PROJECT_NAME_REQUIRED';
  }

  if (!values.companyName) {
    errors.companyName = 'VALIDATION_MESSAGE_NAME_REQUIRED';
  }

  if (!values.contractName) {
    errors.contractName = 'VALIDATION_MESSAGE_CONTRACT_NAME_REQUIRED';
  }

  if (!values.projectHead) {
    errors.projectHead = 'VALIDATION_MESSAGE_HOP_NAME_REQUIRED';
  }

  if (!values.projectOwner) {
    errors.projectOwner = 'VALIDATION_MESSAGE_PROJECT_OWNER_REQUIRED';
  }

  if (!values.projectManager) {
    errors.projectManager = 'VALIDATION_MESSAGE_PM_NAME_REQUIRED';
  }

  if (!values.projectScope) {
    errors.projectScope = 'VALIDATION_MESSAGE_PROJECT_SCOPE_REQUIRED';
  }

  if (!values.projectStatus) {
    errors.projectStatus = 'VALIDATION_MESSAGE_PROJECT_STATUS_REQUIRED';
  }

  if (!values.country) {
    errors.country = 'VALIDATION_MESSAGE_COUNTRY_NAME_REQUIRED';
  }

  if (!values.winProbabilty) {
    errors.winProbabilty = 'VALIDATION_MESSAGE_PROBABILITY_OF_WINNING_REQUIRED';
  }

  if (!values.currency) {
    errors.currency = 'VALIDATION_MESSAGE_CURRENCY_REQUIRED';
  }

  if (!values.approxValue) {
    errors.approxValue = 'VALIDATION_MESSAGE_APPROXIMATE_VALUE_REQUIRED';
  }
  if (!values.contractType) {
    errors.contractType = 'VALIDATION_MESSAGE_CONTRACT_TYPE_REQUIRED';
  }

  if (!values.cdmNotifiable) {
    errors.cdmNotifiable = 'VALIDATION_MESSAGE_CDMNOTIFIABLE_REQUIRED';
  }

  if (!values.assetworkedonprimary) {
    errors.assetworkedonprimary = 'VALIDATION_MESSAGE_ASSET_REQUIRED';
  }

  if (!values.assetworkedonsecond) {
    errors.assetworkedonsecond = 'VALIDATION_MESSAGE_ASSET_REQUIRED';
  }
  if (!values.assetworkedonthird) {
    errors.assetworkedonthird = 'VALIDATION_MESSAGE_ASSET_REQUIRED';
  }
  return errors;
};
export default validate;
