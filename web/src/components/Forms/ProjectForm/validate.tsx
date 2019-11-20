import { FormErrors } from 'redux-form';
import { Project } from './Project.d';

const validate = (values: Project): FormErrors<Project> => {
  const errors: FormErrors<Project> = {};

  if (!values.projectName) {
    errors.projectName = 'projectNameIsRequired';
  }

  if (!values.companyName) {
    errors.companyName = 'nameIsRequired';
  }

  if (!values.contractName) {
    errors.contractName = 'contractNameIsRequired';
  }

  if (!values.projectHead) {
    errors.projectHead = 'headOfProjectNameRequired';
  }

  if (!values.projectOwner) {
    errors.projectOwner = 'projectOwnerRequired';
  }

  if (!values.projectManager) {
    errors.projectManager = 'projectManagerNameRequired';
  }

  if (!values.projectScope) {
    errors.projectScope = 'projectScopeRequired';
  }

  if (!values.projectStatus) {
    errors.projectStatus = 'projectStatusRequired';
  }

  if (!values.country) {
    errors.country = 'countryNameRequired';
  }

  if (!values.winProbabilty) {
    errors.winProbabilty = 'probabilityOfWinningRequired';
  }

  if (!values.currency) {
    errors.currency = 'currencyIsRequired';
  }

  if (!values.approxValue) {
    errors.approxValue = 'approximateValueRequired';
  }
  if (!values.contractType) {
    errors.contractType = 'contractTypeRequired';
  }

  if (!values.cdmNotifiable) {
    errors.cdmNotifiable = 'cDMnotifiableRequired';
  }

  if (!values.assetworkedonprimary) {
    errors.assetworkedonprimary = 'assetIsRequired';
  }

  if (!values.assetworkedonsecond) {
    errors.assetworkedonsecond = 'assetIsRequired';
  }
  if (!values.assetworkedonthird) {
    errors.assetworkedonthird = 'assetIsRequired';
  }
  return errors;
};
export default validate;
