import { isRequired, isEmail, number } from './validation-helper';

describe('Validation', () => {
  it('Test- isRequired', () => {
    let result = isRequired('Test');
    expect(result).toBeUndefined();
  });
});
