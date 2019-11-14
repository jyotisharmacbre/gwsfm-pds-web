import validate from './validate';
import { AddProjectParams } from './AddProjectParams.d';
import { FormErrors } from 'redux-form';
import { ProjectFormProps } from './ProjectTestData';

describe('Project Form Validation', () => {
  describe('Checking required fields', () => {
    let error: FormErrors<AddProjectParams>;

    it('Complete form validation', () => {
      const expectedProps = { ...ProjectFormProps };
      error = validate(expectedProps);
      expect(error).toEqual({});
    });

    it('Project name is required', () => {
      const expectedProps = { ...ProjectFormProps, ...{ projectName: '' } };
      error = validate(expectedProps);
      expect(error.projectName).toBeDefined();
    });
  });
});
