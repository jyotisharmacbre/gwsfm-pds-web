import { required } from './fieldValidations';

describe('Validation', () => {
  it('Test- isRequired', () => {
    let result = required('Test');
    expect(result).toBeUndefined();
  });
});
