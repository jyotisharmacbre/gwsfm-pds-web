import { FormErrors } from 'redux-form';
import { Project } from './Project.d';

const validate = (values: Project): FormErrors<Project> => {
  const errors: FormErrors<Project> = {};

  if (
    values.firstAssetWorkedOn ||
    values.secondAssetWorkedOn ||
    values.thirdAssetWorkedOn
  ) {
    if (
      values.firstAssetWorkedOn.toString().length > 0 &&
      values.firstAssetWorkedOn == values.secondAssetWorkedOn
    ) {
      errors.firstAssetWorkedOn = 'Asset value cannot be same';
    }
    if (
      values.thirdAssetWorkedOn.toString().length > 0 &&
      values.firstAssetWorkedOn == values.thirdAssetWorkedOn
    ) {
      errors.firstAssetWorkedOn = 'Asset value cannot be same';
    }
    if (
      values.secondAssetWorkedOn.toString().length > 0 &&
      values.secondAssetWorkedOn == values.thirdAssetWorkedOn
    ) {
      errors.firstAssetWorkedOn = 'Third';
    }
  } else {
    errors.firstAssetWorkedOn = 'Atleast one asset is required';
  }
  return errors;
};
export default validate;
